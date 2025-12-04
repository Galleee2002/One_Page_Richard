"use client";

import React, { useState } from "react";
import { CleanProductGrid } from "@/components/CleanProductGrid";
import { ProductDrawer } from "./components/ProductDrawer";
import { Product } from "@/types/product";

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
    full_description:
      "Una pieza maestra de diseño paramétrico. La estructura Voronoi proyecta sombras complejas y naturales.",
    images: [],
    size: "tall",
    stock: 15,
    features: [
      "Impresión PLA Eco",
      "Luz LED cálida incluida",
      "15h de impresión",
    ],
  },
  {
    id: "2",
    created_at: new Date().toISOString(),
    name: "Maceta Low-Poly",
    price: 45,
    category: "Decoración",
    short_description: "Geometría minimalista para suculentas.",
    full_description:
      "Diseño geométrico de baja poligonización. Incluye sistema de drenaje oculto.",
    images: [],
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
    full_description:
      "Diseñado para mejorar la postura y la ventilación de tu equipo.",
    images: [],
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
    full_description:
      "Sistema complejo de engranajes que giran silenciosamente. Pieza de conversación.",
    images: [],
    size: "large",
    stock: 5,
    features: ["Rodamientos cerámicos", "Edición Limitada"],
  },
];

export const ProductsSection = () => {
  // Estado elevado: controlamos el producto seleccionado y la visibilidad del drawer
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  // Aquí usaremos: const { data, isLoading } = useQuery(...)
  // Por ahora, datos MOCK para visualización
  const isLoading = false;

  // Handler cuando se hace click en una tarjeta del grid
  const handleProductSelect = (product: Product) => {
    setSelectedProduct(product);
    setIsDrawerOpen(true);
  };

  // Handler para cerrar el drawer
  const handleCloseDrawer = () => {
    setIsDrawerOpen(false);
    // Limpiar selectedProduct después de que termine la animación
    // para evitar glitches visuales
    setTimeout(() => setSelectedProduct(null), 300);
  };

  return (
    <section id="products" className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="mb-12 text-center max-w-2xl mx-auto">
          <h2 className="text-3xl md:text-5xl font-heading font-bold mb-4 text-foreground">
            Catálogo <span className="text-primary">Selecto</span>
          </h2>
          <p className="text-muted-foreground">
            Piezas diseñadas digitalmente y materializadas con precisión. Toca
            cualquier tarjeta para ver los detalles de ingeniería.
          </p>
        </div>

        {/* Grid de Productos */}
        <CleanProductGrid
          products={MOCK_PRODUCTS}
          isLoading={isLoading}
          onProductSelect={handleProductSelect}
        />

        {/* Drawer de Detalle (Siempre montado, controla su visibilidad vía props) */}
        <ProductDrawer
          product={selectedProduct}
          isOpen={isDrawerOpen}
          onClose={handleCloseDrawer}
        />
      </div>
    </section>
  );
};
