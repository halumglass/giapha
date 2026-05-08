import os
import re

folder_path = "./ChiTiet"
output_file = "danh_sach_gia_pha.txt"

if not os.path.exists(folder_path):
    print(f"Không tìm thấy thư mục: {folder_path}")
    exit()

filenames = sorted([f for f in os.listdir(folder_path) if f.endswith(('.htm', '.html'))])

results = []
print(f"Đang xử lý {len(filenames)} tệp tin...")

for filename in filenames:
    file_path = os.path.join(folder_path, filename)
    file_id = os.path.splitext(filename)[0]
    
    try:
        # Thêm errors="ignore" để tránh dừng chương trình nếu file có ký tự lỗi font
        with open(file_path, "r", encoding="utf-8", errors="ignore") as f:
            content = f.read()
            
            # 1. Bóc tách toàn bộ thẻ HTML để lấy văn bản thuần túy
            clean_text = re.sub(r'<[^>]+>', ' ', content)
            
            # Xóa các khoảng trắng, dấu tab, dấu xuống dòng thừa thãi
            clean_text = re.sub(r'\s+', ' ', clean_text)
            
            # 2. Dò tìm Tên nằm giữa "HỌ VÀ TÊN" và các trường theo sau (Thường Gọi, Tên Hiệu, Ngày Sinh, Con Thứ...)
            # Biểu thức này sẽ bắt mọi thứ sau chữ HỌ VÀ TÊN : cho đến khi gặp trường dữ liệu kế tiếp
            name_match = re.search(r"HỌ VÀ TÊN\s*[:\-]?\s*(.*?)\s*(?:Thường Gọi|Tên Hiệu|Ngày Sinh|Con Thứ|Giới Tính|CMND)", clean_text, re.IGNORECASE)
            
            if name_match and name_match.group(1).strip() != "":
                name = name_match.group(1).strip()
            else:
                # Dự phòng 2: Dò lại trong thẻ <title> nếu bị lỗi cấu trúc bảng
                title_match = re.search(r"<title>.*?\s*-\s*(.*?)</title>", content, re.IGNORECASE)
                name = title_match.group(1).strip() if title_match else "Chưa xác định"
            
            # 3. Trích xuất Đời thứ từ văn bản thuần
            doi_match = re.search(r"Đời thứ\s*(\d+)", clean_text, re.IGNORECASE)
            doi = doi_match.group(1) if doi_match else "0"
            
            # 4. Trích xuất Giới tính từ văn bản thuần
            gender_match = re.search(r"Giới Tính\s*[:\-]?\s*(Nam|Nữ)", clean_text, re.IGNORECASE)
            gender = gender_match.group(1).strip() if gender_match else "Nam"
            
            # Tạo dòng kết quả
            line = f'  {{ id: "{file_id}", name: "{name}", doi: {doi}, gioiTinh: "{gender}" }},'
            results.append(line)
            
    except Exception as e:
        print(f"Lỗi ở tệp {filename}: {e}")

# Ghi ra tệp tin
with open(output_file, "w", encoding="utf-8") as f:
    f.write("[\n")
    f.write("\n".join(results))
    f.write("\n]")

print(f"Hoàn thành! Đã quét lại và lưu tại: {output_file}")