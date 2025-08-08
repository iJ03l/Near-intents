import { useTheme } from '../contexts/ThemeContext';

interface Persona {
  key: string;
  icon: string;
  title: string;
  description: string;
  href: string;
}

const personas: Persona[] = [
  { 
    key: "wallet-dev", 
    icon: "💼", 
    title: "Wallet / dApp Dev", 
    description: "Integrate swap and onboarding features", 
    href: "/persona/wallet-dev"
  },
  { 
    key: "market-maker", 
    icon: "🏦", 
    title: "Market Maker", 
    description: "Provide liquidity & support swaps", 
    href: "/persona/market-maker"
  },
  { 
    key: "contract-integrator", 
    icon: "🔗", 
    title: "Contract Integrator", 
    description: "Low-level calls and custom flows", 
    href: "/persona/contract-integrator"
  },
  { 
    key: "ai-agent", 
    icon: "🤖", 
    title: "AI Agent Builder", 
    description: "Compose and execute intents programmatically", 
    href: "/persona/ai-agent"
  },
  { 
    key: "auditor", 
    icon: "🕶️", 
    title: "Auditor", 
    description: "Security, event tracking, and protocol spec", 
    href: "/persona/auditor"
  }
];

export default function PersonaCard() {
  const { isDark } = useTheme();

  return (
    <section style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
      gap: 'clamp(16px, 3vw, 24px)',
      padding: '40px 0',
      width: '100%'
    }}>
      {personas.map((p) => (
        <a 
          href={p.href} 
          key={p.key} 
          style={{
            backgroundColor: isDark ? '#111111' : '#f9fafb',
            border: `1px solid ${isDark ? '#374151' : '#e5e7eb'}`,
            padding: 'clamp(24px, 4vw, 32px)',
            borderRadius: '16px',
            textDecoration: 'none',
            color: 'inherit',
            transition: 'all 0.3s ease',
            display: 'block',
            height: '100%'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = '#22c55e';
            e.currentTarget.style.transform = 'translateY(-4px)';
            e.currentTarget.style.boxShadow = '0 10px 30px rgba(34, 197, 94, 0.1)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = isDark ? '#374151' : '#e5e7eb';
            e.currentTarget.style.transform = 'translateY(0px)';
            e.currentTarget.style.boxShadow = 'none';
          }}
        >
          <div style={{ textAlign: 'center' }}>
            <div style={{
              width: 'clamp(56px, 8vw, 64px)',
              height: 'clamp(56px, 8vw, 64px)',
              backgroundColor: '#22c55e',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 'clamp(24px, 4vw, 28px)',
              margin: '0 auto 20px',
              transition: 'transform 0.3s ease'
            }}>
              {p.icon}
            </div>
            <h3 style={{ 
              fontSize: 'clamp(18px, 2.5vw, 20px)',
              fontWeight: 'bold', 
              marginBottom: '12px',
              color: isDark ? '#ffffff' : '#000000'
            }}>
              {p.title}
            </h3>
            <p style={{ 
              fontSize: 'clamp(13px, 1.8vw, 14px)', 
              color: isDark ? '#e5e7eb' : '#374151',
              lineHeight: '1.5',
              marginBottom: '16px'
            }}>
              {p.description}
            </p>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#22c55e',
              fontSize: '14px',
              fontWeight: '600'
            }}>
              <span>Learn more</span>
              <span style={{ marginLeft: '8px' }}>→</span>
            </div>
          </div>
        </a>
      ))}
    </section>
  );
}
