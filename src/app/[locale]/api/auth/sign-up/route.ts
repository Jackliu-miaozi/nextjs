import type { NextRequest} from "next/server";
import arcjet, { protectSignup, request } from "@/libs/Arcjet";
import { NextResponse } from "next/server";

// 创建一个包含protectSignup规则的Arcjet实例
const aj = arcjet.withRule(
  protectSignup({
    // 邮箱验证配置
    email: {
      mode: "LIVE",  // 设置为实时模式，将实际执行验证
      block: ["DISPOSABLE", "INVALID", "NO_MX_RECORDS"],  // 阻止一次性邮箱、无效邮箱和没有MX记录的邮箱域名
    },
    // 机器人检测配置
    bots: {
      mode: "LIVE",  // 设置为实时模式，将实际执行检测
      allow: [],     // 空数组表示阻止所有检测到的机器人
    },
    // 速率限制配置
    rateLimit: {
      mode: "LIVE",  // 设置为实时模式，将实际执行限制
      interval: "10m",  // 设置时间间隔为10分钟
      max: 5,          // 在10分钟内最多允许5次请求
    },
  })
);

// 处理注册路由的请求
export async function POST(req: NextRequest) {
  // 获取请求信息
  // 使用Arcjet保护注册请求
  const formData = await req.formData(); 
  const email = formData.get('email')?.toString() || '';
  // 创建一个Arcjet请求对象，这个对象不需要参数
  // 这个函数用于获取当前请求的信息，特别是在服务器组件或服
  // 务器操作中使用，以便Arcjet可以分析请求并应用安全规则。
  const ajReq = await request();

  const decision = await aj.protect(ajReq, {
    email,
  });
  
  // 如果请求被拒绝，返回403状态码
  if (decision.isDenied()) {
    return new NextResponse(JSON.stringify({ error: "Registration denied" }), {
      status: 403,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
  
  // 如果请求被允许，继续处理注册请求
  // 这里不需要实际处理，因为Clerk会处理注册流程
  return NextResponse.next();
}