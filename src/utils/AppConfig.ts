// 从next-intl包中导入LocalePrefixMode类型，用于定义URL中语言前缀的显示模式
import type { LocalePrefixMode } from "node_modules/next-intl/dist/types/src/routing/types";

// 设置localePrefix常量，类型为LocalePrefixMode，值为'as-needed'
// 'as-needed'表示仅在需要时才在URL中显示语言前缀
const localePrefix: LocalePrefixMode = "as-needed";

// FIXME: Update this configuration file based on your project information
// 导出应用程序配置对象AppConfig，包含以下属性：
// - name: 应用程序名称
// - locales: 支持的语言列表数组
// - defaultLocale: 默认语言
// - localePrefix: 语言前缀显示模式
export const AppConfig = {
  name: "济南大学波卡自习室",
  locales: ["en", "fr", "zh"],
  defaultLocale: "zh",
  localePrefix,
};
