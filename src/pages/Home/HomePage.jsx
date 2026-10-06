import { useState } from 'react';
import ProductModal from '../../components/product/ProductModal.jsx';
import { useCatalog } from '../../context/catalog/useCatalog.js';
import BrandSection from './sections/BrandSection.jsx';
import CatalogSection from './sections/CatalogSection.jsx';
import ContactSection from './sections/ContactSection.jsx';
import FeaturedSection from './sections/FeaturedSection.jsx';
import HeroSection from './sections/HeroSection.jsx';
import PerksSection from './sections/PerksSection.jsx';

export default function HomePage() {
  const { products, getCategory } = useCatalog();
  const [selectedProductId, setSelectedProductId] = useState(null);

  const selectedProduct = products.find((product) => product.id === selectedProductId) ?? null;
  const categoryCount = new Set(products.map((product) => product.category)).size;

  return (
    <>
      <HeroSection categoryCount={categoryCount} />
      <BrandSection />
      <CatalogSection onOpenProduct={setSelectedProductId} />
      <FeaturedSection onOpenProduct={setSelectedProductId} />
      <PerksSection />
      <ContactSection />

      {selectedProduct && (
        <ProductModal
          product={selectedProduct}
          category={getCategory(selectedProduct.category)}
          onClose={() => setSelectedProductId(null)}
        />
      )}
    </>
  );
}
