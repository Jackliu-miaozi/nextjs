"use client";

import { SignIn } from "@clerk/nextjs";
import dynamic from "next/dynamic";
import SignInSkeleton from "./SignInSkeleton";

// 动态导入Clerk的SignIn组件
const ClerkSignIn = dynamic(
  () => Promise.resolve(({ path }: { path: string }) => <SignIn path={path} />),
  {
    ssr: false, // 设置为false以确保客户端渲染，更好地显示加载状态
    loading: () => <SignInSkeleton />,
  },
);

type ClerkSignInClientProps = {
  path: string;
};

// 客户端组件，用于包装ClerkSignIn
export default function ClerkSignInClient({ path }: ClerkSignInClientProps) {
  return <ClerkSignIn path={path} />;
}
