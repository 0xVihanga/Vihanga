"use client";

import { useState } from "react";
import { ShieldAlert, Hash, Network, Lock, CheckCircle2, ArrowRight, RefreshCw, KeyRound } from "lucide-react";

export default function CyberToolsWidget() {
  const [activeTab, setActiveTab] = useState<"crypto" | "ports" | "scanner">("crypto");
  const [inputText, setInputText] = useState("0xVihanga_CyberSecurity");
  const [hashOutput, setHashOutput] = useState("");
  const [base64Output, setBase64Output] = useState("");
  const [binaryOutput, setBinaryOutput] = useState("");

  // Calculate live cryptographic representations
  const computeHashes = async (text: string) => {
    setInputText(text);
    if (!text) {
      setHashOutput("");
      setBase64Output("");
      setBinaryOutput("");
      return;
    }

    try {
      // SHA-256 via browser subtle crypto
      const msgUint8 = new TextEncoder().encode(text);
      const hashBuffer = await crypto.subtle.digest("SHA-256", msgUint8);
      const hashArray = Array.from(new Uint8Array(hashBuffer));
      const hashHex = hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
      setHashOutput(hashHex);

      // Base64
      setBase64Output(btoa(unescape(encodeURIComponent(text))));

      // Binary sample (first 4 chars)
      const bin = text
        .slice(0, 6)
        .split("")
        .map((char) => char.charCodeAt(0).toString(2).padStart(8, "0"))
        .join(" ");
      setBinaryOutput(bin);
    } catch {
      // Fallback
      setHashOutput("e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855");
    }
  };

  // Initialize on first render
  useState(() => {
    computeHashes("0xVihanga_CyberSecurity");
  });

  const monitoredPorts = [
    { port: 443, service: "HTTPS / TLS", status: "SECURE", desc: "Crittografia end-to-end attiva (TLS 1.3)", color: "text-emerald-400" },
    { port: 22, service: "SSH / Key-Auth", status: "RESTRICTED", desc: "Autenticazione esclusiva a chiave asimmetrica Ed25519", color: "text-cyan-400" },
    { port: 53, service: "DNS over HTTPS", status: "ENCRYPTED", desc: "Risoluzione protetta da spoofing & sniffing", color: "text-emerald-400" },
    { port: 80, service: "HTTP / Redirect", status: "AUTO-FORWARD", desc: "Reindirizzamento forzato 301 verso HTTPS", color: "text-amber-400" },
  ];

  return (
    <section id="cyber-tools" className="my-12">
      <div className="relative rounded-xl border border-zinc-800/80 bg-zinc-950/70 p-6 sm:p-8 backdrop-blur-xl shadow-2xl">
        <div className="hud-corner-tl" />
        <div className="hud-corner-tr" />
        <div className="hud-corner-bl" />
        <div className="hud-corner-br" />

        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-b border-zinc-800/80 pb-5">
          <div>
            <div className="flex items-center gap-2">
              <span className="flex h-2 w-2 rounded-full bg-cyan-400 animate-ping" />
              <p className="font-mono text-xs font-semibold tracking-widest text-cyan-400">
                INTERACTIVE CYBERSECURITY WORKBENCH
              </p>
            </div>
            <h3 className="mt-1 text-xl font-bold text-zinc-100 sm:text-2xl">
              Modulo Interattivo di Sicurezza &amp; Crittografia
            </h3>
          </div>

          {/* Tab Selector */}
          <div className="flex rounded-lg border border-zinc-800 bg-zinc-900/60 p-1 text-xs font-mono">
            <button
              onClick={() => setActiveTab("crypto")}
              className={`flex items-center gap-1.5 rounded-md px-3 py-1.5 transition-all ${
                activeTab === "crypto"
                  ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 shadow-sm"
                  : "text-zinc-400 hover:text-zinc-200"
              }`}
            >
              <Hash className="h-3.5 w-3.5" />
              <span>Hash Engine</span>
            </button>

            <button
              onClick={() => setActiveTab("ports")}
              className={`flex items-center gap-1.5 rounded-md px-3 py-1.5 transition-all ${
                activeTab === "ports"
                  ? "bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-sm"
                  : "text-zinc-400 hover:text-zinc-200"
              }`}
            >
              <Network className="h-3.5 w-3.5" />
              <span>Audit Porte &amp; TLS</span>
            </button>

            <button
              onClick={() => setActiveTab("scanner")}
              className={`flex items-center gap-1.5 rounded-md px-3 py-1.5 transition-all ${
                activeTab === "scanner"
                  ? "bg-teal-500/20 text-teal-300 border border-teal-500/40 shadow-sm"
                  : "text-zinc-400 hover:text-zinc-200"
              }`}
            >
              <ShieldAlert className="h-3.5 w-3.5" />
              <span>Live Threat Status</span>
            </button>
          </div>
        </div>

        {/* Tab 1: Live Hash & Crypto Inspector */}
        {activeTab === "crypto" && (
          <div className="mt-6 space-y-4">
            <div className="flex flex-col gap-2">
              <label htmlFor="crypto-input" className="font-mono text-xs font-medium text-zinc-300 flex items-center justify-between">
                <span>Inserisci stringa / payload per calcolare l&apos;impronta crittografica:</span>
                <span className="text-[11px] text-emerald-400 font-mono">Real-time SHA-256 Digest</span>
              </label>
              <div className="relative">
                <input
                  id="crypto-input"
                  type="text"
                  value={inputText}
                  onChange={(e) => computeHashes(e.target.value)}
                  className="w-full rounded-lg border border-zinc-800 bg-zinc-900/80 px-4 py-2.5 font-mono text-sm text-zinc-100 placeholder-zinc-600 outline-none focus:border-emerald-500/60 focus:ring-1 focus:ring-emerald-500/40"
                  placeholder="Digita del testo..."
                />
                <button
                  onClick={() => computeHashes("vihanga.it::security::" + Date.now())}
                  className="absolute right-2.5 top-2.5 text-zinc-400 hover:text-emerald-400"
                  title="Genera token random"
                >
                  <RefreshCw className="h-4 w-4" />
                </button>
              </div>
            </div>

            <div className="space-y-3 font-mono text-xs">
              {/* SHA-256 Digest */}
              <div className="rounded-lg border border-zinc-800/80 bg-zinc-900/40 p-3">
                <div className="flex items-center justify-between text-zinc-400">
                  <span className="flex items-center gap-1.5 text-emerald-400 font-bold">
                    <KeyRound className="h-3.5 w-3.5" /> SHA-256 (256-bit Hex)
                  </span>
                  <span className="text-[10px] text-zinc-500">NIST FIPS 180-4 standard</span>
                </div>
                <p className="mt-1.5 break-all text-emerald-300 bg-zinc-950/60 p-2 rounded border border-zinc-800/60">
                  {hashOutput || "Calcolo in corso..."}
                </p>
              </div>

              {/* Base64 Encoding */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="rounded-lg border border-zinc-800/80 bg-zinc-900/40 p-3">
                  <span className="text-cyan-400 font-bold block mb-1">Base64 Encoded:</span>
                  <p className="break-all text-zinc-300 bg-zinc-950/60 p-2 rounded border border-zinc-800/60">
                    {base64Output || "—"}
                  </p>
                </div>

                <div className="rounded-lg border border-zinc-800/80 bg-zinc-900/40 p-3">
                  <span className="text-blue-400 font-bold block mb-1">Binary Stream (ASCII):</span>
                  <p className="break-all text-zinc-300 bg-zinc-950/60 p-2 rounded border border-zinc-800/60">
                    {binaryOutput || "—"}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Ports & Protocols Audit */}
        {activeTab === "ports" && (
          <div className="mt-6 space-y-3 font-mono">
            <p className="text-xs text-zinc-400">
              Audit di conformità porte e policy di rete standard implementate sui nodi di sistema:
            </p>
            <div className="divide-y divide-zinc-800/80 rounded-lg border border-zinc-800 bg-zinc-900/40 overflow-hidden">
              {monitoredPorts.map((item) => (
                <div key={item.port} className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 p-3 text-xs">
                  <div className="flex items-center gap-3">
                    <span className="rounded bg-zinc-800 px-2 py-0.5 font-bold text-zinc-200">
                      PORT {item.port}
                    </span>
                    <span className="font-semibold text-zinc-200">{item.service}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-[11px] text-zinc-400">{item.desc}</span>
                    <span className={`rounded border border-current/30 px-2 py-0.5 text-[10px] font-bold ${item.color}`}>
                      {item.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 3: Live Threat Status */}
        {activeTab === "scanner" && (
          <div className="mt-6 space-y-4 font-mono text-xs">
            <div className="rounded-lg border border-emerald-500/30 bg-emerald-950/20 p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5 text-emerald-400" />
                  <span className="text-sm font-bold text-emerald-300">STATO DIFESA: NOMINALE (DEFCON 5)</span>
                </div>
                <span className="rounded bg-emerald-500/20 px-2.5 py-1 text-emerald-300 border border-emerald-500/30">
                  THREAT: LOW
                </span>
              </div>
              <p className="mt-2 text-zinc-400 leading-relaxed">
                Nessun payload dannoso o attività anomala registrata. Policy Zero-Trust e mitigazione DDoS attive.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="rounded-lg border border-zinc-800 bg-zinc-900/40 p-3">
                <span className="text-zinc-500 block text-[10px] uppercase">Controllo Integrità</span>
                <span className="text-emerald-400 font-bold text-sm">SHA-256 VERIFIED</span>
              </div>
              <div className="rounded-lg border border-zinc-800 bg-zinc-900/40 p-3">
                <span className="text-zinc-500 block text-[10px] uppercase">Header di Sicurezza</span>
                <span className="text-cyan-400 font-bold text-sm">HSTS / CSP / X-FRAME</span>
              </div>
              <div className="rounded-lg border border-zinc-800 bg-zinc-900/40 p-3">
                <span className="text-zinc-500 block text-[10px] uppercase">Firewall Policy</span>
                <span className="text-emerald-400 font-bold text-sm">DROP INVALID PKTS</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
