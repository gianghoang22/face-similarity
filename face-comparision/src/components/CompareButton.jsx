export default function CompareButton({ onClick, loading }) {
  return (
    <div className="text-center">
      <button
        onClick={onClick}
        disabled={loading}
        className="bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-700 disabled:opacity-50"
      >
        {loading ? "🔄 Đang xử lý..." : "🧠 So sánh khuôn mặt"}
      </button>
    </div>
  )
}
