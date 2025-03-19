import DelayedClerkSignInClient from "@/components/DelayedClerkSignInClient";
import SignInSkeleton from "@/components/SignInSkeleton";
// 多语言支持的动态路由
// 导入必要的依赖
import { getI18nPath } from "@/utils/Helpers";
import { getTranslations, setRequestLocale } from "next-intl/server";
import Link from "next/link";
import { Suspense } from "react";

// 定义页面组件的Props类型
type ISignInPageProps = {
  params: Promise<{ locale: string }>; // params包含locale参数，类型为Promise
  // promise类型是一种特殊的对象，用于处理异步操作。需要使用await关键字来等待promise的解析
};

// 生成页面元数据的异步函数
export async function generateMetadata(props: ISignInPageProps) {
  const { locale } = await props.params; // 解构获取locale参数
  // 获取SignIn命名空间下的翻译函数
  const t = await getTranslations({
    locale,
    namespace: "SignIn",
  });

  // 返回页面的元数据，包括标题和描述
  return {
    title: t("meta_title"), // 使用翻译后的标题
    description: t("meta_description"), // 使用翻译后的描述
  };
}

// 登录页面的主组件
export default async function SignInPage(props: ISignInPageProps) {
  const { locale } = await props.params; // 解构获取locale参数
  setRequestLocale(locale); // 设置请求的语言环境
  // 获取SignIn命名空间下的翻译函数
  const t = await getTranslations({
    locale,
    namespace: "SignIn",
  });
  // 渲染返回主页链接和Clerk的SignIn组件
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
          <DelayedClerkSignInClient
            path={getI18nPath("/sign-in", locale)}
            delayMs={2000}
          />
        </Suspense>
      </div>
    </div>
  );
}
