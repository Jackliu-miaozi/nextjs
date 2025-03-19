// 导入数据库实例
import { db } from "@/libs/DB";
// 导入日志工具
import { logger } from "@/libs/Logger";
// 导入计数器数据模型
import { counterSchema } from "@/models/Schema";
// 导入drizzle-orm的eq操作符用于数据库查询
import { eq } from "drizzle-orm";
// 导入next-intl的翻译功能
import { getTranslations } from "next-intl/server";
// 导入Next.js的headers API
import { headers } from "next/headers";

// 导出异步组件CurrentCount
export const CurrentCount = async () => {
  // 获取CurrentCount命名空间下的翻译函数
  const t = await getTranslations("CurrentCount");

  // `x-e2e-random-id` is used for end-to-end testing to make isolated requests
  // The default value is 0 when there is no `x-e2e-random-id` header
  // 从请求头获取测试ID，如果不存在则默认为0
  const id = Number((await headers()).get("x-e2e-random-id")) ?? 0;
  // 查询数据库获取指定ID的计数器记录
  const result = await db.query.counterSchema.findMany({
    where: eq(counterSchema.id, id),
  });
  // 获取计数值，如果没有记录则默认为0
  const count = result[0]?.count ?? 0;

  // 记录日志
  logger.info("Counter fetched successfully");

  // 返回包含翻译后的计数文本的div元素
  return <div>{t("count", { count })}</div>;
};
