"use client";

import React, { useState } from "react";

import { motion, useScroll, useMotionValueEvent } from "framer-motion";

import Link from "next/link";

import { cn } from "@/lib/utils";

import { ShieldCheck, Menu, Box } from "lucide-react"; // Iconos

import { Button } from "@/components/ui/button"; // ShadCN Button

import {

  Sheet,

  SheetContent,

  SheetTrigger,

} from "@/components/ui/sheet"; // Para menú móvil

import { useScrollToSection } from "@/features/landing/hooks/use-scroll-to-section";



export const StickyNavbar = () => {

  const { scrollY } = useScroll();

  const [isHidden, setIsHidden] = useState(false);

  const [isScrolled, setIsScrolled] = useState(false);

  const { scrollToSection } = useScrollToSection();



  // Lógica "Smart Hide": Detectar dirección del scroll

  useMotionValueEvent(scrollY, "change", (latest) => {

    const previous = scrollY.getPrevious() ?? 0;

    

    // Si bajamos más de 100px y estamos bajando -> Ocultar

    if (latest > previous && latest > 100) {

      setIsHidden(true);

    } else {

      setIsHidden(false);

    }



    // Detectar si ya no estamos en el top para poner borde sutil

    setIsScrolled(latest > 20);

  });



  const navLinks = [

    { name: "Inicio", href: "#hero", sectionId: "hero" },

    { name: "Productos", href: "#products", sectionId: "products" },

    { name: "Quienes Somos", href: "#about", sectionId: "about" },

    { name: "Contacto", href: "#contact", sectionId: "contact" },

  ];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, sectionId: string) => {

    e.preventDefault();

    scrollToSection(sectionId);

  };



  return (

    <motion.header

      variants={{

        visible: { y: 0 },

        hidden: { y: "-100%" },

      }}

      animate={isHidden ? "hidden" : "visible"}

      transition={{ duration: 0.3, ease: "easeInOut" }}

      className={cn(

        "fixed top-0 left-0 right-0 z-50 flex h-20 items-center justify-between px-6 transition-all duration-300",

        // Si scrolleamos, agregamos fondo blanco translúcido y borde

        isScrolled 

          ? "bg-background/80 backdrop-blur-md border-b border-border/40 shadow-sm" 

          : "bg-transparent border-transparent"

      )}

    >

      {/* --- SECCIÓN IZQUIERDA: MARCA --- */}

      <Link href="/" className="flex items-center gap-2 group">

        <div className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 transition-colors group-hover:bg-primary/20">

          <Box className="h-6 w-6 text-primary transition-transform group-hover:rotate-12" />

        </div>

        <div className="flex flex-col">

          <span className="font-heading text-lg font-bold leading-none text-foreground">

            ARCHITECT

          </span>

          <span className="text-[10px] font-medium uppercase tracking-widest text-muted-foreground">

            3D Labs

          </span>

        </div>

      </Link>



      {/* --- SECCIÓN CENTRO: NAVEGACIÓN (Desktop) --- */}

      <nav className="hidden md:flex items-center gap-1 rounded-full border border-border/50 bg-background/50 px-2 py-1.5 backdrop-blur-sm shadow-sm">

        {navLinks.map((link) => (

          <a

            key={link.name}

            href={link.href}

            onClick={(e) => handleNavClick(e, link.sectionId)}

            className="relative px-4 py-2 text-sm font-medium text-foreground/80 transition-colors hover:text-primary rounded-full hover:bg-neutral-100 dark:hover:bg-neutral-800 cursor-pointer"

          >

            {link.name}

          </a>

        ))}

      </nav>



      {/* --- SECCIÓN DERECHA: ADMIN & MOBILE --- */}

      <div className="flex items-center gap-4">

        {/* Círculo Admin (Escudo) */}

        <Link 

          href="/admin" 

          className="group relative flex h-10 w-10 items-center justify-center overflow-hidden rounded-full border border-border bg-background transition-all hover:border-primary hover:shadow-md"

          title="Admin Panel"

        >

          <div className="absolute inset-0 bg-primary/10 opacity-0 transition-opacity group-hover:opacity-100" />

          <ShieldCheck className="h-5 w-5 text-foreground transition-colors group-hover:text-primary" />

        </Link>



        {/* Menú Móvil (Hamburger) - Solo visible en móvil */}

        <div className="md:hidden">

          <Sheet>

            <SheetTrigger asChild>

              <Button variant="ghost" size="icon" className="h-10 w-10 rounded-full">

                <Menu className="h-5 w-5" />

              </Button>

            </SheetTrigger>

            <SheetContent side="right">

              <div className="flex flex-col gap-6 mt-10">

                {navLinks.map((link) => (

                  <a 

                    key={link.name} 

                    href={link.href}

                    onClick={(e) => handleNavClick(e, link.sectionId)}

                    className="text-lg font-medium hover:text-primary transition-colors cursor-pointer"

                  >

                    {link.name}

                  </a>

                ))}

              </div>

            </SheetContent>

          </Sheet>

        </div>

      </div>

    </motion.header>

  );

};

