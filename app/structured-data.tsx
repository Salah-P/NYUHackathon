export const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Poolara",
  "description": "Student carpooling platform connecting university students across UAE for safe, affordable, and sustainable travel",
  "url": "https://poolara.ae",
  "logo": {
    "@type": "ImageObject",
    "url": "https://poolara.ae/logo.png",
    "width": 200,
    "height": 200
  },
  "contactPoint": {
    "@type": "ContactPoint",
    "telephone": "+971-50-123-4567",
    "contactType": "customer service",
    "email": "support@poolara.ae",
    "availableLanguage": ["English", "Arabic"]
  },
  "sameAs": [
    "https://twitter.com/poolara_ae",
    "https://facebook.com/poolara.ae",
    "https://instagram.com/poolara.ae",
    "https://linkedin.com/company/poolara"
  ],
  "address": {
    "@type": "PostalAddress",
    "addressCountry": "AE",
    "addressRegion": "UAE"
  },
  "foundingDate": "2024",
  "knowsAbout": [
    "Carpooling",
    "Student Transportation",
    "Ride Sharing",
    "Sustainable Transportation"
  ],
  "serviceArea": {
    "@type": "Country",
    "name": "United Arab Emirates"
  },
  "applicationCategory": "TravelApplication"
}

export const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": "Poolara",
  "url": "https://poolara.ae",
  "description": "Connect with verified university students for safe, affordable carpooling across UAE emirates",
  "publisher": {
    "@type": "Organization",
    "name": "Poolara",
    "url": "https://poolara.ae",
    "logo": {
      "@type": "ImageObject",
      "url": "https://poolara.ae/logo.png"
    }
  },
  "potentialAction": {
    "@type": "SearchAction",
    "target": {
      "@type": "EntryPoint",
      "urlTemplate": "https://poolara.ae/find-ride?q={search_term_string}"
    },
    "query-input": "required name=search_term_string"
  },
  "inLanguage": "en-US",
  "copyrightYear": "2024",
  "isAccessibleForFree": true
}

export const webApplicationSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "Poolara",
  "url": "https://poolara.ae",
  "description": "Student carpooling platform for UAE universities",
  "applicationCategory": "TravelApplication",
  "operatingSystem": "Web Browser",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "AED"
  },
  "author": {
    "@type": "Organization",
    "name": "Poolara"
  },
  "browserRequirements": "Requires JavaScript. Requires HTML5.",
  "softwareVersion": "1.0",
  "releaseNotes": "Initial release of Poolara student carpooling platform"
}
