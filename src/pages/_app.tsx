import '../styles/globals.css';
import { ThemeProvider } from '../contexts/ThemeContext';
import GlobalHeader from '../components/GlobalHeader';

export default function App({ Component, pageProps }:any) {
  return (
    <ThemeProvider>
      <GlobalHeader />
      <div style={{ paddingTop:'60px' }}>
        <Component {...pageProps} />
      </div>
    </ThemeProvider>
  );
}
