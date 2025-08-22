import type { Metadata } from "next";
import { Hind_Siliguri } from "next/font/google";
import "./globals.css";
import Analytics from "@/components/Analytics";
import MetaPixel from "@/components/MetaPixel";

const bengali = Hind_Siliguri({
  subsets: ['bengali', 'latin'],
  weight: ['400', '600', '700'], // Reduced font weights for better performance
  variable: "--font-bengali",
  display: 'swap',
  preload: true,
});

export const metadata: Metadata = {
  title: "Boi Lagbe - 3000+ বাংলা পিডিএফ বই | সাফল্যের পথে সহায়ক",
  description: "নিজের ইনকাম যদি কোটি টাকার উপরে নিয়ে যেতে চান তাহলে নিজের ব্রেইনের উপর খরচ করুন। 3000+ বেস্ট সেলিং বাংলা পিডিএফ বই মাত্র ৳50 টাকায়।",
  keywords: "বাংলা বই, পিডিএফ বই, সাফল্যের বই, আত্মউন্নয়ন, ব্যবসা বই, বাংলা পিডিএফ",
  authors: [{ name: "Boi Lagbe" }],
  creator: "Boi Lagbe",
  publisher: "Boi Lagbe",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://boilagbe.codelagbe.store'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: "Boi Lagbe - 3000+ বাংলা পিডিএফ বই | সাফল্যের পথে সহায়ক",
    description: "নিজের ইনকাম যদি কোটি টাকার উপরে নিয়ে যেতে চান তাহলে নিজের ব্রেইনের উপর খরচ করুন। 3000+ বেস্ট সেলিং বাংলা পিডিএফ বই মাত্র ৳50 টাকায়।",
    url: 'https://boilagbe.codelagbe.store',
    siteName: 'Boi Lagbe',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Boi Lagbe - 3000+ বাংলা পিডিএফ বই',
      },
    ],
    locale: 'bn_BD',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Boi Lagbe - 3000+ বাংলা পিডিএফ বই | সাফল্যের পথে সহায়ক",
    description: "নিজের ইনকাম যদি কোটি টাকার উপরে নিয়ে যেতে চান তাহলে নিজের ব্রেইনের উপর খরচ করুন। 3000+ বেস্ট সেলিং বাংলা পিডিএফ বই মাত্র ৳50 টাকায়।",
    images: ['/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="bn" className={bengali.variable}>
      <head>
        {/* Performance optimizations */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://www.googletagmanager.com" />
        <link rel="preconnect" href="https://www.google-analytics.com" />
        <link rel="preconnect" href="https://www.clarity.ms" />
        <link rel="preconnect" href="https://connect.facebook.net" />
        
        {/* DNS prefetch for external domains */}
        <link rel="dns-prefetch" href="//www.googletagmanager.com" />
        <link rel="dns-prefetch" href="//www.google-analytics.com" />
        <link rel="dns-prefetch" href="//www.clarity.ms" />
        <link rel="dns-prefetch" href="//connect.facebook.net" />
        
        <link rel="icon" href="/favicon.ico" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#3B82F6" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="Boi Lagbe" />
        <link rel="manifest" href="/manifest.json" />
        
        {/* Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Product",
              "name": "3000+ বাংলা পিডিএফ বই কালেকশন",
              "description": "নিজের ইনকাম যদি কোটি টাকার উপরে নিয়ে যেতে চান তাহলে নিজের ব্রেইনের উপর খরচ করুন। 3000+ বেস্ট সেলিং বাংলা পিডিএফ বই।",
              "brand": {
                "@type": "Brand",
                "name": "Boi Lagbe"
              },
              "offers": {
                "@type": "Offer",
                "price": "90",
                "priceCurrency": "BDT",
                "availability": "https://schema.org/InStock",
                "seller": {
                  "@type": "Organization",
                  "name": "Boi Lagbe"
                }
              },
              "aggregateRating": {
                "@type": "AggregateRating",
                "ratingValue": "4.8",
                "reviewCount": "1500"
              }
            })
          }}
        />
      </head>
      <body className="antialiased">
        {children}
        <Analytics 
          gtagId="G-6NWT9S70WG"
          fbPixelId="XXXXXXXXXX"
          clarityId="syhbqvmyvm"
        />
        <MetaPixel />
      </body>
    </html>
  );
}
