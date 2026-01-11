import React from 'react';

const Sidebar = ({ activeTab, setActiveTab }) => {
    const menuItems = [
        { id: 'home', icon: 'home', label: 'Inicio' },
        { id: 'catalog', icon: 'bar_chart', label: 'Visuales' },
        { id: 'podcasts', icon: 'podcasts', label: 'Podcasts' },
    ];

    return (
        <aside className="hidden md:flex flex-col items-center py-6 w-24 bg-sidebar-dark border-r border-white/5 h-screen sticky top-0 shrink-0 z-50">
            <div className="mb-10 group cursor-pointer" onClick={() => setActiveTab('home')}>
                <img src="/logo.png" alt="Logo" className="w-12 h-12 rounded-xl shadow-glow group-hover:shadow-glow-strong transition-all duration-300 object-cover" />
            </div>

            <nav className="flex-1 flex flex-col gap-6 w-full px-4">
                {menuItems.map((item) => (
                    <button
                        key={item.id}
                        onClick={() => setActiveTab(item.id)}
                        className={`group flex flex-col items-center gap-1 relative ${activeTab === item.id ? 'text-primary' : 'text-slate-500 hover:text-white'}`}
                        aria-label={`Ir a la sección ${item.label}`}
                    >
                        <div className={`p-3 rounded-xl border transition-all ${activeTab === item.id ? 'bg-white/5 border-white/10 shadow-lg' : 'border-transparent hover:bg-white/5 hover:border-white/10'}`} aria-hidden="true">
                            <span className="material-symbols-outlined">{item.icon}</span>
                        </div>
                        <span className={`text-[10px] font-bold tracking-wider mt-1 uppercase transition-opacity ${activeTab === item.id ? 'opacity-100' : 'opacity-80'}`}>
                            {item.label}
                        </span>
                    </button>
                ))}
            </nav>

            <div className="mt-auto flex flex-col gap-4">

                <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-blue-600 to-purple-600 flex items-center justify-center text-white text-xs font-bold border border-white/20 shadow-lg cursor-pointer">
                    ES
                </div>
            </div>
        </aside>
    );
};

export default Sidebar;
