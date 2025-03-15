// 导入PgliteDatabase类型，用于类型定义
import type { PgliteDatabase } from "drizzle-orm/pglite";
// 导入path模块，用于处理文件路径
import path from "node:path";
// 导入数据库schema定义
import * as schema from "@/models/Schema";
// 导入PGlite，用于SQLite数据库操作
import { PGlite } from "@electric-sql/pglite";
// 导入PostgreSQL的drizzle实例，并重命名为drizzlePg
import { drizzle as drizzlePg } from "drizzle-orm/node-postgres";
// 导入PostgreSQL的迁移工具，并重命名为migratePg
import { migrate as migratePg } from "drizzle-orm/node-postgres/migrator";
// 导入PGlite的drizzle实例，并重命名为drizzlePglite
import { drizzle as drizzlePglite } from "drizzle-orm/pglite";
// 导入PGlite的迁移工具，并重命名为migratePglite
import { migrate as migratePglite } from "drizzle-orm/pglite/migrator";
// 导入Next.js构建阶段常量
import { PHASE_PRODUCTION_BUILD } from "next/dist/shared/lib/constants";
// 导入PostgreSQL客户端
import { Client } from "pg";
// 导入环境变量配置
import { Env } from "./Env";

// 声明数据库客户端和drizzle实例变量
let client;
let drizzle;

// 判断是否在生产构建阶段且是否有数据库URL
if (process.env.NEXT_PHASE !== PHASE_PRODUCTION_BUILD && Env.DATABASE_URL) {
  // 创建PostgreSQL客户端实例
  client = new Client({
    connectionString: Env.DATABASE_URL,
  });
  // 连接数据库
  await client.connect();

  // 初始化drizzle实例
  drizzle = drizzlePg(client, { schema });
  // 执行数据库迁移
  await migratePg(drizzle, {
    migrationsFolder: path.join(process.cwd(), "migrations"),
  });
} else {
  // Stores the db connection in the global scope to prevent multiple instances due to hot reloading with Next.js
  // 定义全局变量类型
  const global = globalThis as unknown as {
    client: PGlite;
    drizzle: PgliteDatabase<typeof schema>;
  };

  // 如果全局客户端不存在，则创建新的实例
  if (!global.client) {
    // 创建PGlite实例
    global.client = new PGlite();
    // 等待数据库就绪
    await global.client.waitReady;

    // 初始化drizzle实例
    global.drizzle = drizzlePglite(global.client, { schema });
  }

  // 使用全局drizzle实例
  drizzle = global.drizzle;
  // 执行数据库迁移
  await migratePglite(global.drizzle, {
    migrationsFolder: path.join(process.cwd(), "migrations"),
  });
}

// 导出数据库实例
export const db = drizzle;
