# face_similarity.py
# This script compares two images to determine if they are of the same person using DeepFace.
import sys
import json
from deepface import DeepFace

def compare(img1_path, img2_path):
    result = DeepFace.verify(img1_path, img2_path, "VGG-Face", enforce_detection=False)
    
    # Trích xuất distance
    distance = result.get("distance", None)
    
    # Tính phần trăm tương đồng nếu có distance
    if distance is not None:
        similarity_percentage = round((1 - distance) * 100, 2)
    else:
        similarity_percentage = None

    # Thêm vào kết quả
    result["similarity_percentage"] = similarity_percentage
    # result["raw_distance"] = round(distance, 4) if distance is not None else None

    return result

if __name__ == "__main__":
    img1 = sys.argv[1]
    img2 = sys.argv[2]
    try:
        result = compare(img1, img2)
        print(json.dumps(result))
    except Exception as e:
        print(json.dumps({"error": str(e)}))
