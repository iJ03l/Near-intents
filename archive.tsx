import { useState, useEffect } from "react";
import Image from "next/image";
import Layout from "../components/Layout";
import PersonaCard from "../components/PersonaCard";
import { useTheme } from "../contexts/ThemeContext";

const tutorialSteps = [
  {
    id: 1,
    title: "Creating Passkeys or Connecting Wallet",
    description:
      "Securely authenticate to NEAR Intents by creating a WebAuthn passkey or connecting your existing NEAR-compatible wallet (e.g., NEAR Wallet, MetaMask). This unlocks all features without sharing your private keys.",
    image: "/tutorial-passkeys.png",
  },
  {
    id: 2,
    title: "Depositing Funds",
    description:
      "From the dashboard, select “Deposit”, choose your token (e.g., wNEAR, USDC), and confirm the on-chain transaction. Your funds will be escrowed in the Verifier contract, ready for swaps, gifts, or other intents.",
    image: "/tutorial-deposit.png",
  },
  {
    id: 3,
    title: "Token Swapping",
    description:
      "Click “Swap”, enter the amount you want to exchange and the desired output token. Submit your intent—solvers will compete to fulfill it at the best rate, then the atomic swap completes without front-running risks.",
    image: "/tutorial-swap.png",
  },
  {
    id: 4,
    title: "Withdrawing Assets",
    description:
      "When you want your tokens back, select “Withdraw”, choose the token and amount, and confirm. The Verifier contract releases your assets back to your wallet.",
    image: "/tutorial-withdraw.png",
  },
  {
    id: 5,
    title: "Gifting Tokens",
    description:
      "Click “Gift”, specify the token and amount, then generate a shareable link or QR code. Recipients can claim the gift without needing a wallet installation—funds are transferred on first click.",
    image: "/tutorial-gift.png",
  },
  {
    id: 6,
    title: "Account Session Dashboard",
    description:
      "Your dashboard shows all available actions—Deposit, Swap, Withdraw, Gift—and lists your current balances for each token. Manage active sessions, view transaction history, and see pending or completed intents at a glance.",
    image: "/tutorial-session.png",
  },
];


export default function Home() {
  const { isDark } = useTheme();
  const [mode, setMode] = useState<"greet" | "tut" | "den">("greet");
  const [step, setStep] = useState(0);
  const [greet, setGreet] = useState("Hello");

  // Time-based greeting
  useEffect(() => {
    const h = new Date().getHours();
    setGreet(h < 12 ? "Good morning" : h < 17 ? "Good afternoon" : "Good evening");
  }, []);

  const next = () => (step < tutorialSteps.length - 1 ? setStep((s) => s + 1) : setMode("den"));
  const prev = () => step > 0 && setStep((s) => s - 1);


  // GREETING SCREEN
  if (mode === "greet")
    return (
      <Layout fullscreen>
        <div
          style={{
            height: "100%",
            width: "100%",
            backgroundColor: isDark ? "#000" : "#fff",
            color: isDark ? "#e5e7eb" : "#1f2937",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            textAlign: "left",
            padding: "0 20px",
            fontFamily: "'Public Sans', sans-serif",
            overflowY: "auto",
          }}
        >
          <div style={{ maxWidth: 800, margin: "40px auto" }}>
            <p style={{ fontSize: 24, fontWeight: 400, color: isDark ? "#9ca3af" : "#6b7280" }}>
              {greet}
            </p>
            <h1 style={{ fontSize: 64, fontWeight: 900, margin: "8px 0 24px" }}>
              What Is <span style={{ color: "#22c55e" }}>NEAR Intents</span>?
            </h1>

            <p style={{ marginBottom: 24, lineHeight: 1.6 }}>
              Imagine you and your friends want to trade items fairly. Each of you promises,
              “I will give you my old bike if you give me your skateboard.” But who goes first?
              What if someone doesn’t keep their promise?
            </p>

            <h2 style={{ fontSize: 32, fontWeight: 700, margin: "24px 0 8px", color: "#22c55e" }}>
              NEAR Intents solves this problem for money and tokens on the blockchain:
            </h2>

            <h3 style={{ fontSize: 24, fontWeight: 600, margin: "16px 0 4px" }}>
              1. Declare Your Intent
            </h3>
            <p style={{ marginBottom: 16, lineHeight: 1.6 }}>
              You and your counterparty each sign a small “I promise” message on NEAR. For example:
            </p>
            <ul style={{ marginLeft: 20, marginBottom: 24, lineHeight: 1.6 }}>
              <li><code style={{ fontFamily: "monospace" }}>Alice says, “I’m offering 10 USDT if I receive 10 USDC.”</code></li>
              <li><code style={{ fontFamily: "monospace" }}>Bob says, “I’m offering 10 USDC if I receive 10 USDT.”</code></li>
            </ul>

            <h3 style={{ fontSize: 24, fontWeight: 600, margin: "16px 0 4px" }}>
              2. Atomic Execution
            </h3>
            <p style={{ marginBottom: 24, lineHeight: 1.6 }}>
              NEAR Intents holds both promises in a secure smart contract (called the Verifier). Once both intents exist and match, the contract swaps the tokens for both of you at the exact same moment—no one can back out or lose funds.
            </p>

            <h3 style={{ fontSize: 24, fontWeight: 600, margin: "16px 0 4px" }}>
              3. Withdraw Anytime
            </h3>
            <p style={{ marginBottom: 32, lineHeight: 1.6 }}>
              After a swap, you can withdraw your new tokens back into your wallet whenever you like.
            </p>

            <h2 style={{ fontSize: 32, fontWeight: 700, margin: "32px 0 16px", color: "#22c55e" }}>
              Two Main Actions on the Welcome Page
            </h2>

            <h3 style={{ fontSize: 24, fontWeight: 600, margin: "16px 0 4px" }}>
              🚀 Get Started
            </h3>
            <p style={{ marginBottom: 24, lineHeight: 1.6 }}>
              <strong>What it does:</strong> Takes you through a friendly, step-by-step tutorial showing how to connect your wallet, deposit tokens, swap, withdraw, or send gifts.<br />
              <strong>Who it’s for:</strong> Complete newcomers who want to learn by doing.
            </p>

            <h3 style={{ fontSize: 24, fontWeight: 600, margin: "16px 0 4px" }}>
              ⚡ Skip to the Den
            </h3>
            <p style={{ marginBottom: 40, lineHeight: 1.6 }}>
              <strong>What it does:</strong> Jumps straight to the developer hub (“the Den”) where you can explore detailed code examples, contract documentation, and advanced guides.<br />
              <strong>Who it’s for:</strong> Wallet builders, market makers, AI-agent developers, and auditors who already know the basics and want to dive into the technical details.
            </p>

            {/* Buttons */}
            <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}>
              <button
                onClick={() => setMode("tut")}
                style={{
                  padding: "16px 32px",
                  backgroundColor: "#22c55e",
                  color: "#000",
                  fontWeight: 700,
                  border: "none",
                  borderRadius: 8,
                  fontSize: 16,
                  cursor: "pointer",
                }}
              >
                🚀 Get Started
              </button>
              <button
                onClick={() => setMode("den")}
                style={{
                  padding: "16px 32px",
                  backgroundColor: "transparent",
                  color: isDark ? "#fff" : "#000",
                  border: `2px solid ${isDark ? "#374151" : "#e5e7eb"}`,
                  borderRadius: 8,
                  fontWeight: 700,
                  fontSize: 16,
                  cursor: "pointer",
                }}
              >
                ⚡ Skip to the Den →
              </button>
            </div>
          </div>

          {/* Animations */}
          <style jsx>{`
            @keyframes fadeIn { from { opacity:0 } to { opacity:1 } }
            @keyframes slideInDown { from { transform: translateY(-40px); opacity:0 } to { transform: translateY(0); opacity:1 } }
            @keyframes slideInUp { from { transform: translateY(40px); opacity:0 } to { transform: translateY(0); opacity:1 } }
            @keyframes neonFlicker {
              0%,19%,21%,50%,54%,100% { text-shadow: 0 0 4px #22c55e, 0 0 8px #22c55e; }
              20%,24%,55% { text-shadow: none; }
            }
            @keyframes bounce {
              0%,20%,50%,80%,100% { transform: translateY(0); }
              40% { transform: translateY(-8px); }
              60% { transform: translateY(-4px); }
            }
          `}</style>
        </div>
      </Layout>
    );

  // TUTORIAL SCREEN
  if (mode === "tut") {
    const s = tutorialSteps[step];
    return (
      <Layout fullscreen>
        <div
          style={{
            height: "100%",
            overflowX: "hidden",
            textAlign: "center",
            padding: "80px 20px 40px",
            fontFamily: "'Public Sans', sans-serif",
          }}
        >
          <h1 style={{ fontSize: 48, fontWeight: 700, color: "#22c55e" }}>How to use NEAR Intents</h1>
          <p style={{ fontSize: 20, color: isDark ? "#e5e7eb" : "#374151" }}>Your complete guide to getting started</p>
          <div style={{ maxWidth: 800, margin: "40px auto" }}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                fontSize: 14,
                color: isDark ? "#9ca3af" : "#6b7280",
                marginBottom: 8,
              }}
            >
              <span>Step {step + 1} of {tutorialSteps.length}</span>
              <span>{Math.round(((step + 1) / tutorialSteps.length) * 100)}% Complete</span>
            </div>
            <div
              style={{
                height: 8,
                backgroundColor: isDark ? "#374151" : "#e5e7eb",
                borderRadius: 4,
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  width: `${((step + 1) / tutorialSteps.length) * 100}%`,
                  height: "100%",
                  backgroundColor: "#22c55e",
                  transition: "width 0.5s",
                }}
              />
            </div>
          </div>
          <div style={{ maxWidth: 1000, margin: "0 auto", overflowX: "hidden", padding: "0 10px" }}>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(280px,1fr))",
                gap: 24,
                alignItems: "center",
                marginBottom: 40,
              }}
            >
              <div>
                <h2 style={{ fontSize: 32, fontWeight: 700, color: isDark ? "#fff" : "#000", marginBottom: 16 }}>
                  {s.title}
                </h2>
                <p style={{ fontSize: 18, color: isDark ? "#e5e7eb" : "#374151", lineHeight: 1.6, marginBottom: 32 }}>
                  {s.description}
                </p>
                <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
                  {step > 0 && (
                    <button
                      onClick={prev}
                      style={{
                        padding: "12px 24px",
                        backgroundColor: isDark ? "#374151" : "#e5e7eb",
                        color: isDark ? "#fff" : "#000",
                        border: "none",
                        borderRadius: 8,
                        fontWeight: 600,
                        cursor: "pointer",
                      }}
                    >
                      ← Previous
                    </button>
                  )}
                  <button
                    onClick={next}
                    style={{
                      padding: "12px 24px",
                      backgroundColor: "#22c55e",
                      color: "#000",
                      border: "none",
                      borderRadius: 8,
                      fontWeight: 600,
                      cursor: "pointer",
                    }}
                  >
                    {step < tutorialSteps.length - 1 ? "Next →" : "Finish & Enter Den →"}
                  </button>
                </div>
              </div>
              <div style={{ position: "relative", width: "100%", height: "clamp(200px,30vw,300px)" }}>
                <Image src={s.image} alt={s.title} fill style={{ objectFit: "cover", borderRadius: 8 }} />
              </div>
            </div>
            <div style={{ display: "flex", justifyContent: "center", gap: 8, marginBottom: 40 }}>
              {tutorialSteps.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setStep(i)}
                  style={{
                    width: 12,
                    height: 12,
                    borderRadius: "50%",
                    border: "none",
                    backgroundColor:
                      i === step
                        ? "#22c55e"
                        : i < step
                        ? "#16a34a"
                        : isDark
                        ? "#374151"
                        : "#e5e7eb",
                    cursor: "pointer",
                  }}
                />
              ))}
            </div>
          </div>
          <button
            onClick={() => setMode("den")}
            style={{
              background: "none",
              border: "none",
              color: isDark ? "#9ca3af" : "#6b7280",
              textDecoration: "underline",
              marginTop: 16,
              cursor: "pointer",
            }}
          >
            Skip tutorial and go to documentation →
          </button>
        </div>
      </Layout>
    );
  }

  // DEVELOPER DEN SCREEN
  return (
    <Layout fullscreen>
      <div
        style={{
          height: "100%",
          overflowX: "hidden",
          textAlign: "center",
          padding: "80px 20px 40px",
          fontFamily: "'Public Sans', sans-serif",
        }}
      >
        <h1 style={{ fontSize: 56, fontWeight: 700, marginBottom: 24, color: isDark ? "#fff" : "#000" }}>
          Welcome to the <strong style={{ color: "#22c55e" }}>Den</strong>
        </h1>
        <p style={{ fontSize: 20, color: isDark ? "#e5e7eb" : "#374151", maxWidth: 700, margin: "0 auto 40px", lineHeight: 1.6 }}>
          Choose your path through the NEAR Intents ecosystem. Each role has tailored documentation, code examples, and integration guides.
        </p>
        <PersonaCard />
        <p style={{ color: isDark ? "#9ca3af" : "#6b7280", fontStyle: "italic", marginTop: 60 }}>
          "Every great journey starts with an intent."
        </p>
      </div>
    </Layout>
  );
}
