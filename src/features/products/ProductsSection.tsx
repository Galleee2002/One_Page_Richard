"use client";

import React from "react";
import { ProductBentoGrid } from "./components/ProductBentoGrid";
import { ProductDetailSheet } from "./components/ProductDetailSheet";
import { Database } from "@/types/database.types";

type Product = Database['public']['Tables']['products']['Row'];

// Datos MOCK para visualizar YA (borrar al conectar Supabase)
// Estos datos coinciden con la estructura de la tabla `products` en Supabase
const MOCK_PRODUCTS: Product[] = [
  {
    id: "1",
    created_at: new Date().toISOString(),
    name: "Lámpara Voronoi",
    price: 120,
    category: "Iluminación",
    short_description: "Estructura orgánica generada algorítmicamente.",
    full_description: "Una pieza maestra de diseño paramétrico. La estructura Voronoi proyecta sombras complejas y naturales.",
    images: ["https://images.unsplash.com/photo-1540932296774-34988045da4f?w=800&auto=format&fit=crop"],
    size: "tall",
    stock: 15,
    features: ["Impresión PLA Eco", "Luz LED cálida incluida", "15h de impresión"],
  },
  {
    id: "2",
    created_at: new Date().toISOString(),
    name: "Maceta Low-Poly",
    price: 45,
    category: "Decoración",
    short_description: "Geometría minimalista para suculentas.",
    full_description: "Diseño geométrico de baja poligonización. Incluye sistema de drenaje oculto.",
    images: ["https://images.unsplash.com/photo-1485955900006-10f4d324d411?w=800&auto=format&fit=crop"],
    size: "small",
    stock: 30,
    features: ["Resistente al agua", "Colores mate"],
  },
  {
    id: "3",
    created_at: new Date().toISOString(),
    name: "Soporte Ergonómico",
    price: 89,
    category: "Oficina",
    short_description: "Eleva tu laptop con estilo industrial.",
    full_description: "Diseñado para mejorar la postura y la ventilación de tu equipo.",
    images: ["https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=800&auto=format&fit=crop"],
    size: "wide",
    stock: 20,
    features: ["Soporta hasta 5kg", "Antideslizante"],
  },
  {
    id: "4",
    created_at: new Date().toISOString(),
    name: "Engranaje Cinético",
    price: 250,
    category: "Arte",
    short_description: "Escultura en movimiento perpetuo.",
    full_description: "Sistema complejo de engranajes que giran silenciosamente. Pieza de conversación.",
    images: ["https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&auto=format&fit=crop"],
    size: "large",
    stock: 5,
    features: ["Rodamientos cerámicos", "Edición Limitada"],
  },
];

export const ProductsSection = () => {
  // Aquí usaremos: const { data, isLoading } = useQuery(...)
  // Por ahora, datos MOCK para visualización
  const isLoading = false;

  return (
    <section id="products" className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="mb-12 text-center max-w-2xl mx-auto">
          <h2 className="text-3xl md:text-5xl font-heading font-bold mb-4 text-foreground">
            Catálogo <span className="text-primary">Selecto</span>
          </h2>
          <p className="text-muted-foreground">
            Piezas diseñadas digitalmente y materializadas con precisión. 
            Toca cualquier tarjeta para ver los detalles de ingeniería.
          </p>
        </div>

        {/* El Grid */}
        <ProductBentoGrid 
          products={MOCK_PRODUCTS}
          isLoading={isLoading} 
        />

        {/* El Drawer Oculto (Global) */}
        <ProductDetailSheet />
      </div>
    </section>
  );
};

