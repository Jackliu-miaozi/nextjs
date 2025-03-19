import { AppConfig } from "@/utils/AppConfig";
import { useTranslations } from "next-intl";

export const BaseTemplate = (props: {
  leftNav: React.ReactNode;
  rightNav?: React.ReactNode;
  children: React.ReactNode;
}) => {
  const t = useTranslations("BaseTemplate");

  return (
    <div className="w-full px-1 text-gray-700 antialiased">
      <div className="mx-auto max-w-screen-md">
        <header className="border-b border-gray-300">
          <div className="pb-8 pt-16">
            {/* 标题部分 - 添加打字机效果和渐入动画 */}
            <div className="relative overflow-hidden rounded-xl bg-gradient-to-r from-fuchsia-100 to-transparent p-6 mb-1">
              <div className="absolute -top-24 -right-24 w-48 h-48 bg-fuchsia-200 rounded-full opacity-50 animate-pulse"></div>
              <div className="absolute top-12 right-12 w-24 h-24 bg-fuchsia-300 rounded-full opacity-30 animate-ping animate-duration-[3000ms] animate-infinite"></div>
              <h1 className="text-4xl font-bold text-fuchsia-700 relative z-10 animate-fade-in animate-duration-[1000ms]">
                <span className="inline-block">济</span>
                <span className="inline-block">南</span>
                <span className="inline-block">大</span>
                <span className="inline-block">学</span>
                <span className="inline-block ">自</span>
                <span className="inline-block ">习</span>
                <span className="inline-block ">室</span>
              </h1>
              <p className="text-fuchsia-600 mt-4 max-w-2xl animate-fade-in animate-delay-[500ms]">
                为济大学子打造的理想学习空间，集学习、休闲、生活便利于一体
              </p>
            </div>
          </div>

          <div className="flex justify-between">
            <nav>
              <ul className="flex flex-wrap gap-x-5 text-xl">
                {props.leftNav}
              </ul>
            </nav>

            <nav>
              <ul className="flex flex-wrap gap-x-5 text-xl">
                {props.rightNav}
              </ul>
            </nav>
          </div>
        </header>

        <main>{props.children}</main>

        <footer className="border-t border-gray-300 py-8 text-center text-sm">
          {`© Copyright ${new Date().getFullYear()} ${AppConfig.name}. `}
          {t.rich("made_with", {
            author: () => (
              <a
                href="https://github.com/Jackliu-miaozi"
                className="text-blue-700 hover:border-b-2 hover:border-blue-700"
              >
                Jack
              </a>
            ),
          })}
          {/*
           * PLEASE READ THIS SECTION
           * I'm an indie maker with limited resources and funds, I'll really appreciate if you could have a link to my website.
           * The link doesn't need to appear on every pages, one link on one page is enough.
           * For example, in the `About` page. Thank you for your support, it'll mean a lot to me.
           */}
        </footer>
      </div>
    </div>
  );
};
