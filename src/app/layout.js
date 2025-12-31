import "./globals.css";

export const metadata = {
  title: "NetMap",
  description: "Visualize your personal network on an interactive world map.",
  metadataBase: new URL('https://netmap.vercel.app'),
  openGraph: {
    title: "NetMap",
    description: "Visualize your personal network on an interactive world map.",
    type: "website",
    locale: "en_US",
    siteName: "NetMap",
  },
  twitter: {
    card: "summary_large_image",
    title: "NetMap",
    description: "Visualize your personal network on an interactive world map.",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>{children}</body>
    </html>
  );
}
