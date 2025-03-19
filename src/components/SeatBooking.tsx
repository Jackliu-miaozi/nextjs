"use client";

import { useTranslations } from "next-intl";
import { useState } from "react";

// 座位状态类型
type SeatStatus = "available" | "selected" | "sold";

// 座位信息接口
type Seat = {
  id: string;
  row: number;
  number: number;
  status: SeatStatus;
  price: number;
}

// 座位图组件属性接口
type SeatBookingProps = {
  onProceed: (selectedSeats: Seat[]) => void;
}

export const SeatBooking = ({ onProceed }: SeatBookingProps) => {
  const t = useTranslations("Booking");
  
  // 初始化座位数据 - 使用useEffect确保只在组件挂载时初始化一次
  const initializeSeats = (): Seat[] => {
    const seats: Seat[] = [];
    // 创建6排，每排8个座位
    for (let row = 1; row <= 6; row++) {
      for (let number = 1; number <= 8; number++) {
        // 使用固定的模式设置一些座位为已售状态，避免随机性
        const isSold = (row === 2 && (number === 3 || number === 4)) || 
                      (row === 4 && (number === 5 || number === 6)) || 
                      (row === 5 && number === 2);
        seats.push({
          id: `${row}-${number}`,
          row,
          number,
          status: isSold ? "sold" : "available",
          price: 50, // 默认价格
        });
      }
    }
    return seats;
  };

  // 座位状态 - 使用useState的函数形式确保初始化只执行一次
  const [seats, setSeats] = useState<Seat[]>(() => initializeSeats());
  // 已选座位
  const [selectedSeats, setSelectedSeats] = useState<Seat[]>([]);

  // 切换座位选择状态
  const toggleSeatSelection = (seat: Seat) => {
    if (seat.status === "sold") return; // 已售座位不可选

    const updatedSeats = seats.map((s) => {
      if (s.id === seat.id) {
        const newStatus = s.status === "available" ? "selected" : "available";
        return { ...s, status: newStatus };
      }
      return s;
    });

    setSeats(updatedSeats as Seat[]);

    // 更新已选座位列表
    const updatedSelectedSeats = updatedSeats.filter(
      (s) => s.status === "selected"
    );
    setSelectedSeats(updatedSelectedSeats as Seat[]);
  };

  // 计算总价
  const totalPrice = selectedSeats.reduce((sum, seat) => sum + seat.price, 0);

  // 获取座位状态对应的样式
  const getSeatStyle = (status: SeatStatus): string => {
    switch (status) {
      case "available":
        return "bg-white hover:bg-fuchsia-100 cursor-pointer";
      case "selected":
        return "bg-fuchsia-500 text-white hover:bg-fuchsia-600 cursor-pointer";
      case "sold":
        return "bg-gray-300 text-gray-500 cursor-not-allowed opacity-50";
      default:
        return "";
    }
  };

  return (
    <div className="flex flex-col items-center">
      {/* 屏幕 */}
      <div className="w-4/5 h-8 bg-gray-200 mb-8 rounded-lg flex items-center justify-center text-sm text-gray-600">
        {t("screen")}
      </div>

      {/* 座位图 */}
      <div className="mb-8">
        {Array.from({ length: 6 }, (_, rowIndex) => (
          <div key={`row-${rowIndex + 1}`} className="flex justify-center mb-2">
            <div className="w-6 flex items-center justify-center mr-2">
              {String.fromCharCode(65 + rowIndex)}
            </div>
            <div className="flex space-x-2">
              {seats
                .filter((seat) => seat.row === rowIndex + 1)
                .map((seat) => (
                  <button
                    type="button"
                    key={seat.id}
                    className={`w-8 h-8 border border-gray-300 rounded flex items-center justify-center text-xs ${getSeatStyle(
                      seat.status
                    )}`}
                    onClick={() => toggleSeatSelection(seat)}
                    disabled={seat.status === "sold"}
                    aria-label={`Row ${String.fromCharCode(
                      64 + seat.row
                    )} Seat ${seat.number}`}
                  >
                    {seat.number}
                  </button>
                ))}
            </div>
          </div>
        ))}
      </div>

      {/* 座位状态图例 */}
      <div className="flex justify-center space-x-6 mb-6">
        <div className="flex items-center">
          <div className="w-4 h-4 bg-white border border-gray-300 rounded mr-2"></div>
          <span className="text-sm">{t("available")}</span>
        </div>
        <div className="flex items-center">
          <div className="w-4 h-4 bg-fuchsia-500 border border-gray-300 rounded mr-2"></div>
          <span className="text-sm">{t("selected")}</span>
        </div>
        <div className="flex items-center">
          <div className="w-4 h-4 bg-gray-300 border border-gray-300 rounded mr-2"></div>
          <span className="text-sm">{t("sold")}</span>
        </div>
      </div>

      {/* 已选座位和价格信息 */}
      <div className="w-full max-w-md bg-gray-50 p-4 rounded-lg mb-6">
        <h3 className="font-bold mb-2">{t("selected_seats")}:</h3>
        {selectedSeats.length === 0 ? (
          <p className="text-gray-500 text-sm">{t("no_seats_selected")}</p>
        ) : (
          <div>
            <ul className="mb-2">
              {selectedSeats.map((seat) => (
                <li key={seat.id} className="text-sm">
                  {t("seat_info", {
                    row: String.fromCharCode(64 + seat.row),
                    number: seat.number,
                    price: seat.price,
                  })}
                </li>
              ))}
            </ul>
            <div className="font-bold">
              {t("total_price")}: ${totalPrice}
            </div>
          </div>
        )}
      </div>

      {/* 确认按钮 */}
      <button
        type="button"
        className="rounded-sm bg-fuchsia-500 px-5 py-2 font-bold text-white hover:bg-fuchsia-600 focus:outline-hidden focus:ring-3 focus:ring-fuchsia-300/50 disabled:pointer-events-none disabled:opacity-50"
        disabled={selectedSeats.length === 0}
        onClick={() => onProceed(selectedSeats)}
      >
        {t("proceed_to_checkout")}
      </button>
    </div>
  );
};