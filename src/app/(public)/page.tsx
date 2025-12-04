import { StickyNavbar } from "@/features/landing/components/StickyNavbar";
import { Hero } from "@/features/landing/components/Hero";
import { About } from "@/features/landing/components/About";
import { ProductsSection } from "@/features/products/ProductsSection";
import { StickyFooter } from "@/features/landing/components/StickyFooter";

export default function HomePage() {
  return (
    <main className="relative min-h-screen">
      {/* CONTENEDOR DEL CONTENIDO (Hero, Products, About) 
         - z-10: Para estar ENCIMA del footer.
         - bg-neutral-50 dark:bg-neutral-950: Mantiene el fondo actual.
         - mb-[500px]: Margen igual a la altura del footer (en desktop).
         - rounded-b-[3rem]: Opcional, para darle efecto de "tarjeta" al levantarse.
      */}
      <div className="relative z-10 bg-neutral-50 dark:bg-neutral-950 mb-[500px] shadow-xl rounded-b-[3rem] overflow-hidden selection:bg-primary/30">
        {/* 1. Navbar Sticky Inteligente */}
        <StickyNavbar />

        {/* 2. Hero Section */}
        <Hero />

        {/* 3. Products Section */}
        <ProductsSection />

        {/* 4. About Section */}
        <About />

        {/* Espaciador final opcional dentro del bloque blanco */}
        <div className="py-20 bg-neutral-50 dark:bg-neutral-950 text-center">
          <p className="text-muted-foreground text-sm uppercase tracking-widest animate-pulse">
            Sigue bajando para contactar
          </p>
        </div>
      </div>

      {/* FOOTER (Fijo atrás) */}
      <StickyFooter />
    </main>
  );
}

