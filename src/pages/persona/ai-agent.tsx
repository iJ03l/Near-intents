import React from "react";
import Layout from "../../components/Layout";
import { useTheme } from "../../contexts/ThemeContext";

// Futuristic left sidebar focused on AI Agent Builder persona
const Sidebar = () => (
  <nav className="fixed left-0 top-0 h-full w-64 bg-gradient-to-b from-gray-900 to-black text-white p-4 overflow-y-auto shadow-lg border-r border-green-500">
    <h2 className="text-xl font-bold mb-4 text-green-400 animate-neon-glow">AI Agent Builder</h2>
    <ul className="space-y-2 text-sm">
      <li><a href="#intro" className="block hover:text-green-300">Introduction</a></li>
      <li><a href="#what-you-can-build" className="block hover:text-green-300">What You Can Build</a></li>
      <li><a href="#agent-architecture" className="block hover:text-green-300">Agent Architecture</a></li>
      <li><a href="#agent-sources" className="block hover:text-green-300">Data & Triggers</a></li>
      <li><a href="#quote-execute" className="block hover:text-green-300">Quote → Execute Flow</a></li>
      <li><a href="#1click-api" className="block hover:text-green-300">1Click API (Programmatic)</a></li>
      <li><a href="#explorer-api" className="block hover:text-green-300">Explorer API (History)</a></li>
      <li><a href="#advanced-verifier" className="block hover:text-green-300">Advanced: Verifier Payloads</a></li>
      <li><a href="#best-practices" className="block hover:text-green-300">Best Practices</a></li>
      <li><a href="#troubleshooting" className="block hover:text-green-300">Troubleshooting</a></li>
      <li><a href="#resources" className="block hover:text-green-300">Resources</a></li>
      <li><a href="#status" className="block hover:text-green-300">System Status</a></li>
    </ul>
  </nav>
);

export default function AIAgentDocs() {
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
              NEAR Intents for AI Agent Builders
            </h1>
            <p className="mt-2 text-lg opacity-90 max-w-4xl">
              Build autonomous agents that compose, simulate, quote, and execute multichain intents. This guide focuses on
              robust, programmatic integration paths: fetching quotes, orchestrating deposits, monitoring execution, reading history,
              and optionally composing Verifier-compatible payloads. All protocol examples below are unchanged from the official docs.
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

          {/* Intro */}
          <section id="intro" className="max-w-4xl space-y-4 mb-12">
            <h2 className="text-3xl font-bold text-green-400">Introduction</h2>
            <p>
              AI agents can watch markets, user portfolios, or alerts and then prepare, quote, and execute intents automatically.
              A typical loop: gather context → request a quote (dry) → confirm policy → deposit funds → monitor status →
              record results. Start with 1Click API for execution, use Explorer API for analytics/history, and adopt advanced
              Verifier payloads when fine-grained control is needed.
            </p>
          </section>

          {/* What to build */}
          <section id="what-you-can-build" className="max-w-4xl space-y-4 mb-12">
            <h2 className="text-3xl font-bold text-green-400">What You Can Build</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>Autonomous swap agents with risk rules and time windows.</li>
              <li>Cross-chain asset rebalancers for treasuries and portfolios.</li>
              <li>Alert-driven execution (price/volatility/oracle signals).</li>
              <li>Compliance-aware flows with referral tagging and audit logs.</li>
            </ul>
          </section>

          {/* Agent Architecture */}
          <section id="agent-architecture" className="max-w-4xl space-y-4 mb-12">
            <h2 className="text-3xl font-bold text-green-400">Reference Agent Architecture</h2>
            <ol className="list-decimal pl-6 space-y-2">
              <li>Scheduler/Listener: cron, webhooks, or event bus.</li>
              <li>Policy Engine: slippage, limits, asset allowlists, deadlines.</li>
              <li>Quote Service: talks to 1Click API with dry:true.</li>
              <li>Execution Service: confirms, deposits, submits tx hash, polls status.</li>
              <li>Ledger/Analytics: logs to DB, reads Explorer API for verification.</li>
            </ol>
          </section>

          {/* Data & Triggers */}
          <section id="agent-sources" className="max-w-4xl space-y-4 mb-12">
            <h2 className="text-3xl font-bold text-green-400">Data & Triggers</h2>
            <p>
              Common triggers: price targets, moving averages, on-chain events, or treasury policy changes. After trigger,
              agents perform a “quote → check policy → execute” sequence with a strict deadline and slippage tolerance.
            </p>
          </section>

          {/* Quote → Execute Flow */}
          <section id="quote-execute" className="max-w-4xl space-y-6 mb-14">
            <h2 className="text-3xl font-bold text-green-400">Programmatic Quote → Execute</h2>
            <p>Use 1Click API. Start with a dry quote, enforce policy, then confirm and deposit.</p>

            <CodeBlock
              label="Get supported tokens (GET /v0/tokens)"
              text={`GET /v0/tokens HTTP/1.1
Host: 1click.chaindefuser.com
Accept: */*`}
            />

            <CodeBlock
              label="Example tokens response"
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

            <CodeBlock
              label="Request a swap quote (POST /v0/quote)"
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
              label="Quote response (example)"
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

            <CodeBlock
              label="Submit deposit tx (optional speed-up)"
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

            <CodeBlock
              label="Check status"
              text={`GET /v0/status HTTP/1.1
Host: 1click.chaindefuser.com
Authorization: Bearer JWT
Accept: */*`}
            />
          </section>

          {/* Explorer API */}
          <section id="explorer-api" className="max-w-4xl space-y-6 mb-14">
            <h2 className="text-3xl font-bold text-green-400">Explorer API (Read-only History)</h2>
            <p>Use for analytics, receipts, and backtesting agent behavior.</p>

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

          {/* Advanced: Verifier payloads */}
          <section id="advanced-verifier" className="max-w-4xl space-y-6 mb-14">
            <h2 className="text-3xl font-bold text-green-400">Advanced: Verifier-Compatible Payloads</h2>
            <p>
              For agents that need fine control (batched intents, direct transfers/withdrawals), submit signed payloads compatible
              with the Verifier. Keep these examples unchanged.
            </p>

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
              <li>Always quote with dry:true; confirm with dry:false only after policy checks.</li>
              <li>Use explicit deadlines and slippageTolerance matching strategy risk.</li>
              <li>For CEX destinations, test tiny amounts; deposits may require whitelisting.</li>
              <li>Tag referrals for analytics and attribution.</li>
              <li>Log everything: requests, responses, status transitions, and Explorer snapshots.</li>
            </ul>
          </section>

          {/* Troubleshooting */}
          <section id="troubleshooting" className="max-w-4xl space-y-4 mb-12">
            <h2 className="text-3xl font-bold text-green-400">Troubleshooting</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>401 Unauthorized: obtain and use a valid JWT (Bearer token) for APIs that require it.</li>
              <li>Slow recognition: POST /v0/deposit/submit with the txHash to speed processing.</li>
              <li>Refunded: read status details, adjust slippage/deadline, retry with updated parameters.</li>
            </ul>
          </section>

          {/* Resources */}
          <section id="resources" className="max-w-4xl space-y-4 mb-12">
            <h2 className="text-3xl font-bold text-green-400">Resources</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>1Click OpenAPI: 1click.chaindefuser.com/docs/v0/openapi.yaml</li>
              <li>Explorer API: explorer.near-intents.org/api/docs (JWT required)</li>
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
