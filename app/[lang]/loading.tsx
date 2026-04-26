export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="flex flex-col items-center gap-4">
        {/* Skeleton 脉冲动画 */}
        <div className="relative">
          <div className="w-16 h-16 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
        </div>
        <div className="text-slate-600 text-sm font-medium">Loading...</div>
        
        {/* Skeleton 内容占位 */}
        <div className="mt-8 w-64 space-y-3">
          <div className="h-4 bg-slate-200 rounded animate-pulse"></div>
          <div className="h-4 bg-slate-200 rounded animate-pulse w-5/6"></div>
          <div className="h-4 bg-slate-200 rounded animate-pulse w-4/6"></div>
        </div>
      </div>
    </div>
  );
}
