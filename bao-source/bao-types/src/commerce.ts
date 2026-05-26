/**
 * Shared commerce domain types.
 *
 * Defines the API response and request payload shapes for commerce
 * sellers, shops, and products used by the Elysia API and HTML UI.
 *
 * @shared/types/commerce.ts
 */

/**
 * Supported seller/shop status values.
 */
export type CommerceStatus = "active" | "inactive";

/**
 * Supported seller gender values.
 */
export type CommerceGender = "male" | "female" | "nonbinary" | "unknown";

/**
 * Supported product status values.
 */
export type CommerceProductStatus = "draft" | "active" | "archived";

/**
 * Shared address structure for commerce entities.
 */
export interface CommerceAddress {
  street: string | null;
  city: string | null;
  state: string | null;
  postalCode: string | null;
  country: string | null;
}

/**
 * Commerce address input payload (no nulls).
 */
export interface CommerceAddressInput {
  street?: string;
  city?: string;
  state?: string;
  postalCode?: string;
  country?: string;
}

/**
 * Commerce seller record returned by the API.
 */
export interface CommerceSeller {
  id: string;
  name: string;
  email: string | null;
  phone: string | null;
  status: CommerceStatus;
  verified: boolean;
  gender: CommerceGender | null;
  dob: string | null;
  address: CommerceAddress;
  notes: string | null;
  createdAt: string;
  updatedAt: string;
}

/**
 * Commerce shop record returned by the API.
 */
export interface CommerceShop {
  id: string;
  name: string;
  slug: string;
  status: CommerceStatus;
  contactName: string | null;
  contactEmail: string | null;
  contactPhone: string | null;
  address: CommerceAddress;
  seller: { id: string; name: string } | null;
  createdAt: string;
  updatedAt: string;
}

/**
 * Commerce product record returned by the API.
 */
export interface CommerceProduct {
  id: string;
  name: string;
  slug: string;
  sku: string | null;
  status: CommerceProductStatus;
  category: string | null;
  description: string | null;
  imageUrl: string | null;
  costPrice: number | null;
  salePrice: number | null;
  discountPercent: number | null;
  taxPercent: number | null;
  stock: number | null;
  stockAlert: number | null;
  metaTitle: string | null;
  metaDescription: string | null;
  weight: number | null;
  width: number | null;
  height: number | null;
  depth: number | null;
  freeShipping: boolean;
  seller: { id: string; name: string } | null;
  shop: { id: string; name: string } | null;
  createdAt: string;
  updatedAt: string;
}

/**
 * Paginated response for commerce sellers.
 */
export interface CommerceSellerListResponse {
  ok: true;
  items: CommerceSeller[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

/**
 * Paginated response for commerce shops.
 */
export interface CommerceShopListResponse {
  ok: true;
  items: CommerceShop[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

/**
 * Paginated response for commerce products.
 */
export interface CommerceProductListResponse {
  ok: true;
  items: CommerceProduct[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

/**
 * Detail response for commerce seller.
 */
export interface CommerceSellerDetailResponse {
  ok: true;
  data: CommerceSeller;
}

/**
 * Detail response for commerce shop.
 */
export interface CommerceShopDetailResponse {
  ok: true;
  data: CommerceShop;
}

/**
 * Detail response for commerce product.
 */
export interface CommerceProductDetailResponse {
  ok: true;
  data: CommerceProduct;
}

/**
 * Seller creation payload.
 */
export interface CommerceSellerCreatePayload {
  name: string;
  email?: string;
  phone?: string;
  status?: CommerceStatus;
  verified?: boolean;
  gender?: CommerceGender;
  dob?: string;
  address?: CommerceAddressInput;
  notes?: string;
}

/**
 * Seller update payload.
 */
export interface CommerceSellerUpdatePayload extends CommerceSellerCreatePayload {}

/**
 * Shop creation payload.
 */
export interface CommerceShopCreatePayload {
  name: string;
  slug?: string;
  status?: CommerceStatus;
  contactName?: string;
  contactEmail?: string;
  contactPhone?: string;
  address?: CommerceAddressInput;
  sellerId?: string;
}

/**
 * Shop update payload.
 */
export interface CommerceShopUpdatePayload extends CommerceShopCreatePayload {}

/**
 * Product creation payload.
 */
export interface CommerceProductCreatePayload {
  name: string;
  slug?: string;
  sku?: string;
  status?: CommerceProductStatus;
  category?: string;
  description?: string;
  imageUrl?: string;
  costPrice?: number;
  salePrice?: number;
  discountPercent?: number;
  taxPercent?: number;
  stock?: number;
  stockAlert?: number;
  metaTitle?: string;
  metaDescription?: string;
  weight?: number;
  width?: number;
  height?: number;
  depth?: number;
  freeShipping?: boolean;
  sellerId?: string;
  shopId?: string;
}

/**
 * Product update payload.
 */
export interface CommerceProductUpdatePayload extends CommerceProductCreatePayload {}
