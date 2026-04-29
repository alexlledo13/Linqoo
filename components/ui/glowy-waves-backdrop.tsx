"use client";

import { ReactNode, useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

type Point = {
  x: number;
  y: number;
};

type GlowyWavesBackdropProps = {
  children: ReactNode;
  className?: string;
  contentClassName?: string;
};

export function GlowyWavesBackdrop({
  children,
  className,
  contentClassName
}: GlowyWavesBackdropProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const mouseRef = useRef<Point>({ x: 0, y: 0 });
  const targetMouseRef = useRef<Point>({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return undefined;

    const ctx = canvas.getContext("2d");
    if (!ctx) return undefined;

    let animationId = 0;
    let time = 0;

    const resizeCanvas = () => {
      const parent = canvas.parentElement;
      canvas.width = parent?.clientWidth ?? window.innerWidth;
      canvas.height = parent?.clientHeight ?? window.innerHeight;
    };

    const recenterMouse = () => {
      const centerPoint = { x: canvas.width / 2, y: canvas.height / 2 };
      mouseRef.current = centerPoint;
      targetMouseRef.current = centerPoint;
    };

    const handleResize = () => {
      resizeCanvas();
      recenterMouse();
    };

    const handleMouseMove = (event: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      targetMouseRef.current = {
        x: event.clientX - rect.left,
        y: event.clientY - rect.top
      };
    };

    const handleMouseLeave = () => {
      recenterMouse();
    };

    const drawWave = (
      amplitude: number,
      frequency: number,
      offset: number,
      color: string,
      opacity: number
    ) => {
      ctx.save();
      ctx.beginPath();

      for (let x = 0; x <= canvas.width; x += 5) {
        const dx = x - mouseRef.current.x;
        const dy = canvas.height / 2 - mouseRef.current.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        const influence = Math.max(0, 1 - distance / 320);
        const mouseEffect = influence * 48 * Math.sin(time * 0.001 + x * 0.012 + offset);

        const y =
          canvas.height / 2 +
          Math.sin(x * frequency + time * 0.018 + offset) * amplitude +
          Math.sin(x * frequency * 0.45 + time * 0.024 + offset) * (amplitude * 0.55) +
          mouseEffect;

        if (x === 0) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }
      }

      ctx.lineWidth = 2.25;
      ctx.strokeStyle = color;
      ctx.globalAlpha = opacity;
      ctx.shadowBlur = 32;
      ctx.shadowColor = color;
      ctx.stroke();
      ctx.restore();
    };

    const animate = () => {
      time += 1;

      mouseRef.current.x += (targetMouseRef.current.x - mouseRef.current.x) * 0.08;
      mouseRef.current.y += (targetMouseRef.current.y - mouseRef.current.y) * 0.08;

      const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
      gradient.addColorStop(0, "rgba(255,255,255,0.96)");
      gradient.addColorStop(0.72, "rgba(246,249,255,0.72)");
      gradient.addColorStop(1, "rgba(255,255,255,0.96)");
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      drawWave(68, 0.008, 0, "rgba(94,25,230,0.34)", 0.48);
      drawWave(92, 0.0062, Math.PI / 2, "rgba(59,130,246,0.22)", 0.34);
      drawWave(56, 0.009, Math.PI, "rgba(124,58,237,0.2)", 0.28);

      animationId = window.requestAnimationFrame(animate);
    };

    resizeCanvas();
    recenterMouse();
    window.addEventListener("resize", handleResize);
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseleave", handleMouseLeave);
    animationId = window.requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseleave", handleMouseLeave);
      window.cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <div className={cn("relative overflow-hidden", className)}>
      <canvas ref={canvasRef} aria-hidden="true" className="absolute inset-0 h-full w-full" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(94,25,230,0.06),transparent_34%)]" />
      <div className={cn("relative", contentClassName)}>{children}</div>
    </div>
  );
}
