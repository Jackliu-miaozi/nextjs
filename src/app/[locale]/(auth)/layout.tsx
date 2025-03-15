// 导入路由配置
import { routing } from "@/libs/i18nNavigation";
// 导入Clerk的本地化语言包
import { enUS, frFR, zhCN } from "@clerk/localizations";
// 导入Clerk的Provider组件
import { ClerkProvider } from "@clerk/nextjs";
// 导入next-intl的设置请求locale的方法
import { setRequestLocale } from "next-intl/server";

// 定义认证布局组件，接收children和locale参数
export default async function AuthLayout(props: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  // 解构获取locale参数
  const { locale } = await props.params;
  // 设置请求的locale
  setRequestLocale(locale);
  // 设置默认的Clerk本地化语言为英语
  let clerkLocale = enUS;
  // 设置默认的URL路径
  let signInUrl = "/sign-in";
  let signUpUrl = "/sign-up";
  let dashboardUrl = "/dashboard";
  let afterSignOutUrl = "/";

  // 如果locale是法语，设置Clerk本地化语言为法语
  if (locale === "fr") {
    clerkLocale = frFR;
  }
  if (locale === "zh") {
    clerkLocale = zhCN;
  }
  // 如果当前locale不是默认locale，在URL前添加locale前缀
  if (locale !== routing.defaultLocale) {
    signInUrl = `/${locale}${signInUrl}`;
    signUpUrl = `/${locale}${signUpUrl}`;
    dashboardUrl = `/${locale}${dashboardUrl}`;
    afterSignOutUrl = `/${locale}${afterSignOutUrl}`;
  }

  // 返回ClerkProvider包裹的内容，设置相关配置
  return (
    <ClerkProvider
      localization={clerkLocale}
      signInUrl={signInUrl}
      signUpUrl={signUpUrl}
      signInFallbackRedirectUrl={dashboardUrl}
      signUpFallbackRedirectUrl={dashboardUrl}
      afterSignOutUrl={afterSignOutUrl}
    >
      {props.children}
    </ClerkProvider>
  );
}
