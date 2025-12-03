"use client";

import React from "react";
import Image from "next/image";
import { Product, BentoSize } from "@/types/product";

// --- UTILS: Mapeo de configuración visual ---
// Mapeamos el enum de tu DB a clases de Tailwind
const SIZE_CONFIG: Record<BentoSize, string> = {
  small: "md:col-span-1 md:row-span-1", // 1x1
  wide: "md:col-span-2 md:row-span-1", // 2x1 Horizontal
  tall: "md:col-span-1 md:row-span-2", // 1x2 Vertical
  large: "md:col-span-2 md:row-span-2", // 2x2 Grande
};

// --- SUB-COMPONENT: Card Individual ---
interface ProductCardProps {
  product: Product;
  onClick: (product: Product) => void;
}

const ProductCard = ({ product, onClick }: ProductCardProps) => {
  const { name, short_description, price, images, category, size } = product;

  const formattedPrice = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
  }).format(price);

  return (
    <article
      onClick={() => onClick(product)}
      className={`
        ${SIZE_CONFIG[size]} 
        group relative isolate flex flex-col justify-end overflow-hidden
        rounded-3xl bg-neutral-100 dark:bg-neutral-900
        cursor-pointer
        h-full min-h-[320px]
        /* Borde sutil exterior para separar del fondo blanco */
        ring-1 ring-neutral-900/5 dark:ring-white/10
      `}
    >
      {/* 1. IMAGEN DE FONDO + ZOOM */}
      <div className="absolute inset-0 z-0">
        {images && images.length > 0 && images[0] ? (
          <Image
            src={images[0]}
            alt={name}
            fill
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        ) : (
          // Placeholder más estético si no hay imagen
          <div className="h-full w-full bg-neutral-200 dark:bg-neutral-800 flex items-center justify-center text-neutral-400">
            <svg
              width="40"
              height="40"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1}
                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
          </div>
        )}
      </div>

      {/* 2. GRADIENTE MEJORADO (Más suave, menos "mancha negra") */}
      <div className="absolute inset-0 z-10 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-80 transition-opacity duration-300 group-hover:opacity-90" />

      {/* 3. BORDES INTERNOS (El toque "Apple") */}
      {/* Este borde blanco translúcido da la sensación de cristal pulido */}
      <div className="absolute inset-0 z-20 rounded-3xl ring-1 ring-inset ring-white/10 pointer-events-none" />

      {/* 4. CONTENIDO FLOTANTE */}
      <div className="relative z-30 p-6 flex flex-col h-full justify-between">
        {/* Top: Badges y Precio */}
        <div className="flex items-start justify-between opacity-90 transition-opacity group-hover:opacity-100">
          {/* Categoría Pill con efecto Glass */}
          <span className="backdrop-blur-md bg-white/20 border border-white/20 text-white px-3 py-1 rounded-full text-xs font-semibold tracking-wide uppercase shadow-sm">
            {category}
          </span>

          {/* Precio limpio */}
          <span className="text-white font-medium text-lg drop-shadow-md">
            {formattedPrice}
          </span>
        </div>

        {/* Bottom: Info Principal */}
        <div className="transform transition-transform duration-300 translate-y-2 group-hover:translate-y-0">
          <h3 className="font-bold text-2xl text-white leading-tight mb-2 drop-shadow-lg">
            {name}
          </h3>

          {/* Descripción: Solo visible en hover o tarjetas grandes, pero con mejor tipografía */}
          <div
            className={`
             overflow-hidden transition-all duration-300 ease-in-out
             ${
               size === "large" || size === "wide"
                 ? "max-h-20 opacity-90"
                 : "max-h-0 opacity-0 group-hover:max-h-20 group-hover:opacity-100"
             }
          `}
          >
            <p className="text-neutral-200 text-sm leading-relaxed font-light">
              {short_description}
            </p>
          </div>

          {/* Call to action sutil */}
          <div className="mt-4 flex items-center gap-2 text-white/80 text-sm font-medium opacity-0 -translate-x-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0">
            Ver detalles <span className="text-lg">→</span>
          </div>
        </div>
      </div>
    </article>
  );
};

// --- COMPONENTE PRINCIPAL ---
interface SmartProductGridProps {
  products: Product[];
  isLoading?: boolean;
  onProductSelect: (product: Product) => void;
}

export const SmartProductGrid = ({
  products,
  isLoading,
  onProductSelect,
}: SmartProductGridProps) => {

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 gap-4 md:grid-cols-4 md:auto-rows-[320px] animate-pulse">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className={`bg-neutral-200 dark:bg-neutral-800 rounded-2xl ${
              i === 0 ? "md:col-span-2 md:row-span-2" : "col-span-1"
            }`}
          />
        ))}
      </div>
    );
  }

  return (
    <section className="mx-auto max-w-7xl px-4 py-12">
      {/* GRID-FLOW-DENSE: La clave mágica.
         Rellena los huecos vacíos con items pequeños que vengan después en el array.
      */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-4 md:auto-rows-[320px] grid-flow-dense">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onClick={onProductSelect}
          />
        ))}
      </div>
    </section>
  );
};

