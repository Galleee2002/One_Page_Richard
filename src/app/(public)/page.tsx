import { StickyNavbar } from "@/features/landing/components/StickyNavbar"; // <--- Nuevo import

import { Hero } from "@/features/landing/components/Hero";

import { ProductsSection } from "@/features/products/ProductsSection";



export default function HomePage() {

  return (

    <main className="min-h-screen bg-neutral-50 dark:bg-neutral-950 text-foreground relative selection:bg-primary/30">

      {/* 1. Navbar Sticky Inteligente */}

      <StickyNavbar />

      

      {/* 2. Hero Section */}

      <Hero />



      {/* 3. Products Section */}

      <ProductsSection />



      {/* Placeholder Footer */}

      <div className="h-[50vh] bg-neutral-100 dark:bg-neutral-900 flex items-center justify-center text-sm text-neutral-400">

        Footer Content...

      </div>

    </main>

  );

}

