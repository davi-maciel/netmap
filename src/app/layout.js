import "./globals.css";

export const metadata = {
  title: "Network Map",
  description: "Map visualization of your network.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
