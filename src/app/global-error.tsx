// "use client" 声明这是一个客户端组件
"use client";

// 导入路由配置，用于获取默认语言设置
import { routing } from "@/libs/i18nNavigation";
// 导入Sentry用于错误监控和报告
import * as Sentry from "@sentry/nextjs";
// 导入Next.js默认错误页面组件
import NextError from "next/error";
// 导入React的useEffect钩子
import { useEffect } from "react";

// 定义全局错误处理组件，接收一个包含error属性的props
// error属性是Error类型，可能包含一个可选的digest字符串
export default function GlobalError(props: {
  error: Error & { digest?: string };
}) {
  // 使用useEffect在组件挂载时将错误报告给Sentry
  useEffect(() => {
    Sentry.captureException(props.error);
  }, [props.error]);

  // 返回错误页面的HTML结构
  return (
    // 设置HTML的语言属性为默认语言
    <html lang={routing.defaultLocale}>
      <body>
        {/* `NextError` is the default Next.js error page component. Its type
        definition requires a `statusCode` prop. However, since the App Router
        does not expose status codes for errors, we simply pass 0 to render a
        generic error message. */}
        {/* 渲染Next.js默认错误组件，状态码设为0表示通用错误 */}
        <NextError statusCode={0} />
      </body>
    </html>
  );
}
