import type { Metadata } from "next";
import { Inter, Outfit, Cairo, Tajawal } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  display: "swap",
});

const cairo = Cairo({
  subsets: ["arabic"],
  variable: "--font-cairo",
  display: "swap",
});

const tajawal = Tajawal({
  subsets: ["arabic"],
  weight: ["300", "400", "500", "700", "800", "900"],
  variable: "--font-tajawal",
  display: "swap",
});

export const viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export const metadata: Metadata = {
  title: "AirPoint | Industrial HVAC, Refrigeration & MEP Services UAE",
  description: "Bilingual industrial cooling solutions in the UAE. AC installation, commercial cold rooms, MEP, and 24/7 Annual Maintenance Contracts.",
  metadataBase: new URL("https://airpoint-llc.com"),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`${inter.variable} ${outfit.variable} ${cairo.variable} ${tajawal.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <head>
        <link rel="preload" as="image" href="/images/hero-hvac-technician.jpg" />
      </head>
      <body
        className="min-h-full bg-brand-dark text-foreground flex flex-col"
        suppressHydrationWarning
      >
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem("theme");if(t==="light"){document.documentElement.classList.add("light");document.body.classList.add("light");}}catch(e){}})();`,
          }}
        />
        {children}
      </body>
    </html>
  );
}
