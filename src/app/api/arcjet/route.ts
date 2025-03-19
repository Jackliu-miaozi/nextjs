// 这个文件可以保护你的应用程序免受恶意请求和攻击
// 使用它时可以在92行的位置更改next response的动作
// 导入所需的依赖包
import type { ArcjetDecision} from "@arcjet/next";
import type { NextRequest} from "next/server";
import ip from "@arcjet/ip"; // 导入IP地址处理工具
import arcjet, { shield, tokenBucket } from "@arcjet/next"; // 导入Arcjet核心功能
import { currentUser } from "@clerk/nextjs/server"; // 导入Clerk用户认证功能
import { NextResponse } from "next/server"; // 导入Next.js的请求和响应类型

// The root Arcjet client is created outside of the handler.
const aj = arcjet({
  key: process.env.ARCJET_KEY!, // Get your site key from https://app.arcjet.com
  // We specify a custom fingerprint so we can dynamically build it within each
  // demo route.
  characteristics: ["fingerprint"],
  rules: [
    shield({
      mode: "LIVE", // will block requests. Use "DRY_RUN" to log only
    }),
  ],
});

// 导出GET请求处理函数
export async function GET(req: NextRequest) {
  // Get the current user from Clerk
  // See https://clerk.com/docs/references/nextjs/current-user
  const user = await currentUser(); // 获取当前用户信息

  // 声明决策变量
  let decision: ArcjetDecision;
  if (user) {
    // Allow higher limits for signed in users.
    // 已登录用户使用更高的速率限制
    const rl = aj.withRule(
      tokenBucket({
        mode: "LIVE", // 生产模式，将实际阻止请求
        refillRate: 20, // 每个间隔补充20个令牌
        interval: 10, // 每10秒补充一次
        capacity: 100, // 令牌桶最大容量为100
      })
    );

    const fingerprint = user.id; // 使用用户ID作为唯一标识

    // 从令牌桶中扣除5个令牌
    decision = await rl.protect(req, { fingerprint, requested: 5 });
  } else {
    // 未登录用户使用更低的速率限制
    const rl = aj.withRule(
      tokenBucket({
        mode: "LIVE", // 生产模式，将实际阻止请求
        refillRate: 5, // 每个间隔补充5个令牌
        interval: 10, // 每10秒补充一次
        capacity: 10, // 令牌桶最大容量为10
      })
    );

    const fingerprint = ip(req) || "127.0.0.1"; // 使用IP地址作为唯一标识，如果获取失败则使用本地IP

    // 从令牌桶中扣除5个令牌
    decision = await rl.protect(req, { fingerprint, requested: 5 });
  }

  // 检查请求是否被拒绝
  if (decision.isDenied()) {
    if (decision.reason.isRateLimit()) {
      // 如果是因为速率限制被拒绝，返回429状态码
      return NextResponse.json(
        {
          error: "Too Many Requests",
          reason: decision.reason,
        },
        {
          status: 429,
        }
      );
    }
  }
  
  // 声明重置时间和剩余令牌数变量
  let reset: Date | undefined;
  let remaining: number | undefined;

  // 如果存在速率限制信息，获取重置时间和剩余令牌数
  if (decision.reason.isRateLimit()) {
    reset = decision.reason.resetTime;
    remaining = decision.reason.remaining;
  }

  // 返回成功响应，包含重置时间和剩余令牌数
  return NextResponse.json({ message: "Hello World", reset, remaining });
}
