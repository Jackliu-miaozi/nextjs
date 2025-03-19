import DelayedClerkSignUpClient from "@/components/DelayedClerkSignUpClient";
import SignInSkeleton from "@/components/SignInSkeleton";
import { getI18nPath } from "@/utils/Helpers";
import { getTranslations, setRequestLocale } from "next-intl/server";
import Link from "next/link";
import { Suspense } from "react";

type ISignUpPageProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata(props: ISignUpPageProps) {
  const { locale } = await props.params;
  const t = await getTranslations({
    locale,
    namespace: "SignUp",
  });

  return {
    title: t("meta_title"),
    description: t("meta_description"),
  };
}

export default async function SignUpPage(props: ISignUpPageProps) {
  const { locale } = await props.params;
  setRequestLocale(locale);
  const t = await getTranslations({
    locale,
    namespace: "SignUp",
  });
  return (
    <div className="space-y-4">
      <div className="text-center">
        <Link
          href={getI18nPath("/", locale)}
          className="inline-flex items-center text-sm text-blue-600 hover:text-blue-800 transition-colors group"
        >
          <svg
            className="w-4 h-4 mr-1 transition-transform group-hover:-translate-x-1"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M10 19l-7-7m0 0l7-7m-7 7h18"
            />
          </svg>
          <span>{t("back_to_home")}</span>
        </Link>
      </div>
      <div className="w-full">
        <Suspense fallback={<SignInSkeleton />}>
          <DelayedClerkSignUpClient
            path={getI18nPath("/sign-up", locale)}
            delayMs={2000}
          />
        </Suspense>
      </div>
    </div>
  );
}
