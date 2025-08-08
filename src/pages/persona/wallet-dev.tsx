import React from "react";
import Layout from "../../components/Layout";
import { useTheme } from "../../contexts/ThemeContext";

// Sidebar for wallet-dev only
const Sidebar = () => (
  <nav className="fixed left-0 top-0 h-full w-64 bg-gradient-to-b from-gray-900 to-black text-white p-4 overflow-y-auto shadow-lg border-r border-green-500">
    <h2 className="text-xl font-bold mb-4 text-green-400 animate-neon-glow">Wallet Dev Docs</h2>
    <ul className="space-y-2 text-sm">
      <li><a href="#intro" className="block hover:text-green-300">Introduction</a></li>
      <li><a href="#what-you-can-build" className="block hover:text-green-300">What You Can Build</a></li>
      <li><a href="#distribution-channels" className="block hover:text-green-300">Distribution Channels</a></li>
      <li><a href="#one-click-api" className="block hover:text-green-300">1Click API</a></li>
      <li><a href="#tutorial-swap" className="block hover:text-green-300">Tutorial: Swap Flow</a></li>
      <li><a href="#explorer-api" className="block hover:text-green-300">Intents Explorer API</a></li>
      <li><a href="#onboarding-deposits" className="block hover:text-green-300">Onboarding & Deposits</a></li>
      <li><a href="#tutorial-onboarding" className="block hover:text-green-300">Tutorial: Onboarding</a></li>
      <li><a href="#advanced-flows" className="block hover:text-green-300">Advanced Custom Flows</a></li>
      <li><a href="#best-practices" className="block hover:text-green-300">Best Practices</a></li>
      <li><a href="#troubleshooting" className="block hover:text-green-300">Troubleshooting</a></li>
      <li><a href="#resources" className="block hover:text-green-300">Resources</a></li>
      <li><a href="#status" className="block hover:text-green-300">System Status</a></li>
    </ul>
  </nav>
);

export default function WalletDevDocs() {
  const { isDark } = useTheme();

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  const goToNearIntents = () => {
    window.location.href = "https://near-intents.org";
  };

  return (
    <Layout>
      <div className="flex min-h-screen">
        
        <Sidebar />
        <main className={`ml-64 flex-1 py-10 px-8 ${isDark ? "bg-black text-white" : "bg-white text-black"} bg-gradient-to-br from-gray-900 to-gray-800`}>
          {/* Title + CTA */}
          <header className="mb-10">
            <h1 className="text-5xl font-extrabold text-green-400 mb-3 animate-neon-glow">NEAR Intents for Wallet & dApp Developers</h1>
            <p className="mt-2 text-lg opacity-90 max-w-4xl">
              Add intent-based swaps and onboarding to any wallet or dApp using simple REST APIs and signed payloads—without building solver infrastructure. This guide is chunked for clarity: brief explanations first, then focused steps with copy-paste code.
            </p>
            <div className="flex justify-center mt-6">
              <button
                onClick={goToNearIntents}
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
              NEAR Intents lets users state outcomes (e.g., “swap X for Y across chains”), while solvers compete to fulfill them. Wallets act as Distribution Channels: create requests, show quotes, guide deposits, and display results with a clean user experience.
            </p>
          </section>

          {/* What to build */}
          <section id="what-you-can-build" className="max-w-4xl space-y-4 mb-12">
            <h2 className="text-3xl font-bold text-green-400">What You Can Build</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>Swap flows: show supported tokens, request quotes, guide deposits, track status.</li>
              <li>User onboarding: per-user deposit addresses and recent deposit detection.</li>
              <li>History widgets: read-only 1Click transaction history for receipts, analytics.</li>
              <li>Advanced actions: submit signed intents for transfers/withdrawals with Verifier-compatible payloads.</li>
            </ul>
          </section>

          {/* Distribution Channels */}
          <section id="distribution-channels" className="max-w-4xl space-y-4 mb-12">
            <h2 className="text-3xl font-bold text-green-400">Distribution Channels</h2>
            <p>
              A Distribution Channel is a wallet/dApp UI that creates and broadcasts intents. The fastest way to integrate is the 1Click API, which handles quoting, solver coordination, and execution for you—so you can focus on UX.
            </p>
          </section>

          {/* 1Click API overview */}
          <section id="one-click-api" className="max-w-4xl space-y-6 mb-14">
            <h2 className="text-3xl font-bold text-green-400">1Click API</h2>

            <div>
              <h3 className="text-2xl font-bold text-green-400">Get supported tokens</h3>
              <p className="mb-3">List tokens you can present in your swap UI.</p>
              <CodeBlock
                label="Request"
                text={`GET /v0/tokens HTTP/1.1
Host: 1click.chaindefuser.com
Accept: */*`}
              />
              <CodeBlock
                label="Example response"
                text={`[
  {
    "assetId": "nep141:wrap.near",
    "decimals": 24,
    "blockchain": "near",
    "symbol": "wNEAR",
    "price": "2.79",
    "priceUpdatedAt": "2025-03-28T12:23:00.070Z",
    "contractAddress": "wrap.near"
  }
]`}
              />
            </div>

            <div>
              <h3 className="text-2xl font-bold text-green-400">Request a swap quote</h3>
              <p className="mb-3">
                Use dry: true to preview. Confirm by sending the same shape with dry: false only at user confirmation, to reduce system load.
              </p>
              <CodeBlock
                label="Request"
                text={`POST /v0/quote HTTP/1.1
Host: 1click.chaindefuser.com
Authorization: Bearer JWT
Content-Type: application/json
Accept: */*
Content-Length: 727

{
  "dry": true,
  "swapType": "EXACT_INPUT",
  "slippageTolerance": 100,
  "originAsset": "nep141:arb-0xaf88d065e77c8cc2239327c5edb3a432268e5831.omft.near",
  "depositType": "ORIGIN_CHAIN",
  "destinationAsset": "nep141:sol-5ce3bf3a31af18be40ba30f721101b4341690186.omft.near",
  "amount": "1000",
  "refundTo": "0x2527D02599Ba641c19FEa793cD0F167589a0f10D",
  "refundType": "ORIGIN_CHAIN",
  "recipient": "13QkxhNMrTPxoCkRdYdJ65tFuwXPhL5gLS2Z5Nr6gjRK",
  "virtualChainRecipient": "0xb4c2fbec9d610F9A3a9b843c47b1A8095ceC887C",
  "virtualChainRefundRecipient": "0xb4c2fbec9d610F9A3a9b843c47b1A8095ceC887C",
  "recipientType": "DESTINATION_CHAIN",
  "deadline": "2019-08-24T14:15:22Z",
  "referral": "referral",
  "quoteWaitingTimeMs": 3000,
  "appFees": [
    {
      "recipient": "recipient.near",
      "fee": 100
    }
  ]
}`}
              />
              <CodeBlock
                label="Example response"
                text={`{
  "timestamp": "2019-08-24T14:15:22Z",
  "signature": "text",
  "quoteRequest": {
    "dry": true,
    "swapType": "EXACT_INPUT",
    "slippageTolerance": 100,
    "originAsset": "nep141:arb-0xaf88d065e77c8cc2239327c5edb3a432268e5831.omft.near",
    "depositType": "ORIGIN_CHAIN",
    "destinationAsset": "nep141:sol-5ce3bf3a31af18be40ba30f721101b4341690186.omft.near",
    "amount": "1000",
    "refundTo": "0x2527D02599Ba641c19FEa793cD0F167589a0f10D",
    "refundType": "ORIGIN_CHAIN",
    "recipient": "13QkxhNMrTPxoCkRdYdJ65tFuwXPhL5gLS2Z5Nr6gjRK",
    "virtualChainRecipient": "0xb4c2fbec9d610F9A3a9b843c47b1A8095ceC887C",
    "virtualChainRefundRecipient": "0xb4c2fbec9d610F9A3a9b843c47b1A8095ceC887C",
    "recipientType": "DESTINATION_CHAIN",
    "deadline": "2019-08-24T14:15:22Z",
    "referral": "referral",
    "quoteWaitingTimeMs": 3000,
    "appFees": [
      {
        "recipient": "recipient.near",
        "fee": 100
      }
    ]
  },
  "quote": {
    "depositAddress": "0x76b4c56085ED136a8744D52bE956396624a730E8",
    "amountIn": "1000000",
    "amountInFormatted": "1",
    "amountInUsd": "1",
    "minAmountIn": "995000",
    "amountOut": "9950000",
    "amountOutFormatted": "9.95",
    "amountOutUsd": "9.95",
    "minAmountOut": "9900000",
    "deadline": "2025-03-04T15:00:00Z",
    "timeWhenInactive": "2025-03-04T15:00:00Z",
    "timeEstimate": 120,
    "virtualChainRecipient": "0xb4c2fbec9d610F9A3a9b843c47b1A8095ceC887C",
    "virtualChainRefundRecipient": "0xb4c2fbec9d610F9A3a9b843c47b1A8095ceC887C"
  }
}`}
              />
            </div>

            <div>
              <h3 className="text-2xl font-bold text-green-400">Submit deposit TX</h3>
              <p className="mb-3">Optional speed-up: let the backend verify earlier by notifying your tx hash.</p>
              <CodeBlock
                label="Request"
                text={`POST /v0/deposit/submit HTTP/1.1
Host: 1click.chaindefuser.com
Authorization: Bearer JWT
Content-Type: application/json
Accept: */*
Content-Length: 92

{
  "txHash": "0x123abc456def789",
  "depositAddress": "0x2527D02599Ba641c19FEa793cD0F167589a0f10D"
}`}
              />
            </div>

            <div>
              <h3 className="text-2xl font-bold text-green-400">Check status</h3>
              <p className="mb-3">Poll status until success/refund; show progress in UI.</p>
              <CodeBlock
                label="Request"
                text={`GET /v0/status HTTP/1.1
Host: 1click.chaindefuser.com
Authorization: Bearer JWT
Accept: */*`}
              />
            </div>
          </section>

          {/* Tutorial: Swap */}
          <section id="tutorial-swap" className="max-w-4xl space-y-4 mb-14">
            <h2 className="text-3xl font-bold text-green-400">Tutorial: Build a Swap Flow</h2>
            <p className="opacity-90">
              A minimal flow: fetch tokens → request quote (dry) → confirm quote (dry=false) → guide deposit → (optional) submit tx hash → poll status.
            </p>
            <ol className="list-decimal pl-6 space-y-3">
              <li>Fetch supported tokens (populate selectors).</li>
              <li>Request a quote with user inputs (dry: true).</li>
              <li>Display quote details and ask for confirmation.</li>
              <li>On confirm, request quote with dry: false and guide the deposit.</li>
              <li>Optionally POST /v0/deposit/submit with txHash to speed up.</li>
              <li>Poll /v0/status and show final outcome/receipt.</li>
            </ol>
          </section>

          {/* Explorer API */}
          <section id="explorer-api" className="max-w-4xl space-y-6 mb-14">
            <h2 className="text-3xl font-bold text-green-400">Intents Explorer API (Read-only)</h2>
            <p>Fetch 1Click history for receipts, analytics, and dashboards. JWT required.</p>
            <CodeBlock
              label="Get transactions"
              text={`GET /api/v0/transactions HTTP/1.1
Host: 
Authorization: Bearer JWT
Accept: */*`}
            />
            <CodeBlock
              label="Example response"
              text={`[
  {
    "originAsset": "nep141:eth-0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48.omft.near",
    "destinationAsset": "nep141:17208628f84f5d6ad33f0da3bbbeb27ffcb398eac501a31bd6ad2011e36133a1",
    "depositAddress": "c6d7058a1ce152605ce97afcc3aeccb03bb3de9d43649bca815023f5931558c1",
    "recipient": "somebody.near",
    "status": "SUCCESS",
    "createdAt": "2025-12-31T12:00:00.000Z",
    "createdAtTimestamp": 1767182400,
    "intentHashes": "GnGk38hvi92tTWDYMMS8CWYnVT4fixmfBrnqSErCDMTu",
    "referral": "some-referral",
    "amountInFormatted": "22.130108",
    "amountOutFormatted": "22.113697",
    "appFees": [
      { "fee": 50, "recipient": "some.near" },
      { "fee": 5,  "recipient": "somebody.near" }
    ],
    "nearTxHashes": [
      "6XqqDwoaopgg39QsEiFGs9HfwP2Vum9tCCyqHDYXWBBH",
      "EVcgKukwf38XsYcgvkEgiMPWR7qwLfLK5rsVtjgctPBn"
    ],
    "originChainTxHashes": [
      "0x9bcff372aee89b648c922b850573b22387c31d693079f5e37cd255814e2d615a"
    ],
    "destinationChainTxHashes": [
      "0x9bcff372aee89b648c922b850573b22387c31d693079f5e37cd255814e2d615a"
    ],
    "amountIn": "22130108",
    "amountInUsd": "22.1272",
    "amountOut": "22113697",
    "amountOutUsd": "22.1108",
    "refundTo": "somebody.near"
  }
]`}
            />
          </section>

          {/* Onboarding (Passive Deposit) */}
          <section id="onboarding-deposits" className="max-w-4xl space-y-6 mb-14">
            <h2 className="text-3xl font-bold text-green-400">Onboarding & Deposits (Passive Service)</h2>
            <p>Move user funds into NEAR Intents via a simple JSON-RPC API: list supported assets, fetch deposit address, and check recent deposits.</p>
            <CodeBlock
              label="Get supported assets"
              text={`{
  "id": 1,
  "jsonrpc": "2.0",
  "method": "supported_tokens",
  "params": [
    {
      "chains": ["CHAIN_TYPE:CHAIN_ID"]
    }
  ]
}`}
            />
            <CodeBlock
              label="Get deposit address"
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
              label="Get recent deposits"
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
            <p className="text-sm opacity-80">Note: NEAR must be wrapped (wNEAR on wrap.near) before depositing into the Verifier.</p>
          </section>

          {/* Tutorial: Onboarding */}
          <section id="tutorial-onboarding" className="max-w-4xl space-y-4 mb-14">
            <h2 className="text-3xl font-bold text-green-400">Tutorial: Build Onboarding with Deposits</h2>
            <ol className="list-decimal pl-6 space-y-3">
              <li>Call supported_tokens to filter chains/tokens your wallet supports.</li>
              <li>Get a deposit_address for the user’s chosen chain.</li>
              <li>Show that address/QR and track with recent_deposits for UX feedback.</li>
              <li>Once funds are visible, the user can start swaps via 1Click.</li>
            </ol>
          </section>

          {/* Advanced Flows */}
          <section id="advanced-flows" className="max-w-4xl space-y-6 mb-14">
            <h2 className="text-3xl font-bold text-green-400">Advanced Custom Flows (Verifier-Compatible)</h2>
            <p>For power users, wallets can expose direct actions by submitting signed intents compatible with the Verifier.</p>
            <CodeBlock
              label="Deposit with ft_transfer_call (assign ownership via msg)"
              text={`{
  "receiver_id": "alice.near",
  "amount": "1000",
  "msg": "{\\"receiver_id\\": \\"charlie.near\\", \\"execute_intents\\": [...], \\"refund_if_fails\\": false}"
}`}
            />
            <CodeBlock
              label="Execute intents (Transfer, NEP-413)"
              text={`[
  {
    "standard": "nep413",
    "payload": {
      "message": "{\\"signer_id\\":\\"alice.near\\",\\"deadline\\":\\"2025-05-21T10:34:04.254392Z\\",\\"intents\\":[{\\"intent\\":\\"transfer\\",\\"receiver_id\\":\\"bob.near\\",\\"tokens\\":{\\"nep141:usdc.near\\":\\"10\\"}}]}",
      "nonce": "Op47m39Q/NzWWi8jYe4umk96OTSnY4Ao0FB/B9aPB98=",
      "recipient": "intents.near"
    },
    "public_key": "ed25519:Gxa24TGbJu4mqdhW3GbvLXmf4bSEyxVicrtpChDWbgga",
    "signature": "ed25519:52oc2FD4rMsAPNSBSx6eNYrF4atreXTZxWFhAPfmZFn1eF7jbE3BrRTL3ey1M1sAKSdK8qriZiHQnhnNBCh8vVMJ"
  }
]`}
            />
          </section>

          {/* Best Practices */}
          <section id="best-practices" className="max-w-4xl space-y-4 mb-12">
            <h2 className="text-3xl font-bold text-green-400">Best Practices</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>Use dry: true to preview; confirm with dry: false only on user acceptance.</li>
              <li>Warn users about CEX crediting; suggest a small test transfer first.</li>
              <li>Always show depositAddress and a clear “copied”/“sent” UX.</li>
              <li>Poll /v0/status for live progress and show receipts on success/refund.</li>
              <li>Expose user-controlled slippageTolerance and a visible deadline.</li>
            </ul>
          </section>

          {/* Troubleshooting */}
          <section id="troubleshooting" className="max-w-4xl space-y-4 mb-12">
            <h2 className="text-3xl font-bold text-green-400">Troubleshooting</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>401 Unauthorized: request a JWT and send Authorization: Bearer JWT.</li>
              <li>Slow updates: POST /v0/deposit/submit with txHash to speed verification.</li>
              <li>No CEX credit: some exchanges require whitelisting; use test amounts first.</li>
            </ul>
          </section>

          {/* Resources */}
          <section id="resources" className="max-w-4xl space-y-4 mb-12">
            <h2 className="text-3xl font-bold text-green-400">Resources</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>1Click OpenAPI: 1click.chaindefuser.com/docs/v0/openapi.yaml</li>
              <li>SDKs: TypeScript, Go, Rust (see official repos).</li>
              <li>Verifier contract: intents.near</li>
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
 * Keeps examples unchanged; safer to copy/paste.
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
      <pre className="overflow-auto text-sm whitespace-pre-wrap">
        {text}
      </pre>
    </div>
  );
}
