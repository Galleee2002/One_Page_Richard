"use client";

import React from "react";
import Link from "next/link";
import { Twitter, Instagram, Linkedin, ArrowRight } from "lucide-react";
import Image from "next/image";

// ShadCN para estructura sólida (Inputs y Botones de acción)
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

// HeroUI para elementos puramente interactivos/visuales (Redes sociales)
import { Button as HeroButton, Tooltip } from "@heroui/react";
import { useScrollToSection } from "@/features/landing/hooks/use-scroll-to-section";

export const StickyFooter = () => {
  const { scrollToSection } = useScrollToSection();

  const handleFooterLinkClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    sectionId?: string
  ) => {
    if (sectionId) {
      e.preventDefault();
      scrollToSection(sectionId);
    }
  };

  return (
    <footer
      className="fixed bottom-0 left-0 w-full h-[auto] md:h-[500px] bg-[#0F172A] text-slate-200 z-0 flex flex-col justify-end"
      id="contact"
    >
      {/* Contenedor Principal */}
      <div className="container mx-auto px-6 py-12 md:py-16">
        {/* GRID SUPERIOR: 4 Columnas */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Columna 1: Brand & Misión */}
          <div className="space-y-6 md:col-span-1">
            <div className="flex flex-col items-start gap-3 text-white">
              <div className="flex h-16 w-16 items-center justify-center rounded-xl overflow-hidden">
                <Image
                  src="/logo.png"
                  alt="Rich.Art Logo"
                  width={64}
                  height={64}
                  className="h-full w-full object-contain"
                />
              </div>
              <span className="font-geist text-xl font-bold tracking-tight">
                Rich.Art
              </span>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed">
              Materializando el futuro a través de topología digital y
              fabricación aditiva de precisión.
            </p>

            {/* Redes Sociales con HeroUI (Tooltips + Botones Icono) */}
            <div className="flex gap-2">
              <SocialButton icon={<Twitter size={18} />} label="Twitter" />
              <SocialButton icon={<Instagram size={18} />} label="Instagram" />
              <SocialButton icon={<Linkedin size={18} />} label="LinkedIn" />
            </div>
          </div>

          {/* Columna 2: Links Rápidos */}
          <div>
            <h3 className="font-geist font-bold text-white mb-6">Explorar</h3>
            <ul className="space-y-4 text-sm">
              <FooterLink
                href="#products"
                onClick={(e) => handleFooterLinkClick(e, "products")}
              >
                Nuestros Productos
              </FooterLink>
              <FooterLink
                href="#about"
                onClick={(e) => handleFooterLinkClick(e, "about")}
              >
                Filosofía
              </FooterLink>
              <FooterLink href="/case-studies">Casos de Éxito</FooterLink>
              <FooterLink href="/blog">Blog de Ingeniería</FooterLink>
            </ul>
          </div>

          {/* Columna 3: Legal & Soporte */}
          <div>
            <h3 className="font-geist font-bold text-white mb-6">Soporte</h3>
            <ul className="space-y-4 text-sm">
              <FooterLink href="/contact">Centro de Ayuda</FooterLink>
              <FooterLink href="/terms">Términos de Servicio</FooterLink>
              <FooterLink href="/privacy">Política de Privacidad</FooterLink>
              <FooterLink href="/shipping">Envíos y Devoluciones</FooterLink>
            </ul>
          </div>

          {/* Columna 4: Newsletter (CTA) */}
          <div className="md:col-span-1">
            <h3 className="font-geist font-bold text-[#FFBD59] mb-4">
              Mantente actualizado
            </h3>
            <p className="text-xs text-slate-400 mb-4">
              Recibe las últimas novedades sobre impresión 3D y diseño
              paramétrico.
            </p>

            {/* Formulario con ShadCN */}
            <div className="flex flex-col gap-3">
              <Input
                type="email"
                placeholder="tu@email.com"
                className="bg-slate-900/50 border-slate-700 text-white placeholder:text-slate-500 focus-visible:ring-[#FFBD59]"
              />
              <Button className="w-full bg-[#FFBD59] text-[#0F172A] hover:bg-[#FFBD59]/90 font-bold">
                Suscribirse <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        <Separator className="bg-slate-800 mb-8" />

        {/* BOTTOM BAR */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-slate-500">
          <p>© 2025 Rich.Art 3D Labs. Todos los derechos reservados.</p>
          <div className="flex gap-6">
            <span className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-green-500 animate-pulse"></span>
              Sistemas Operativos
            </span>
            <span>Diseñado en Buenos Aires</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

// --- Subcomponentes Helper ---

interface FooterLinkProps {
  href: string;
  children: React.ReactNode;
  onClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void;
}

const FooterLink = ({ href, children, onClick }: FooterLinkProps) => (
  <li>
    <Link
      href={href}
      onClick={onClick}
      className="text-slate-400 hover:text-[#FFBD59] transition-colors duration-200 block w-fit"
    >
      {children}
    </Link>
  </li>
);

interface SocialButtonProps {
  icon: React.ReactNode;
  label: string;
}

const SocialButton = ({ icon, label }: SocialButtonProps) => (
  <Tooltip content={label} closeDelay={0}>
    <HeroButton
      isIconOnly
      variant="flat"
      className="bg-slate-800 text-slate-300 hover:bg-[#E17480] hover:text-white transition-all"
      size="sm"
      radius="full"
    >
      {icon}
    </HeroButton>
  </Tooltip>
);
