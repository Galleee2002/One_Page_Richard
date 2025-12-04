import React from "react";

import Image from "next/image";

import { Product } from "@/types/product";

interface ProductCardProps {
  product: Product;

  onClick: (product: Product) => void;
}

const ProductCard = ({ product, onClick }: ProductCardProps) => {
  // Formateador de moneda

  const formattedPrice = new Intl.NumberFormat("en-US", {
    style: "currency",

    currency: "USD",

    minimumFractionDigits: 0,
  }).format(product.price);

  return (
    <div
      onClick={() => onClick(product)}
      className="group cursor-pointer flex flex-col gap-4"
    >
      {/* 1. CONTENEDOR DE IMAGEN (Uniforme 3:4) */}

      <div className="relative aspect-[3/4] w-full overflow-hidden rounded-2xl bg-neutral-100 dark:bg-neutral-900">
        {/* Imagen Principal */}

        {product.images[0] ? (
          <Image
            src={product.images[0]}
            alt={product.name}
            fill
            className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-neutral-300">
            <span className="text-xs">Sin imagen</span>
          </div>
        )}

        {/* Overlay sutil al Hover (Solo oscurece un poco) */}

        <div className="absolute inset-0 bg-black/0 transition-colors duration-300 group-hover:bg-black/5" />

        {/* Badge de Categoría (Flotante minimalista) */}

        <div className="absolute top-3 left-3">
          <span className="backdrop-blur-md bg-white/70 dark:bg-black/50 px-2 py-1 text-[10px] font-medium uppercase tracking-wider text-neutral-900 dark:text-white rounded-md">
            {product.category}
          </span>
        </div>
      </div>

      {/* 2. INFO DEL PRODUCTO (Fuera de la imagen para máxima claridad) */}

      <div className="flex justify-between items-start">
        <div className="space-y-1">
          <h3 className="font-medium text-neutral-900 dark:text-white text-lg leading-tight group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
            {product.name}
          </h3>

          <p className="text-sm text-neutral-500 dark:text-neutral-400 line-clamp-1">
            {product.short_description}
          </p>
        </div>

        <span className="font-semibold text-neutral-900 dark:text-white">
          {formattedPrice}
        </span>
      </div>
    </div>
  );
};

// --- COMPONENTE PRINCIPAL DE LA GRILLA ---

interface CleanProductGridProps {
  products: Product[];

  isLoading?: boolean;

  onProductSelect: (product: Product) => void;
}

export const CleanProductGrid = ({
  products,
  isLoading,
  onProductSelect,
}: CleanProductGridProps) => {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div key={i} className="animate-pulse space-y-4">
            <div className="aspect-[3/4] bg-neutral-200 dark:bg-neutral-800 rounded-2xl" />

            <div className="h-4 bg-neutral-200 dark:bg-neutral-800 rounded w-2/3" />

            <div className="h-4 bg-neutral-200 dark:bg-neutral-800 rounded w-1/4" />
          </div>
        ))}
      </div>
    );
  }

  return (
    <section className="mx-auto max-w-7xl px-6 py-12">
      {/* GRILLA UNIFORME:

         - Mobile: 1 columna

         - Tablet: 2 columnas

         - Desktop: 3 columnas (El estándar de lujo, permite imágenes grandes)

         - Gap generoso (gap-x-8, gap-y-12) para separar visualmente los items.

      */}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
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
