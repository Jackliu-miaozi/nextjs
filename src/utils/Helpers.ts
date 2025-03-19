// 从 i18nNavigation 库导入路由配置
import { routing } from "@/libs/i18nNavigation";

// 获取应用的基础URL的函数
export const getBaseUrl = () => {
  // 如果存在环境变量 NEXT_PUBLIC_APP_URL，直接返回该值
  if (process.env.NEXT_PUBLIC_APP_URL) {
    return process.env.NEXT_PUBLIC_APP_URL;
  }

  // 如果是生产环境且设置了生产环境URL，返回完整的https URL
  if (
    process.env.VERCEL_ENV === "production" &&
    process.env.VERCEL_PROJECT_PRODUCTION_URL
  ) {
    return `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`;
  }

  // 如果存在 VERCEL_URL 环境变量，返回完整的https URL
  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`;
  }

  // 默认返回本地开发环境URL
  return "http://localhost:3000";
};

// 获取国际化路径的函数，接收URL和语言区域参数
export const getI18nPath = (url: string, locale: string) => {
  // 如果是默认语言，直接返回原始URL
  if (locale === routing.defaultLocale) {
    return url;
  }

  // 非默认语言，在URL前添加语言前缀
  return `/${locale}${url}`;
};
