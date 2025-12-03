"use client";

import React, { useRef, useState } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  AnimatePresence,
  MotionValue,
} from "framer-motion";
import { cn } from "@/lib/utils";
import Link from "next/link";

interface NavItem {
  title: string;
  icon: React.ReactNode;
  href: string;
  action?: () => void; // Para abrir modales/sheets si no es link
}

interface FloatingNavbarProps {
  items: NavItem[];
  className?: string;
}

export const FloatingNavbar = ({ items, className }: FloatingNavbarProps) => {
  const mouseX = useMotionValue(Infinity);

  return (
    <motion.div
      onMouseMove={(e) => mouseX.set(e.pageX)}
      onMouseLeave={() => mouseX.set(Infinity)}
      className={cn(
        "fixed top-6 left-1/2 -translate-x-1/2 z-50 flex h-16 items-end gap-4 rounded-full border border-neutral-200 bg-white/80 px-4 pb-3 backdrop-blur-md dark:border-neutral-800 dark:bg-black/80 shadow-lg",
        className
      )}
    >
      {items.map((item) => (
        <IconContainer mouseX={mouseX} key={item.title} {...item} />
      ))}
    </motion.div>
  );
};

function IconContainer({
  mouseX,
  title,
  icon,
  href,
  action,
}: NavItem & { mouseX: MotionValue<number> }) {
  const ref = useRef<HTMLDivElement>(null);

  // Física de Distancia y Magnificación
  const distance = useTransform(mouseX, (val: number) => {
    const bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };
    return val - bounds.x - bounds.width / 2;
  });

  const widthTransform = useTransform(distance, [-150, 0, 150], [40, 56, 40]);
  const heightTransform = useTransform(distance, [-150, 0, 150], [40, 56, 40]);

  const width = useSpring(widthTransform, {
    mass: 0.1,
    stiffness: 150,
    damping: 12,
  });
  const height = useSpring(heightTransform, {
    mass: 0.1,
    stiffness: 150,
    damping: 12,
  });

  const [hovered, setHovered] = useState(false);

  // Renderizado condicional: Link o Botón
  const content = (
    <motion.div
      ref={ref}
      style={{ width, height }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="aspect-square rounded-full bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center relative hover:bg-primary/20 transition-colors"
    >
      <AnimatePresence>
        {hovered && (
          <motion.div
            // 1. ANIMACIÓN INVERTIDA: Empieza un poco arriba (-10) y baja a su sitio (0)
            initial={{ opacity: 0, y: -10, x: "-50%" }}
            animate={{ opacity: 1, y: 0, x: "-50%" }}
            exit={{ opacity: 0, y: -2, x: "-50%" }}
            // 2. POSICIONAMIENTO: 'top-full' lo empuja debajo, 'mt-2' le da aire
            className="px-2 py-0.5 whitespace-pre rounded-md bg-neutral-800 border-neutral-700 text-white absolute left-1/2 top-full mt-2 w-fit text-xs z-50 pointer-events-none"
          >
            {title}
          </motion.div>
        )}
      </AnimatePresence>
      <div className="h-5 w-5 text-neutral-600 dark:text-neutral-300">
        {icon}
      </div>
    </motion.div>
  );

  if (action) {
    return (
      <button onClick={action} aria-label={title} type="button">
        {content}
      </button>
    );
  }

  return (
    <Link href={href} aria-label={title}>
      {content}
    </Link>
  );
}
