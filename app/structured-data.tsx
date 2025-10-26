export const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "UniRide",
  "description": "Student carpooling platform connecting university students across UAE for safe, affordable, and sustainable travel",
  "url": "https://uniride.ae",
  "logo": {
    "@type": "ImageObject",
    "url": "https://uniride.ae/logo.png",
    "width": 200,
    "height": 200
  },
  "contactPoint": {
    "@type": "ContactPoint",
    "telephone": "+971-50-123-4567",
    "contactType": "customer service",
    "email": "support@uniride.ae",
    "availableLanguage": ["English", "Arabic"]
  },
  "sameAs": [
    "https://twitter.com/uniride_ae",
    "https://facebook.com/uniride.ae",
    "https://instagram.com/uniride.ae",
    "https://linkedin.com/company/uniride"
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
  "name": "UniRide",
  "url": "https://uniride.ae",
  "description": "Connect with verified university students for safe, affordable carpooling across UAE emirates",
  "publisher": {
    "@type": "Organization",
    "name": "UniRide",
    "url": "https://uniride.ae",
    "logo": {
      "@type": "ImageObject",
      "url": "https://uniride.ae/logo.png"
    }
  },
  "potentialAction": {
    "@type": "SearchAction",
    "target": {
      "@type": "EntryPoint",
      "urlTemplate": "https://uniride.ae/find-ride?q={search_term_string}"
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
  "name": "UniRide",
  "url": "https://uniride.ae",
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
    "name": "UniRide"
  },
  "browserRequirements": "Requires JavaScript. Requires HTML5.",
  "softwareVersion": "1.0",
  "releaseNotes": "Initial release of UniRide student carpooling platform"
}
