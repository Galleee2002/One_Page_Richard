"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { useProductStore } from "../store/product-store";
import { Database } from "@/types/database.types";

type Product = Database['public']['Tables']['products']['Row'];

// Mapeo de tamaños de DB a clases Tailwind
const sizeClasses: Record<string, string> = {
  small: "md:col-span-1 md:row-span-1", // 1x1
  wide: "md:col-span-2 md:row-span-1",  // 2x1
  tall: "md:col-span-1 md:row-span-2",  // 1x2
  large: "md:col-span-2 md:row-span-2", // 2x2
};

interface ProductBentoGridProps {
  products: Product[];
  isLoading: boolean;
}

export const ProductBentoGrid = ({ products, isLoading }: ProductBentoGridProps) => {
  const openSheet = useProductStore((state) => state.openSheet);

  if (isLoading) {
    return <BentoSkeleton />;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 auto-rows-[280px] gap-4">
      {products?.map((product, index) => (
        <motion.div
          key={product.id}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: index * 0.05 }}
          viewport={{ once: true }}
          className={cn(
            "group relative rounded-2xl overflow-hidden bg-card border border-border shadow-sm cursor-pointer",
            sizeClasses[product.size || "small"]
          )}
          onClick={() => openSheet(product)}
        >
          {/* Background Image con efecto Zoom */}
          <div className="absolute inset-0 w-full h-full">
            <img
              src={product.images?.[0] || "/placeholder-3d.jpg"}
              alt={product.name}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
            {/* Gradiente sutil para leer texto */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />
          </div>

          {/* Contenido (Overlay) */}
          <div className="absolute inset-0 p-5 flex flex-col justify-end text-white">
            <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
              <div className="flex justify-between items-center mb-1">
                <span className="text-xs font-mono uppercase tracking-wider text-primary">
                  {product.category}
                </span>
                <span className="font-heading font-bold text-lg">
                  ${product.price}
                </span>
              </div>
              
              <h3 className="font-heading text-xl md:text-2xl font-bold leading-tight mb-2">
                {product.name}
              </h3>
              
              <p className="text-sm text-neutral-300 line-clamp-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-75">
                {product.short_description}
              </p>
            </div>

            {/* Icono Flotante Top-Right */}
            <div className="absolute top-4 right-4 bg-white/10 backdrop-blur-md p-2 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 -translate-y-2 group-hover:translate-y-0">
              <ArrowUpRight className="w-5 h-5 text-white" />
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

const BentoSkeleton = () => (
  <div className="grid grid-cols-1 md:grid-cols-4 auto-rows-[280px] gap-4 animate-pulse">
    {[...Array(6)].map((_, i) => (
      <div 
        key={i} 
        className={cn(
          "bg-neutral-200 dark:bg-neutral-800 rounded-2xl", 
          i === 0 ? "md:col-span-2 md:row-span-2" : "col-span-1"
        )} 
      />
    ))}
  </div>
);

