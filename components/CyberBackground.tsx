"use client";

import { useEffect, useRef } from "react";

export default function CyberBackground() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener("resize", handleResize);

    // Subtle floating nodes / cyber particles
    const particleCount = Math.min(35, Math.floor(width / 35));
    const particles: {
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      color: string;
      alpha: number;
    }[] = [];

    const colors = ["#10b981", "#06b6d4", "#00ff9d", "#38bdf8"];

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.35,
        vy: (Math.random() - 0.5) * 0.35,
        size: Math.random() * 1.8 + 0.8,
        color: colors[Math.floor(Math.random() * colors.length)],
        alpha: Math.random() * 0.4 + 0.1,
      });
    }

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Connect nearby particles with subtle cyber wires
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 120) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(16, 185, 129, ${0.12 * (1 - dist / 120)})`;
            ctx.lineWidth = 0.6;
            ctx.stroke();
          }
        }
      }

      // Draw particles
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.alpha;
        ctx.shadowBlur = 8;
        ctx.shadowColor = p.color;
        ctx.fill();
        ctx.shadowBlur = 0;
        ctx.globalAlpha = 1;
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden" aria-hidden="true">
      {/* Deep Cyber Void Background */}
      <div className="absolute inset-0 bg-[#05080f]" />

      {/* Cyber Grid with Radial Fade */}
      <div 
        className="absolute inset-0 bg-cyber-grid opacity-30 [mask-image:radial-gradient(ellipse_at_center,black_40%,transparent_80%)]" 
      />

      {/* Dot Matrix Layer */}
      <div 
        className="absolute inset-0 bg-cyber-dots opacity-25 [mask-image:radial-gradient(ellipse_at_top,black_50%,transparent_90%)]" 
      />

      {/* Futuristic Mesh Glow Orbs */}
      <div className="absolute -top-32 left-1/2 h-[550px] w-[950px] -translate-x-1/2 rounded-full bg-gradient-to-b from-emerald-500/10 via-cyan-500/5 to-transparent blur-[120px]" />
      <div className="absolute top-[40%] -right-48 h-[400px] w-[500px] rounded-full bg-emerald-500/5 blur-[100px]" />
      <div className="absolute bottom-10 -left-48 h-[400px] w-[500px] rounded-full bg-cyan-500/5 blur-[100px]" />

      {/* Interactive Cyber Canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full opacity-60" />

      {/* Subtle Scanline Overlay */}
      <div className="scanline-bg absolute inset-0 opacity-[0.03]" />
    </div>
  );
}
