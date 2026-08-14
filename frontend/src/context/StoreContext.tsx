import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  Product,
  Category,
  CartItem,
  CartCustomization,
  Order,
  CustomOrderRequest,
  Coupon,
  Review,
  User,
  OrderStatus,
  CustomOrderStatus,
} from '../types';
import {
  INITIAL_PRODUCTS,
  INITIAL_CATEGORIES,
  INITIAL_ORDERS,
  INITIAL_CUSTOM_ORDERS,
  INITIAL_COUPONS,
  INITIAL_REVIEWS,
  DEMO_USER,
} from '../data/mockData';

export interface ToastInfo {
  id: string;
  message: string;
  type: 'success' | 'info' | 'error' | 'heart';
}

interface StoreContextType {
  // Products & Categories
  products: Product[];
  categories: Category[];
  addProduct: (product: Omit<Product, 'id' | 'createdAt'>) => Product;
  updateProduct: (id: string, updates: Partial<Product>) => void;
  deleteProduct: (id: string) => void;

  // Cart
  cart: CartItem[];
  addToCart: (product: Product, quantity?: number, customization?: CartCustomization) => void;
  removeFromCart: (cartItemId: string) => void;
  updateCartQuantity: (cartItemId: string, newQuantity: number) => void;
  clearCart: () => void;
  cartSubtotal: number;
  cartDiscount: number;
  cartShippingFee: number;
  cartTotal: number;
  freeShippingThreshold: number;
  cartCount: number;

  // Wishlist
  wishlist: string[];
  toggleWishlist: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;

  // Coupon
  appliedCoupon: Coupon | null;
  applyCoupon: (code: string) => { success: boolean; message: string };
  removeCoupon: () => void;
  coupons: Coupon[];
  addCoupon: (coupon: Omit<Coupon, 'id' | 'usageCount'>) => void;
  toggleCouponStatus: (couponId: string) => void;

  // Orders
  orders: Order[];
  createOrder: (orderData: Omit<Order, 'id' | 'orderNumber' | 'createdAt' | 'statusHistory'>) => Order;
  updateOrderStatus: (orderId: string, status: OrderStatus, note?: string) => void;
  getOrderById: (orderId: string) => Order | undefined;
  getOrderByNumber: (orderNumber: string) => Order | undefined;

  // Custom Orders
  customOrders: CustomOrderRequest[];
  submitCustomOrder: (requestData: Omit<CustomOrderRequest, 'id' | 'requestNumber' | 'status' | 'createdAt' | 'timeline'>) => CustomOrderRequest;
  addCustomOrder: (requestData: Omit<CustomOrderRequest, 'id' | 'requestNumber' | 'status' | 'createdAt' | 'timeline'>) => CustomOrderRequest;
  updateCustomOrderStatus: (requestId: string, status: CustomOrderStatus, quotedPrice?: number, note?: string) => void;
  approveCustomOrderQuote: (requestId: string) => void;
  getCustomOrderById: (idOrNumber: string) => CustomOrderRequest | undefined;

  // Reviews
  reviews: Review[];
  addReview: (productId: string, rating: number, title: string, comment: string, images?: string[]) => void;
  getProductReviews: (productId: string) => Review[];

  // User & Auth
  currentUser: User | null;
  isAdmin: boolean;
  loginAsCustomer: () => void;
  loginAsAdmin: () => void;
  logout: () => void;
  updateUserProfile: (updates: Partial<User>) => void;

  // UI Modals & Drawers
  isCartDrawerOpen: boolean;
  setIsCartDrawerOpen: (open: boolean) => void;
  isSearchModalOpen: boolean;
  setIsSearchModalOpen: (open: boolean) => void;
  quickViewProduct: Product | null;
  setQuickViewProduct: (product: Product | null) => void;

  // Toasts
  toasts: ToastInfo[];
  showToast: (message: string, type?: 'success' | 'info' | 'error' | 'heart') => void;
  removeToast: (id: string) => void;
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

export const StoreProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Persistence states
  const [products, setProducts] = useState<Product[]>(() => {
    const saved = localStorage.getItem('soulcraft_products');
    return saved ? JSON.parse(saved) : INITIAL_PRODUCTS;
  });

  const [categories] = useState<Category[]>(INITIAL_CATEGORIES);

  const [cart, setCart] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem('soulcraft_cart');
    return saved ? JSON.parse(saved) : [];
  });

  const [wishlist, setWishlist] = useState<string[]>(() => {
    const saved = localStorage.getItem('soulcraft_wishlist');
    return saved ? JSON.parse(saved) : ['prod-001', 'prod-003'];
  });

  const [orders, setOrders] = useState<Order[]>(() => {
    const saved = localStorage.getItem('soulcraft_orders');
    return saved ? JSON.parse(saved) : INITIAL_ORDERS;
  });

  const [customOrders, setCustomOrders] = useState<CustomOrderRequest[]>(() => {
    const saved = localStorage.getItem('soulcraft_custom_orders');
    return saved ? JSON.parse(saved) : INITIAL_CUSTOM_ORDERS;
  });

  const [coupons, setCoupons] = useState<Coupon[]>(() => {
    const saved = localStorage.getItem('soulcraft_coupons');
    return saved ? JSON.parse(saved) : INITIAL_COUPONS;
  });

  const [reviews, setReviews] = useState<Review[]>(() => {
    const saved = localStorage.getItem('soulcraft_reviews');
    return saved ? JSON.parse(saved) : INITIAL_REVIEWS;
  });

  const [currentUser, setCurrentUser] = useState<User | null>(() => {
    const saved = localStorage.getItem('soulcraft_user');
    return saved ? JSON.parse(saved) : DEMO_USER;
  });

  const [appliedCoupon, setAppliedCoupon] = useState<Coupon | null>(null);

  // UI state
  const [isCartDrawerOpen, setIsCartDrawerOpen] = useState(false);
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [toasts, setToasts] = useState<ToastInfo[]>([]);

  // Sync to local storage
  useEffect(() => {
    localStorage.setItem('soulcraft_products', JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    localStorage.setItem('soulcraft_cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('soulcraft_wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  useEffect(() => {
    localStorage.setItem('soulcraft_orders', JSON.stringify(orders));
  }, [orders]);

  useEffect(() => {
    localStorage.setItem('soulcraft_custom_orders', JSON.stringify(customOrders));
  }, [customOrders]);

  useEffect(() => {
    localStorage.setItem('soulcraft_coupons', JSON.stringify(coupons));
  }, [coupons]);

  useEffect(() => {
    localStorage.setItem('soulcraft_reviews', JSON.stringify(reviews));
  }, [reviews]);

  useEffect(() => {
    if (currentUser) {
      localStorage.setItem('soulcraft_user', JSON.stringify(currentUser));
    } else {
      localStorage.removeItem('soulcraft_user');
    }
  }, [currentUser]);

  // Toast helper
  const showToast = (message: string, type: 'success' | 'info' | 'error' | 'heart' = 'success') => {
    const id = Date.now().toString() + Math.random().toString(36).substring(2, 5);
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      removeToast(id);
    }, 4000);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // Cart operations
  const addToCart = (product: Product, quantity = 1, customization?: CartCustomization) => {
    setCart((prev) => {
      // Check if exact same product with same customization exists
      const existingIndex = prev.findIndex(
        (item) =>
          item.productId === product.id &&
          JSON.stringify(item.customization || {}) === JSON.stringify(customization || {})
      );

      if (existingIndex > -1) {
        const updated = [...prev];
        const newQty = updated[existingIndex].quantity + quantity;
        updated[existingIndex] = {
          ...updated[existingIndex],
          quantity: newQty,
          totalPrice: newQty * updated[existingIndex].unitPrice,
        };
        return updated;
      } else {
        const unitPrice = product.price;
        const newItem: CartItem = {
          id: `cart-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
          productId: product.id,
          product,
          quantity,
          customization,
          unitPrice,
          totalPrice: unitPrice * quantity,
        };
        return [...prev, newItem];
      }
    });

    showToast(`Added "${product.name}" to your bag 💗`, 'heart');
    setIsCartDrawerOpen(true);
  };

  const removeFromCart = (cartItemId: string) => {
    setCart((prev) => prev.filter((item) => item.id !== cartItemId));
    showToast('Item removed from bag', 'info');
  };

  const updateCartQuantity = (cartItemId: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      removeFromCart(cartItemId);
      return;
    }
    setCart((prev) =>
      prev.map((item) =>
        item.id === cartItemId
          ? {
              ...item,
              quantity: newQuantity,
              totalPrice: newQuantity * item.unitPrice,
            }
          : item
      )
    );
  };

  const clearCart = () => {
    setCart([]);
    setAppliedCoupon(null);
  };

  const cartSubtotal = cart.reduce((acc, item) => acc + item.totalPrice, 0);
  const freeShippingThreshold = 999;
  const cartShippingFee = cartSubtotal >= freeShippingThreshold || cartSubtotal === 0 ? 0 : 99;

  let cartDiscount = 0;
  if (appliedCoupon && cartSubtotal >= appliedCoupon.minOrderAmount) {
    if (appliedCoupon.discountType === 'percentage') {
      const calc = (cartSubtotal * appliedCoupon.discountValue) / 100;
      cartDiscount = appliedCoupon.maxDiscountAmount ? Math.min(calc, appliedCoupon.maxDiscountAmount) : calc;
    } else {
      cartDiscount = appliedCoupon.discountValue;
    }
  }

  const cartTotal = Math.max(0, cartSubtotal - cartDiscount + cartShippingFee);
  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  // Wishlist
  const toggleWishlist = (productId: string) => {
    const exists = wishlist.includes(productId);
    if (exists) {
      setWishlist((prev) => prev.filter((id) => id !== productId));
      showToast('Removed from saved wishlist', 'info');
    } else {
      setWishlist((prev) => [...prev, productId]);
      showToast('Saved to your wishlist 💗', 'heart');
    }
  };

  const isInWishlist = (productId: string) => wishlist.includes(productId);

  // Coupon handling
  const applyCoupon = (code: string) => {
    const trimmed = code.trim().toUpperCase();
    const found = coupons.find((c) => c.code.toUpperCase() === trimmed && c.isActive);

    if (!found) {
      return { success: false, message: 'Invalid or expired promo coupon code.' };
    }

    if (cartSubtotal < found.minOrderAmount) {
      return {
        success: false,
        message: `Add ₹${found.minOrderAmount - cartSubtotal} more to apply code ${found.code}.`,
      };
    }

    setAppliedCoupon(found);
    showToast(`Applied ${found.code}! You saved with love 💗`, 'success');
    return { success: true, message: `Coupon applied successfully!` };
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
    showToast('Coupon code removed', 'info');
  };

  const addCoupon = (couponData: Omit<Coupon, 'id' | 'usageCount'>) => {
    const newCoupon: Coupon = {
      ...couponData,
      id: `c-${Date.now()}`,
      usageCount: 0,
    };
    setCoupons((prev) => [newCoupon, ...prev]);
    showToast(`Coupon ${newCoupon.code} created!`, 'success');
  };

  const toggleCouponStatus = (couponId: string) => {
    setCoupons((prev) =>
      prev.map((c) => (c.id === couponId ? { ...c, isActive: !c.isActive } : c))
    );
  };

  // Orders
  const createOrder = (orderData: Omit<Order, 'id' | 'orderNumber' | 'createdAt' | 'statusHistory'>): Order => {
    const randomNum = Math.floor(1000 + Math.random() * 9000);
    const orderNumber = `SC-2026-${randomNum}`;
    const newOrder: Order = {
      ...orderData,
      id: `ord-${Date.now()}`,
      orderNumber,
      createdAt: new Date().toISOString(),
      statusHistory: [
        {
          status: 'PLACED',
          date: 'Just now',
          note: `Order placed successfully via ${orderData.paymentMethod}`,
          completed: true,
        },
        {
          status: 'CONFIRMED',
          date: 'Awaiting studio confirmation',
          note: 'Soul Craft artisans assigned',
          completed: false,
        },
        {
          status: 'CRAFTING',
          date: 'In Queue',
          note: 'Handmaking with precision & love',
          completed: false,
        },
        {
          status: 'QUALITY_CHECK',
          date: 'Pending',
          note: 'Craft inspection & packaging',
          completed: false,
        },
        {
          status: 'SHIPPED',
          date: 'Pending',
          note: 'Dispatch with courier',
          completed: false,
        },
        {
          status: 'DELIVERED',
          date: `Estimated ${orderData.estimatedDeliveryDate}`,
          note: 'Doorstep handover',
          completed: false,
        },
      ],
    };

    setOrders((prev) => [newOrder, ...prev]);
    clearCart();
    return newOrder;
  };

  const updateOrderStatus = (orderId: string, status: OrderStatus, note?: string) => {
    setOrders((prev) =>
      prev.map((ord) => {
        if (ord.id === orderId) {
          const nowStr = new Date().toLocaleDateString('en-GB', {
            day: '2-digit',
            month: 'short',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
          });
          const updatedHistory = ord.statusHistory.map((h) => {
            if (h.status === status) {
              return { ...h, date: nowStr, note: note || h.note, completed: true };
            }
            return h;
          });
          return {
            ...ord,
            orderStatus: status,
            statusHistory: updatedHistory,
          };
        }
        return ord;
      })
    );
    showToast(`Order status updated to ${status}`, 'success');
  };

  const getOrderById = (orderId: string) => orders.find((o) => o.id === orderId);
  const getOrderByNumber = (orderNumber: string) =>
    orders.find((o) => o.orderNumber.toUpperCase() === orderNumber.trim().toUpperCase());

  // Custom Orders
  const submitCustomOrder = (
    requestData: Omit<CustomOrderRequest, 'id' | 'requestNumber' | 'status' | 'createdAt' | 'timeline'>
  ): CustomOrderRequest => {
    const randomNum = Math.floor(10000 + Math.random() * 90000);
    const requestNumber = `SC-CUSTOM-${randomNum}`;
    const nowStr = new Date().toLocaleDateString('en-GB', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });

    const newRequest: CustomOrderRequest = {
      ...requestData,
      id: `cust-${Date.now()}`,
      requestNumber,
      status: 'REQUESTED',
      createdAt: new Date().toISOString(),
      timeline: [
        {
          status: 'REQUESTED',
          date: nowStr,
          note: 'Custom design request received by Soul Craft Studio',
          completed: true,
        },
        {
          status: 'UNDER_REVIEW',
          date: 'Within 4-8 hours',
          note: 'Master artisan reviewing craft feasibility & material sourcing',
          completed: false,
        },
        {
          status: 'QUOTE_SENT',
          date: 'Upcoming',
          note: 'Bespoke pricing quote & estimated turnaround timeline',
          completed: false,
        },
        {
          status: 'CUSTOMER_APPROVED',
          date: 'Pending Approval',
          note: 'One-click quote acceptance & crafting start',
          completed: false,
        },
        {
          status: 'IN_PRODUCTION',
          date: 'Pending',
          note: 'Handmaking in progress',
          completed: false,
        },
        {
          status: 'SHIPPED',
          date: 'Pending',
          note: 'Protective packaging & courier dispatch',
          completed: false,
        },
      ],
    };

    setCustomOrders((prev) => [newRequest, ...prev]);
    showToast(`Custom Request ${requestNumber} created! 💗`, 'heart');
    return newRequest;
  };

  const updateCustomOrderStatus = (
    requestId: string,
    status: CustomOrderStatus,
    quotedPrice?: number,
    note?: string
  ) => {
    setCustomOrders((prev) =>
      prev.map((req) => {
        if (req.id === requestId || req.requestNumber === requestId) {
          const nowStr = new Date().toLocaleDateString('en-GB', {
            day: '2-digit',
            month: 'short',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
          });
          const updatedTimeline = req.timeline.map((t) => {
            if (t.status === status) {
              return { ...t, date: nowStr, note: note || t.note, completed: true };
            }
            return t;
          });
          return {
            ...req,
            status,
            quotedPrice: quotedPrice !== undefined ? quotedPrice : req.quotedPrice,
            timeline: updatedTimeline,
          };
        }
        return req;
      })
    );
    showToast(`Custom order status updated to ${status}`, 'success');
  };

  const approveCustomOrderQuote = (requestId: string) => {
    updateCustomOrderStatus(
      requestId,
      'CUSTOMER_APPROVED',
      undefined,
      'Customer approved quote online. Moving to production queue!'
    );
    showToast('Quote accepted! Crafting will begin shortly 💗', 'heart');
  };

  const getCustomOrderById = (idOrNumber: string) => {
    const clean = idOrNumber.trim().toUpperCase();
    return customOrders.find(
      (c) => c.id === idOrNumber || c.requestNumber.toUpperCase() === clean
    );
  };

  // Reviews
  const addReview = (productId: string, rating: number, title: string, comment: string, images?: string[]) => {
    const newRev: Review = {
      id: `rev-${Date.now()}`,
      productId,
      userName: currentUser ? currentUser.name : 'Verified Customer',
      userAvatar: currentUser?.avatar,
      rating,
      title,
      comment,
      date: new Date().toISOString().split('T')[0],
      verifiedPurchase: true,
      images,
      likes: 1,
      approved: true,
    };
    setReviews((prev) => [newRev, ...prev]);

    // Update product average rating & count
    setProducts((prev) =>
      prev.map((p) => {
        if (p.id === productId) {
          const newCount = p.reviewCount + 1;
          const newAvg = Number(((p.rating * p.reviewCount + rating) / newCount).toFixed(2));
          return { ...p, rating: newAvg, reviewCount: newCount };
        }
        return p;
      })
    );

    showToast('Thank you for your lovely review! 💗', 'heart');
  };

  const getProductReviews = (productId: string) =>
    reviews.filter((r) => r.productId === productId && (r.approved !== false));

  // Product CRUD for Admin
  const addProduct = (prodData: Omit<Product, 'id' | 'createdAt'>): Product => {
    const newProd: Product = {
      ...prodData,
      id: `prod-${Date.now()}`,
      createdAt: new Date().toISOString(),
    };
    setProducts((prev) => [newProd, ...prev]);
    showToast(`Added product "${newProd.name}"`, 'success');
    return newProd;
  };

  const updateProduct = (id: string, updates: Partial<Product>) => {
    setProducts((prev) => prev.map((p) => (p.id === id ? { ...p, ...updates } : p)));
    showToast('Product updated successfully', 'success');
  };

  const deleteProduct = (id: string) => {
    setProducts((prev) => prev.filter((p) => p.id !== id));
    showToast('Product deleted', 'info');
  };

  // User & Auth Switching
  const isAdmin = currentUser?.role === 'admin';

  const loginAsCustomer = () => {
    setCurrentUser(DEMO_USER);
    showToast(`Welcome back, ${DEMO_USER.name}! 💗`, 'heart');
  };

  const loginAsAdmin = () => {
    setCurrentUser({
      id: 'admin-001',
      name: 'Soul Craft Studio Master',
      email: 'studio@soulcraft.in',
      phone: '+91 99999 00000',
      role: 'admin',
      addresses: [],
      createdAt: '2026-01-01T00:00:00Z',
    });
    showToast('Switched to Admin Workspace Mode', 'info');
  };

  const logout = () => {
    setCurrentUser(null);
    showToast('Logged out of Soul Craft', 'info');
  };

  const updateUserProfile = (updates: Partial<User>) => {
    if (currentUser) {
      setCurrentUser({ ...currentUser, ...updates });
      showToast('Profile updated!', 'success');
    }
  };

  return (
    <StoreContext.Provider
      value={{
        products,
        categories,
        addProduct,
        updateProduct,
        deleteProduct,
        cart,
        addToCart,
        removeFromCart,
        updateCartQuantity,
        clearCart,
        cartSubtotal,
        cartDiscount,
        cartShippingFee,
        cartTotal,
        freeShippingThreshold,
        cartCount,
        wishlist,
        toggleWishlist,
        isInWishlist,
        appliedCoupon,
        applyCoupon,
        removeCoupon,
        coupons,
        addCoupon,
        toggleCouponStatus,
        orders,
        createOrder,
        updateOrderStatus,
        getOrderById,
        getOrderByNumber,
        customOrders,
        submitCustomOrder,
        addCustomOrder: submitCustomOrder,
        updateCustomOrderStatus,
        approveCustomOrderQuote,
        getCustomOrderById,
        reviews,
        addReview,
        getProductReviews,
        currentUser,
        isAdmin,
        loginAsCustomer,
        loginAsAdmin,
        logout,
        updateUserProfile,
        isCartDrawerOpen,
        setIsCartDrawerOpen,
        isSearchModalOpen,
        setIsSearchModalOpen,
        quickViewProduct,
        setQuickViewProduct,
        toasts,
        showToast,
        removeToast,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = (): StoreContextType => {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error('useStore must be used within a StoreProvider');
  }
  return context;
};
