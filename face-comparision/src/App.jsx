import { useState } from "react"
import ImageUploadSection from "@/components/ImageUploadSection"
import CompareButton from "@/components/CompareButton"
import ResultBox from "@/components/ResultBox"
import { compareFaces } from "./api/api"

export default function App() {
  const [image1, setImage1] = useState(null)
  const [image2, setImage2] = useState(null)
  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const handleCompare = async () => {
    if (!image1 || !image2) {
      setError("Vui lòng chọn đủ 2 ảnh.")
      return
    }

    setError(null)
    setLoading(true)

    const res = await compareFaces(image1.file, image2.file)

    if (res.success) {
      setResult(res.data)
    } else {
      setResult(null)
      setError(res.error || "Lỗi khi gọi API.")
    }

    setLoading(false)
  }

  // ✅ Hàm reset mọi thứ về ban đầu
  const handleReset = () => {
    setImage1(null)
    setImage2(null)
    setResult(null)
    setError(null)
  }

  return (
    <div className="min-h-screen bg-blue-50 p-6 space-y-6">
      <h1 className="text-3xl font-bold text-center text-blue-600">🔍 Face Comparison App</h1>

      <ImageUploadSection
        image1={image1}
        image2={image2}
        setImage1={setImage1}
        setImage2={setImage2}
      />

      <CompareButton loading={loading} onClick={handleCompare} />

      {error && (
        <div className="text-center text-red-600 bg-red-100 px-4 py-2 rounded-md">
          ⚠️ {error}
        </div>
      )}

      <ResultBox result={result} onReset={handleReset} />
    </div>
  )
}
