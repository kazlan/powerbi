import React from 'react';
import { Helmet } from 'react-helmet-async';

const SEO = ({ title, description, image, url, type = 'website' }) => {
    const siteTitle = 'POWER BI MAX';
    const fullTitle = title ? `${title} | ${siteTitle}` : siteTitle;
    const defaultDescription = 'Domina la certificación PL-300 con POWER BI MAX. Tu enciclopedia visual interactiva.';
    const metaDescription = description || defaultDescription;

    // Use a default OG image if none provided. Ensure it's an absolute path if possible for social sharing.
    // Assuming the site is hosted at root, we use the passed image or default.
    // Ideally, 'window.location.origin' + image would be best if image is relative.
    const getAbsoluteUrl = (path) => {
        if (!path) return 'https://powerbimax.com/og-image.png';
        if (path.startsWith('http')) return path;
        return `https://powerbimax.com${path.startsWith('/') ? '' : '/'}${path}`;
    };

    const metaImage = getAbsoluteUrl(image);
    const metaUrl = url || window.location.href;

    return (
        <Helmet>
            {/* Standard Metadata */}
            <title>{fullTitle}</title>
            <meta name="description" content={metaDescription} />
            <link rel="canonical" href={metaUrl} />

            {/* Open Graph */}
            <meta property="og:type" content={type} />
            <meta property="og:title" content={fullTitle} />
            <meta property="og:description" content={metaDescription} />
            <meta property="og:image" content={metaImage} />
            <meta property="og:url" content={metaUrl} />
            <meta property="og:site_name" content={siteTitle} />

            {/* Twitter Cards */}
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content={fullTitle} />
            <meta name="twitter:description" content={metaDescription} />
            <meta name="twitter:image" content={metaImage} />
        </Helmet>
    );
};

export default SEO;
