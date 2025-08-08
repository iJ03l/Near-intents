import { useTheme } from '../contexts/ThemeContext';

export default function Layout({ children, fullscreen }: { children:any; fullscreen?:boolean }) {
  const { isDark } = useTheme();
  const bg = isDark?'#000':'#fff', color = isDark?'#fff':'#000';
  return (
    <div style={{
      minHeight: fullscreen?'100vh':'calc(100vh-60px)', width:'100vw',
      background:bg, color, paddingTop:'60px'
    }}>
      {fullscreen?children:<main style={{ padding:20, maxWidth:1400, margin:'0 auto' }}>{children}</main>}
    </div>
  );
}
