// ============================================
// HousePlus 全局类型定义
// ============================================

// ---- 多语言 ----
export type Locale = 'en' | 'es' | 'de' | 'fr' | 'ar';

export interface LocaleConfig {
  code: Locale;
  name: string;
  direction: 'ltr' | 'rtl';
  flag: string;
}

// ---- 产品目录 ----
export interface Product {
  slug: string;
  name: string;
  category: 'solar' | 'appliances' | 'electronics';
  model: string;
  coverImage: string;
  description: string;
  badge: string;
}

export interface ProductCategory {
  id: string;
  label: string;
  color: string;
  badgeColor: string;
  icon: string;
}

export interface CategoryGroup extends ProductCategory {
  items: Product[];
}

// ---- SEO / 元数据 ----
export interface SEOMetadata {
  title: string;
  description: string;
  canonical?: string;
  openGraph?: {
    title?: string;
    description?: string;
    images?: string[];
  };
}

// ---- API 响应 ----
export interface APIResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

// ---- 联系表单 ----
export interface ContactFormData {
  name: string;
  email: string;
  company?: string;
  message: string;
  productInterest?: string;
}

// ---- 通用工具类型 ----
export type Optional<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;
export type RequiredFields<T, K extends keyof T> = T & Required<Pick<T, K>>;
