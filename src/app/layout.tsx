import { Metadata } from "next";
import { Figtree } from "next/font/google";

import { ThemeProvider } from "@/lib/providers/theme-provider";
import { ClientPointer } from "@/components/client-pointer";

import "./globals.css";

const figtree = Figtree({
  subsets: ["latin"],
  variable: "--font-figtree",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://davidnguyen.codes"),
  title: {
    default: "David Nguyen",
    template: "%s | David Nguyen",
  },
  description: "My personal website.",
  openGraph: {
    title: "David Nguyen",
    description: "My personal website.",
    url: "davidnguyen.codes",
    siteName: "David Nguyen",
    locale: "en_US",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  twitter: {
    title: "David Nguyen",
    card: "summary_large_image",
  },
  verification: {
    google: "",
    yandex: "",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={figtree.className} suppressHydrationWarning>
      <body>
        <main className="bg-background">
          <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
            {children}
          </ThemeProvider>

        
          <ClientPointer />
        </main>
      </body>
    </html>
  );
}
