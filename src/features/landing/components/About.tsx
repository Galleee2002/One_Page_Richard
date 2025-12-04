"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion, useSpring, useMotionValue } from "framer-motion";
import { ParticleBeams } from "./ParticleBeams";

export const About = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [videoError, setVideoError] = useState(false);
  const [whiteWords, setWhiteWords] = useState<Set<string>>(new Set());

  // Refs para cada palabra del texto (excepto "Somos arquitectos de la materia")
  const wordRefs = useRef<Map<string, HTMLSpanElement>>(new Map());

  // --- MOUSE PHYSICS ---
  // En lugar de state, usamos MotionValues para rendimiento (60fps garantizados)
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Spring suaviza el movimiento (Stiffness/Damping ajustados para sensación "pesada/premium")
  const springConfig = { damping: 20, stiffness: 150, mass: 0.5 };
  const x = useSpring(mouseX, springConfig);
  const y = useSpring(mouseY, springConfig);

  // Dimensiones del video
  const videoWidth = 350;
  const videoHeight = 250;

  // Detectar colisión entre video y cada palabra individual
  useEffect(() => {
    if (!isHovered) {
      setWhiteWords(new Set());
      return;
    }

    const checkCollision = () => {
      if (!containerRef.current) return;

      // Posición del video (ya relativa al contenedor)
      const videoX = mouseX.get();
      const videoY = mouseY.get();

      const newWhiteWords = new Set<string>();

      // Verificar colisión con cada palabra individual
      wordRefs.current.forEach((element, wordKey) => {
        if (!element || !containerRef.current) return;

        const containerRect = containerRef.current.getBoundingClientRect();
        const wordRect = element.getBoundingClientRect();

        // Convertir posiciones de la palabra a coordenadas relativas al contenedor
        const wordLeft = wordRect.left - containerRect.left;
        const wordRight = wordRect.right - containerRect.left;
        const wordTop = wordRect.top - containerRect.top;
        const wordBottom = wordRect.bottom - containerRect.top;

        // Área del video (centrado en mouseX, mouseY)
        const videoLeft = videoX;
        const videoRight = videoX + videoWidth;
        const videoTop = videoY;
        const videoBottom = videoY + videoHeight;

        // Detectar intersección (más estricta: el video debe entrar 5px en la palabra)
        const isColliding = !(
          videoRight < wordLeft + 5 || // El video debe entrar 5px en la palabra
          videoLeft > wordRight - 5 ||
          videoBottom < wordTop + 5 ||
          videoTop > wordBottom - 5
        );

        if (isColliding) {
          newWhiteWords.add(wordKey);
        }
      });

      setWhiteWords(newWhiteWords);
    };

    // Usar requestAnimationFrame para mejor rendimiento (60fps)
    let rafId: number;
    const update = () => {
      checkCollision();
      rafId = requestAnimationFrame(update);
    };

    rafId = requestAnimationFrame(update);

    return () => {
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [isHovered, mouseX, mouseY, videoWidth, videoHeight]);

  const handleMouseMove = (e: React.MouseEvent) => {
    // Obtenemos la posición relativa al contenedor
    const rect = containerRef.current?.getBoundingClientRect();
    if (rect) {
      mouseX.set(e.clientX - rect.left - 175); // -175 para centrar el video (mitad de su ancho)
      mouseY.set(e.clientY - rect.top - 125); // -125 para centrar (mitad de alto)
    }
  };

  return (
    <section
      id="about"
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative w-full py-32 overflow-hidden bg-neutral-50 cursor-default"
    >
      {/* --- PARTICLE BEAMS (Fondo Decorativo) --- */}
      <ParticleBeams
        containerRef={containerRef}
        wordRefs={wordRefs}
        videoRef={videoRef}
        mouseX={mouseX}
        mouseY={mouseY}
      />

      <div className="container mx-auto px-6 relative z-10">
        {/* --- ETIQUETA --- */}
        <div className="mb-8">
          <span
            ref={(el) => {
              if (el) wordRefs.current.set("etiqueta-filosofia", el);
            }}
            className={`text-xs font-medium tracking-widest uppercase border-b border-border pb-1 transition-colors duration-200 relative z-20 ${
              whiteWords.has("etiqueta-filosofia")
                ? "text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.5)]"
                : "text-muted-foreground"
            }`}
          >
            Nuestra Filosofía
          </span>
        </div>

        {/* --- TEXTO GIGANTE INTERACTIVO --- */}
        <div className="max-w-4xl">
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-medium leading-[1.1] tracking-tight">
            {/* Primera línea: "No somos solo impresores." */}
            {["No", "somos", "solo", "impresores."].map((word, idx) => (
              <React.Fragment key={`line1-${idx}`}>
                <span
                  ref={(el) => {
                    if (el) wordRefs.current.set(`line1-${idx}`, el);
                  }}
                  className={`transition-colors duration-200 relative z-20 ${
                    whiteWords.has(`line1-${idx}`)
                      ? "text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.5)]"
                      : "text-foreground"
                  }`}
                >
                  {word}
                </span>
                {idx < 3 && " "}
              </React.Fragment>
            ))}
            {/* Texto fijo que NO cambia */}
            <span className="text-muted-foreground transition-colors duration-500 hover:text-primary">
              {" "}
              Somos arquitectos de la materia.
            </span>
            <br className="hidden md:block" />
            <br className="hidden md:block" />
            {/* Segunda línea: "Convertimos topología digital en realidad tangible. Sin atajos. Sin imperfecciones." */}
            {["Convertimos"].map((word, idx) => (
              <React.Fragment key={`line2-${idx}`}>
                <span
                  ref={(el) => {
                    if (el) wordRefs.current.set(`line2-${idx}`, el);
                  }}
                  className={`transition-colors duration-200 relative z-20 ${
                    whiteWords.has(`line2-${idx}`)
                      ? "text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.5)]"
                      : "text-foreground"
                  }`}
                >
                  {word}
                </span>{" "}
              </React.Fragment>
            ))}
            {/* "topología digital" como una sola unidad */}
            <span
              ref={(el) => {
                if (el) wordRefs.current.set("topologia-digital", el);
              }}
              className={`relative inline-block font-serif italic z-20 transition-colors duration-200 ${
                whiteWords.has("topologia-digital")
                  ? "text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.5)]"
                  : "text-foreground/80"
              }`}
            >
              topología digital
            </span>
            {/* Resto de la línea */}
            {[
              "en",
              "realidad",
              "tangible.",
              "Sin",
              "atajos.",
              "Sin",
              "imperfecciones.",
            ].map((word, idx) => (
              <React.Fragment key={`line3-${idx}`}>
                {" "}
                <span
                  ref={(el) => {
                    if (el) wordRefs.current.set(`line3-${idx}`, el);
                  }}
                  className={`transition-colors duration-200 relative z-20 ${
                    whiteWords.has(`line3-${idx}`)
                      ? "text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.5)]"
                      : "text-foreground"
                  }`}
                >
                  {word}
                </span>
              </React.Fragment>
            ))}
          </h2>
        </div>
      </div>

      {/* --- EL REVEAL (VIDEO FLOTANTE) --- */}
      {/* pointer-events-none es CRUCIAL para que el video no bloquee el mouse */}
      <motion.div
        style={{ x, y, opacity: isHovered ? 1 : 0, scale: isHovered ? 1 : 0.8 }}
        transition={{ opacity: { duration: 0.3 }, scale: { duration: 0.3 } }}
        className="pointer-events-none absolute top-0 left-0 z-0 hidden md:block w-[350px] h-[250px] overflow-hidden rounded-2xl shadow-2xl shadow-primary/10"
      >
        {/* VIDEO EN LOOP (Silenciado) */}
        {!videoError ? (
          <video
            ref={videoRef}
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
            onError={() => {
              console.error("Error cargando video:", "/video-test.mp4");
              setVideoError(true);
            }}
            onLoadedData={() => {
              console.log("Video cargado correctamente");
            }}
            className="h-full w-full object-cover"
          >
            <source src="/video-test.mp4" type="video/mp4" />
            Tu navegador no soporta el elemento video.
          </video>
        ) : (
          <div className="h-full w-full bg-neutral-200 dark:bg-neutral-800 flex items-center justify-center text-xs text-neutral-500">
            Error al cargar el video
          </div>
        )}

        {/* Borde interno brillante (Glassmorphism) */}
        <div className="absolute inset-0 ring-1 ring-white/20 rounded-2xl pointer-events-none z-10" />
      </motion.div>

      {/* --- BACKGROUND ACCENT (Móvil) --- */}
      {/* En móvil, como no hay hover, mostramos un gradiente sutil fijo */}
      <div className="absolute bottom-0 right-0 w-64 h-64 bg-secondary/5 blur-[100px] rounded-full pointer-events-none md:hidden" />
    </section>
  );
};
