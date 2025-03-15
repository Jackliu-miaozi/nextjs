"use client";

import { SignUp } from "@clerk/nextjs";
import { useEffect, useState } from "react";
import SignInSkeleton from "./SignInSkeleton";

type DelayedClerkSignUpClientProps = {
  path: string;
  delayMs?: number; // 可选的延迟毫秒数，默认为2000ms (2秒)
};

// 延迟加载的Clerk SignUp客户端组件
export default function DelayedClerkSignUpClient({
  path,
  delayMs = 3000,
}: DelayedClerkSignUpClientProps) {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // 设置一个定时器，在指定的延迟时间后将isLoading设置为false
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, delayMs);

    // 清理函数，在组件卸载时清除定时器
    return () => clearTimeout(timer);
  }, [delayMs]); // 依赖项包括delayMs，这样当delayMs变化时，效果会重新运行

  // 如果正在加载，显示骨架屏
  if (isLoading) {
    return <SignInSkeleton />;
  }

  // 加载完成后，显示实际的SignUp组件
  return <SignUp path={path} />;
}
