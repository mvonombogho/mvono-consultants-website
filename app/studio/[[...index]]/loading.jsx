export default function Loading() {
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
      <p className="ml-4 text-lg text-gray-700">Loading Sanity Studio...</p>
    </div>
  )
}
