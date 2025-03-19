// 导入Next.js服务端相关类型和函数
import type { NextFetchEvent, NextRequest } from "next/server";
// 导入arcjet核心功能
// 在middleware中，从libs中导入函数会导致nextjs报错tty
// middleware.ts是在Edge Runtime环境中运行的，这个环境不支持Node.js的'tty'模块
// 所以需要从这个环境直接读取env中的内容
import arcjet, { fixedWindow, shield } from "@arcjet/next";

// 导入Clerk认证中间件和路由匹配器
import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
// 导入next-intl国际化中间件创建函数
import createMiddleware from "next-intl/middleware";
// 导入Next.js响应对象
import { NextResponse } from "next/server";
// 导入国际化路由配置
import { routing } from "./libs/i18nNavigation";

// 创建国际化中间件实例
const intlMiddleware = createMiddleware(routing);

// 定义受保护路由匹配器，匹配dashboard相关路径
const isProtectedRoute = createRouteMatcher([
  "/dashboard(.*)", // 匹配根路径下的dashboard
  "/:locale/dashboard(.*)", // 匹配带语言前缀的dashboard
]);

// 定义认证页面路由匹配器，匹配登录注册页面
const isAuthPage = createRouteMatcher([
  "/sign-in(.*)", // 匹配登录页面
  "/:locale/sign-in(.*)", // 匹配带语言前缀的登录页面
  "/sign-up(.*)", // 匹配注册页面
  "/:locale/sign-up(.*)", // 匹配带语言前缀的注册页面
]);

// 定义营销页面路由匹配器，匹配首页和其他公开页面
const isMarketingPage = createRouteMatcher([
  "/", // 首页
  "/:locale", // 带语言前缀的首页
  "/about(.*)", // 关于页面
  "/:locale/about(.*)", // 带语言前缀的关于页面
  "/counter(.*)", // 计数器页面
  "/:locale/counter(.*)", // 带语言前缀的计数器页面
  "/portfolio(.*)", // 作品集页面
  "/:locale/portfolio(.*)", // 带语言前缀的作品集页面
]);
// 创建一个新的 Arcjet shield 实例并调用它
const aj = arcjet({
  // Get your site key from https://app.arcjet.com
  // and set it as an environment variable rather than hard coding.
  // See: https://nextjs.org/docs/app/building-your-application/configuring/environment-variables
  key: process.env.ARCJET_KEY!,  // 使用环境变量中的Arcjet密钥
  rules: [
    // Protect against common attacks with Arcjet Shield
    // 设置固定时间窗口的速率限制规则
    // mode: LIVE表示实际限制请求
    // window: 1小时的时间窗口
    // max: 每个时间窗口最多允许100个请求
    fixedWindow({
      mode: "LIVE",
      window: "1h", 
      max: 100,
    }),
    shield({
      mode: "LIVE",  // 设置为实时模式，将真实阻止可疑请求
      // 配置固定时间窗口限流规则
    }),
  ],
});
// 导出中间件主函数
export default function middleware(
  request: NextRequest, // 请求对象
  event: NextFetchEvent, // 事件对象
) {
  // 如果请求匹配认证页面、受保护路由或营销页面，则运行Clerk中间件
  if (
    isAuthPage(request) ||
    isProtectedRoute(request) ||
    isMarketingPage(request)
  ) {
    return clerkMiddleware(async (auth, req) => {
      // 首先通过Arcjet进行请求保护检查
      // const arcjetreq = await request();
      // - 在 Clerk 中间件内部，请求对象已经被处理过
      // - 再次调用 request() 可能会导致重复处理
      const decision = await aj.protect(req);
      // 如果请求被阻止，返回错误响应
      if (decision.isDenied()) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
      }
      // 如果请求未被阻止，继续处理请求
      // 如果是受保护路由
      if (isProtectedRoute(req)) {
        // 提取URL中的语言代码
        const locale =
          req.nextUrl.pathname.match(/(\/.*)\/dashboard/)?.at(1) ?? "";

        // 构建登录页面URL
        const signInUrl = new URL(`${locale}/sign-in`, req.url);

        // 保护路由，未认证用户将被重定向到登录页面
        await auth.protect({
          unauthenticatedUrl: signInUrl.toString(),
        });
      }

      // 运行国际化中间件
      return intlMiddleware(req);
    })(request, event);
    // ()的意思是
    // - 立即执行第一层返回的中间件函数
    // - 传入 request 和 event 参数
  }

  // 从请求中提取路径
  const path = request.nextUrl.pathname;

  // 允许直接访问sitemap.xml和robots.txt，不进行国际化处理
  if (path === "/sitemap.xml" || path === "/robots.txt") {
    return NextResponse.next();
    // 相当于允许请求继续执行
    // - NextResponse.redirect() : 重定向请求
    // - NextResponse.json() : 返回 JSON 响应
    // - NextResponse.next() : 继续处理请求，不做修改
  }

  // 对其他路由运行国际化中间件
  return intlMiddleware(request);
}

// 配置中间件匹配规则
export const config = {
  matcher: [
    // 跳过Next.js内部路由和静态文件，除非在搜索参数中找到
    "/((?!_next|monitoring|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // 始终处理API路由
    "/(api|trpc)(.*)",
  ],
};
