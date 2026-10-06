import Footer from './components/layout/Footer.jsx';
import Header from './components/layout/Header.jsx';
import ProductJsonLd from './components/seo/ProductJsonLd.jsx';
import IconSprite from './components/ui/IconSprite.jsx';
import CatalogProvider from './context/catalog/CatalogProvider.jsx';
import ToastProvider from './context/toast/ToastProvider.jsx';
import HomePage from './pages/Home/HomePage.jsx';

export default function App() {
  return (
    <CatalogProvider>
      <ToastProvider>
        <IconSprite />
        <a className="skip-link" href="#catalogo">Saltar al catálogo</a>
        <Header />
        <main>
          <HomePage />
        </main>
        <Footer />
        <ProductJsonLd />
      </ToastProvider>
    </CatalogProvider>
  );
}
