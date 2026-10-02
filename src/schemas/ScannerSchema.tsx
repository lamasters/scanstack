import { Helmet } from "react-helmet-async";
import React from "react";

export const ScannerSchema: React.FC = () => {
  const featuresSchema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "ScanStack - Privacy-Focused PDF Scanner",
    applicationCategory: "UtilitiesApplication",
    operatingSystem: "All",
    featureList: [
      "100% Client-Side Privacy: All image processing, cropping, and PDF compilation take place locally within your browser.",
      "No Installation Required: Works seamlessly across desktop, tablet, and mobile browsers without app downloads.",
      "Multi-Page PDF Export: Combine multiple photo scans into a single, organized PDF file.",
      "Automatic Image Enhancement: Raw captures are automatically balanced for sharpness, contrast, and clarity.",
    ],
    hasPart: {
      "@type": "ItemList",
      name: "Key Features of ScanStack",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "100% Client-Side Privacy",
          description:
            "Your files stay on your device. Processing, cropping, and PDF compilation happen locally in browser memory.",
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "No Installation Required",
          description:
            "Instant browser utility that eliminates the need to download native mobile app software.",
        },
        {
          "@type": "ListItem",
          position: 3,
          name: "Multi-Page PDF Export",
          description:
            "Combine multiple photo scans into a single, clean PDF file ready for download.",
        },
        {
          "@type": "ListItem",
          position: 4,
          name: "Automatic Image Enhancement",
          description:
            "Raw captures are balanced for sharpness, contrast, and text clarity before export.",
        },
      ],
    },
  };

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(featuresSchema)}
      </script>
    </Helmet>
  );
};
