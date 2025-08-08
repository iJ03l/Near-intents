import React from "react";
import Layout from "../../components/Layout";
import { useTheme } from "../../contexts/ThemeContext";

// Futuristic left sidebar focused on Market Maker persona
const Sidebar = () => (
  <nav className="fixed left-0 top-0 h-full w-64 bg-gradient-to-b from-gray-900 to-black text-white p-4 overflow-y-auto shadow-lg border-r border-green-500">
    <h2 className="text-xl font-bold mb-4 text-green-400 animate-neon-glow">Market Maker</h2>
    <ul className="space-y-2 text-sm">
      <li><a href="#intro" className="block hover:text-green-300">Introduction</a></li>
      <li><a href="#what-you-do" className="block hover:text-green-300">What You Do</a></li>
      <li><a href="#passive-service" className="block hover:text-green-300">Passive Deposit/Withdrawal</a></li>
      <li><a href="#tutorial-liquidity" className="block hover:text-green-300">Tutorial: Provide Liquidity</a></li>
      <li><a href="#quoting-overview" className="block hover:text-green-300">Quoting Overview</a></li>
      <li><a href="#verifier" className="block hover:text-green-300">Verifier (Deployment)</a></li>
      <li><a href="#best-practices" className="block hover:text-green-300">Best Practices</a></li>
      <li><a href="#troubleshooting" className="block hover:text-green-300">Troubleshooting</a></li>
      <li><a href="#resources" className="block hover:text-green-300">Resources</a></li>
      <li><a href="#status" className="block hover:text-green-300">System Status</a></li>
    </ul>
  </nav>
);

export default function MarketMakerDocs() {
  const { isDark } = useTheme();
  const copyToClipboard = (text: string) => navigator.clipboard.writeText(text);
  const gotoNearIntents = () => (window.location.href = "https://near-intents.org");

  return (
    <Layout>
      <div className="flex min-h-screen">
        <Sidebar />
        <main className={`ml-64 flex-1 py-10 px-8 ${isDark ? "bg-black text-white" : "bg-white text-black"} bg-gradient-to-br from-gray-900 to-gray-800`}>
          {/* Title + CTA */}
          <header className="mb-10">
            <h1 className="text-5xl font-extrabold text-green-400 mb-3 animate-neon-glow">
              NEAR Intents for Market Makers
            </h1>
            <p className="mt-2 text-lg opacity-90 max-w-4xl">
              Provide liquidity and support swaps in the NEAR Intents ecosystem. This guide focuses on the essential flows:
              depositing and withdrawing via the Passive Deposit/Withdrawal Service, understanding the quoting flow context,
              and referencing the Verifier deployment. All protocol code examples are unchanged and safe to copy/paste.
            </p>
            <div className="flex justify-center mt-6">
              <button
                onClick={gotoNearIntents}
                className="px-6 py-3 text-lg font-bold text-black bg-green-500 rounded-full hover:bg-green-600 transition-transform hover:scale-105 shadow-lg hover:shadow-green-500/50"
              >
                NEAR-INTENTS.ORG →
              </button>
            </div>
          </header>

          {/* Introduction */}
          <section id="intro" className="max-w-4xl space-y-4 mb-12">
            <h2 className="text-3xl font-bold text-green-400">Introduction</h2>
            <p>
              Market Makers deposit liquidity and compete to fulfill user intents (e.g., swaps). To start, set up funding rails
              with the Passive Deposit/Withdrawal Service, then connect into quoting infrastructure when enabled.
            </p>
            <p>
              This page covers: how to move funds in/out of NEAR Intents treasuries, what “quoting” entails at a high level,
              and where the Verifier contract lives on NEAR.
            </p>
          </section>

          {/* What you do */}
          <section id="what-you-do" className="max-w-4xl space-y-4 mb-12">
            <h2 className="text-3xl font-bold text-green-400">What You Do</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>Deposit liquidity to supported networks and make it available for intents.</li>
              <li>Quote and fulfill swaps competitively (when connected to solver/matching infra).</li>
              <li>Withdraw funds as needed back to origin networks.</li>
            </ul>
          </section>

          {/* Passive Deposit/Withdrawal Service */}
          <section id="passive-service" className="max-w-4xl space-y-6 mb-14">
            <h2 className="text-3xl font-bold text-green-400">Passive Deposit/Withdrawal Service</h2>
            <p>
              Move assets between supported networks and NEAR Intents. These JSON-RPC methods help you discover supported tokens,
              obtain deposit addresses, track deposits, and check withdrawal status and fee estimates.
            </p>

            <CodeBlock
              label="Get supported assets (supported_tokens)"
              text={`{
  "id": 1,
  "jsonrpc": "2.0",
  "method": "supported_tokens",
  "params": [
    {
      "chains": ["CHAIN_TYPE:CHAIN_ID"] // optional
    }
  ]
}`}
            />

            <CodeBlock
              label="Example response (supported_tokens)"
              text={`{
  "jsonrpc": "2.0",
  "id": 1,
  "result": {
   "tokens": [
     {
       "defuse_asset_identifier" : "eth:8453:0x123",
       "near_token_id": "...",
       "decimals" : 18,
       "asset_name" : "PEPE",
       "min_deposit_amount": "100000",
       "min_withdrawal_amount": "10000",
       "withdrawal_fee": "1000"
     }
   ]
  }
}`}
            />

            <CodeBlock
              label="Get deposit address (deposit_address)"
              text={`{
  "jsonrpc": "2.0", 
  "id": 1, 
  "method": "deposit_address", 
  "params": [ 
    {
      "account_id": "user.near",
      "chain": "CHAIN_TYPE:CHAIN_ID"
    }
  ]
}`}
            />

            <CodeBlock
              label="Get recent deposits (recent_deposits)"
              text={`{
  "jsonrpc": "2.0", 
  "id": 1, 
  "method": "recent_deposits", 
  "params": [ 
    {
      "account_id": "user.near",
      "chain": "CHAIN_TYPE:CHAIN_ID"
    }
  ]
}`}
            />

            <CodeBlock
              label="Get withdrawal status (withdrawal_status)"
              text={`{
  "jsonrpc": "2.0", 
  "id": 1, 
  "method": "withdrawal_status", 
  "params": [ 
    { "withdrawal_hash": "some_hash" }
  ]
}`}
            />

            <CodeBlock
              label="Notify deposit transaction (notify_deposit)"
              text={`{
  "jsonrpc": "2.0", 
  "id": 1, 
  "method": "notify_deposit", 
  "params": [ 
    {
      "deposit_address": "address",
      "tx_hash": "hash"
    }
  ]
}`}
            />

            <CodeBlock
              label="Estimate withdrawal fees (withdrawal_estimate)"
              text={`{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "withdrawal_estimate",
  "params": [
    {
      "chain": "eth:1",
      "token": "eth.omft.near",
      "address": "0x456def..."
    }
  ]
}`}
            />
          </section>

          {/* Tutorial: Provide Liquidity */}
          <section id="tutorial-liquidity" className="max-w-4xl space-y-4 mb-14">
            <h2 className="text-3xl font-bold text-green-400">Tutorial: Provide Liquidity</h2>
            <p className="opacity-90">
              A minimal provisioning loop: discover assets → obtain deposit address → send funds → (optional) notify deposit →
              confirm with recent_deposits → later, check withdrawal_status and use withdrawal_estimate when exiting.
            </p>
            <ol className="list-decimal pl-6 space-y-3">
              <li>Call supported_tokens to list networks/tokens you can provision.</li>
              <li>Call deposit_address to get the destination for your account_id on a specific chain.</li>
              <li>Send funds to the provided address (start small for first verification).</li>
              <li>(Optional) Call notify_deposit with tx hash to speed up processing.</li>
              <li>Confirm via recent_deposits; once completed, your liquidity is available.</li>
              <li>When withdrawing, use withdrawal_status to track the flow and withdrawal_estimate for fee previews.</li>
            </ol>
          </section>

          {/* Quoting Overview */}
          <section id="quoting-overview" className="max-w-4xl space-y-4 mb-14">
            <h2 className="text-3xl font-bold text-green-400">Quoting Overview</h2>
            <p>
              Once liquidity is available, quoting is the process of responding to intent requests with competitive prices,
              then fulfilling them. In NEAR Intents, quoting and execution coordination are orchestrated by distribution channels
              and solver/matching infrastructure. When enabled for your integration, you’ll receive requests, compute and sign
              quotes, and finalize swaps atomically through the protocol’s settlement layer.
            </p>
            <p className="text-sm opacity-80">
              Note: This page focuses on funding rails (deposits/withdrawals) and the operational context. Refer to the protocol’s
              solver/matching specifications when quoting endpoints are made available for your setup.
            </p>
          </section>

          {/* Verifier deployment */}
          <section id="verifier" className="max-w-4xl space-y-6 mb-14">
            <h2 className="text-3xl font-bold text-green-400">Verifier (Deployment)</h2>
            <p>
              The Verifier smart contract is the atomic mediator that settles matched intents on NEAR. Knowing where it’s deployed
              helps with transparency and on-chain monitoring.
            </p>
            <div className="relative bg-gray-900 border border-green-600 rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-green-400 font-bold">Deployment</span>
              </div>
              <pre className="overflow-auto text-sm whitespace-pre-wrap">{`The smart contract for NEAR Intents protocol is deployed at intents.near
There is no testnet deployment.`}</pre>
            </div>
          </section>

          {/* Best Practices */}
          <section id="best-practices" className="max-w-4xl space-y-4 mb-12">
            <h2 className="text-3xl font-bold text-green-400">Best Practices</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>Begin with small test deposits on new networks/venues; scale as monitoring stabilizes.</li>
              <li>Track min_deposit_amount and min_withdrawal_amount per token; obey fee guidance from withdrawal_estimate.</li>
              <li>Monitor completion states via recent_deposits and withdrawal_status to reconcile balances.</li>
              <li>Maintain robust observability: log all RPC requests, responses, and on-chain confirmations.</li>
              <li>Document operational procedures for pausing quotes or rebalancing across networks.</li>
            </ul>
          </section>

          {/* Troubleshooting */}
          <section id="troubleshooting" className="max-w-4xl space-y-4 mb-12">
            <h2 className="text-3xl font-bold text-green-400">Troubleshooting</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>Deposit not detected: ensure correct chain/address; use notify_deposit with tx hash and re-check recent_deposits.</li>
              <li>Withdrawal pending: poll withdrawal_status; confirm downstream transfers on destination chain explorer.</li>
              <li>Unexpected fees: call withdrawal_estimate before large exits; re-route through lower-cost networks where possible.</li>
            </ul>
          </section>

          {/* Resources */}
          <section id="resources" className="max-w-4xl space-y-4 mb-12">
            <h2 className="text-3xl font-bold text-green-400">Resources</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>Treasury Addresses: see official treasury listings per network (ETH, BTC, SOL, TON, etc.).</li>
              <li>Verifier: intents.near (mainnet; no testnet deployment).</li>
              <li>Distribution Channels: leverage these for user-facing creation and execution of intents.</li>
            </ul>
          </section>

          {/* Status */}
          <section id="status" className="max-w-4xl space-y-4 mb-6">
            <h2 className="text-3xl font-bold text-green-400">System Status</h2>
            <p>
              Monitor live uptime/issues:{" "}
              <a className="text-green-300 underline" href="https://status.near-intents.org/" target="_blank" rel="noreferrer">
                status.near-intents.org
              </a>
            </p>
          </section>
        </main>
      </div>
    </Layout>
  );
}

/**
 * Reusable code block with Copy button.
 * Leaves protocol examples unchanged for safe copy/paste.
 */
function CodeBlock({ label, text }: { label: string; text: string }) {
  const copy = () => navigator.clipboard.writeText(text);
  return (
    <div className="relative bg-gray-900 border border-green-600 rounded-lg p-4">
      <div className="flex items-center justify-between mb-2">
        <span className="text-green-400 font-bold">{label}</span>
        <button
          onClick={copy}
          className="text-xs bg-green-600 px-2 py-1 rounded hover:bg-green-700 transition"
        >
          Copy
        </button>
      </div>
      <pre className="overflow-auto text-sm whitespace-pre-wrap">{text}</pre>
    </div>
  );
}
