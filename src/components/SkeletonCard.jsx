export default function SkeletonCard() {
  return (
    <div className="card min-h-full">
      <div
        className={`border bg-inherit p-3 shadow-md hover:scale-105 transition-all cursor-pointer h-full animate-pulse`}
      >
        <div className="h-6 bg-gray-300 rounded w-3/4 mb-3"></div>
        <div className="h-4 bg-gray-300 rounded w-1/2 mb-4"></div>
        <div className="h-20 bg-gray-200 rounded"></div>
      </div>
    </div>
  );
}
