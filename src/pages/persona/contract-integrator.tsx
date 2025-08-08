import React from "react";
import Layout from "../../components/Layout";
import { useTheme } from "../../contexts/ThemeContext";

// Futuristic left sidebar focused on Contract Integrator persona
const Sidebar = () => (
  <nav className="fixed left-0 top-0 h-full w-64 bg-gradient-to-b from-gray-900 to-black text-white p-4 overflow-y-auto shadow-lg border-r border-green-500">
    <h2 className="text-xl font-bold mb-4 text-green-400 animate-neon-glow">Contract Integrator</h2>
    <ul className="space-y-2 text-sm">
      - <li><a href="#intro" className="block hover:text-green-300">Introduction</a></li>
      - <li><a href="#what-you-can-build" className="block hover:text-green-300">What You Can Build</a></li>
      - <li><a href="#deposits" className="block hover:text-green-300">Deposits (NEP-141/171)</a></li>
      - <li><a href="#balances-nep245" className="block hover:text-green-300">Balances & NEP-245</a></li>
      - <li><a href="#execute-intents" className="block hover:text-green-300">execute_intents</a></li>
      - <li><a href="#ordering-atomicity" className="block hover:text-green-300">Ordering & Atomicity</a></li>
      - <li><a href="#intent-examples" className="block hover:text-green-300">Intent Examples</a></li>
      - <li><a href="#signing" className="block hover:text-green-300">Signing (NEP-413, ERC-191, etc.)</a></li>
      - <li><a href="#withdrawals" className="block hover:text-green-300">Withdrawals</a></li>
      - <li><a href="#best-practices" className="block hover:text-green-300">Best Practices</a></li>
      - <li><a href="#troubleshooting" className="block hover:text-green-300">Troubleshooting</a></li>
      - <li><a href="#status" className="block hover:text-green-300">System Status</a></li>
    </ul>
  </nav>
);

export default function ContractIntegratorDocs() {
  const { isDark } = useTheme();
  const copyToClipboard = (text: string) => navigator.clipboard.writeText(text);

  return (
    <Layout>
      <div className="flex min-h-screen">
        <Sidebar />
        <main className={`ml-64 flex-1 py-10 px-8 ${isDark ? "bg-black text-white" : "bg-white text-black"} bg-gradient-to-br from-gray-900 to-gray-800`}>
          {/* Title */}
          <header className="mb-10">
            <h1 className="text-5xl font-extrabold text-green-400 mb-3 animate-neon-glow">
              NEAR Intents for Contract Integrators
            </h1>
            <p className="mt-2 text-lg opacity-90 max-w-4xl">
              Build low-level custom flows by interacting directly with the Verifier contract (intents.near): route deposits
              via NEP-141/NEP-171 with msg, compose signed payloads, batch multiple intents in one call to execute_intents,
              and manage balances via NEP-245. All examples are unchanged from the official docs for safe copy/paste.
            </p>
          </header>

          {/* Introduction */}
          <section id="intro" className="max-w-4xl space-y-4 mb-12">
            <h2 className="text-3xl font-bold text-green-400">Introduction</h2>
            <p>
              The Verifier is an atomic mediator on NEAR that executes intents declared and signed by users/services.
              As a contract integrator, use on-chain standards (NEP-141, NEP-171, NEP-245) and off-chain signed payloads
              (NEP-413, ERC-191, etc.) to implement bespoke workflows beyond high-level APIs.
            </p>
          </section>

          {/* What You Can Build */}
          <section id="what-you-can-build" className="max-w-4xl space-y-4 mb-12">
            <h2 className="text-3xl font-bold text-green-400">What You Can Build</h2>
            - <ul className="list-disc pl-6 space-y-2">
              - <li>Atomic multi-step flows: storage deposit + transfers + withdrawals.</li>
              - <li>Custom asset routing by setting msg during deposits.</li>
              - <li>Direct NEP-413 signed payload submission to execute_intents.</li>
              - <li>Programmatic reconciliation via NEP-245 events and balances.</li>
            </ul>
          </section>

          {/* Deposits */}
          <section id="deposits" className="max-w-4xl space-y-6 mb-14">
            <h2 className="text-3xl font-bold text-green-400">Deposits (NEP-141 / NEP-171)</h2>
            <p>
              For fungible tokens, call ft_transfer_call on the token contract implementing NEP-141 and set msg to route ownership
              or kick off intents after deposit; for NFTs, use nft_transfer_call (NEP-171) with the same msg format rules.
              NEAR is handled as wNEAR (wrap.near).
            </p>

            <CodeBlock
              label="ft_transfer_call with ownership assignment (msg)"
              text={`{
  "receiver_id": "alice.near",
  "amount": "1000",
  "msg": "{\\"receiver_id\\": \\"charlie.near\\", \\"execute_intents\\": [...], \\"refund_if_fails\\": false}"
}`}
            />

            <p className="text-sm opacity-80">
              msg is a string; if it's a JSON object, ensure proper escaping. It can be empty, an account id string, or a JSON object:
              receiver_id, execute_intents, refund_if_fails.
            </p>
          </section>

          {/* Balances / NEP-245 */}
          <section id="balances-nep245" className="max-w-4xl space-y-6 mb-14">
            <h2 className="text-3xl font-bold text-green-400">Balances & NEP-245</h2>
            <p>
              After deposits, the Verifier stores balances via the Multi Token Standard (NEP-245). Token identifiers follow
              the Verifier’s multi-token scheme; monitor balance changes with NEP-245 events (mint/burn/transfer equivalents).
            </p>
          </section>

          {/* execute_intents */}
          <section id="execute-intents" className="max-w-4xl space-y-6 mb-14">
            <h2 className="text-3xl font-bold text-green-400">execute_intents</h2>
            <p>
              Submit a list of intents to execute in order. Each intent is a JSON object; the full list is wrapped into a signed payload
              (e.g., NEP-413) and sent to the Verifier. The signer_id defines whose Verifier account executes the intents.
            </p>

            <CodeBlock
              label="Signed payload (NEP-413) with a Transfer intent"
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

          {/* Ordering & Atomicity */}
          <section id="ordering-atomicity" className="max-w-4xl space-y-6 mb-14">
            <h2 className="text-3xl font-bold text-green-400">Ordering & Atomicity</h2>
            <p>
              Intents in a list are executed in order, but NEAR’s async cross-contract calls can finish out of order.
              For example, storage_deposit on usdc.near may not complete before a subsequent withdrawal call executes,
              even though it appears earlier in the list. Define success criteria accordingly and avoid fragile inter-call dependencies.
            </p>
          </section>

          {/* Intent Examples */}
          <section id="intent-examples" className="max-w-4xl space-y-8 mb-16">
            <h2 className="text-3xl font-bold text-green-400">Intent Examples</h2>

            <div className="space-y-4">
              <h3 className="text-2xl font-bold text-green-400">Transfer</h3>
              <CodeBlock
                label="Transfer payload fragment (message field)"
                text={`{
  "intent": "transfer",
  "receiver_id": "bob.near",
  "tokens": {
    "nep141:wrap.near": "10"
  }
}`}
              />
            </div>

            <div className="space-y-4">
              <h3 className="text-2xl font-bold text-green-400">TokenDiff (peer-to-peer swap style)</h3>
              <p className="opacity-90">
                Express net token changes; matching counterparties’ diffs allow Verifier to convert them into transfers.
              </p>
              <CodeBlock
                label="Two signed TokenDiff payloads (Alice/Bob)"
                text={`[
  {
    "standard": "nep413",
    "payload": {
      "message": "{\\"signer_id\\":\\"alice.near\\",\\"deadline\\":\\"2025-05-21T11:30:25.042157Z\\",\\"intents\\":[{\\"intent\\":\\"token_diff\\",\\"diff\\":{\\"nep141:usdc.near\\":\\"-10\\",\\"nep141:usdt.near\\":\\"10\\"}}]}",
      "nonce": "7wtMbp+z40LFJoUeWofezV9zMRDU1NCGh2K6+Q/lNO0=",
      "recipient": "intents.near"
    },
    "public_key": "ed25519:Gxa24TGbJu4mqdhW3GbvLXmf4bSEyxVicrtpChDWbgga",
    "signature": "ed25519:3Zj5dYUKtrn7stZ2g5RHXBU4akDwKWiCDt8iBLvzRfqESV4KsxfXJc7uJjJ9KqfVGZus67YX3ERXg4t7ndDXPpmd"
  },
  {
    "standard": "nep413",
    "payload": {
      "message": "{\\"signer_id\\":\\"bob.near\\",\\"deadline\\":\\"2025-05-21T11:30:25.054132Z\\",\\"intents\\":[{\\"intent\\":\\"token_diff\\",\\"diff\\":{\\"nep141:usdc.near\\":\\"10\\",\\"nep141:usdt.near\\":\\"-10\\"}}]}",
      "nonce": "kybrMeR6qs9+QaXMB3CV/1tZsWS4ZHDd+eJ1QaW/x5Y=",
      "recipient": "intents"
    },
    "public_key": "ed25519:Gxa24TGbJu4mqdhW3GbvLXmf4bSEyxVicrtpChDWbgga",
    "signature": "ed25519:4KPKN8BSDfngeSdLx9qseYq5VnqM8CoUt1YCY7XMbtEuRDC2P5VHUgHQmKHS1ENfoJyGRWvGB9cbgRW4LS7YDWak"
  }
]`}
              />
            </div>

            <div className="space-y-4">
              <h3 className="text-2xl font-bold text-green-400">StorageDeposit</h3>
              <CodeBlock
                label="Storage deposit intent (pays from wNEAR in Verifier)"
                text={`[
  {
    "standard": "nep413",
    "payload": {
      "message": "{\\"signer_id\\":\\"alice.near\\",\\"deadline\\":\\"2025-05-21T11:06:28.803408Z\\",\\"intents\\":[{\\"intent\\":\\"storage_deposit\\",\\"contract_id\\":\\"usdc.near\\",\\"account_id\\":\\"bob.near\\",\\"amount\\":\\"1250000000000000000000\\"}]}",
      "nonce": "eOzrnSE/OAyhjnAQhqy5k2eQZo5kmr+s4ARwL3+YShY=",
      "recipient": "intents.near"
    },
    "public_key": "ed25519:Gxa24TGbJu4mqdhW3GbvLXmf4bSEyxVicrtpChDWbgga",
    "signature": "ed25519:VJjEryxLswHmfZhGGJjpxdBcQxQmRhuFg6dmPpHbJvVMvSSGDMdEDwPVJVewuB5KjPFt7cNuqUNn8iTvfybbZ1W"
  }
]`}
              />
            </div>
          </section>

          {/* Signing */}
          <section id="signing" className="max-w-4xl space-y-8 mb-16">
            <h2 className="text-3xl font-bold text-green-400">Signing (NEP-413, ERC-191, Raw Ed25519, WebAuthn, TonConnect)</h2>
            <p>
              The Verifier supports multiple signature standards to ease wallet and service integrations. Ensure encodings
              and prefixes match the declared standard. Nonces prevent replay; recipient binds the message to the Verifier.
            </p>

            <CodeBlock
              label="NEP-413 example"
              text={`{
  "standard": "nep413",
  "payload": {
    "message": "{\\"signer_id\\":\\"alice.near\\",\\"deadline\\":\\"2025-05-21T10:34:04.254392Z\\",\\"intents\\":[{\\"intent\\":\\"transfer\\",\\"receiver_id\\":\\"bob.near\\",\\"tokens\\":{\\"nep141:usdc.near\\":\\"10\\"}}]}",
    "nonce": "Op47m39Q/NzWWi8jYe4umk96OTSnY4Ao0FB/B9aPB98=",
    "recipient": "intents.near"
  },
  "public_key": "ed25519:Gxa24TGbJu4mqdhW3GbvLXmf4bSEyxVicrtpChDWbgga",
  "signature": "ed25519:52oc2FD4rMsAPNSBSx6eNYrF4atreXTZxWFhAPfmZFn1eF7jbE3BrRTL3ey1M1sAKSdK8qriZiHQnhnNBCh8vVMJ"
}`}
            />

            <CodeBlock
              label="ERC-191 example"
              text={`{
  "standard": "erc191"
  "payload": "{\\"signer_id\\": \\"0xccaa162a73e6e9dcfdd42c9d97c3b515c1cd34c3\\", \\"verifying_contract\\": \\"intents.near\\", \\"deadline\\": \\"2025-05-26T13:24:16.983Z\\", \\"nonce\\": \\"U3UMmW79FqTMtBx3DYLI2DUxxwAFY+Eo4kY11PEI3PU=\\", \\"intents\\": [{ \\"intent\\": \\"token_diff\\", \\"diff\\": { \\"nep141:usdc.near\\": \\"-1000\\", \\"nep141:usdt.near\\": \\"1000\\" } }, { \\"intent\\": \\"ft_withdraw\\", \\"token\\": \\"usdt.near\\", \\"receiver_id\\": \\"bob.near\\", \\"amount\\": \\"1000\\" }]}",
  "signature": "secp256k1:4jpo5EuztCFUe3gVqWpmwowoorFUmt4ynu3Z8WPo9zw2BSoHB279PZtDz934L1uCi6VfgXYJdTEfRaxyM3a1zaUw1",
}`}
            />

            <CodeBlock
              label="Raw Ed25519 example"
              text={`{
    "standard":"raw_ed25519",
    "payload":"{\\"signer_id\\":\\"alice.near\\",\\"verifying_contract\\":\\"intents.near\\",\\"deadline\\":{\\"timestamp\\":1732035219},\\"nonce\\":\\"XVoKfmScb3G+XqH9ke/fSlJ/3xO59sNhCxhpG821BH8=\\",\\"intents\\":[{\\"intent\\":\\"token_diff\\",\\"diff\\":{\\"nep141:usdc.near\\":\\"-1000\\",\\"nep141:usdt.near\\":\\"998\\"}}]}",
    "public_key":"ed25519:8rVvtHWFr8hasdQGGD5WiQBTyr4iH2ruEPPVfj491RPN",
    "signature":"ed25519:3vtbNQJHZfuV1s5DykzyjkbNLc583hnkrhTz57eDhd966iqzkor6Twgr4Loh2C195SCSEsiGfrd6KcxpjNq9ZbVj"
}`}
            />

            <CodeBlock
              label="WebAuthn example"
              text={`{
  "standard": "webauthn",
  "payload": "{\\"signer_id\\":\\"0x3602b546589a8fcafdce7fad64a46f91db0e4d50\\",\\"verifying_contract\\":\\"intents.near\\",\\"deadline\\":\\"2025-03-30T00:00:00Z\\",\\"nonce\\":\\"A3nsY1GMVjzyXL3mUzOOP3KT+5a0Ruy+QDNWPhchnxM=\\",\\"intents\\":[{\\"intent\\":\\"transfer\\",\\"receiver_id\\":\\"bob.near\\",\\"tokens\\":{\\"nep141:usdc.near\\":\\"1000\\"}}]}",
  "public_key": "p256:2V8Np9vGqLiwVZ8qmMmpkxU7CTRqje4WtwFeLimSwuuyF1rddQK5fELiMgxUnYbVjbZHCNnGc6fAe4JeDcVxgj3Q",
  "signature": "p256:3KBMZ72BHUiVfE1ey5dpi3KgbXvSEf9kuxgBEax7qLBQtidZExxxjjQk1hTTGFRrPvUoEStfrjoFNVVW4Abar94W",
  "client_data_json": "{\\"type\\":\\"webauthn.get\\",\\"challenge\\":\\"4cveZsIe6p-WaEcL-Lhtzt3SZuXbYsjDdlFhLNrSjjk\\",\\"origin\\":\\"https://defuse-widget-git-feat-passkeys-defuse-94bbc1b2.vercel.app\\"}",
  "authenticator_data": "933cQogpBzE3RSAYSAkfWoNEcBd3X84PxE8iRrRVxMgdAAAAAA=="
}`}
            />
          </section>

          {/* Withdrawals */}
          <section id="withdrawals" className="max-w-4xl space-y-8 mb-16">
            <h2 className="text-3xl font-bold text-green-400">Withdrawals</h2>
            <p>
              Move tokens out of the Verifier to an external account/contract via intents such as FtWithdraw/NftWithdraw/MtWithdraw/NativeWithdraw.
              On success, assets leave the Verifier and reside under the destination contract/account’s balance rules.
            </p>

            <CodeBlock
              label="ft_withdraw (NEP-413 payload)"
              text={`[
  {
    "standard": "nep413",
    "payload": {
      "message": "{\\"signer_id\\":\\"alice.near\\",\\"deadline\\":\\"2025-05-21T10:45:30.098925Z\\",\\"intents\\":[{\\"intent\\":\\"ft_withdraw\\",\\"token\\":\\"usdc.near\\",\\"receiver_id\\":\\"bob.near\\",\\"amount\\":\\"1000\\"}]}",
      "nonce": "TdnN42qOTv68RqVKX64+3k8OYqLqANUcxWBdPZVCPxc=",
      "recipient": "intents.near"
    },
    "public_key": "ed25519:Gxa24TGbJu4mqdhW3GbvLXmf4bSEyxVicrtpChDWbgga",
    "signature": "ed25519:4LwjCRRcmBvBTMqc5tZSd1HPGgzhmVZi4ywvzqyPNQWsubCiiQg6CRPjv5VRS4Vqafac8EvtUwEwr6NauAGQWPnY"
  }
]`}
            />
          </section>

          {/* Best Practices */}
          <section id="best-practices" className="max-w-4xl space-y-4 mb-12">
            <h2 className="text-3xl font-bold text-green-400">Best Practices</h2>
            - <ul className="list-disc pl-6 space-y-2">
              - <li>Escape JSON correctly inside message strings (payload.message) and inside msg for ft_transfer_call.</li>
              - <li>Use nonces and deadlines to prevent replay; bind recipient to intents.near.</li>
              - <li>Avoid fragile multi-call dependencies; consider preconditions are async across contracts.</li>
              - <li>Track NEP-245 events for reconciliation; use deterministic token identifiers.</li>
              - <li>Wrap NEAR to wNEAR (wrap.near) before deposit; treat NEAR as NEP-141 for uniformity.</li>
            </ul>
          </section>

          {/* Troubleshooting */}
          <section id="troubleshooting" className="max-w-4xl space-y-4 mb-12">
            <h2 className="text-3xl font-bold text-green-400">Troubleshooting</h2>
            - <ul className="list-disc pl-6 space-y-2">
              - <li>Signature invalid: check prefix and encoding per standard (e.g., ed25519:, p256:, secp256k1:).</li>
              - <li>Order-dependent failures: decouple intents or split into separate transactions.</li>
              - <li>Missing balances: confirm deposit events and NEP-245 mint/transfer were emitted as expected.</li>
            </ul>
          </section>

          {/* Status */}
          <section id="status" className="max-w-4xl space-y-4 mb-6">
            <h2 className="text-3xl font-bold text-green-400">System Status</h2>
            <p>
              Monitor live uptime/issues:
              {" "}
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
 * Keeps protocol examples unchanged for safe copy/paste.
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
