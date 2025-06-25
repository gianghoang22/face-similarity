export default function ResultBox({ result }) {
  if (!result) return null

  const isMatch = result.verified
  const percentage = result.similarity_percentage?.toFixed(2)

  return (
    <div className="text-center bg-white p-4 rounded shadow max-w-md mx-auto">
      <p className="text-lg font-bold">
        Kết quả:{" "}
        {isMatch ? (
          <span className="text-green-600">✅ Giống nhau</span>
        ) : (
          <span className="text-red-600">❌ Không giống</span>
        )}
      </p>

      <p className="text-sm text-gray-500 mt-2">
        Độ giống nhau: <span className="font-medium">{percentage}%</span>
      </p>

      <p className="text-xs text-gray-400 mt-1">
        Khoảng cách: {result.distance?.toFixed(4)} | Ngưỡng: {result.threshold}
      </p>
    </div>
  )
}
