export const metadata = {
  title: "Calzone Cards",
  description: "Vintage Pokémon singles — curated by Calzone Cards",
};

import "./globals.css";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
