export interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  shortDescription: string;
  categoryId: string;
  categoryName: string;
  price: number;
  compareAtPrice?: number;
  images: string[];
  thumbnail: string;
  sku: string;
  stock: number;
  lowStockThreshold: number;
  rating: number;
  reviewCount: number;
  tags: string[];
  materials: string[];
  dimensions: string;
  colors: string[];
  occasion: string[];
  isCustomizable: boolean;
  customizationOptions?: {
    allowsText?: boolean;
    textLabel?: string;
    textMaxLength?: number;
    allowsPhoto?: boolean;
    photoLabel?: string;
    allowsColorChoice?: boolean;
    colorOptions?: string[];
    allowsSizeChoice?: boolean;
    sizeOptions?: string[];
    allowsDate?: boolean;
    dateLabel?: string;
  };
  processingTime: string;
  shippingInfo: string;
  careInstructions: string;
  artisanNote?: string;
  isFeatured?: boolean;
  isBestseller?: boolean;
  isNew?: boolean;
  isActive: boolean;
  createdAt: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  image: string;
  description: string;
  itemCount: number;
  featured?: boolean;
}

export interface CartCustomization {
  customName?: string;
  customMessage?: string;
  selectedColor?: string;
  selectedSize?: string;
  selectedDate?: string;
  uploadedPhotoName?: string;
  giftWrap?: boolean;
  giftMessage?: string;
}

export interface CartItem {
  id: string;
  productId: string;
  product: Product;
  quantity: number;
  customization?: CartCustomization;
  unitPrice: number;
  totalPrice: number;
}

export interface WishlistItem {
  productId: string;
  addedAt: string;
}

export type OrderStatus =
  | 'PLACED'
  | 'CONFIRMED'
  | 'PROCESSING'
  | 'CRAFTING'
  | 'QUALITY_CHECK'
  | 'SHIPPED'
  | 'OUT_FOR_DELIVERY'
  | 'DELIVERED'
  | 'CANCELLED';

export interface OrderStatusHistory {
  status: OrderStatus;
  date: string;
  note: string;
  completed: boolean;
}

export interface ShippingAddress {
  fullName: string;
  email: string;
  phone: string;
  streetAddress: string;
  apartment?: string;
  city: string;
  state: string;
  pinCode: string;
  country: string;
  isDefault?: boolean;
}

export interface Order {
  id: string;
  orderNumber: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  items: {
    productId: string;
    productName: string;
    productImage: string;
    quantity: number;
    price: number;
    customization?: CartCustomization;
  }[];
  shippingAddress: ShippingAddress;
  billingAddress?: ShippingAddress;
  paymentMethod: 'UPI' | 'CARD' | 'NETBANKING' | 'COD';
  paymentStatus: 'PAID' | 'PENDING' | 'REFUNDED' | 'FAILED';
  orderStatus: OrderStatus;
  trackingNumber?: string;
  carrier?: string;
  subtotal: number;
  discountAmount: number;
  appliedCoupon?: string;
  shippingFee: number;
  taxAmount: number;
  totalAmount: number;
  deliveryNotes?: string;
  estimatedDeliveryDate: string;
  createdAt: string;
  statusHistory: OrderStatusHistory[];
}

export type CustomOrderStatus =
  | 'REQUESTED'
  | 'UNDER_REVIEW'
  | 'QUOTE_SENT'
  | 'CUSTOMER_APPROVED'
  | 'PAYMENT_PENDING'
  | 'IN_PRODUCTION'
  | 'QUALITY_CHECK'
  | 'SHIPPED'
  | 'DELIVERED'
  | 'CANCELLED';

export interface CustomOrderTimeline {
  status: CustomOrderStatus;
  date: string;
  note: string;
  completed: boolean;
}

export interface CustomOrderRequest {
  id: string;
  requestNumber: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  productType: string;
  occasion: string;
  preferredColor?: string;
  colorTheme?: string;
  recipientName?: string;
  budgetRange: string;
  requiredDate?: string;
  quantity?: number;
  description: string;
  referenceImages: string[];
  deliveryCity?: string;
  deliveryState?: string;
  deliveryPinCode?: string;
  city?: string;
  pinCode?: string;
  additionalNotes?: string;
  status: CustomOrderStatus;
  quotedPrice?: number;
  estimatedPrice?: number;
  adminNotes?: string;
  estimatedCompletionDate?: string;
  createdAt: string;
  timeline: CustomOrderTimeline[];
}

export interface Review {
  id: string;
  productId: string;
  userName: string;
  userAvatar?: string;
  rating: number;
  title: string;
  comment: string;
  date: string;
  verifiedPurchase: boolean;
  images?: string[];
  likes: number;
  approved?: boolean;
}

export interface Testimonial {
  id: string;
  name: string;
  location: string;
  avatar: string;
  rating: number;
  comment: string;
  productPurchased: string;
  productImage: string;
  date: string;
}

export interface Coupon {
  id: string;
  code: string;
  discountType: 'percentage' | 'fixed';
  discountValue: number;
  minOrderAmount: number;
  maxDiscountAmount?: number;
  expiryDate: string;
  isActive: boolean;
  description: string;
  usageCount: number;
}

export interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  role: 'customer' | 'admin';
  avatar?: string;
  addresses: ShippingAddress[];
  createdAt: string;
}

export interface FilterState {
  category: string;
  priceRange: [number, number];
  sortBy: 'featured' | 'newest' | 'price-asc' | 'price-desc' | 'rating' | 'popular';
  inStockOnly: boolean;
  customizableOnly: boolean;
  selectedColors: string[];
  selectedOccasions: string[];
  selectedMaterials: string[];
  minRating: number;
  searchQuery: string;
}
