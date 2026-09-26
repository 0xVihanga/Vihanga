"use client";

import React, { useState, useEffect } from "react";
import { SITE } from "../config/site";
import { Mail, Check, ExternalLink } from "lucide-react";

function GmailIcon() {
  return (
    <svg
      className="h-4 w-4 fill-current text-red-400/90 transition-colors group-hover:text-red-300"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <path d="M24 5.457v13.909c0 .904-.732 1.636-1.636 1.636h-3.819V11.73L12 16.64l-6.545-4.91v9.273H1.636A1.636 1.636 0 0 1 0 19.366V5.457c0-2.023 2.309-3.178 3.927-1.964L5.455 4.64 12 9.548l6.545-4.91 1.528-1.145C21.69 2.28 24 3.434 24 5.457z" />
    </svg>
  );
}

function fallbackCopy(text: string) {
  try {
    const textArea = document.createElement("textarea");
    textArea.value = text;
    textArea.style.position = "fixed";
    textArea.style.left = "-999999px";
    textArea.style.top = "-999999px";
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    document.execCommand("copy");
    textArea.remove();
  } catch (err) {
    console.error("Fallback copy failed:", err);
  }
}

export default function ContactEmailActions() {
  const [copied, setCopied] = useState<boolean>(false);

  useEffect(() => {
    if (!copied) return;
    const timer = setTimeout(() => {
      setCopied(false);
    }, 3500);
    return () => clearTimeout(timer);
  }, [copied]);

  const handleEmailClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    // 1. Copy email address to clipboard
    try {
      if (typeof navigator !== "undefined" && navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(SITE.email).then(() => {
          setCopied(true);
        }).catch(() => {
          fallbackCopy(SITE.email);
          setCopied(true);
        });
      } else {
        fallbackCopy(SITE.email);
        setCopied(true);
      }
    } catch {
      fallbackCopy(SITE.email);
      setCopied(true);
    }

    // 2. Trigger mailto to open default mail client
    if (typeof window !== "undefined") {
      window.location.href = SITE.contactUrl;
    }
  };

  return (
    <div className="relative inline-flex flex-wrap items-center gap-3">
      {/* Toast / Tooltip Feedback */}
      {copied && (
        <div
          role="status"
          aria-live="polite"
          className="absolute -top-12 left-0 z-30 flex items-center gap-2 rounded-lg border border-emerald-500/40 bg-zinc-950/95 px-3 py-1.5 text-xs font-medium text-emerald-400 shadow-xl shadow-black/60 backdrop-blur-md transition-all animate-in fade-in slide-in-from-bottom-2 duration-200"
        >
          <Check className="h-3.5 w-3.5 text-emerald-400 flex-shrink-0" />
          <span>Email copied to clipboard!</span>
          <span className="hidden font-mono text-zinc-400 sm:inline">({SITE.email})</span>
        </div>
      )}

      {/* Primary Email Button with Fallback Click Handler */}
      <a
        href={SITE.contactUrl}
        onClick={handleEmailClick}
        title={`Invia email a ${SITE.email} (copia automatica negli appunti)`}
        className="inline-flex items-center justify-center gap-2 rounded-lg bg-zinc-100 px-5 py-2.5 text-sm font-medium text-zinc-950 shadow-sm transition-all duration-200 hover:bg-white hover:shadow-md hover:shadow-zinc-100/10 active:scale-[0.98]"
      >
        {copied ? (
          <>
            <Check className="h-4 w-4 text-emerald-600" />
            <span className="text-emerald-950 font-semibold">Email copiata!</span>
          </>
        ) : (
          <>
            <Mail className="h-4 w-4" />
            <span>Contattami</span>
          </>
        )}
      </a>

      {/* Alternative Secondary Link for Gmail Web users */}
      <a
        href={SITE.gmailUrl}
        target="_blank"
        rel="noopener noreferrer"
        title="Apri direttamente in Gmail Web nel browser"
        className="group inline-flex items-center justify-center gap-2 rounded-lg border border-zinc-800/80 bg-zinc-900/40 px-4 py-2.5 text-sm font-medium text-zinc-300 shadow-sm transition-all duration-200 hover:border-zinc-700 hover:bg-zinc-800/60 hover:text-zinc-100 active:scale-[0.98]"
      >
        <GmailIcon />
        <span>Gmail Web</span>
        <ExternalLink className="h-3.5 w-3.5 text-zinc-500 transition-colors group-hover:text-zinc-300" />
      </a>
    </div>
  );
}
