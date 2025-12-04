"use client";

import React, { useEffect, useRef } from "react";
import { motion, useMotionValue, useSpring, MotionValue } from "framer-motion";

// --- CONFIGURACIÓN ---
const PARTICLE_COUNT = 40; // Cantidad de partículas de polvo (ligero aumento)
const BEAM_COUNT = 3; // Cantidad de haces de luz

interface ParticleBeamsProps {
  containerRef: React.RefObject<HTMLDivElement>;
  wordRefs: React.MutableRefObject<Map<string, HTMLSpanElement>>;
  videoRef: React.RefObject<HTMLVideoElement>;
  mouseX: MotionValue<number>;
  mouseY: MotionValue<number>;
}

interface ReactiveParticleProps extends ParticleBeamsProps {}

export const ParticleBeams = ({
  containerRef,
  wordRefs,
  videoRef,
  mouseX,
  mouseY,
}: ParticleBeamsProps) => {
  return (
    <div className="pointer-events-none absolute inset-0 w-full h-full overflow-hidden z-[1]">
      {/* 1. Haces de Luz (Beams) - Capa de fondo */}
      <div className="absolute inset-0 z-0">
        {Array.from({ length: BEAM_COUNT }).map((_, i) => (
          <LightBeam key={`beam-${i}`} index={i} />
        ))}
      </div>

      {/* 2. Partículas Reactivas - Capa superior */}
      <div className="absolute inset-0 z-10">
        {Array.from({ length: PARTICLE_COUNT }).map((_, i) => (
          <ReactiveParticle
            key={`part-${i}`}
            containerRef={containerRef}
            wordRefs={wordRefs}
            videoRef={videoRef}
            mouseX={mouseX}
            mouseY={mouseY}
          />
        ))}
      </div>

      {/* Gradiente de superposición para suavizar bordes (opcional) */}
      <div className="absolute inset-0 bg-gradient-to-t from-neutral-50/80 via-transparent to-transparent z-20" />
    </div>
  );
};

// --- SUBCOMPONENTE: Haz de Luz (Light Beam) ---
const LightBeam = ({ index }: { index: number }) => {
  // Variación aleatoria controlada basada en el índice
  const isEven = index % 2 === 0;
  const delay = index * 2;
  const duration = 15 + index * 5; // Entre 15s y 25s (muy lento)

  return (
    <motion.div
      initial={{ x: "-100%", opacity: 0, rotate: -45 }}
      animate={{
        x: ["-100%", "200%"], // Cruza toda la pantalla
        opacity: [0, 0.4, 0], // Aparece y desaparece suavemente
      }}
      transition={{
        duration,
        repeat: Infinity,
        ease: "linear",
        delay,
        repeatDelay: 2, // Pausa antes de repetir
      }}
      className={`absolute top-0 bottom-0 w-[20%] blur-3xl transform-gpu ${
        isEven ? "bg-primary" : "bg-secondary"
      }`}
      style={{
        left: `${index * 30}%`, // Posición inicial escalonada
        mixBlendMode: "multiply", // Fusión suave con el fondo blanco
      }}
    />
  );
};

// --- SUBCOMPONENTE: Partícula Reactiva (Reactive Particle) ---
const ReactiveParticle = ({
  containerRef,
  wordRefs,
  videoRef,
  mouseX,
  mouseY,
}: ReactiveParticleProps) => {
  // Propiedades fijas por partícula (no cambian entre renders)
  const initialXPercentRef = useRef(Math.random() * 100); // 0–100%
  const initialYPercentRef = useRef(Math.random() * 100); // 0–100%
  const sizeRef = useRef(Math.random() * 3 + 3); // 3px–6px

  // Movimiento de flotación muy lento (solo eje Y interno)
  const floatDurationRef = useRef(Math.random() * 15 + 20); // 20s–35s
  const floatYRef = useRef(Math.random() * 30 - 15); // -15px–15px

  // Offset dinámico (repulsión + rebotes)
  const offsetX = useMotionValue(0);
  const offsetY = useMotionValue(0);

  // Spring suave y lento
  const springConfig = { damping: 25, stiffness: 25, mass: 1 };
  const springX = useSpring(offsetX, springConfig);
  const springY = useSpring(offsetY, springConfig);

  useEffect(() => {
    let frameId: number;

    const update = () => {
      const container = containerRef.current;
      if (!container) {
        frameId = requestAnimationFrame(update);
        return;
      }

      const width = container.clientWidth;
      const height = container.clientHeight;

      const baseX = (initialXPercentRef.current / 100) * width;
      const baseY = (initialYPercentRef.current / 100) * height;

      let targetOffsetX = offsetX.get();
      let targetOffsetY = offsetY.get();

      const currentX = baseX + targetOffsetX;
      const currentY = baseY + targetOffsetY;

      // --- 1) Repulsión suave con el mouse ---
      const mX = mouseX.get();
      const mY = mouseY.get();

      const dxMouse = mX - currentX;
      const dyMouse = mY - currentY;
      const distMouse = Math.sqrt(dxMouse * dxMouse + dyMouse * dyMouse);

      const mouseRadius = 120; // Radio de influencia más preciso (menor área)
      const maxMouseForce = 20; // Fuerza máxima en px (más controlada)

      if (distMouse > 0 && distMouse < mouseRadius) {
        const strength = (mouseRadius - distMouse) / mouseRadius;
        const force = maxMouseForce * strength;
        targetOffsetX -= (dxMouse / distMouse) * force;
        targetOffsetY -= (dyMouse / distMouse) * force;
      }

      // --- 2) Rebote contra video + letras ---
      const size = sizeRef.current;
      const half = size / 2;

      const particleRect = {
        left: currentX - half,
        right: currentX + half,
        top: currentY - half,
        bottom: currentY + half,
      };

      const containerRect = container.getBoundingClientRect();

      const applyBounceFromRect = (rect: {
        left: number;
        right: number;
        top: number;
        bottom: number;
      }) => {
        // Margen pequeño para evitar falsos positivos y hacer el contacto más nítido
        const margin = 2;
        const left = rect.left + margin;
        const right = rect.right - margin;
        const top = rect.top + margin;
        const bottom = rect.bottom - margin;

        const intersects = !(
          particleRect.right < left ||
          particleRect.left > right ||
          particleRect.bottom < top ||
          particleRect.top > bottom
        );

        if (!intersects) return;

        const overlapLeft = particleRect.right - left;
        const overlapRight = right - particleRect.left;
        const overlapTop = particleRect.bottom - top;
        const overlapBottom = bottom - particleRect.top;

        const minOverlap = Math.min(
          overlapLeft,
          overlapRight,
          overlapTop,
          overlapBottom
        );

        const bounceStrength = 1.05; // Pequeño extra para sacarla del borde

        if (minOverlap === overlapLeft) {
          targetOffsetX -= overlapLeft * bounceStrength;
        } else if (minOverlap === overlapRight) {
          targetOffsetX += overlapRight * bounceStrength;
        } else if (minOverlap === overlapTop) {
          targetOffsetY -= overlapTop * bounceStrength;
        } else {
          targetOffsetY += overlapBottom * bounceStrength;
        }
      };

      // Rebote con la caja del video
      if (videoRef.current) {
        const vDom = videoRef.current.getBoundingClientRect();
        applyBounceFromRect({
          left: vDom.left - containerRect.left,
          right: vDom.right - containerRect.left,
          top: vDom.top - containerRect.top,
          bottom: vDom.bottom - containerRect.top,
        });
      }

      // Rebote con cada palabra del About (usa los mismos refs que el highlight)
      wordRefs.current.forEach((element) => {
        if (!element) return;
        const wDom = element.getBoundingClientRect();
        applyBounceFromRect({
          left: wDom.left - containerRect.left,
          right: wDom.right - containerRect.left,
          top: wDom.top - containerRect.top,
          bottom: wDom.bottom - containerRect.top,
        });
      });

      // --- 3) Limitar desplazamiento para que no salgan volando ---
      const maxOffset = 60;
      const clamp = (v: number) =>
        Math.max(-maxOffset, Math.min(maxOffset, v));

      targetOffsetX = clamp(targetOffsetX);
      targetOffsetY = clamp(targetOffsetY);

      offsetX.set(targetOffsetX);
      offsetY.set(targetOffsetY);

      frameId = requestAnimationFrame(update);
    };

    frameId = requestAnimationFrame(update);
    return () => cancelAnimationFrame(frameId);
  }, [containerRef, mouseX, mouseY, offsetX, offsetY, wordRefs, videoRef]);

  return (
    <motion.div
      style={{
        left: `${initialXPercentRef.current}%`,
        top: `${initialYPercentRef.current}%`,
        x: springX,
        y: springY,
      }}
      className="absolute rounded-full bg-foreground/20"
    >
      {/* Flotación interna para dar vida sin romper la física principal */}
      <motion.div
        animate={{
          y: [0, floatYRef.current, 0],
          opacity: [0.2, 0.5, 0.2],
        }}
        transition={{
          duration: floatDurationRef.current,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        style={{
          width: sizeRef.current,
          height: sizeRef.current,
        }}
        className="rounded-full bg-foreground"
      />
    </motion.div>
  );
};


