import AnimationStyles from "@/components/AnimationStyles";
import { getTranslations, setRequestLocale } from "next-intl/server";
import Link from "next/link";

type IIndexProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata(props: IIndexProps) {
  const { locale } = await props.params;
  const t = await getTranslations({ locale, namespace: "Index" });
  return {
    title: t("meta_title"),
    description: t("meta_description"),
  };
}

export default async function Index(props: IIndexProps) {
  const { locale } = await props.params;
  setRequestLocale(locale);

  return (
    <div className="min-h-screen bg-gradient-to-b from-fuchsia-50 to-white overflow-hidden">
      {/* 装饰性背景元素 */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-64 h-64 bg-fuchsia-200 rounded-full opacity-20 animate-blob"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-fuchsia-300 rounded-full opacity-15 animate-blob animation-delay-2000"></div>
      </div>

      {/* 核心优势 */}
      <section className="relative z-10 py-16 px-4 max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-center text-fuchsia-700 mb-12 animate-slide-up">
          核心优势
          <span className="block w-20 h-1 bg-fuchsia-400 mx-auto mt-2 rounded-full animate-pulse"></span>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { id: "location", icon: "🏠", title: "近在咫尺", desc: "宿舍旁，随时学随时休" },
            { id: "coffee", icon: "☕", title: "咖啡无限", desc: "全天供应，活力不断" },
            { id: "life", icon: "🚿", title: "便利生活", desc: "洗浴洗衣，无忧学习" },
          ].map((item, index) => (
            <div
              key={item.id}
              className="bg-white rounded-xl p-6 shadow-lg hover:shadow-fuchsia-200 transform transition-all duration-500 hover:-translate-y-2 animate-fade-in"
              style={{ animationDelay: `${index * 200}ms` }}
            >
              <div className="text-4xl mb-4">{item.icon}</div>
              <h3 className="text-xl font-semibold text-fuchsia-700 mb-2">
                {item.title}
              </h3>
              <p className="text-gray-600">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 服务设施 */}
      <section className="relative z-10 py-16 px-4 bg-gradient-to-r from-fuchsia-50 to-white">
        <h2 className="text-3xl font-bold text-center text-fuchsia-700 mb-12 animate-slide-up">
          服务设施
        </h2>
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
          {[
            {
              id: "study",
              num: 1,
              title: "学习环境",
              items: ["升降桌", "空调新风", "高速Wi-Fi"],
            },
            {
              id: "life",
              num: 2,
              title: "生活便利",
              items: ["自动咖啡", "健康小食", "洗衣烘干"],
            },
            {
              id: "security",
              num: 3,
              title: "安全保障",
              items: ["24h监控", "实时查看", "会员门禁"],
            },
            {
              id: "special",
              num: 4,
              title: "特色服务",
              items: ["共享电动车", "自助浴室", "夜间酒吧"],
            },
          ].map((section, index) => (
            <div
              key={section.id}
              className="animate-fade-in"
              style={{ animationDelay: `${index * 200}ms` }}
            >
              <h3 className="text-xl font-semibold text-fuchsia-600 mb-4 flex items-center">
                <span className="w-8 h-8 bg-fuchsia-600 text-white rounded-full flex items-center justify-center mr-2">
                  {section.num}
                </span>
                {section.title}
              </h3>
              <ul className="space-y-3">
                {section.items.map((item) => (
                  <li
                    key={`${section.id}-${item}`}
                    className="flex items-center group hover:text-fuchsia-600 transition-colors duration-300"
                  >
                    <span className="w-2 h-2 bg-fuchsia-500 rounded-full mr-2 group-hover:scale-150 transition-transform duration-300"></span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* 会员方案 */}
      <section className="relative z-10 py-16 px-4 max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold text-center text-fuchsia-700 mb-12 animate-slide-up">
          会员方案
        </h2>
        <div className="bg-white rounded-xl shadow-lg p-8 hover:shadow-fuchsia-200 transition-all duration-500 animate-fade-in">
          <div className="text-fuchsia-500 text-sm font-semibold uppercase animate-pulse">
            限时特惠
          </div>
          <h3 className="text-2xl font-medium mt-2">月卡会员</h3>
          <p className="mt-2 text-gray-600">
            仅需{" "}
            <span className="text-3xl font-bold text-fuchsia-600 animate-bounce">
              ¥199
            </span>
            /月
          </p>
          <ul className="mt-4 space-y-2">
            {[
              { id: "study", text: "无限自习室" },
              { id: "coffee", text: "无限咖啡" },
              { id: "laundry", text: "每周3次洗衣" }
            ].map((item) => (
              <li key={item.id} className="flex items-center">
                <span className="text-fuchsia-500 mr-2 animate-pulse">★</span>
                {item.text}
              </li>
            ))}
          </ul>
          <p className="mt-4 text-sm text-gray-500">
            首月特价 <span className="line-through">¥299</span>{" "}
            <span className="text-fuchsia-600 font-bold">¥199</span>
          </p>
        </div>
      </section>

      {/* 联系我们 */}
      <section className="relative z-10 py-16 px-4 bg-fuchsia-50">
        <h2 className="text-3xl font-bold text-center text-fuchsia-700 mb-12 animate-slide-up">
          联系我们
        </h2>
        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-4 animate-fade-in">
            {[
              { id: "address", icon: "📍", title: "地址", desc: "济南大学宿舍区B座旁" },
              { id: "phone", icon: "📱", title: "电话", desc: "+86 123-4567-8900" },
              { id: "email", icon: "✉️", title: "邮箱", desc: "contact@jnu-studyroom.com" },
            ].map((item) => (
              <div key={item.id} className="flex items-center group">
                <span className="text-fuchsia-600 text-2xl mr-3 group-hover:animate-bounce">
                  {item.icon}
                </span>
                <div>
                  <h3 className="text-lg font-semibold text-fuchsia-700">
                    {item.title}
                  </h3>
                  <p className="text-gray-600">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
          <div
            className="space-y-4 animate-fade-in"
            style={{ animationDelay: "200ms" }}
          >
            {[
              { id: "hours", icon: "⏰", title: "营业时间", desc: "6:00-24:00" },
              { id: "wechat", icon: "💬", title: "微信", desc: "JNU_StudyRoom" },
              { id: "qq", icon: "📱", title: "QQ", desc: "987654321" },
            ].map((item) => (
              <div key={item.id} className="flex items-center group">
                <span className="text-fuchsia-600 text-2xl mr-3 group-hover:animate-bounce">
                  {item.icon}
                </span>
                <div>
                  <h3 className="text-lg font-semibold text-fuchsia-700">
                    {item.title}
                  </h3>
                  <p className="text-gray-600">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div
          className="mt-8 text-center animate-fade-in"
          style={{ animationDelay: "400ms" }}
        >
          <p className="text-fuchsia-600 mb-4">关注我们</p>
          <div className="flex justify-center gap-6">
            {[
              { id: "website", icon: "🌐", label: "官网" },
              { id: "wechat", icon: "📱", label: "微信" },
              { icon: "🐦", label: "微博" },
            ].map((item) => (
              <Link
                key={item.id || `social-${item.label}`}
                href="#"
                className="flex items-center text-fuchsia-600 hover:text-fuchsia-800 transition-all duration-300 hover:scale-110"
              >
                <span className="text-2xl">{item.icon}</span>
                <span className="ml-1">{item.label}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 导入动画样式组件 */}
      <AnimationStyles />
    </div>
  );
}
