import { Metadata } from "next";
import { Figtree } from "next/font/google";
import { Analytics } from "@vercel/analytics/next"
import { ThemeProvider } from "@/lib/providers/theme-provider";
import { ClientPointer } from "@/components/client-pointer";

import "@/app/globals.css";

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
  description: "David's personal website.",
  openGraph: {
    title: "David Nguyen",
    description: "David's personal website.",
    url: "davidnguyen.codes",
    siteName: "David Nguyen",
    locale: "en_NZ",
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
        <div className="min-h-screen flex flex-col bg-background">
          <main className="flex-1">
            <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
              {children}
            </ThemeProvider>
          </main>
          <ClientPointer />
          <Analytics />
        </div>
      </body>
    </html>
  );
}
