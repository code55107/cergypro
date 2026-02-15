export default function Loading() {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center">
      <div className="flex flex-col items-center gap-6">
        <div className="relative w-12 h-12">
          <div className="absolute inset-0 rounded-full border-2 border-gray-200" />
          <div className="absolute inset-0 rounded-full border-2 border-transparent border-t-gray-900 animate-spin" />
        </div>
        <p className="text-gray-400 text-xs font-semibold tracking-[0.2em] uppercase">
          LOADING
        </p>
      </div>
    </div>
  );
}
