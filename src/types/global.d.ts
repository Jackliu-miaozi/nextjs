// Use type safe message keys with `next-intl`
type Messages = typeof import("../locales/en.json");

// eslint-disable-next-line
declare interface IntlMessages extends Messages { }
/// 这个global.d.ts文件是用于TypeScript类型声明的文件，主要用于实现next-i
// tl国际化库的类型安全。文件中定义了Messages类型，它导入并引用了英文翻译文件(en.json
// )的类型结构，然后声明了一个IntlMessages接口继承自Messages。这样做的目的是让开发者在
// 使用国际化翻译函数(如useTranslations)时能够获得类型提示和类型检查，确保使用的翻译键
// 名是真实存在的，从而减少拼写错误和运行时错误。  