import type { Metadata } from "next";
import Script from "next/script";
import { Header } from "@/components/Header";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { BODY } from "@/lib/tokens";
import "./globals.css";

const SITE_DESCRIPTION =
  "Full-stack and AI engineer building attribution systems, document forensics and internal tooling for early-stage startups. Creator of ProofMart and Gapl. B.Tech CSE, LPU.";

export const metadata: Metadata = {
  title: {
    template: "%s · Deepanshu Lathar",
    default: "Deepanshu Lathar — Full-Stack & AI Engineer",
  },
  description: SITE_DESCRIPTION,
};

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Deepanshu Lathar",
  url: "https://deepanshulathar.dev",
  jobTitle: "Full-Stack & AI Engineer",
  alumniOf: "Lovely Professional University",
  knowsAbout: ["attribution modelling", "RAG", "Next.js", "document verification"],
  sameAs: ["https://linkedin.com/in/deepanshulathar", "https://github.com/latharrr"],
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        {/* App Router's root layout already applies site-wide, so this isn't
            the pages/_document.js single-page pitfall the rule below warns about. */}
        {/* eslint-disable-next-line @next/next/no-page-custom-font */}
        <link
          href="https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;500&display=swap"
          rel="stylesheet"
        />
        <link rel="preconnect" href="https://api.fontshare.com" />
        <link
          href="https://api.fontshare.com/v2/css?f[]=general-sans@500,600&display=swap"
          rel="stylesheet"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
      </head>
      <body>
        <div
          style={{
            minHeight: "100vh",
            background: "#F3F5F4",
            color: "#15171A",
            fontFamily: BODY,
            fontSize: 18,
            lineHeight: 1.6,
            textWrap: "pretty",
            paddingBottom: 96,
          }}
        >
          <div style={{ maxWidth: 940, margin: "0 auto", padding: "0 24px" }}>
            <Header />
            <Nav />
            {children}
            <Footer />
          </div>
        </div>
        {/* Analytics carried over from the previous deploy of this site — same
            GA4 property and Clarity project, so historical data stays continuous. */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-65PX2BG1P8"
          strategy="afterInteractive"
        />
        <Script id="ga4-init" strategy="afterInteractive">
          {`window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-65PX2BG1P8');`}
        </Script>
        <Script id="clarity-init" strategy="afterInteractive">
          {`(function(c,l,a,r,i,t,y){
              c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
              t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
              y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
            })(window, document, "clarity", "script", "vkah3dr3vr");`}
        </Script>
      </body>
    </html>
  );
}
