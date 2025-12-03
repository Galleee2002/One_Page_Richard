import { LandingNavbar } from "@/features/landing/components/LandingNavbar";
import { Hero } from "@/features/landing/components/Hero";
import { ProductsSection } from "@/features/products/ProductsSection";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      {/* Navbar fijo encima de todo */}
      <LandingNavbar />

      {/* Sección Hero */}
      <Hero />

      {/* Sección de Productos con Bento Grid + Sheet */}
      <ProductsSection />
    </main>
  );
}

