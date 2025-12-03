"use client";

import { useCallback } from "react";

/**
 * Hook para realizar scroll suave a una sección específica de la página
 */
export function useScrollToSection() {
  const scrollToSection = useCallback((sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const offset = 80; // Offset para compensar la navbar flotante
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  }, []);

  return { scrollToSection };
}

