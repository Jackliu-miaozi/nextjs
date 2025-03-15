// 登录表单的骨架屏组件
export default function SignInSkeleton() {
  return (
    <div className="w-full max-w-2xl mx-auto p-4 space-y-6 animate-pulse">
      {/* 标题骨架 */}
      <div className="h-8 bg-gray-200 rounded-md w-1/3 mx-auto mb-6"></div>

      {/* 继续使用第三方账号 */}
      <div className="text-center">
        <div className="h-4 bg-gray-200 rounded w-1/2 mx-auto"></div>
      </div>

      {/* 社交登录按钮骨架 */}
      <div className="grid grid-cols-2 gap-4">
        <div className="h-12 bg-gray-200 rounded-md w-full flex items-center justify-center">
          <div className="h-6 w-6 bg-gray-300 rounded-full mr-2"></div>
          <div className="h-4 bg-gray-300 rounded w-1/2"></div>
        </div>
        <div className="h-12 bg-gray-200 rounded-md w-full flex items-center justify-center">
          <div className="h-6 w-6 bg-gray-300 rounded-full mr-2"></div>
          <div className="h-4 bg-gray-300 rounded w-1/2"></div>
        </div>
      </div>

      {/* 分隔线骨架 */}
      <div className="flex items-center justify-center space-x-4 my-4">
        <div className="h-px bg-gray-200 flex-1"></div>
        <div className="h-4 bg-gray-200 rounded w-8"></div>
        <div className="h-px bg-gray-200 flex-1"></div>
      </div>

      {/* 输入框骨架 - 邮箱 */}
      <div className="space-y-2">
        <div className="h-4 bg-gray-200 rounded w-1/4"></div>
        <div className="h-12 bg-gray-200 rounded-md w-full"></div>
      </div>

      {/* 继续按钮骨架 */}
      <div className="h-12 bg-gray-200 rounded-md w-full mt-4"></div>

      {/* 注册链接骨架 */}
      <div className="flex justify-center space-x-2 mt-6">
        <div className="h-4 bg-gray-200 rounded w-1/4"></div>
        <div className="h-4 bg-gray-200 rounded w-1/6"></div>
      </div>

      {/* 安全信息骨架 */}
      <div className="mt-8 flex justify-center items-center">
        <div className="h-4 w-24 bg-gray-200 rounded mr-2"></div>
        <div className="h-6 w-16 bg-gray-200 rounded"></div>
      </div>
    </div>
  );
}
