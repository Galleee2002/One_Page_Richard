import { ProductDetailSheet } from "@/features/products/components/ProductDetailSheet";

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {children}
      <ProductDetailSheet />
    </>
  );
}

