// 从@arcjet/next包中导入arcjet核心功能和shield防护功能
import arcjet, { shield } from "@arcjet/next";
// 导入环境变量配置
import { Env } from "./Env";
// 导入日志记录器
import { logger } from "./Logger";

// Re-export the rules to simplify imports inside handlers
// 重新导出多个安全规则函数，方便在其他处理程序中使用
export {
  detectBot,      // 检测机器人
  fixedWindow,    // 固定时间窗口限流
  protectSignup,  // 注册保护
  request,        // 请求处理
  sensitiveInfo,  // 敏感信息保护
  shield,         // 安全防护
  slidingWindow,  // 滑动时间窗口限流
} from "@arcjet/next";

// Create a base Arcjet instance which can be imported and extended in each route.
// 创建Arcjet实例，配置基础安全防护
export default arcjet({
  // Get your site key from https://launch.arcjet.com/Q6eLbRE
  key: Env.ARCJET_KEY!, // 使用环境变量中的Arcjet密钥
  // Identify the user by their IP address and Clerk user ID when available
  characteristics: ["ip.src"], // 使用IP地址识别用户
  rules: [
    // Protect against common attacks with Arcjet Shield
    shield({
      mode: "LIVE", // 启用实时拦截模式，可以改为"DRY_RUN"仅记录日志
    }),
    // Other rules are added in different routes
    
  ],
  log: logger, // 配置日志记录器
});
