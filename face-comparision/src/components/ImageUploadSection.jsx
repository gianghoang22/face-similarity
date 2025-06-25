import ImageUpload from "./ImageUpload"

export default function ImageUploadSection({ image1, image2, setImage1, setImage2 }) {
  return (
    <div className="flex flex-col sm:flex-row gap-6 justify-center">
      <ImageUpload
        uploadedImage={image1}
        onUpload={setImage1}
        onRemove={() => setImage1(null)}
        placeholder="Ảnh thứ nhất"
      />
      <ImageUpload
        uploadedImage={image2}
        onUpload={setImage2}
        onRemove={() => setImage2(null)}
        placeholder="Ảnh thứ hai"
      />
    </div>
  )
}
