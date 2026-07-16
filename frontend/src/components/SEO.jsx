import React from 'react';
import { Helmet } from 'react-helmet-async';

const SEO = ({ title, description, url, image, schema, type = "website" }) => {
    const siteTitle = title ? `${title} | Offside` : "Offside | Premium Streetwear";
    const siteDescription = description || "Oversized. Minimal. Unapologetic. Offside delivers premium streetwear crafted from high-quality 100% premium cotton. Experience timeless designs for all-day comfort.";
    const siteUrl = url || "https://theoffside.in";
    const siteImage = image || "https://theoffside.in/logo.png"; // Default sharing image

    return (
        <Helmet>
            {/* Standard SEO Tags */}
            <title>{siteTitle}</title>
            <meta name="description" content={siteDescription} />
            <link rel="canonical" href={siteUrl} />

            {/* Open Graph / Facebook */}
            <meta property="og:type" content={type} />
            <meta property="og:url" content={siteUrl} />
            <meta property="og:title" content={siteTitle} />
            <meta property="og:description" content={siteDescription} />
            <meta property="og:image" content={siteImage} />

            {/* Twitter */}
            <meta property="twitter:card" content="summary_large_image" />
            <meta property="twitter:url" content={siteUrl} />
            <meta property="twitter:title" content={siteTitle} />
            <meta property="twitter:description" content={siteDescription} />
            <meta property="twitter:image" content={siteImage} />

            {/* Structured Data / JSON-LD for AEO/GEO */}
            {schema && (
                <script type="application/ld+json">
                    {JSON.stringify(schema)}
                </script>
            )}
        </Helmet>
    );
};

export default SEO;
