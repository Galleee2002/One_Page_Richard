"use client";

import React from "react";
import { FloatingNavbar } from "@/components/ui/floating-navbar";
import {
  Home,
  Package,
  Users,
  Mail,
  LayoutDashboard,
} from "lucide-react";
import { useSheetStore } from "@/features/products/store/sheet-store";
import { useScrollToSection } from "@/features/landing/hooks/use-scroll-to-section";

/**
 * Navbar principal del Landing Page
 * 
 * Conecta la UI con la lógica de negocio:
 * - Navegación por secciones (scroll suave)
 * - Apertura del Sheet de productos (panel lateral)
 * - Acceso al dashboard admin
 */
export const LandingNavbar = () => {
  const openProducts = useSheetStore((state) => state.open);
  const { scrollToSection } = useScrollToSection();

  const handleOpenProducts = () => {
    openProducts();
  };

  const navItems = [
    {
      title: "Inicio",
      icon: <Home className="h-full w-full" />,
      href: "#hero",
      action: () => scrollToSection("hero"),
    },
    {
      title: "Productos",
      icon: <Package className="h-full w-full" />,
      href: "#products",
      action: handleOpenProducts, // Abre el Sheet en lugar de navegar
    },
    {
      title: "Nosotros",
      icon: <Users className="h-full w-full" />,
      href: "#about",
      action: () => scrollToSection("about"),
    },
    {
      title: "Contacto",
      icon: <Mail className="h-full w-full" />,
      href: "#contact",
      action: () => scrollToSection("contact"),
    },
    {
      title: "Admin",
      icon: <LayoutDashboard className="h-full w-full text-secondary" />,
      href: "/admin",
      // Sin action, usa Link normal para navegación
    },
  ];

  return (
    <div className="relative w-full">
      <FloatingNavbar items={navItems} />
    </div>
  );
};

