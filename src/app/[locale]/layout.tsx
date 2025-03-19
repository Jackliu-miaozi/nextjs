// 导入必要的类型和模块
import type { Metadata } from "next"; // 导入Next.js的元数据类型
import arcjet, { detectBot, request } from "@/libs/Arcjet"; // 导入Arcjet相关功能用于机器人检测
import { Env } from "@/libs/Env"; // 导入环境变量
import { routing } from "@/libs/i18nNavigation"; // 导入国际化路由配置
import { NextIntlClientProvider } from "next-intl"; // 导入国际化客户端提供者
import { getMessages, setRequestLocale } from "next-intl/server"; // 导入国际化服务端功能
import { notFound } from "next/navigation"; // 导入404处理函数
import "@/styles/global.css"; // 导入全局样式

// 定义网站图标元数据配置
export const metadata: Metadata = {
  icons: [
    {
      rel: "apple-touch-icon", // iOS设备上的图标
      url: "/apple-touch-icon.png",
    },
    {
      rel: "icon",
      type: "image/png",
      sizes: "32x32", // 32x32像素的favicon
      url: "/favicon-32x32.png",
    },
    {
      rel: "icon",
      type: "image/png",
      sizes: "16x16", // 16x16像素的favicon
      url: "/favicon-16x16.png",
    },
    {
      rel: "icon", // 默认favicon
      url: "/favicon.ico",
    },
  ],
};

// 生成静态参数，用于静态页面生成
export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

// Improve security with Arcjet
const aj = arcjet.withRule(
  detectBot({
    mode: "LIVE", // 设置为实时模式
    // Block all bots except the following
    allow: [
      // See https://docs.arcjet.com/bot-protection/identifying-bots
      "CATEGORY:SEARCH_ENGINE", // Allow search engines
      "CATEGORY:PREVIEW", // Allow preview links to show OG images
      "CATEGORY:MONITOR", // Allow uptime monitoring services
    ],
  }),
);

// 根布局组件，处理国际化和机器人检测
export default async function RootLayout(props: {
  children: React.ReactNode; // 子组件
  params: Promise<{ locale: string }>; // 语言参数
}) {
  // 获取当前语言设置
  const { locale } = await props.params;

  // 检查语言是否在支持列表中
  if (!routing.locales.includes(locale)) {
    notFound();
  }

  // 设置请求的语言环境
  setRequestLocale(locale);

  // 使用Arcjet进行请求验证
  if (Env.ARCJET_KEY) {
    const req = await request();
    const decision = await aj.protect(req);

    // These errors are handled by the global error boundary, but you could also
    // redirect or show a custom error page
    if (decision.isDenied()) {
      if (decision.reason.isBot()) {
        throw new Error("No bots allowed");
      }

      throw new Error("Access denied");
    }
  }

  // 获取国际化消息
  const messages = await getMessages();

  // The `suppressHydrationWarning` attribute in <body> is used to prevent hydration errors caused by Sentry Overlay,
  // which dynamically adds a `style` attribute to the body tag.

  // 返回根布局结构
  return (
    <html lang={locale}>
      <body suppressHydrationWarning>
        <NextIntlClientProvider locale={locale} messages={messages}>
          {props.children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
