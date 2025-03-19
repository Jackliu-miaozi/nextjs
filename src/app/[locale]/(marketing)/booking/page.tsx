
import { getTranslations, setRequestLocale } from "next-intl/server";
import Image from "next/image";

// 定义SeatBooking页面组件的属性接口
// params包含页面路由参数，包括slug和locale两个字符串属性
type IAboutProps = {
  params: Promise<{ slug: string; locale: string }>;
};

export async function generateMetadata(props: IAboutProps) {
  const { locale } = await props.params;
  const t = await getTranslations({
    locale,
    namespace: "Booking",
  });

  return {
    title: t("meta_title"),
    description: t("meta_description"),
  };
}

export default async function About(props: IAboutProps) {
  const { locale } = await props.params;
  setRequestLocale(locale);
  const t = await getTranslations({
    locale,
    namespace: "Booking",
  });

  return (
    <>
      <div className="text-center mb-6">
        <Image
          className="mx-auto mb-4"
          src="/assets/images/seat-booking.svg"
          alt="Seat Booking System"
          width={128}
          height={128}
        />
        <h2 className="text-2xl font-bold mb-4">{t("meta_title")}</h2>
        <p className="max-w-2xl mx-auto mb-8 text-gray-600">{t("about_paragraph")}</p>
      </div>
      
      <div className="max-w-4xl mx-auto">
        {/* <SeatBooking 
          onProceed={(selectedSeats) => {
            // 这里可以添加跳转到结账页面的逻辑
            console.warn("Selected seats:", selectedSeats);
            // 在实际应用中，这里可以跳转到结账页面或保存选择的座位信息
          }} 
        /> */}
      </div>
    </>
  );
}

