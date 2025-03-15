import arcjet, { request , slidingWindow } from "@/libs/Arcjet";
import { NextResponse } from "next/server";

// 创建一个包含slidingWindow规则的Arcjet实例，用于限制登录尝试次数
const aj = arcjet.withRule(
  slidingWindow({
    mode: "LIVE", // 实时模式，可以改为"DRY_RUN"进行测试
    // 配置滑动窗口限流的选项
    // 设置滑动时间窗口为60秒
    interval: "60s",
    // 在60秒内最多允许10次请求
    max: 10,
    },
  )
);
// 处理登录路由的请求
export async function POST( ) {
  // 获取请求信息
  // 使用Arcjet保护登录请求
  const ajReq = await request();
  const decision = await aj.protect(ajReq);
  
  // 如果请求被拒绝，返回429状态码（太多请求）
  if (decision.isDenied()) {
    return new NextResponse(JSON.stringify({ error: "Too many login attempts" }), {
      status: 429,
      headers: {
        "Content-Type": "application/json",
        "Retry-After": "60", // 建议客户端等待60秒后再尝试
      },
    });
  }
  
  // 如果请求被允许，继续处理登录请求
  // 这里不需要实际处理，因为Clerk会处理登录流程
  return NextResponse.next();
}