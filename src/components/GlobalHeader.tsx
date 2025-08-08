import { useRouter } from 'next/router';
import { useTheme } from '../contexts/ThemeContext';

export default function GlobalHeader() {
  const router = useRouter();
  const { isDark, toggleTheme } = useTheme();
  const goHome = () => {
    if (router.pathname === '/') window.location.reload();
    else router.push('/');
  };
  return (
    <header style={{
      position: 'fixed', top: 0, left: 0, right: 0, height: '60px',
      background: isDark?'#000':'#fff', display:'flex', alignItems:'center',
      justifyContent:'space-between', padding:'0 20px', borderBottom: isDark?'1px solid #374151':'1px solid #e5e7eb',
      zIndex:1000
    }}>
      <button onClick={goHome} style={{ display:'flex', alignItems:'center', background:'none', border:'none', padding:8 }}>
        <span style={{ fontSize:20, marginRight:8 }}>🕶️</span>
        <span style={{ fontWeight:700, fontSize:18, color:'#22c55e' }}>NEAR Intents</span>
      </button>
      <button onClick={toggleTheme} style={{
        padding:'8px 12px', borderRadius:8, border:`1px solid ${isDark?'#374151':'#e5e7eb'}`,
        background: isDark?'#374151':'#f9fafb', display:'flex', alignItems:'center', gap:8
      }}>
        <span>{isDark?'☀️':'🌙'}</span>
        <span style={{ fontWeight:600, fontSize:14 }}>{isDark?'Light':'Dark'}</span>
      </button>
    </header>
  );
}
