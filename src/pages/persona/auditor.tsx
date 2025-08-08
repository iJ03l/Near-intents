import React from "react";
import Layout from "../../components/Layout";
import { useTheme } from "../../contexts/ThemeContext";

// Futuristic left sidebar focused on Auditor persona
const Sidebar = () => (
  <nav className="fixed left-0 top-0 h-full w-64 bg-gradient-to-b from-gray-900 to-black text-white p-4 overflow-y-auto shadow-lg border-r border-green-500">
    <h2 className="text-xl font-bold mb-4 text-green-400 animate-neon-glow">Auditor</h2>
    <ul className="space-y-2 text-sm">
      <li><a href="#intro" className="block hover:text-green-300">Introduction</a></li>
      <li><a href="#scope" className="block hover:text-green-300">Audit Scope</a></li>
      <li><a href="#intents-events" className="block hover:text-green-300">Verifier Events</a></li>
      <li><a href="#nep245" className="block hover:text-green-300">NEP-245 Balances</a></li>
      <li><a href="#signatures" className="block hover:text-green-300">Signatures & Encoding</a></li>
      <li><a href="#intents-execution" className="block hover:text-green-300">Intent Types & Execution</a></li>
      <li><a href="#deposits-withdrawals" className="block hover:text-green-300">Deposits & Withdrawals</a></li>
      <li><a href="#explorer-api" className="block hover:text-green-300">Explorer API (History)</a></li>
      <li><a href="#treasury" className="block hover:text-green-300">Treasury Addresses</a></li>
      <li><a href="#system-status" className="block hover:text-green-300">System Status</a></li>
      <li><a href="#best-practices" className="block hover:text-green-300">Best Practices</a></li>
      <li><a href="#checklist" className="block hover:text-green-300">Audit Checklist</a></li>
      <li><a href="#resources" className="block hover:text-green-300">Resources</a></li>
    </ul>
  </nav>
);

export default function AuditorDocs() {
  const { isDark } = useTheme();
  const copyToClipboard = (text: string) => navigator.clipboard.writeText(text);
  const gotoStatus = () => window.open("https://status.near-intents.org/", "_blank", "noopener,noreferrer");

  return (
    <Layout>
      <div className="flex min-h-screen">
        <Sidebar />
        <main className={`ml-64 flex-1 py-10 px-8 ${isDark ? "bg-black text-white" : "bg-white text-black"} bg-gradient-to-br from-gray-900 to-gray-800`}>
          {/* Title */}
          <header className="mb-10">
            <h1 className="text-5xl font-extrabold text-green-400 mb-3 animate-neon-glow">NEAR Intents for Auditors</h1>
            <p className="mt-2 text-lg opacity-90 max-w-4xl">
              This guide helps auditors verify protocol behavior end-to-end: confirm deployments, monitor Verifier events,
              validate balances via NEP-245, inspect signed payloads, review intent execution ordering and atomicity, reconcile
              deposits/withdrawals, and cross-check historical activity using the Intents Explorer API. All protocol examples
              are unchanged and safe to copy/paste for tooling and test rigs.
            </p>
          </header>

          {/* Introduction */}
          <section id="intro" className="max-w-4xl space-y-4 mb-12">
            <h2 className="text-3xl font-bold text-green-400">Introduction</h2>
            <p>
              NEAR Intents is an intent-based, multichain protocol where users express outcomes, and execution is mediated atomically
              via a Verifier contract on NEAR. Audits typically cover: event correctness, signature validity, nonce handling,
              order/atomicity caveats, NEP-245 balance movements, treasury flows, and historical execution data consistency.
            </p>
          </section>

          {/* Scope */}
          <section id="scope" className="max-w-4xl space-y-4 mb-12">
            <h2 className="text-3xl font-bold text-green-400">Audit Scope</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>Deployment and addresses: Verifier at intents.near; treasury addresses per network.</li>
              <li>Event emissions: Intents events and Multi Token (NEP-245) balance-change events.</li>
              <li>Signature formats and encoding: NEP-413, ERC-191, Raw Ed25519, WebAuthn, TonConnect.</li>
              <li>Intent construction and execution semantics: ordering, atomicity caveats, and batch behavior.</li>
              <li>Deposits and withdrawals: passive service JSON-RPC, and on-chain wNEAR treatment.</li>
              <li>Historical data: consistency via Intents Explorer API and correlating on-chain tx hashes.</li>
            </ul>
          </section>

          {/* Verifier Events */}
          <section id="intents-events" className="max-w-4xl space-y-6 mb-14">
            <h2 className="text-3xl font-bold text-green-400">Verifier Events</h2>
            <p>
              Verifier emits JSON events prefixed with EVENT_JSON, following NEAR conventions. Intents-related events include:
              PublicKeyAdded, PublicKeyRemoved, Transfer, TokenDiff, IntentsExecuted, FtWithdraw/NftWithdraw/MtWithdraw/NativeWithdraw,
              and StorageDeposit. Multi Token events (NEP-245) include MtMintEvent, MtBurnEvent, MtTransferEvent.
            </p>
            <p className="text-sm opacity-80">
              Use node logs or indexers to capture and decode events for reconciliation and alerting pipelines.
            </p>
          </section>

          {/* NEP-245 Balances */}
          <section id="nep245" className="max-w-4xl space-y-4 mb-12">
            <h2 className="text-3xl font-bold text-green-400">NEP-245 Balances & Token Identification</h2>
            <p>
              Internally, the Verifier stores balances using the Multi Token Standard (NEP-245). Auditors should verify token IDs,
              account balances, and transfers through emitted NEP-245 events and balance queries. This is crucial when tracing
              TokenDiff execution that results in internal mt_transfer events.
            </p>
          </section>

          {/* Signatures */}
          <section id="signatures" className="max-w-4xl space-y-6 mb-14">
            <h2 className="text-3xl font-bold text-green-400">Signatures & Encoding</h2>
            <p>
              Intents rely on signed payloads; multiple signature standards are supported. Ensure encodings are respected: nonces are base64,
              keys and signatures are prefixed with key type and base58 where applicable, and WebAuthn fields follow their respective encodings.
            </p>

            <CodeBlock
              label="NEP-413 signed intent (example)"
              text={`{
  "standard": "nep413",
  "payload": {
    "message": "{\"signer_id\":\"alice.near\",\"deadline\":\"2025-05-21T10:34:04.254392Z\",\"intents\":[{\"intent\":\"transfer\",\"receiver_id\":\"bob.near\",\"tokens\":{\"nep141:usdc.near\":\"10\"}}]}",
    "nonce": "Op47m39Q/NzWWi8jYe4umk96OTSnY4Ao0FB/B9aPB98=",
    "recipient": "intents.near"
  },
  "public_key": "ed25519:Gxa24TGbJu4mqdhW3GbvLXmf4bSEyxVicrtpChDWbgga",
  "signature": "ed25519:52oc2FD4rMsAPNSBSx6eNYrF4atreXTZxWFhAPfmZFn1eF7jbE3BrRTL3ey1M1sAKSdK8qriZiHQnhnNBCh8vVMJ"
}`}
            />

            <CodeBlock
              label="ERC-191 signed payload (example)"
              text={`{
  "standard": "erc191",
  "payload": "{\"signer_id\": \"0xccaa162a73e6e9dcfdd42c9d97c3b515c1cd34c3\", \"verifying_contract\": \"intents.near\", \"deadline\": \"2025-05-26T13:24:16.983Z\", \"nonce\": \"U3UMmW79FqTMtBx3DYLI2DUxxwAFY+Eo4kY11PEI3PU=\", \"intents\": [{ \"intent\": \"token_diff\", \"diff\": { \"nep141:usdc.near\": \"-1000\", \"nep141:usdt.near\": \"1000\" } }, { \"intent\": \"ft_withdraw\", \"token\": \"usdt.near\", \"receiver_id\": \"bob.near\", \"amount\": \"1000\" }]}",
  "signature": "secp256k1:4jpo5EuztCFUe3gVqWpmwowoorFUmt4ynu3Z8WPo9zw2BSoHB279PZtDz934L1uCi6VfgXYJdTEfRaxyM3a1zaUw1"
}`}
            />

            <CodeBlock
              label="Raw Ed25519 (example)"
              text={`{
  "standard":"raw_ed25519",
  "payload":"{\\"signer_id\\":\\"alice.near\\",\\"verifying_contract\\":\\"intents.near\\",\\"deadline\\":{\\"timestamp\\":1732035219},\\"nonce\\":\\"XVoKfmScb3G+XqH9ke/fSlJ/3xO59sNhCxhpG821BH8=\\",\\"intents\\":[{\\"intent\\":\\"token_diff\\",\\"diff\\":{\\"nep141:usdc.near\\":\\"-1000\\",\\"nep141:usdt.near\\":\\"998\\"}}]}",
  "public_key":"ed25519:8rVvtHWFr8hasdQGGD5WiQBTyr4iH2ruEPPVfj491RPN",
  "signature":"ed25519:3vtbNQJHZfuV1s5DykzyjkbNLc583hnkrhTz57eDhd966iqzkor6Twgr4Loh2C195SCSEsiGfrd6KcxpjNq9ZbVj"
}`}
            />

            <CodeBlock
              label="WebAuthn (example)"
              text={`{
  "standard": "webauthn",
  "payload": "{\"signer_id\":\"0x3602b546589a8fcafdce7fad64a46f91db0e4d50\",\"verifying_contract\":\"intents.near\",\"deadline\":\"2025-03-30T00:00:00Z\",\"nonce\":\"A3nsY1GMVjzyXL3mUzOOP3KT+5a0Ruy+QDNWPhchnxM=\",\"intents\":[{\"intent\":\"transfer\",\"receiver_id\":\"bob.near\",\"tokens\":{\"nep141:usdc.near\":\"1000\"}}]}",
  "public_key": "p256:2V8Np9vGqLiwVZ8qmMmpkxU7CTRqje4WtwFeLimSwuuyF1rddQK5fELiMgxUnYbVjbZHCNnGc6fAe4JeDcVxgj3Q",
  "signature": "p256:3KBMZ72BHUiVfE1ey5dpi3KgbXvSEf9kuxgBEax7qLBQtidZExxxjjQk1hTTGFRrPvUoEStfrjoFNVVW4Abar94W",
  "client_data_json": "{\"type\":\"webauthn.get\",\"challenge\":\"4cveZsIe6p-WaEcL-Lhtzt3SZuXbYsjDdlFhLNrSjjk\",\"origin\":\"https://defuse-widget-git-feat-passkeys-defuse-94bbc1b2.vercel.app\"}",
  "authenticator_data": "933cQogpBzE3RSAYSAkfWoNEcBd3X84PxE8iRrRVxMgdAAAAAA=="
}`}
            />
          </section>

          {/* Intent types and execution */}
          <section id="intents-execution" className="max-w-4xl space-y-6 mb-14">
            <h2 className="text-3xl font-bold text-green-400">Intent Types & Execution Semantics</h2>
            <p>
              Intents are submitted as a list to execute_intents; order in the list is preserved,
              but NEAR’s async cross-contract calls may complete out of order. Audits should account for this when defining
              “success criteria” for batched flows involving storage deposits followed by dependent calls.
            </p>
            <p className="text-sm opacity-80">
              Examples include add_public_key/remove_public_key, invalidate_nonces, Transfer, FtWithdraw/NftWithdraw/MtWithdraw/NativeWithdraw,
              StorageDeposit, and TokenDiff (net token set changes). JSON field names are snake_case for intent names.
            </p>

            <CodeBlock
              label="Simple transfer intent (payload message fragment)"
              text={`{
  "intent": "transfer",
  "receiver_id": "bob.near",
  "tokens": {
    "nep141:wrap.near": "10"
  }
}`}
            />
          </section>

          {/* Deposits & Withdrawals */}
          <section id="deposits-withdrawals" className="max-w-4xl space-y-6 mb-14">
            <h2 className="text-3xl font-bold text-green-400">Deposits & Withdrawals</h2>
            <p>
              Deposits use ft_transfer_call/nft_transfer_call with msg specifying ownership and optional immediate intents.
              NEAR is treated as wNEAR (wrap.near). Withdrawals are initiated via intents like ft_withdraw and should be traced across
              emitted events and the downstream chain tx hashes.
            </p>

            <CodeBlock
              label="ft_transfer_call with ownership assignment"
              text={`{
  "receiver_id": "alice.near",
  "amount": "1000",
  "msg": "{\\"receiver_id\\": \\"charlie.near\\", \\"execute_intents\\": [...], \\"refund_if_fails\\": false}"
}`}
            />
          </section>

          {/* Explorer API */}
          <section id="explorer-api" className="max-w-4xl space-y-6 mb-14">
            <h2 className="text-3xl font-bold text-green-400">Intents Explorer API (Historical 1Click Data)</h2>
            <p>
              Use the Explorer API to retrieve programmatic history of 1Click Swap transactions for reconciliation,
              sampling, anomaly detection, and report generation. JWT is required.
            </p>

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

          {/* Treasury Addresses */}
          <section id="treasury" className="max-w-4xl space-y-6 mb-14">
            <h2 className="text-3xl font-bold text-green-400">Treasury Addresses</h2>
            <p>
              For transparency and AML compliance, these treasuries are used by NEAR Intents and HOT Bridge across networks.
              Validate flows by reconciling deposits/withdrawals against these addresses on each chain.
            </p>
            <CodeBlock
              label="Sample Treasury Entries"
              text={`Ethereum (ETH)
NEAR Intents: 0x2CfF890f0378a11913B6129B2E97417a2c302680
HOT Bridge:   0x233c5370CCfb3cD7409d9A3fb98ab94dE94Cb4Cd

Bitcoin (BTC)
NEAR Intents: 1C6XJtNXiuXvk4oUAVMkKF57CRpaTrN5Ra

Solana (SOL)
NEAR Intents: HWjmoUNYckccg9Qrwi43JTzBcGcM1nbdAtATf9GXmz16
HOT Bridge:   8sXzdKW2jFj7V5heRwPMcygzNH3JZnmie5ZRuNoTuKQC

NEAR (NEAR)
NEAR Intents: intents.near

TON
NEAR Intents: UQAfoBd_f0pIvNpUPAkOguUrFWpGWV9TWBeZs_5TXE95_trZ
HOT Bridge:   EQANEViM3AKQzi6Aj3sEeyqFu8pXqhy9Q9xGoId_0qp3CNVJ`}
            />
          </section>

          {/* System Status */}
          <section id="system-status" className="max-w-4xl space-y-4 mb-12">
            <h2 className="text-3xl font-bold text-green-400">System Status</h2>
            <p>
              Monitor uptime/events before, during, and after investigations to correlate anomalies with network-wide incidents.
            </p>
            <button
              onClick={gotoStatus}
              className="px-5 py-2 text-sm font-bold text-black bg-green-500 rounded-full hover:bg-green-600 transition-transform hover:scale-105 shadow-lg hover:shadow-green-500/50"
            >
              Open status.near-intents.org →
            </button>
          </section>

          {/* Best Practices */}
          <section id="best-practices" className="max-w-4xl space-y-4 mb-12">
            <h2 className="text-3xl font-bold text-green-400">Best Practices</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>Verify signature type and encoding match the declared standard (NEP-413/ ERC-191/ Raw Ed25519/ WebAuthn/ TonConnect).</li>
              <li>Check nonce uniqueness/invalidation and recipient binding to prevent replay.</li>
              <li>Model async caveats: a batch may execute in order, but cross-contract calls can complete out-of-order.</li>
              <li>Reconcile tokens via NEP-245 events: mint/burn (deposit/withdraw) and transfers (TokenDiff effects).</li>
              <li>Trace withdrawals onto destination chains using provided explorer URLs and tx hashes.</li>
              <li>Correlate historical swaps via Explorer API with on-chain NEAR and destination-origin txs.</li>
            </ul>
          </section>

          {/* Checklist */}
          <section id="checklist" className="max-w-4xl space-y-4 mb-12">
            <h2 className="text-3xl font-bold text-green-400">Audit Checklist</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>Confirm Verifier deployment (intents.near) and absence of testnet deployment claims.</li>
              <li>Validate signature payload integrity, deadlines, and nonce handling.</li>
              <li>Inspect emitted events for every tested flow; ensure consistency with expected outcomes.</li>
              <li>Confirm NEP-245 balance changes align with deposits/withdrawals and TokenDiff results.</li>
              <li>Cross-check Explorer API records with on-chain evidence (NEAR tx hashes and cross-chain txs).</li>
              <li>Review treasury addresses alignment with observed flows across networks.</li>
            </ul>
          </section>

          {/* Resources */}
          <section id="resources" className="max-w-4xl space-y-4 mb-6">
            <h2 className="text-3xl font-bold text-green-400">Resources</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>Verifier contract: intents.near</li>
              <li>Explorer API docs: explorer.near-intents.org/api/docs (JWT required)</li>
              <li>System Status: status.near-intents.org</li>
            </ul>
          </section>
        </main>
      </div>
    </Layout>
  );
}

/**
 * Reusable code block with Copy button.
 * Keeps examples unchanged for safe copy/paste.
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
