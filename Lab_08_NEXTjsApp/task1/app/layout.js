import './globals.css';
import Header from '../components/Header';
import Footer from '../components/Footer';

export const metadata = {
  title: 'MyApp – Task 1',
  description: 'A multi-page Next.js application',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="flex flex-col min-h-screen bg-slate-50 font-body">
        <Header />

        {/* Page content */}
        <main className="flex-1">
          {children}
        </main>

        {/* Footer appears on every page via layout.js */}
        <Footer />
      </body>
    </html>
  );
}
