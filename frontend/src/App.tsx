import React, { useState, useEffect } from 'react';
import { StoreProvider } from './context/StoreContext';
import { Navbar } from './components/common/Navbar';
import { Footer } from './components/common/Footer';
import { CartDrawer } from './components/common/CartDrawer';
import { QuickViewModal } from './components/common/QuickViewModal';
import { SearchModal } from './components/common/SearchModal';
import { ToastContainer } from './components/common/ToastContainer';

// Pages
import { HomePage } from './pages/HomePage';
import { ShopPage } from './pages/ShopPage';
import { ProductDetailsPage } from './pages/ProductDetailsPage';
import { CartPage } from './pages/CartPage';
import { CheckoutPage } from './pages/CheckoutPage';
import { OrderConfirmationPage } from './pages/OrderConfirmationPage';
import { TrackOrderPage } from './pages/TrackOrderPage';
import { CategoriesPage } from './pages/CategoriesPage';
import { AccountPage } from './pages/AccountPage';
import { WishlistPage } from './pages/WishlistPage';
import { OffersPage } from './pages/OffersPage';
import { AboutPage } from './pages/AboutPage';
import { ContactPage } from './pages/ContactPage';
import { PoliciesPage } from './pages/PoliciesPage';
import { CustomOrderPage } from './pages/CustomOrderPage';
import { Order } from './types';

function AppContent() {
  const [currentPath, setCurrentPath] = useState<string>(() => {
    return window.location.pathname || '/';
  });
  const [lastPlacedOrder, setLastPlacedOrder] = useState<Order | null>(null);

  useEffect(() => {
    const handleLocationChange = () => {
      setCurrentPath(window.location.pathname + window.location.search);
    };
    window.addEventListener('popstate', handleLocationChange);
    return () => window.removeEventListener('popstate', handleLocationChange);
  }, []);

  const handleNavigate = (path: string) => {
    window.history.pushState({}, '', path);
    setCurrentPath(path);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Parse path and query parameters
  const [cleanPath, searchString] = currentPath.split('?');
  const searchParams = new URLSearchParams(searchString || '');
  const queryTab = searchParams.get('tab') || undefined;
  const queryOrderId = searchParams.get('orderId') || undefined;
  const queryTrackId = searchParams.get('trackId') || searchParams.get('order') || undefined;
  const isFaqDefault = searchParams.get('faq') === 'true';

  let renderedPage = <HomePage onNavigate={handleNavigate} />;

  if (cleanPath === '/' || cleanPath === '') {
    renderedPage = <HomePage onNavigate={handleNavigate} />;
  } else if (cleanPath === '/shop') {
    renderedPage = <ShopPage onNavigate={handleNavigate} />;
  } else if (cleanPath.startsWith('/category/')) {
    const slug = cleanPath.replace('/category/', '');
    renderedPage = <ShopPage onNavigate={handleNavigate} initialCategorySlug={slug} />;
  } else if (cleanPath === '/categories') {
    renderedPage = <CategoriesPage onNavigate={handleNavigate} />;
  } else if (cleanPath.startsWith('/product/')) {
    const slug = cleanPath.replace('/product/', '');
    renderedPage = <ProductDetailsPage slug={slug} onNavigate={handleNavigate} />;
  } else if (cleanPath === '/custom-orders') {
    renderedPage = <CustomOrderPage onNavigate={handleNavigate} />;
  } else if (cleanPath === '/cart') {
    renderedPage = <CartPage onNavigate={handleNavigate} />;
  } else if (cleanPath === '/checkout') {
    renderedPage = (
      <CheckoutPage
        onNavigate={handleNavigate}
        onOrderPlaced={(order) => {
          setLastPlacedOrder(order);
          handleNavigate(`/order-confirmation?orderId=${order.id}`);
        }}
      />
    );
  } else if (cleanPath === '/order-confirmation') {
    renderedPage = (
      <OrderConfirmationPage
        orderId={queryOrderId || lastPlacedOrder?.id}
        onNavigate={handleNavigate}
      />
    );
  } else if (cleanPath === '/track-order') {
    renderedPage = (
      <TrackOrderPage
        initialTrackingId={queryTrackId}
        onNavigate={handleNavigate}
      />
    );
  } else if (cleanPath === '/account') {
    renderedPage = <AccountPage initialTab={queryTab} onNavigate={handleNavigate} />;
  } else if (cleanPath === '/wishlist') {
    renderedPage = <WishlistPage onNavigate={handleNavigate} />;
  } else if (cleanPath === '/offers') {
    renderedPage = <OffersPage onNavigate={handleNavigate} />;
  } else if (cleanPath === '/about') {
    renderedPage = <AboutPage onNavigate={handleNavigate} />;
  } else if (cleanPath === '/contact') {
    renderedPage = <ContactPage onNavigate={handleNavigate} />;
  } else if (cleanPath === '/policies') {
    renderedPage = <PoliciesPage initialTab={queryTab} onNavigate={handleNavigate} />;
  } else if (cleanPath === '/admin') {
    renderedPage = <AccountPage initialTab="admin" onNavigate={handleNavigate} />;
  } else {
    renderedPage = <HomePage onNavigate={handleNavigate} />;
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#FFF5F7] text-[#1F2937] selection:bg-[#F472B6] selection:text-white antialiased">
      <Navbar currentPath={cleanPath} onNavigate={handleNavigate} />
      
      <main className="flex-1 w-full bg-[#FFF5F7]">
        {renderedPage}
      </main>

      <Footer onNavigate={handleNavigate} />

      {/* Global Modals, Drawers & Notifications */}
      <CartDrawer onNavigate={handleNavigate} />
      <QuickViewModal onNavigate={handleNavigate} />
      <SearchModal onNavigate={handleNavigate} />
      <ToastContainer />
    </div>
  );
}

export default function App() {
  return (
    <StoreProvider>
      <AppContent />
    </StoreProvider>
  );
}
