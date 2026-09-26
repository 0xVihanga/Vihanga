"use client";

import { useState, useRef, useEffect, KeyboardEvent } from "react";
import { SITE } from "../config/site";
import { Terminal as TerminalIcon, Maximize2, Minimize2, Copy, Check, RotateCcw, Sparkles } from "lucide-react";

interface CommandOutput {
  id: string;
  command: string;
  output: React.ReactNode;
  timestamp: string;
}

interface TerminalProps {
  isModal?: boolean;
  onClose?: () => void;
}

export default function Terminal({ isModal = false, onClose }: TerminalProps) {
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState<number>(-1);
  const [outputs, setOutputs] = useState<CommandOutput[]>([]);
  const [copied, setCopied] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [matrixActive, setMatrixActive] = useState(false);

  const terminalEndRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  // Initialize with welcome message
  useEffect(() => {
    const welcomeOutput: CommandOutput = {
      id: "welcome",
      command: "neofetch",
      timestamp: new Date().toLocaleTimeString(),
      output: (
        <div className="space-y-3 font-mono text-xs sm:text-sm">
          <div className="flex flex-col gap-4 text-emerald-400 sm:flex-row sm:items-center">
            <pre className="text-emerald-400 font-bold leading-tight select-none text-[11px] sm:text-xs">
{`   _____           _   _ _                      
  / ____|         | | (_) |                     
 | (___   ___  ___| |_ _| | __ _ _ __ __ _      
  \\___ \\ / _ \\/ __| __| | |/ _\` | '__/ _\` |     
  ____) |  __/ (__| |_| | | (_| | | | (_| |     
 |_____/ \\___|\\___|\\__|_|_|\\__,_|_|  \\__,_|     
  [ 0xVihanga Security Terminal v2.4 ]`}
            </pre>
            <div className="space-y-1 text-zinc-300">
              <p><span className="text-emerald-400 font-semibold">User:</span> visitor@vihanga.it</p>
              <p><span className="text-emerald-400 font-semibold">Host:</span> {SITE.domain}</p>
              <p><span className="text-emerald-400 font-semibold">OS:</span> Linux (Telecom & Cyber)</p>
              <p><span className="text-emerald-400 font-semibold">Institution:</span> {SITE.school.name}</p>
              <p><span className="text-emerald-400 font-semibold">Status:</span> Threat Level Low • Online</p>
            </div>
          </div>
          <p className="border-t border-zinc-800/80 pt-2 text-zinc-400">
            Type <span className="text-emerald-400 font-semibold">help</span> to view available commands, or click any suggestion pill below.
          </p>
        </div>
      ),
    };
    setOutputs([welcomeOutput]);
  }, []);

  // Auto scroll to bottom
  useEffect(() => {
    terminalEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [outputs, matrixActive]);

  const handleCommand = (cmdStr: string) => {
    const cleanCmd = cmdStr.trim();
    if (!cleanCmd) return;

    // Add to command history
    setHistory((prev) => [...prev, cleanCmd]);
    setHistoryIndex(-1);

    const now = new Date().toLocaleTimeString();
    const commandLower = cleanCmd.toLowerCase();
    let resultNode: React.ReactNode = null;

    switch (commandLower) {
      case "help":
        resultNode = (
          <div className="space-y-2 text-xs sm:text-sm">
            <p className="text-cyan-400 font-semibold">AVAILABLE CYBER COMMANDS:</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-zinc-300">
              <div><span className="text-emerald-400 font-mono font-semibold">about</span> - Background & mission</div>
              <div><span className="text-emerald-400 font-mono font-semibold">skills</span> - Focus areas & technical stack</div>
              <div><span className="text-emerald-400 font-mono font-semibold">education</span> - Academic track & school portal</div>
              <div><span className="text-emerald-400 font-mono font-semibold">threat-level</span> - Live system threat diagnostics</div>
              <div><span className="text-emerald-400 font-mono font-semibold">contact</span> - Email & contact endpoints</div>
              <div><span className="text-emerald-400 font-mono font-semibold">socials</span> - GitHub and LinkedIn links</div>
              <div><span className="text-emerald-400 font-mono font-semibold">neofetch</span> - System specification banner</div>
              <div><span className="text-emerald-400 font-mono font-semibold">matrix</span> - Toggle cyber cipher stream</div>
              <div><span className="text-emerald-400 font-mono font-semibold">ping</span> - Test latency to {SITE.domain}</div>
              <div><span className="text-emerald-400 font-mono font-semibold">whoami</span> - Current security session role</div>
              <div><span className="text-emerald-400 font-mono font-semibold">clear</span> - Clear terminal buffer</div>
            </div>
          </div>
        );
        break;

      case "about":
      case "bio":
        resultNode = (
          <div className="space-y-2 text-xs sm:text-sm text-zinc-300">
            <p className="font-semibold text-emerald-400">[IDENTITY DOSSIER: {SITE.name.toUpperCase()}]</p>
            <p className="leading-relaxed">{SITE.bio}</p>
            <div className="mt-2 rounded-lg border border-zinc-800 bg-zinc-900/60 p-3 text-xs">
              <p className="text-cyan-400 font-semibold mb-1">Focus & Philosophy:</p>
              <p className="text-zinc-400">
                Studio dei protocolli di rete, architetture Linux, sicurezza applicativa e sviluppo di software resiliente.
              </p>
            </div>
          </div>
        );
        break;

      case "skills":
      case "focus":
        resultNode = (
          <div className="space-y-3 text-xs sm:text-sm">
            <p className="font-semibold text-emerald-400">[ACTIVE FOCUS AREAS & STACK]</p>
            <div className="flex flex-wrap gap-2">
              {SITE.focusAreas.map((skill, index) => (
                <span
                  key={index}
                  className="rounded border border-emerald-500/40 bg-emerald-950/40 px-2.5 py-1 font-mono text-xs text-emerald-300 shadow-[0_0_10px_rgba(16,185,129,0.15)]"
                >
                  ✓ {skill}
                </span>
              ))}
            </div>
            <p className="text-[11px] text-zinc-400">
              Stack verification: Linux kernel networking, security primitives, Python tooling, TypeScript/React/Next.js frontend.
            </p>
          </div>
        );
        break;

      case "education":
      case "school":
        resultNode = (
          <div className="space-y-2 text-xs sm:text-sm text-zinc-300">
            <p className="font-semibold text-cyan-400">[ACADEMIC NODE]</p>
            <p className="text-white font-medium">{SITE.school.name}</p>
            <p className="text-emerald-400 font-mono">{SITE.school.course}</p>
            <p className="leading-relaxed text-zinc-400">{SITE.school.description}</p>
            <div className="flex flex-wrap gap-3 pt-1">
              <a
                href={SITE.school.officialSite}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-cyan-400 underline hover:text-cyan-300"
              >
                &gt; Sito Istituzionale: {SITE.school.officialSite}
              </a>
              <a
                href={SITE.school.classeViva}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-emerald-400 underline hover:text-emerald-300"
              >
                &gt; Registro: {SITE.school.classeViva}
              </a>
            </div>
          </div>
        );
        break;

      case "threat-level":
      case "status":
        resultNode = (
          <div className="space-y-2 font-mono text-xs sm:text-sm">
            <p className="text-emerald-400 font-bold">[SECURITY SCAN DIAGNOSTIC REPORT]</p>
            <div className="space-y-1 text-zinc-300 border-l-2 border-emerald-500/50 pl-3">
              <p><span className="text-emerald-400">[✓] FIREWALL STATUS:</span> UFW / IPTABLES ENFORCED</p>
              <p><span className="text-emerald-400">[✓] PROTOCOL ENCRYPTION:</span> TLS 1.3 / ECDHE-RSA-AES256-GCM</p>
              <p><span className="text-emerald-400">[✓] PORT AUDIT:</span> 443/HTTPS OPEN | 22/SSH KEY-AUTH ONLY | 80/REDIRECT</p>
              <p><span className="text-emerald-400">[✓] ZERO-TRUST POLICY:</span> NOMINAL</p>
              <p><span className="text-emerald-400">[✓] INTRUSION LEVEL:</span> 0 ANOMALIES DETECTED</p>
              <p className="text-cyan-400 font-semibold pt-1">OVERALL THREAT LEVEL: LOW (DEFCON 5)</p>
            </div>
          </div>
        );
        break;

      case "contact":
      case "email":
        resultNode = (
          <div className="space-y-2 text-xs sm:text-sm text-zinc-300">
            <p className="font-semibold text-emerald-400">[COMMUNICATION CHANNELS]</p>
            <p>
              <span className="text-zinc-500">Email:</span>{" "}
              <a href={`mailto:${SITE.email}`} className="text-cyan-400 underline hover:text-cyan-300">
                {SITE.email}
              </a>
            </p>
            <p>
              <span className="text-zinc-500">Location:</span> {SITE.location}
            </p>
            <p>
              <span className="text-zinc-500">Client Mail:</span>{" "}
              <a
                href={SITE.contactUrl}
                className="text-emerald-400 underline hover:text-emerald-300"
              >
                Apri client email ({SITE.email})
              </a>
            </p>
            <p>
              <span className="text-zinc-500">Gmail Web:</span>{" "}
              <a
                href={SITE.gmailUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-emerald-400 underline hover:text-emerald-300"
              >
                Invia via Gmail nel browser ↗
              </a>
            </p>
          </div>
        );
        break;

      case "socials":
      case "links":
        resultNode = (
          <div className="space-y-2 text-xs sm:text-sm text-zinc-300">
            <p className="font-semibold text-cyan-400">[PUBLIC PROFILES & REPOSITORIES]</p>
            <div className="space-y-1">
              <p>
                <span className="text-emerald-400 font-mono">GitHub:</span>{" "}
                <a
                  href={SITE.socials.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline hover:text-white"
                >
                  {SITE.socials.github}
                </a>
              </p>
              <p>
                <span className="text-cyan-400 font-mono">LinkedIn:</span>{" "}
                <a
                  href={SITE.socials.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline hover:text-white"
                >
                  {SITE.socials.linkedin}
                </a>
              </p>
            </div>
          </div>
        );
        break;

      case "neofetch":
      case "sysinfo":
        resultNode = (
          <div className="space-y-2 font-mono text-xs text-emerald-400 sm:text-sm">
            <pre className="text-cyan-400 select-none text-[11px] leading-tight">
{`   /\\_/\\
  ( o.o )  0xVihanga Security Kernel
   > ^ <   =========================
`}
            </pre>
            <div className="text-zinc-300 space-y-0.5">
              <p><span className="text-emerald-400">Host:</span> {SITE.domain} ({SITE.location})</p>
              <p><span className="text-emerald-400">Uptime:</span> 99.98% / Active</p>
              <p><span className="text-emerald-400">Kernel:</span> 6.8.0-cyber-telecom</p>
              <p><span className="text-emerald-400">Shell:</span> /bin/zsh</p>
              <p><span className="text-emerald-400">Security Clearance:</span> Guest / Authorized</p>
            </div>
          </div>
        );
        break;

      case "matrix":
        setMatrixActive((prev) => !prev);
        resultNode = (
          <p className="text-emerald-400 font-mono text-xs">
            Matrix stream toggled. {matrixActive ? "Cipher disengaged." : "Cipher sequence activated."}
          </p>
        );
        break;

      case "ping":
        resultNode = (
          <div className="space-y-1 font-mono text-xs text-zinc-300">
            <p>PING {SITE.domain} (104.21.48.112): 56 data bytes</p>
            <p>64 bytes from 104.21.48.112: icmp_seq=0 ttl=58 time=13.4 ms</p>
            <p>64 bytes from 104.21.48.112: icmp_seq=1 ttl=58 time=14.1 ms</p>
            <p>64 bytes from 104.21.48.112: icmp_seq=2 ttl=58 time=12.9 ms</p>
            <p className="text-emerald-400 font-semibold pt-1">--- {SITE.domain} ping statistics: 0% packet loss, avg rtt 13.4ms ---</p>
          </div>
        );
        break;

      case "whoami":
        resultNode = (
          <p className="text-emerald-300 font-mono text-xs sm:text-sm">
            visitor@vihanga.it [AUTHENTICATED GUEST - IP: ENCRYPTED - PERMISSIONS: READ-ONLY]
          </p>
        );
        break;

      case "date":
        resultNode = (
          <p className="text-cyan-300 font-mono text-xs sm:text-sm">
            {new Date().toUTCString()}
          </p>
        );
        break;

      case "sudo":
        resultNode = (
          <div className="rounded border border-red-500/40 bg-red-950/30 p-2 font-mono text-xs text-red-400">
            [ACCESS DENIED] User &quot;visitor&quot; is not in the sudoers file. This incident will be logged and reported to 0xVihanga.
          </div>
        );
        break;

      case "clear":
        setOutputs([]);
        setInput("");
        return;

      default:
        resultNode = (
          <div className="space-y-1 text-xs">
            <p className="text-red-400 font-mono">
              Command not recognized: <span className="text-white">&quot;{cleanCmd}&quot;</span>
            </p>
            <p className="text-zinc-500 font-mono">
              Type <button onClick={() => handleCommand("help")} className="text-emerald-400 underline">&quot;help&quot;</button> to inspect valid instructions.
            </p>
          </div>
        );
        break;
    }

    setOutputs((prev) => [
      ...prev,
      {
        id: Math.random().toString(36).substring(7),
        command: cleanCmd,
        output: resultNode,
        timestamp: now,
      },
    ]);
    setInput("");
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleCommand(input);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (history.length > 0) {
        const nextIndex = historyIndex === -1 ? history.length - 1 : Math.max(0, historyIndex - 1);
        setHistoryIndex(nextIndex);
        setInput(history[nextIndex]);
      }
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (historyIndex !== -1) {
        const nextIndex = historyIndex + 1;
        if (nextIndex >= history.length) {
          setHistoryIndex(-1);
          setInput("");
        } else {
          setHistoryIndex(nextIndex);
          setInput(history[nextIndex]);
        }
      }
    } else if (e.key === "Tab") {
      e.preventDefault();
      const suggestions = ["help", "skills", "about", "education", "threat-level", "contact", "socials", "neofetch", "matrix", "ping", "clear"];
      const match = suggestions.find((s) => s.startsWith(input.toLowerCase()));
      if (match) {
        setInput(match);
      }
    }
  };

  const copyOutputs = () => {
    const text = outputs
      .map((o) => `$ ${o.command}`)
      .join("\n");
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const quickCommands = ["help", "about", "skills", "education", "threat-level", "matrix", "contact", "clear"];

  return (
    <section 
      id="terminal"
      className={`relative my-8 rounded-xl border border-zinc-800/80 bg-zinc-950/90 font-mono text-zinc-100 shadow-2xl backdrop-blur-xl transition-all duration-300 ${
        isExpanded ? "fixed inset-4 z-50 overflow-hidden md:inset-10" : ""
      }`}
    >
      {/* Corner HUD Cyber Accents */}
      <div className="hud-corner-tl" />
      <div className="hud-corner-tr" />
      <div className="hud-corner-bl" />
      <div className="hud-corner-br" />

      {/* Terminal Title Bar */}
      <div className="flex items-center justify-between border-b border-zinc-800/80 bg-zinc-900/60 px-4 py-2.5">
        <div className="flex items-center gap-2">
          {/* OS Window Dots */}
          <div className="flex items-center gap-1.5">
            <span className="h-3 w-3 rounded-full bg-red-500/80 hover:bg-red-400 transition-colors cursor-pointer" onClick={() => setOutputs([])} title="Clear terminal" />
            <span className="h-3 w-3 rounded-full bg-amber-500/80 hover:bg-amber-400 transition-colors cursor-pointer" onClick={() => setIsExpanded(!isExpanded)} title="Toggle resize" />
            <span className="h-3 w-3 rounded-full bg-emerald-500/80 hover:bg-emerald-400 transition-colors cursor-pointer" onClick={() => handleCommand("threat-level")} title="Run diagnostics" />
          </div>

          <div className="ml-2 flex items-center gap-2 text-xs font-mono text-zinc-400">
            <TerminalIcon className="h-3.5 w-3.5 text-emerald-400" />
            <span className="text-zinc-300 font-medium">visitor@{SITE.domain}:~</span>
            <span className="hidden rounded bg-emerald-950/60 px-1.5 py-0.5 text-[10px] text-emerald-400 border border-emerald-500/30 sm:inline">
              CLI ACTIVE
            </span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2">
          <button
            onClick={copyOutputs}
            className="flex items-center gap-1 rounded px-2 py-1 text-xs text-zinc-400 hover:bg-zinc-800 hover:text-zinc-200 transition-colors"
            title="Copy command history"
          >
            {copied ? <Check className="h-3.5 w-3.5 text-emerald-400" /> : <Copy className="h-3.5 w-3.5" />}
            <span className="hidden sm:inline">{copied ? "Copied" : "Copy"}</span>
          </button>

          <button
            onClick={() => setOutputs([])}
            className="flex items-center gap-1 rounded px-2 py-1 text-xs text-zinc-400 hover:bg-zinc-800 hover:text-zinc-200 transition-colors"
            title="Reset Terminal"
          >
            <RotateCcw className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">Reset</span>
          </button>

          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="rounded p-1 text-zinc-400 hover:bg-zinc-800 hover:text-zinc-200 transition-colors"
            title={isExpanded ? "Restore" : "Expand"}
          >
            {isExpanded ? <Minimize2 className="h-3.5 w-3.5" /> : <Maximize2 className="h-3.5 w-3.5" />}
          </button>

          {isModal && onClose && (
            <button
              onClick={onClose}
              className="ml-2 rounded px-2 py-0.5 text-xs text-red-400 hover:bg-red-950/40 border border-red-500/30"
            >
              ESC
            </button>
          )}
        </div>
      </div>

      {/* Quick Interactive Command Pills */}
      <div className="flex items-center gap-1.5 overflow-x-auto border-b border-zinc-800/40 bg-zinc-900/30 px-4 py-2 text-xs no-scrollbar">
        <span className="text-[11px] uppercase tracking-wider text-zinc-500 shrink-0 flex items-center gap-1">
          <Sparkles className="h-3 w-3 text-cyan-400" /> Suggestions:
        </span>
        {quickCommands.map((cmd) => (
          <button
            key={cmd}
            onClick={() => handleCommand(cmd)}
            className="shrink-0 rounded-md border border-zinc-800 bg-zinc-900/80 px-2 py-0.5 font-mono text-[11px] text-zinc-400 hover:border-emerald-500/50 hover:bg-emerald-950/30 hover:text-emerald-300 transition-all active:scale-95"
          >
            {cmd}
          </button>
        ))}
      </div>

      {/* Terminal Body */}
      <div
        onClick={() => inputRef.current?.focus()}
        className={`overflow-y-auto p-4 sm:p-5 text-xs sm:text-sm font-mono cursor-text ${
          isExpanded ? "h-[calc(100%-110px)]" : "max-h-[380px] min-h-[220px]"
        }`}
      >
        {/* Matrix Rain effect snippet when active */}
        {matrixActive && (
          <div className="mb-4 rounded border border-emerald-500/30 bg-black/60 p-2 font-mono text-xs text-emerald-400 select-none overflow-hidden animate-pulse">
            01010110 01101001 01101000 01100001 01101110 01100111 01100001 [CIPHER STREAM RUNNING]
            <br />
            0x73 0x65 0x63 0x75 0x72 0x69 0x74 0x79 0x20 0x70 0x6f 0x72 0x74 0x66 0x6f 0x6c 0x69 0x6f
          </div>
        )}

        {/* Command output history */}
        <div className="space-y-4">
          {outputs.map((item) => (
            <div key={item.id} className="space-y-1.5">
              <div className="flex items-center gap-2 text-zinc-400">
                <span className="text-emerald-400 font-semibold">&gt;</span>
                <span className="text-zinc-500">visitor@{SITE.domain}:~$</span>
                <span className="text-white font-medium">{item.command}</span>
                <span className="ml-auto text-[10px] text-zinc-600">{item.timestamp}</span>
              </div>
              <div className="pl-4 text-zinc-200">{item.output}</div>
            </div>
          ))}
        </div>

        {/* Current Active Input Prompt */}
        <div className="mt-3 flex items-center gap-2">
          <span className="text-emerald-400 font-semibold">&gt;</span>
          <span className="text-zinc-500 shrink-0">visitor@{SITE.domain}:~$</span>
          <div className="relative flex-grow">
            <input
              ref={inputRef}
              id="terminal-input"
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              spellCheck={false}
              autoComplete="off"
              className="w-full bg-transparent text-emerald-300 caret-emerald-400 outline-none font-mono text-xs sm:text-sm placeholder-zinc-600"
              placeholder="type 'help' or any command..."
            />
          </div>
        </div>

        <div ref={terminalEndRef} />
      </div>

      {/* Terminal Footer Info */}
      <div className="flex items-center justify-between border-t border-zinc-800/80 bg-zinc-950 px-4 py-1.5 text-[11px] text-zinc-500">
        <span className="flex items-center gap-1.5">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
          <span>Interactive Shell</span>
        </span>
        <span className="hidden sm:inline">Use ↑ / ↓ for history • Tab for autocomplete</span>
      </div>
    </section>
  );
}
