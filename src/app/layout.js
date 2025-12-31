import "./globals.css";

export const metadata = {
  title: "NetMap",
  description: "Visualize your personal network on an interactive world map.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>{children}</body>
    </html>
  );
}
