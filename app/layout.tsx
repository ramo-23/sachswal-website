import "./globals.css";
import Header from "../src/components/Header/Header";
import PageContainer from "../src/components/PageContainer/PageContainer";
import Footer from "../src/components/Footer/Footer";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  // Some dev tools / extensions can inject dynamic inline styles into the
  // <html> element during SSR which cause hydration mismatches in development.
  // Add `suppressHydrationWarning` in dev to avoid noisy errors while keeping
  // the layout neutral. If you still see mismatches, try disabling browser
  // extensions or testing in an incognito window.
  return (
    <html lang="en" data-scroll-behavior="smooth" suppressHydrationWarning={process.env.NODE_ENV === "development"}>
      <body>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
