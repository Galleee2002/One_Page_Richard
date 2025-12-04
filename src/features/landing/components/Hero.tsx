"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useScrollToSection } from "@/features/landing/hooks/use-scroll-to-section";

export const Hero = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollToSection } = useScrollToSection();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  // Parallax sutil
  const yContent = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const opacityContent = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    sectionId: string
  ) => {
    e.preventDefault();
    scrollToSection(sectionId);
  };

  return (
    <section
      id="hero"
      ref={containerRef}
      className="relative min-h-screen w-full flex flex-col items-center justify-center overflow-hidden bg-background"
    >
      {/* --- LAYER 0: Ambient Brand Glow (Marca Sutil) --- */}
      {/* Usamos tus variables --primary (Amber) y --secondary (Coral) pero muy difuminadas */}

      {/* Luz Cenital General */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[60vh] bg-gradient-to-b from-primary/5 to-transparent opacity-60 z-0 pointer-events-none" />

      {/* Mancha de color Primario (Amber) */}
      <div className="absolute top-[-20%] left-[-10%] w-[70vw] h-[70vw] rounded-full bg-primary/10 blur-[150px] pointer-events-none" />

      {/* Mancha de color Secundario (Coral) para balancear */}
      <div className="absolute bottom-[-10%] right-[-10%] w-[60vw] h-[60vw] rounded-full bg-secondary/10 blur-[150px] pointer-events-none" />

      {/* --- LAYER 1: Content --- */}
      <motion.div
        style={{ y: yContent, opacity: opacityContent }}
        className="relative z-10 container mx-auto px-6 text-center flex flex-col items-center justify-center gap-8 h-screen"
      >
        {/* Título Principal */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
          className="text-5xl md:text-7xl lg:text-8xl font-medium tracking-tight text-foreground leading-[1.1]"
        >
          La forma sigue <br className="hidden md:block" />
          {/* Usamos una opacidad del foreground en lugar de un color fijo */}
          <span className="text-foreground/60 italic font-serif">
            a la imaginación.
          </span>
        </motion.h1>

        {/* Subtítulo: Usamos 'muted-foreground' para la jerarquía visual correcta */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="max-w-xl text-lg md:text-xl text-muted-foreground font-light leading-relaxed"
        >
          Materializamos ideas complejas con acabados de galería. Diseño
          paramétrico y fabricación aditiva de alta fidelidad.
        </motion.p>

        {/* Botones */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
          className="flex flex-col sm:flex-row gap-6 items-center"
        >
          {/* Botón Secundario: Link limpio */}
          <a
            href="#products"
            onClick={(e) => handleNavClick(e, "products")}
            className="group relative text-foreground text-sm font-semibold tracking-wide cursor-pointer"
          >
            <span className="relative z-10 border-b border-foreground/30 pb-1 group-hover:border-primary transition-colors duration-300">
              Ver Colección
            </span>
          </a>

          {/* Botón Primario: Usa tu color 'primary' (Amber) */}
          <a
            href="#contact"
            onClick={(e) => handleNavClick(e, "contact")}
            className="px-8 py-3 rounded-full bg-primary text-primary-foreground text-sm font-medium transition-transform hover:scale-105 active:scale-95 shadow-lg shadow-primary/20 cursor-pointer"
          >
            Iniciar Proyecto
          </a>
        </motion.div>
      </motion.div>
    </section>
  );
};
