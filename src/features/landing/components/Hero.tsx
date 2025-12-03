"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, Box, Layers } from "lucide-react"; // Iconos más "técnicos"
import Link from "next/link";

export const Hero = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  // Parallax suave para los elementos de fondo
  const yBackground = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const opacityText = useTransform(scrollYProgress, [0, 0.4], [1, 0]);

  return (
    <section
      ref={containerRef}
      id="hero"
      className="relative min-h-[100vh] w-full overflow-hidden flex items-center justify-center bg-background"
    >
      {/* --- LAYER 0: Technical Grid Pattern (Ingeniería) --- */}
      <div
        className="absolute inset-0 z-0 opacity-[0.4]"
        style={{
          backgroundImage: `linear-gradient(to right, #e2e8f0 1px, transparent 1px), linear-gradient(to bottom, #e2e8f0 1px, transparent 1px)`,
          backgroundSize: "40px 40px",
          maskImage: "linear-gradient(to bottom, black 60%, transparent 100%)", // Se desvanece abajo
        }}
      />

      {/* --- LAYER 1: Ambient Brand Colors (Tus colores) --- */}
      <motion.div
        style={{ y: yBackground }}
        className="absolute inset-0 z-0 overflow-hidden"
      >
        {/* Orbe Primario (Amarillo #FFBD59) */}
        <div className="absolute -top-[10%] -left-[10%] w-[50vw] h-[50vw] rounded-full bg-primary/20 blur-[120px] mix-blend-multiply animate-pulse" />

        {/* Orbe Secundario (Coral #E17480) */}
        <div className="absolute top-[20%] -right-[10%] w-[40vw] h-[40vw] rounded-full bg-secondary/20 blur-[100px] mix-blend-multiply" />
      </motion.div>

      {/* --- LAYER 2: Content --- */}
      <motion.div
        style={{ opacity: opacityText }}
        className="relative z-10 container mx-auto px-4 text-center flex flex-col items-center gap-8 pt-28 md:pt-32"
      >
        {/* Título Principal */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-5xl md:text-7xl lg:text-8xl font-heading font-bold tracking-tighter text-foreground"
        >
          Ingeniería{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">
            Tangible.
          </span>
          <br />
          Estética Pura.
        </motion.h1>

        {/* Subtítulo */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="max-w-2xl text-lg md:text-xl text-neutral-600 md:leading-relaxed font-light"
        >
          Transformamos modelos digitales en objetos físicos de alta precisión.
          Desde prototipos de ingeniería hasta piezas de arte minimalista.
          <br className="hidden md:block" /> Tu visión, capa por capa.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex flex-col sm:flex-row gap-4 mt-6"
        >
          {/* Botón Primario: Amarillo con texto oscuro (Alto Contraste) */}
          <Link
            href="#products"
            className="group relative inline-flex h-12 items-center justify-center overflow-hidden rounded-lg bg-primary px-8 font-semibold text-primary-foreground shadow-md transition-all duration-300 hover:bg-primary/90 hover:-translate-y-1"
          >
            <span className="mr-2">Ver Catálogo</span>
            <Layers className="h-4 w-4 transition-transform group-hover:rotate-12" />
          </Link>

          {/* Botón Secundario: Outline limpio */}
          <Link
            href="#contact"
            className="inline-flex h-12 items-center justify-center rounded-lg border border-neutral-200 bg-white px-8 font-medium text-foreground transition-colors hover:bg-neutral-50 hover:border-neutral-300 shadow-sm"
          >
            Cotizar Proyecto
          </Link>
        </motion.div>

        {/* Elemento Decorativo 3D (Opcional - Imagen Flotante) */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8, rotateX: 20 }}
          animate={{ opacity: 1, scale: 1, rotateX: 0 }}
          transition={{ duration: 1, delay: 0.5, type: "spring" }}
          className="mt-12 md:mt-16 w-full max-w-4xl rounded-xl border border-neutral-200 bg-white/50 backdrop-blur-sm p-2 shadow-2xl"
        >
          {/* Aquí iría una imagen REAL de una pieza impresa en alta calidad sobre fondo blanco/gris */}
          <div className="aspect-[16/6] rounded-lg overflow-hidden relative bg-neutral-100">
            {/* Placeholder técnico hasta que tengas la foto real */}
            <div className="absolute inset-0 flex items-center justify-center text-neutral-300">
              <div className="text-center">
                <Box className="w-16 h-16 mx-auto mb-2 opacity-50" />
                <span className="text-sm font-mono uppercase tracking-widest">
                  Render de Pieza Destacada
                </span>
              </div>
            </div>
            {/* Descomentar cuando tengas la imagen */}
            {/* <img src="/tu-pieza-3d-minimalista.jpg" alt="Pieza 3D" className="w-full h-full object-cover" /> */}
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
};
