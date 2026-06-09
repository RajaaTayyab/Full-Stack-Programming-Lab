import { AuthProvider } from '../context/AuthContext';
import { Toaster } from 'react-hot-toast';
import Head from 'next/head';
import '../styles/globals.css';

export default function App({ Component, pageProps }) {
  return (
    <AuthProvider>
      {/* Global Browser Window Framework Tab Configurations */}
      <Head>
        <title>Sage CRM by Tayyab Janjua</title>
        <meta name="description" content="Premium relationship management system" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            background: 'var(--bg)',
            color: 'var(--text)',
            border: '1px solid var(--border)',
            borderRadius: 'var(--radius)',
            fontSize: '14px',
            boxShadow: 'var(--shadow-md)',
            fontFamily: 'inherit',
          },
          success: { 
            iconTheme: { 
              primary: '#3f6655', 
              secondary: 'var(--bg)' 
            } 
          },
          error: { 
            iconTheme: { 
              primary: '#b84a39', 
              secondary: 'var(--bg)' 
            } 
          },
        }}
      />
      <Component {...pageProps} />
    </AuthProvider>
  );
}