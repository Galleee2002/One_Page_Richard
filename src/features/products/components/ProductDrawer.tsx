"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { Product } from "@/types/product";

// --- ICONOS SVG INLINE (Para no obligarte a instalar librerías de iconos aún) ---
const XIcon = () => (
  <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
  </svg>
);

const CheckIcon = () => (
  <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="text-green-500">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
  </svg>
);

const CartIcon = () => (
  <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
  </svg>
);

// --- PROPS ---
interface ProductDrawerProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
}

export const ProductDrawer = ({ product, isOpen, onClose }: ProductDrawerProps) => {
  const [isVisible, setIsVisible] = useState(false);

  // Efecto para manejar la animación de entrada/salida y el scroll del body
  useEffect(() => {
    if (isOpen) {
      setIsVisible(true);
      document.body.style.overflow = "hidden"; // Bloquear scroll página
    } else {
      const timer = setTimeout(() => setIsVisible(false), 300); // Esperar a que termine la animación
      document.body.style.overflow = "unset"; // Desbloquear scroll página
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  // Manejo de tecla ESC para cerrar
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  if (!isVisible && !isOpen) return null;
  if (!product) return null;

  const formattedPrice = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(product.price);

  return (
    <div className="relative z-50" aria-labelledby="slide-over-title" role="dialog" aria-modal="true">
      {/* 1. BACKDROP (Fondo oscuro borroso) */}
      <div
        className={`
          fixed inset-0 bg-neutral-900/40 backdrop-blur-sm transition-opacity duration-300 ease-in-out
          ${isOpen ? "opacity-100" : "opacity-0"}
        `}
        onClick={onClose}
      />

      {/* 2. PANEL DESLIZANTE */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 overflow-hidden">
          <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-0 md:pl-10">
            <div
              className={`
                pointer-events-auto w-screen max-w-2xl transform transition duration-300 ease-in-out flex flex-col bg-white dark:bg-neutral-950 shadow-2xl
                ${isOpen ? "translate-x-0" : "translate-x-full"}
              `}
            >
              {/* --- HEADER --- */}
              <div className="flex items-center justify-between px-6 py-4 border-b border-neutral-100 dark:border-neutral-800">
                <h2 className="text-lg font-semibold text-neutral-900 dark:text-white">Detalles del Producto</h2>
                <button
                  type="button"
                  className="rounded-md text-neutral-400 hover:text-neutral-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  onClick={onClose}
                >
                  <span className="sr-only">Cerrar panel</span>
                  <XIcon />
                </button>
              </div>

              {/* --- BODY (Scrollable) --- */}
              <div className="flex-1 overflow-y-auto p-6 md:p-10">
                {/* Categoría y Título */}
                <div className="mb-6">
                  <span className="text-sm font-medium text-blue-600 dark:text-blue-400 uppercase tracking-wider">
                    {product.category}
                  </span>
                  <h1 className="mt-2 text-3xl font-bold text-neutral-900 dark:text-white">{product.name}</h1>
                  <p className="mt-4 text-lg text-neutral-600 dark:text-neutral-300 leading-relaxed">
                    {product.full_description}
                  </p>
                </div>

                {/* Grid de Imágenes del Producto (Más de una si existen) */}
                {product.images && product.images.length > 0 ? (
                  <div className="space-y-4 mb-8">
                    {product.images.map((img, idx) => (
                      <div
                        key={idx}
                        className="relative h-64 md:h-96 w-full rounded-xl overflow-hidden bg-neutral-100 dark:bg-neutral-900"
                      >
                        <Image
                          src={img}
                          alt={`${product.name} view ${idx + 1}`}
                          fill
                          className="object-cover"
                          sizes="(max-width: 768px) 100vw, 800px"
                        />
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="mb-8">
                    <div className="relative h-64 md:h-96 w-full rounded-xl overflow-hidden bg-gradient-to-br from-neutral-100 to-neutral-200 dark:from-neutral-800 dark:to-neutral-900 flex items-center justify-center">
                      <div className="text-center text-neutral-400 dark:text-neutral-500">
                        <svg
                          className="w-16 h-16 mx-auto mb-4"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={1.5}
                            d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                          />
                        </svg>
                        <p className="text-sm font-medium">Imagen no disponible</p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Features List */}
                {product.features && product.features.length > 0 && (
                  <div className="mb-8 p-6 bg-neutral-50 dark:bg-neutral-900/50 rounded-2xl border border-neutral-100 dark:border-neutral-800">
                    <h3 className="text-sm font-semibold text-neutral-900 dark:text-white uppercase tracking-wide mb-4">
                      Características Técnicas
                    </h3>
                    <ul className="space-y-3">
                      {product.features.map((feature, idx) => (
                        <li key={idx} className="flex items-start text-neutral-600 dark:text-neutral-300">
                          <span className="mt-0.5 mr-3 flex-shrink-0">
                            <CheckIcon />
                          </span>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              {/* --- FOOTER (Sticky Actions) --- */}
              <div className="border-t border-neutral-100 dark:border-neutral-800 p-6 bg-white dark:bg-neutral-950 pb-10 md:pb-6">
                <div className="flex items-center justify-between gap-4">
                  <div className="flex flex-col">
                    <span className="text-sm text-neutral-500">Precio Total</span>
                    <span className="text-2xl font-bold text-neutral-900 dark:text-white">{formattedPrice}</span>
                  </div>

                  <button className="flex-1 bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 hover:bg-neutral-800 dark:hover:bg-neutral-200 py-4 px-6 rounded-xl font-semibold transition-colors flex items-center justify-center gap-2">
                    <CartIcon />
                    <span>Añadir al carrito</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

