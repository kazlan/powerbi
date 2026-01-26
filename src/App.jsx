import { useState, useEffect } from 'react';
import {
  BarChart3, TrendingUp, Globe, Target, Activity,
  MousePointer2, CheckCircle2, AlertCircle, Info,
  ChevronRight, Layout, Layers, HelpCircle, Menu,
  Bookmark, Zap, Filter, Eye, Lightbulb, Gauge,
  PieChart, Share2, MousePointerClick, Smartphone,
  Search, Boxes, ArrowDownWideNarrow, Navigation,
  Table as TableIcon, Grid, Cpu, Database,
  MessageSquare, FileText, List, Mic
} from 'lucide-react';

// Components
// Components
import Sidebar from './components/Sidebar';
import Hero from './components/Hero';
import Gallery from './components/Gallery';
import VisualDetail from './components/VisualDetail';
import PodcastList from './components/PodcastList';
import PodcastDetail from './components/PodcastDetail';
import { LegalNotice, PrivacyPolicy, CookiesPolicy } from './Legal';
import { podcasts } from './data/podcasts';
import { chartLibrary, categories, allCharts } from './data/charts.jsx';

const App = () => {
  const [activeTab, setActiveTab] = useState('home');
  const [selectedCategory, setSelectedCategory] = useState('todos');
  const [selectedChart, setSelectedChart] = useState(null);
  const [selectedPodcast, setSelectedPodcast] = useState(null);
  const [selectedTag, setSelectedTag] = useState('Todos');

  // Helper to slugify titles
  const slugify = (text) => {
    return text.toString().toLowerCase()
      .replace(/\s+/g, '-')
      .replace(/[^\w\-]+/g, '')
      .replace(/\-\-+/g, '-')
      .replace(/^-+/, '')
      .replace(/-+$/, '');
  };

  const updateUrl = (params) => {
    const url = new URL(window.location);
    Object.keys(params).forEach(key => {
      if (params[key]) {
        url.searchParams.set(key, params[key]);
      } else {
        url.searchParams.delete(key);
      }
    });
    window.history.pushState({}, '', url);
  };

  // ---------------------------------------------------------
  // DEEP LINKING & HANDLERS
  // ---------------------------------------------------------

  useEffect(() => {
    try {
      const params = new URLSearchParams(window.location.search);
      const podcastId = params.get('podcast');
      const visualSlug = params.get('visual');
      const view = params.get('view');

      if (podcastId) {
        const foundPodcast = podcasts.find(p => p.id === podcastId);
        if (foundPodcast) {
          setActiveTab('podcasts');
          setSelectedPodcast(foundPodcast);
          return; // Prioritize podcast if both exist (unlikely)
        }
      }

      if (visualSlug) {
        const foundChart = allCharts.find(c => slugify(c.title) === visualSlug);
        if (foundChart) {
          setActiveTab('catalog'); // Determine category?
          // Not strictly necessary for display but good for UI state.
          // Let's find the category of the chart.
          for (const [catId, charts] of Object.entries(chartLibrary)) {
            if (charts.find(c => c.title === foundChart.title)) {
              setSelectedCategory(catId);
              break;
            }
          }
          setSelectedChart(foundChart);
          return;
        }
      }

      // If no deep link, check view
      if (view && ['home', 'catalog', 'podcasts'].includes(view)) {
        setActiveTab(view);
      }

    } catch (error) {
      console.error("Deep linking error:", error);
    }
  }, []);

  const handleTagSelect = (tag) => {
    setSelectedTag(tag);
    setSelectedPodcast(null);
    updateUrl({ podcast: null });
  };

  const handlePodcastSelect = (podcast) => {
    setSelectedPodcast(podcast);
    updateUrl({ podcast: podcast.id, visual: null });
  };

  const handleBackToPodcasts = () => {
    setSelectedPodcast(null);
    updateUrl({ podcast: null });
  };

  const handleChartSelect = (chart) => {
    setSelectedChart(chart);
    if (chart) {
      updateUrl({ visual: slugify(chart.title), podcast: null });
    } else {
      updateUrl({ visual: null });
    }
  };

  const renderContent = () => {
    const currentIndex = selectedChart ? allCharts.findIndex(c => c.title === selectedChart.title) : -1;

    const handlePrevious = () => {
      if (currentIndex > 0) {
        setSelectedChart(allCharts[currentIndex - 1]);
      }
    };

    const handleNext = () => {
      if (currentIndex < allCharts.length - 1) {
        setSelectedChart(allCharts[currentIndex + 1]);
      }
    };

    if (selectedChart) {
      return (
        <VisualDetail
          chart={selectedChart}
          onBack={() => handleChartSelect(null)}
          onPrevious={currentIndex > 0 ? () => handleChartSelect(allCharts[currentIndex - 1]) : null}
          onNext={currentIndex < allCharts.length - 1 ? () => handleChartSelect(allCharts[currentIndex + 1]) : null}
        />
      );
    }

    switch (activeTab) {
      case 'home':
        return <Hero
          onExplore={() => {
            setActiveTab('catalog');
            updateUrl({ view: 'catalog' });
          }}
          allCharts={allCharts}
          onSelectChart={handleChartSelect}
          onViewPodcast={(podcast) => {
            handlePodcastSelect(podcast);
            setActiveTab('podcasts');
          }}
        />;
      case 'catalog':
        return (
          <Gallery
            categories={categories}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
            chartLibrary={chartLibrary}
            onSelectChart={handleChartSelect}
          />
        );
      case 'legal':
        return (
          <div className="p-8 max-w-4xl mx-auto bg-background-card border border-white/5 rounded-xl mt-8">
            <button onClick={() => setActiveTab('home')} className="mb-6 text-primary hover:text-white flex items-center gap-2">
              <span className="material-symbols-outlined text-sm">arrow_back</span> Volver
            </button>
            <LegalNotice />
          </div>
        );
      case 'privacy':
        return (
          <div className="p-8 max-w-4xl mx-auto bg-background-card border border-white/5 rounded-xl mt-8">
            <button onClick={() => setActiveTab('home')} className="mb-6 text-primary hover:text-white flex items-center gap-2">
              <span className="material-symbols-outlined text-sm">arrow_back</span> Volver
            </button>
            <PrivacyPolicy />
          </div>
        );
      case 'cookies':
        return (
          <div className="p-8 max-w-4xl mx-auto bg-background-card border border-white/5 rounded-xl mt-8">
            <button onClick={() => setActiveTab('home')} className="mb-6 text-primary hover:text-white flex items-center gap-2">
              <span className="material-symbols-outlined text-sm">arrow_back</span> Volver
            </button>
            <CookiesPolicy />
          </div>
        );
      case 'podcasts':
        if (selectedPodcast) {
          return (
            <PodcastDetail
              podcast={selectedPodcast}
              onBack={handleBackToPodcasts}
              onTagSelect={handleTagSelect}
            />
          );
        }
        return (
          <PodcastList
            podcasts={podcasts}
            onSelectPodcast={handlePodcastSelect}
            selectedTag={selectedTag}
            onSelectTag={handleTagSelect}
          />
        );
      default:
        // Fallback
        return <Hero
          onExplore={() => {
            setActiveTab('catalog');
            updateUrl({ view: 'catalog' });
          }}
          allCharts={allCharts}
          onSelectChart={handleChartSelect}
          onViewPodcast={(podcast) => {
            handlePodcastSelect(podcast);
            setActiveTab('podcasts');
          }}
        />;
    }
  };

  return (
    <div className="min-h-screen bg-[#0B1120] text-slate-100 flex font-sans selection:bg-primary selection:text-black">
      <Sidebar activeTab={activeTab} setActiveTab={(tab) => {
        setActiveTab(tab);
        handleChartSelect(null);
        updateUrl({ visual: null, podcast: null, view: tab === 'home' ? null : tab });
      }} />

      <main className="flex-1 min-w-0 flex flex-col">
        {/* Mobile Header */}
        <header className="md:hidden flex items-center justify-between p-4 bg-sidebar-dark border-b border-white/5 sticky top-0 z-40 backdrop-blur-md bg-opacity-90">
          <div className="flex items-center gap-3">
            <img src="/logo.png" alt="Logo" className="w-8 h-8 rounded-lg object-cover" />
            <h1 className="font-display font-bold text-lg text-white">POWER BI <span className="text-primary">MAX</span></h1>
          </div>

        </header>

        {/* Content Area */}
        <div className="flex-1">
          {renderContent()}
        </div>

        {/* Footer */}
        <footer className="px-6 lg:px-40 py-10 border-t border-white/5 bg-background-dark/50 text-center md:text-left">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-2 text-slate-400">
              <span className="material-symbols-outlined text-sm">copyright</span>
              <span className="text-sm">2026 POWER BI MAX. Todos los derechos reservados.</span>
            </div>
            <div className="flex gap-6">
              <button onClick={() => { setActiveTab('legal'); handleChartSelect(null); window.scrollTo(0, 0); }} className="text-slate-400 hover:text-primary transition-colors text-sm">Aviso Legal</button>
              <button onClick={() => { setActiveTab('privacy'); handleChartSelect(null); window.scrollTo(0, 0); }} className="text-slate-400 hover:text-primary transition-colors text-sm">Privacidad</button>
              <button onClick={() => { setActiveTab('cookies'); handleChartSelect(null); window.scrollTo(0, 0); }} className="text-slate-400 hover:text-primary transition-colors text-sm">Cookies</button>
            </div>
          </div>
        </footer>

        {/* Mobile Nav */}
        <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-sidebar-dark/95 backdrop-blur-xl border-t border-white/10 p-4 flex justify-around z-50">
          <button onClick={() => { setActiveTab('home'); updateUrl({ view: null }); }} className={`flex flex-col items-center gap-1 ${activeTab === 'home' ? 'text-primary' : 'text-slate-500'}`}>
            <span className="material-symbols-outlined">home</span>
            <span className="text-[10px] uppercase font-bold">Inicio</span>
          </button>
          <button onClick={() => { setActiveTab('catalog'); updateUrl({ view: 'catalog' }); }} className={`flex flex-col items-center gap-1 ${activeTab === 'catalog' ? 'text-primary' : 'text-slate-500'}`}>
            <span className="material-symbols-outlined">bar_chart</span>
            <span className="text-[10px] uppercase font-bold">Visuales</span>
          </button>
          <button onClick={() => { setActiveTab('podcasts'); updateUrl({ view: 'podcasts' }); }} className={`flex flex-col items-center gap-1 ${activeTab === 'podcasts' ? 'text-primary' : 'text-slate-500'}`}>
            <span className="material-symbols-outlined">podcasts</span>
            <span className="text-[10px] uppercase font-bold">Podcasts</span>
          </button>
        </nav>
      </main>
    </div>
  );
};

export default App;
