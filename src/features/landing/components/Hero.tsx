"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button"; // Usamos ShadCN button para consistencia
import { useScrollToSection } from "@/features/landing/hooks/use-scroll-to-section";

export const Hero = () => {
  const { scrollToSection } = useScrollToSection();

  return (
    <section
      id="hero"
      className="relative w-full pt-32 pb-20 md:pt-48 md:pb-32 flex flex-col items-center overflow-hidden bg-background"
    >
      {/* --- LAYER 0: Ambient Glows (Mantenemos tu identidad) --- */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-gradient-to-b from-primary/5 to-transparent opacity-50 pointer-events-none z-0" />
      <div className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] rounded-full bg-primary/10 blur-[120px] pointer-events-none z-0" />
      <div className="absolute top-[20%] right-[-10%] w-[40vw] h-[40vw] rounded-full bg-secondary/5 blur-[100px] pointer-events-none z-0" />

      {/* --- LAYER 1: Text Content (Glide Style) --- */}
      <motion.div className="relative z-10 container mx-auto px-4 flex flex-col items-center text-center gap-8 max-w-5xl">
        {/* Badge / Pill Opcional (Arriba del título) */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="inline-flex items-center gap-2 rounded-full border border-border/50 bg-background/50 px-3 py-1 text-xs font-medium text-muted-foreground backdrop-blur-sm"
        >
          <span className="flex h-2 w-2 rounded-full bg-primary animate-pulse" />
          Nueva Colección 2025 Disponible
        </motion.div>

        {/* Título Principal */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.8,
            delay: 0.2,
            ease: [0.21, 0.47, 0.32, 0.98],
          }}
          className="font-geist text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter text-foreground leading-[1.05]"
        >
          No somos solo impresores. <br className="hidden md:block" />
          Somos{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">
            arquitectos de la materia.
          </span>
        </motion.h1>

        {/* Subtítulo */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
          className="max-w-2xl text-lg md:text-xl text-muted-foreground leading-relaxed font-light"
        >
          Convertimos topología digital en realidad tangible. Fabricación
          aditiva de alta fidelidad sin atajos ni imperfecciones.
        </motion.p>

        {/* CTAs (Opcional, si quieres mantener acciones rápidas antes de la imagen) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="flex flex-col sm:flex-row gap-4 mt-2"
        >
          <Button
            size="lg"
            className="rounded-full bg-primary text-primary-foreground hover:bg-primary/90 font-semibold px-8 h-12 text-base shadow-lg shadow-primary/20"
            onClick={() => scrollToSection("products")}
          >
            Explorar Catálogo <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="lg"
            className="rounded-full text-foreground hover:bg-secondary/10 hover:text-secondary font-medium px-8 h-12 text-base"
            onClick={() => scrollToSection("contact")}
          >
            Contactar Soporte
          </Button>
        </motion.div>
      </motion.div>

      {/* --- LAYER 2: Hero Image --- */}
      <div className="relative z-10 w-full max-w-6xl mt-16 px-4 md:px-6 aspect-[16/9] md:aspect-[21/9] rounded-3xl overflow-hidden">
        <img
          src="/img-impresion.jpg"
          alt="3D Printing Dashboard Preview"
          className="w-full h-full object-cover"
        />
      </div>
    </section>
  );
};
