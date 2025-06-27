import { Upload, X } from "lucide-react"
import { useRef, useEffect } from "react"

export default function ImageUpload({ uploadedImage, onUpload, onRemove, placeholder }) {
  const inputRef = useRef()

  const handleChange = (e) => {
    const file = e.target.files?.[0]
    if (file) {
      const preview = URL.createObjectURL(file)
      onUpload({ file, preview })
    }
  }

  // Reset input file nếu uploadedImage = null
  useEffect(() => {
    if (!uploadedImage && inputRef.current) {
      inputRef.current.value = ""
    }
  }, [uploadedImage])

  return (
    <div className="bg-white shadow-md rounded-lg p-4 w-full sm:w-[300px] space-y-3">
      <p className="font-semibold text-gray-700 text-center">{placeholder}</p>

      {uploadedImage ? (
        <div className="relative">
          <img
            src={uploadedImage.preview}
            alt="preview"
            className="w-full h-72 object-cover rounded"
          />
          <button
            onClick={onRemove}
            className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full"
          >
            <X size={16} />
          </button>
          <p className="text-sm mt-1 text-center text-gray-600">{uploadedImage.file.name}</p>
        </div>
      ) : (
        <div
          className="h-72 flex items-center justify-center border border-dashed rounded bg-gray-50 cursor-pointer"
          onClick={() => inputRef.current.click()}
        >
          <div className="text-center text-gray-400">
            <Upload className="mx-auto mb-2" />
            <p>Click để chọn ảnh</p>
          </div>
        </div>
      )}

      <input
        type="file"
        accept="image/*"
        onChange={handleChange}
        ref={inputRef}
        className="hidden"
      />
    </div>
  )
}
