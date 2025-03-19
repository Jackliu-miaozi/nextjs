import { DemoBanner } from "@/components/DemoBanner";
import { LocaleSwitcher } from "@/components/LocaleSwitcher";
import { routing } from "@/libs/i18nNavigation";
import { BaseTemplate } from "@/templates/BaseTemplate";
import { enUS, frFR, zhCN } from "@clerk/localizations";
import { ClerkProvider, SignOutButton } from "@clerk/nextjs";
import { currentUser } from "@clerk/nextjs/server";
import { getTranslations, setRequestLocale } from "next-intl/server";
import Link from "next/link";

export default async function Layout(props: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await props.params;
  setRequestLocale(locale);
  const t = await getTranslations({
    locale,
    namespace: "RootLayout",
  });

  // 获取当前用户信息
  const user = await currentUser();
  const isSignedIn = !!user;

  // 设置Clerk本地化和URL配置
  let clerkLocale = enUS;
  let signInUrl = "/sign-in";
  let signUpUrl = "/sign-up";
  let dashboardUrl = "/dashboard";
  let afterSignOutUrl = "/";

  // 根据当前语言设置Clerk本地化
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

  return (
    <ClerkProvider
      localization={clerkLocale}
      signInUrl={signInUrl}
      signUpUrl={signUpUrl}
      signInFallbackRedirectUrl={dashboardUrl}
      signUpFallbackRedirectUrl={dashboardUrl}
      afterSignOutUrl={afterSignOutUrl}
    >
      <DemoBanner />
      <BaseTemplate
        leftNav={
          <>
            <li>
              <Link
                href="/"
                className="border-none text-gray-700 hover:text-gray-900"
              >
                {t("home_link")}
              </Link>
            </li>
            <li>
              <Link
                href="/booking/"
                className="border-none text-gray-700 hover:text-gray-900"
              >
                {t("about_link")}
              </Link>
            </li>
          </>
        }
        rightNav={
          <>
            {isSignedIn ? (
              <>
                <li>
                  <SignOutButton>
                    <button
                      className="border-none text-gray-700 hover:text-gray-900 cursor-pointer"
                      type="button"
                    >
                      {t("sign_out")}
                    </button>
                  </SignOutButton>
                </li>
                <li>
                  <Link
                    href="/dashboard/"
                    className="border-none text-gray-700 hover:text-gray-900"
                  >
                    {t("dashboard_link")}
                  </Link>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link
                    href="/sign-in/"
                    className="border-none text-gray-700 hover:text-gray-900"
                  >
                    {t("sign_in_link")}
                  </Link>
                </li>

                <li>
                  <Link
                    href="/sign-up/"
                    className="border-none text-gray-700 hover:text-gray-900"
                  >
                    {t("sign_up_link")}
                  </Link>
                </li>
              </>
            )}

            <li>
              <LocaleSwitcher />
            </li>
          </>
        }
      >
        <div className="py-5 text-xl [&_p]:my-6">{props.children}</div>
      </BaseTemplate>
    </ClerkProvider>
  );
}
