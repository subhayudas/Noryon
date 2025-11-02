import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import "./gradient-animation.css";
import "../styles/mobile-optimizations.css";
import Navbar from "@/components/main/Navbar";
import Footer from "@/components/main/Footer";
import LoadingAnimation from "@/components/main/LoadingAnimation";
import VapiChat from "@/components/main/VapiChat";
import CalendlyPopup from "@/components/main/CalendlyPopup";
import { LanguageProvider } from "@/contexts/LanguageContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL('https://www.Noryon.in/'),
  title: {
    default: "Noryon - Your Digital Growth Partner",
    template: "%s | Noryon",
  },
  description: "Noryon is your secret weapon in the digital arena. We specialize in digital marketing, web development, and brand growth strategies to help your business thrive online.",
  keywords: ["digital marketing", "web development", "brand growth", "digital agency", "marketing services", "web design"],
  authors: [{ name: "Noryon" }],
  creator: "Noryon",
  publisher: "Noryon",
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
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
    other: [
      { rel: 'mask-icon', url: '/safari-pinned-tab.svg', color: '#000000' },
    ],
  },
  manifest: '/site.webmanifest',
  twitter: {
    card: "summary_large_image",
    title: "Noryon - Your Digital Growth Partner",
    description: "We're your secret weapon in the digital arena",
    images: ['/logo.png'],
    creator: "@Noryon",
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://www.Noryon.in/',
    title: 'Noryon - Your Digital Growth Partner',
    description: 'Noryon is your secret weapon in the digital arena. We specialize in digital marketing, web development, and brand growth strategies.',
    siteName: 'Noryon',
    images: [
      {
        url: '/logo.png',
        width: 1200,
        height: 630,
        alt: 'Noryon Logo',
      },
    ],
  },
  verification: {
    google: 'your-google-verification-code', // Replace with actual verification code
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Comfortaa:wght@300..700&family=Montserrat:ital,wght@0,100..900;1,100..900&family=Playfair:ital,opsz,wght@0,5..1200,300..900;1,5..1200,300..900&family=Questrial&family=Rubik:ital,wght@0,300..900;1,300..900&display=swap" rel="stylesheet" />
        
        {/* Additional SEO and favicon links */}
        <link rel="canonical" href="https://www.Noryon.in/" />
        <link rel="icon" type="image/x-icon" href="/favicon.ico" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#000000" />
        <meta name="msapplication-TileColor" content="#000000" />
        <meta name="theme-color" content="#000000" />
        <meta name="application-name" content="Noryon" />
        <meta name="apple-mobile-web-app-title" content="Noryon" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="format-detection" content="telephone=no" />
        <meta name="mobile-web-app-capable" content="yes" />
      </head>
      <body
        className={`${inter.className} bg-[#030014] overflow-y-scroll overflow-x-hidden`}
        style={{ cursor: 'auto' }}
      >
        <LanguageProvider>
        <LoadingAnimation />
        <Navbar />
        {children}
        <Footer />
        <VapiChat />
        <CalendlyPopup />
        </LanguageProvider>
      </body>
    </html>
  );
}

