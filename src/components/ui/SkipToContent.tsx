export default function SkipToContent() {
  return (
    <a
      href="#main-content"
      className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:px-6 focus:py-3 focus:bg-white focus:text-gray-900 focus:text-sm focus:font-semibold focus:shadow-lg focus:rounded"
    >
      Skip to main content
    </a>
  );
}
