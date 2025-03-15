// 导入 pino 日志库的 DestinationStream 类型
import type { DestinationStream } from "pino";
// 导入 logtail 的 pino 集成包，用于将日志发送到 BetterStack
import logtail from "@logtail/pino";
// 导入 pino 日志库主模块
import pino from "pino";
// 导入 pino-pretty，用于美化控制台输出的日志
import pretty from "pino-pretty";
// 导入环境变量配置
import { Env } from "./Env";

// 声明日志流变量
let stream: DestinationStream;

// 判断是否配置了 LOGTAIL_SOURCE_TOKEN
if (Env.LOGTAIL_SOURCE_TOKEN) {
  // 如果配置了 token，创建多流输出
  stream = pino.multistream([
    // 配置 logtail，将日志发送到 BetterStack
    await logtail({
      sourceToken: Env.LOGTAIL_SOURCE_TOKEN,
      options: {
        sendLogsToBetterStack: true,
      },
    }),
    {
      stream: pretty(), // Prints logs to the console
    },
  ]);
} else {
  // 如果没有配置 token，仅使用美化的控制台输出
  stream = pretty({
    colorize: true, // 启用彩色输出
  });
}

// 创建并导出 logger 实例，禁用基础字段，使用配置的流
export const logger = pino({ base: undefined }, stream);
