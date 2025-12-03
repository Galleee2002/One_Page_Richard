"use client";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { useProductStore } from "../store/product-store";
import { ShoppingCart, Check, Box } from "lucide-react";

export const ProductDetailSheet = () => {
  const { isSheetOpen, closeSheet, selectedProduct } = useProductStore();

  if (!selectedProduct) return null;

  return (
    <Sheet open={isSheetOpen} onOpenChange={closeSheet}>
      <SheetContent className="w-full sm:max-w-lg overflow-y-auto">
        <SheetHeader className="text-left space-y-4">
          {/* Imagen Principal en el Sheet */}
          <div className="aspect-square w-full relative rounded-xl overflow-hidden bg-gradient-to-br from-neutral-100 to-neutral-200 dark:from-neutral-800 dark:to-neutral-900 mt-6 flex items-center justify-center">
            {selectedProduct.images && selectedProduct.images.length > 0 && selectedProduct.images[0] ? (
              <img
                src={selectedProduct.images[0]}
                alt={selectedProduct.name}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="text-center text-neutral-400 dark:text-neutral-500">
                <svg
                  className="w-16 h-16 mx-auto mb-2"
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
            )}
          </div>
          
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Badge variant="outline" className="border-primary/50 text-primary uppercase text-xs">
                {selectedProduct.category}
              </Badge>
              <span className="text-2xl font-bold font-heading text-foreground">
                ${selectedProduct.price}
              </span>
            </div>
            
            <SheetTitle className="text-3xl font-heading font-bold">
              {selectedProduct.name}
            </SheetTitle>
          </div>
        </SheetHeader>

        <div className="mt-6 space-y-6">
          <div className="text-neutral-600 leading-relaxed text-sm">
            {selectedProduct.full_description}
          </div>

          {/* Características Técnicas */}
          {selectedProduct.features && selectedProduct.features.length > 0 && (
            <div className="space-y-3">
              <h4 className="font-medium text-foreground flex items-center gap-2">
                <Box className="w-4 h-4" /> Especificaciones
              </h4>
              <ul className="grid grid-cols-1 gap-2">
                {selectedProduct.features.map((feature, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-neutral-600">
                    <Check className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          <Separator />

          {/* Actions */}
          <div className="flex gap-4 pt-2 pb-8">
            <Button 
              className="flex-1 bg-primary text-primary-foreground hover:bg-primary/90 font-semibold" 
              size="lg"
            >
              <ShoppingCart className="w-4 h-4 mr-2" />
              Agregar al Carrito
            </Button>
            <Button variant="outline" size="lg" onClick={closeSheet}>
              Cerrar
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

