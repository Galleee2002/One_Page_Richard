"use client";

import React, { useState } from "react";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { ShieldCheck, Menu, Search } from "lucide-react"; // Añadida Search
import { Avatar } from "@heroui/react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useScrollToSection } from "@/features/landing/hooks/use-scroll-to-section";

export const StickyNavbar = () => {
  const { scrollY } = useScroll();
  const [isHidden, setIsHidden] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { scrollToSection } = useScrollToSection();

  // Lógica Smart Hide
  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() ?? 0;
    if (latest > previous && latest > 150) {
      setIsHidden(true);
    } else {
      setIsHidden(false);
    }
    setIsScrolled(latest > 20);
  });

  const navLinks = [
    { name: "Inicio", href: "#hero", sectionId: "hero" },
    { name: "Productos", href: "#products", sectionId: "products" },
    { name: "Quienes Somos", href: "#about", sectionId: "about" },
    { name: "Contacto", href: "#contact", sectionId: "contact" },
  ];

  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    sectionId: string
  ) => {
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
        isScrolled
          ? "bg-background/80 backdrop-blur-md border-b border-border/40 shadow-sm"
          : "bg-transparent border-transparent"
      )}
    >
      {/* --- IZQUIERDA: LOGO + BRAND --- */}
      <Link href="/" className="flex items-center gap-3 group select-none">
        <Avatar
          src="/logo.png"
          alt="Logo"
          isBordered
          color="primary"
          className="h-10 w-10 transition-transform duration-500 group-hover:scale-110"
        />
        <div className="flex flex-col justify-center">
          <span className="font-geist text-lg font-bold leading-none text-foreground tracking-tight">
            Rich.Art
          </span>
          <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">
            3D Labs
          </span>
        </div>
      </Link>

      {/* --- CENTRO: NAVEGACIÓN (Desktop) --- */}
      <nav className="hidden md:flex items-center gap-1 rounded-full border border-border/40 bg-background/50 p-1.5 backdrop-blur-md shadow-sm">
        {navLinks.map((link) => (
          <a
            key={link.name}
            href={link.href}
            onClick={(e) => handleNavClick(e, link.sectionId)}
            className="px-5 py-2 text-sm font-medium text-foreground/70 transition-all hover:text-primary hover:bg-accent rounded-full cursor-pointer"
          >
            {link.name}
          </a>
        ))}
      </nav>

      {/* --- DERECHA: TOOLS (Search + Admin) --- */}
      <div className="flex items-center gap-3">
        {/* Lupa (Search) - Visual por ahora */}
        <button
          className="group flex h-10 w-10 items-center justify-center rounded-full text-muted-foreground hover:bg-secondary/10 hover:text-secondary transition-all"
          title="Buscar productos"
        >
          <Search className="h-5 w-5 transition-transform group-hover:scale-110" />
        </button>

        {/* Separador visual */}
        <div className="h-4 w-[1px] bg-border/60 hidden md:block" />

        {/* Admin Shield */}
        <Link
          href="/admin"
          className="group relative flex h-10 w-10 items-center justify-center rounded-full text-muted-foreground hover:text-primary transition-all"
          title="Admin Dashboard"
        >
          {/* Fondo sutil al hover */}
          <span className="absolute inset-0 rounded-full bg-primary/10 scale-0 transition-transform group-hover:scale-100" />
          <ShieldCheck className="h-5 w-5 relative z-10" />
        </Link>

        {/* Mobile Toggle */}
        <div className="md:hidden ml-2">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px]">
              <div className="flex flex-col gap-6 mt-10">
                {navLinks.map((link) => (
                  <a
                    key={link.name}
                    href={link.href}
                    onClick={(e) => handleNavClick(e, link.sectionId)}
                    className="text-xl font-medium hover:text-primary transition-colors cursor-pointer"
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
