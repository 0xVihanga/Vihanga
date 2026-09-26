"use client";

import { useEffect, useState } from "react";
import { Shield, Clock, Wifi, Lock, Activity } from "lucide-react";

interface SystemStatusWidgetProps {
  variant?: "compact" | "full";
}

export default function SystemStatusWidget({ variant = "compact" }: SystemStatusWidgetProps) {
  const [utcTime, setUtcTime] = useState<string>("");
  const [latency, setLatency] = useState<number>(14);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const hours = String(now.getUTCHours()).padStart(2, "0");
      const minutes = String(now.getUTCMinutes()).padStart(2, "0");
      const seconds = String(now.getUTCSeconds()).padStart(2, "0");
      setUtcTime(`${hours}:${minutes}:${seconds} UTC`);
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);

    // Subtle realistic latency fluctuation
    const latencyInterval = setInterval(() => {
      setLatency(Math.floor(Math.random() * 8) + 12);
    }, 4000);

    return () => {
      clearInterval(interval);
      clearInterval(latencyInterval);
    };
  }, []);

  if (variant === "compact") {
    return (
      <div 
        id="system-status-compact"
        className="inline-flex items-center gap-2.5 rounded-full border border-emerald-500/30 bg-emerald-950/20 px-3 py-1 text-xs font-mono text-emerald-300 shadow-[0_0_15px_-3px_rgba(16,185,129,0.2)] backdrop-blur-md"
      >
        <span className="relative flex h-2 w-2">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_8px_#34d399]" />
        </span>
        <span className="font-semibold tracking-wider text-emerald-400">SYS: ONLINE</span>
        <span className="text-zinc-600">|</span>
        <span className="text-zinc-400">THREAT: <span className="font-medium text-emerald-400">LOW</span></span>
        {utcTime && (
          <>
            <span className="hidden text-zinc-600 sm:inline">|</span>
            <span className="hidden items-center gap-1 text-zinc-400 sm:inline-flex">
              <Clock className="h-3 w-3 text-cyan-400" />
              <span>{utcTime}</span>
            </span>
          </>
        )}
      </div>
    );
  }

  // Full telemetry status bar
  return (
    <div 
      id="system-status-full"
      className="relative overflow-hidden rounded-xl border border-zinc-800/80 bg-zinc-950/60 p-3.5 backdrop-blur-xl shadow-lg shadow-black/40"
    >
      <div className="hud-corner-tl" />
      <div className="hud-corner-tr" />
      <div className="hud-corner-bl" />
      <div className="hud-corner-br" />

      <div className="flex flex-wrap items-center justify-between gap-3 text-xs font-mono">
        {/* Left: Status & Threat Level */}
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-2 rounded-md border border-emerald-500/30 bg-emerald-950/30 px-2.5 py-1 text-emerald-300">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_8px_#34d399]" />
            </span>
            <span className="font-semibold tracking-wider text-emerald-400">STATUS: ONLINE</span>
          </div>

          <div className="flex items-center gap-1.5 rounded-md border border-cyan-500/30 bg-cyan-950/30 px-2.5 py-1 text-cyan-300">
            <Shield className="h-3.5 w-3.5 text-cyan-400" />
            <span>THREAT LEVEL: <strong className="text-cyan-300">LOW (DEFCON 5)</strong></span>
          </div>

          <div className="hidden items-center gap-1.5 rounded-md border border-zinc-800 bg-zinc-900/50 px-2.5 py-1 text-zinc-400 md:flex">
            <Lock className="h-3.5 w-3.5 text-emerald-400" />
            <span>SEC-CHANNEL: TLS 1.3</span>
          </div>
        </div>

        {/* Right: Latency & Real-time UTC */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 text-zinc-400">
            <Activity className="h-3.5 w-3.5 text-emerald-400 animate-pulse" />
            <span>RTT: <span className="text-emerald-400">{latency}ms</span></span>
          </div>

          <div className="flex items-center gap-1.5 rounded-md border border-zinc-800 bg-zinc-900/80 px-2.5 py-1 text-zinc-300">
            <Clock className="h-3.5 w-3.5 text-cyan-400" />
            <span>{utcTime || "00:00:00 UTC"}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
