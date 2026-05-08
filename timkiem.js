< !DOCTYPE html >
    <html lang="vi">
        <head>
            <meta charset="UTF-8">
                <meta http-equiv="X-UA-Compatible" content="IE=edge">
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                        <title>Tra cứu Phả hệ Gia tộc</title>
                        <style>
                            body {
                                font - family: 'Tahoma', sans-serif;
                            background-color: #f9f9f9;
                            color: #333;
                            padding: 20px;
        }
                            .container {
                                max - width: 650px;
                            margin: 0 auto;
                            background: #fff;
                            padding: 25px;
                            border-radius: 8px;
                            box-shadow: 0 2px 5px rgba(0,0,0,0.1);
        }
                            h3 {
                                color: #800000;
                            text-align: center;
                            border-bottom: 2px solid #800000;
                            padding-bottom: 12px;
                            margin-top: 0;
        }
                            .search-box {
                                text - align: center;
                            margin-bottom: 20px;
        }
                            input {
                                width: 65%;
                            padding: 10px;
                            font-size: 14px;
                            border: 1px solid #ccc;
                            border-radius: 4px;
                            outline: none;
                            box-sizing: border-box;
        }
                            input:focus {
                                border - color: #800000;
        }
                            button {
                                padding: 10px 16px;
                            font-size: 14px;
                            background-color: #800000;
                            color: white;
                            border: none;
                            border-radius: 4px;
                            cursor: pointer;
                            font-weight: bold;
        }
                            button:hover {
                                background - color: #590000;
        }
                            ul {
                                list - style - type: none;
                            padding: 0;
                            margin-top: 15px;
                            max-height: 350px;
                            overflow-y: auto;
        }
                            li {
                                padding: 10px 12px;
                            background: #fdfdfd;
                            border: 1px solid #eee;
                            margin-bottom: 6px;
                            border-radius: 4px;
                            display: flex;
                            justify-content: space-between;
                            align-items: center;
        }
                            li:hover {
                                background - color: #f0e6e6;
                            color: #800000;
                            font-weight: bold;
        }
                            .view-btn {
                                background - color: #039;
                            color: white;
                            border: none;
                            padding: 6px 12px;
                            font-size: 12px;
                            border-radius: 3px;
                            cursor: pointer;
        }
                            .view-btn:hover {
                                background - color: #00255c;
        }
                            .empty-msg {
                                text - align: center;
                            color: #666;
                            font-style: italic;
        }
                        </style>
                    </head>
                    <body>

                        <div class="container">
                            <h3>Tra cứu Hồ sơ Gia Phả</h3>
                            <div class="search-box">
                                <input type="text" id="searchInput" placeholder="Nhập tên thành viên (VD: Nguyễn Trãi, Khuê)..." onkeypress="handleKeyPress(event)" />
                                <button onclick="searchThanhVien()">Tìm kiếm</button>
                            </div>
                            <ul id="resultList"></ul>
                        </div>

                        <script>
        // Cơ sở dữ liệu danh sách thành viên (có thể cập nhật thêm thành viên)
                            const dataGiaPha = [
                            {id: "B000000000000001", name: "CỤ PHI KHANH Đời thứ 1", doi: 1, gioiTinh: "Nam" },
                            {id: "B000000000000002", name: "CỤ NGUYỄN TRÃI Đời thứ 2", doi: 2, gioiTinh: "Nam" },
                            {id: "B000000000000003", name: "PHI HÙNG Đời thứ 2", doi: 2, gioiTinh: "Nam" },
                            {id: "B000000000000004", name: "PHI LY Đời thứ 2", doi: 2, gioiTinh: "Nam" },
                            {id: "B000000000000005", name: "PHI BÁO Đời thứ 2", doi: 2, gioiTinh: "Nam" },
                            {id: "B000000000000006", name: "NHỮ SOẠN Đời thứ 2", doi: 2, gioiTinh: "Nam" },
                            {id: "B000000000000007", name: "NHỮ TRỰC Đời thứ 2", doi: 2, gioiTinh: "Nam" },
                            {id: "B000000000000008", name: "KHUÊ Đời thứ 3", doi: 3, gioiTinh: "Nam" },
                            {id: "B000000000000009", name: "ƯNG Đời thứ 3", doi: 3, gioiTinh: "Nam" },
                            {id: "B000000000000010", name: "PHÙ Đời thứ 3", doi: 3, gioiTinh: "Nam" },
                            {id: "B000000000000011", name: "BẢN Đời thứ 3", doi: 3, gioiTinh: "Nam" },
                            {id: "B000000000000012", name: "TÍCH Đời thứ 3", doi: 3, gioiTinh: "Nam" },
                            {id: "B000000000000013", name: "ANH VŨ Đời thứ 3", doi: 3, gioiTinh: "Nam" },
                            {id: "B000000000000014", name: "TẠC Đời thứ 4", doi: 4, gioiTinh: "Nam" },
                            {id: "B000000000000015", name: "GIÁM Đời thứ 4", doi: 4, gioiTinh: "Nam" },
                            {id: "B000000000000016", name: "KIÊN Đời thứ 4", doi: 4, gioiTinh: "Nam" },
                            {id: "B000000000000017", name: "01.CỤ THIÊM Đời thứ 4", doi: 4, gioiTinh: "Nam" },
                            {id: "B000000000000018", name: "GIÁP Đời thứ 4", doi: 4, gioiTinh: "Nam" },
                            {id: "B000000000000019", name: "THUNG Đời thứ 4", doi: 4, gioiTinh: "Nam" },
                            {id: "B000000000000020", name: "PHƯỢNG Đời thứ 4", doi: 4, gioiTinh: "Nam" },
                            {id: "B000000000000021", name: "02.CỤ THỊNH Đời thứ 5", doi: 5, gioiTinh: "Nam" },
                            {id: "B000000000000022", name: "03.CỤ THÁI Đời thứ 6", doi: 6, gioiTinh: "Nam" },
                            {id: "B000000000000023", name: "04.CỤ THĂNG Đời thứ 7", doi: 7, gioiTinh: "Nam" },
                            {id: "B000000000000024", name: "05.CỤ THỌ Đời thứ 8", doi: 8, gioiTinh: "Nam" },
                            {id: "B000000000000025", name: "06.CỤ HÙNG Đời thứ 9", doi: 9, gioiTinh: "Nam" },
                            {id: "B000000000000026", name: "07.CỤ LINH Đời thứ 10", doi: 10, gioiTinh: "Nam" },
                            {id: "B000000000000027", name: "08.CỤ HUẨN Đời thứ 11", doi: 11, gioiTinh: "Nam" },
                            {id: "B000000000000028", name: "08.CỤ HOÀN Đời thứ 11", doi: 11, gioiTinh: "Nam" },
                            {id: "B000000000000029", name: "09.CỤ THÀNH Đời thứ 12", doi: 12, gioiTinh: "Nam" },
                            {id: "B000000000000030", name: "09.THU Đời thứ 12", doi: 12, gioiTinh: "Nam" },
                            {id: "B000000000000031", name: "10.CỤ RƠI Đời thứ 13", doi: 13, gioiTinh: "Nam" },
                            {id: "B000000000000032", name: "10.CỤ CAN Đời thứ 13", doi: 13, gioiTinh: "Nam" },
                            {id: "B000000000000033", name: "11.CỤ DỤNG Đời thứ 14", doi: 14, gioiTinh: "Nam" },
                            {id: "B000000000000034", name: "11.ĐI Đời thứ 14", doi: 14, gioiTinh: "Nam" },
                            {id: "B000000000000035", name: "12.DỤ Đời thứ 15", doi: 15, gioiTinh: "Nam" },
                            {id: "B000000000000036", name: "13.NGUYỄN VĂN TRỤ Đời thứ 16", doi: 16, gioiTinh: "Nam" },
                            {id: "B000000000000037", name: "13.NGUYỄN VĂN PHỤ Đời thứ 16", doi: 16, gioiTinh: "Nam" },
                            {id: "B000000000000038", name: "11.NGUYỄN VĂN CHÚNG Đời thứ 14", doi: 14, gioiTinh: "Nam" },
                            {id: "B000000000000039", name: "12.KHẢ Đời thứ 15", doi: 15, gioiTinh: "Nam" },
                            {id: "B000000000000040", name: "12.THỎA Đời thứ 15", doi: 15, gioiTinh: "Nam" },
                            {id: "B000000000000041", name: "12.THÍCH Đời thứ 15", doi: 15, gioiTinh: "Nam" },
                            {id: "B000000000000042", name: "13.NGUYỄN VĂN CA Đời thứ 16", doi: 16, gioiTinh: "Nam" },
                            {id: "B000000000000043", name: "13.NGUYỄN VĂN SƯỚNG Đời thứ 16", doi: 16, gioiTinh: "Nam" },
                            {id: "B000000000000044", name: "13.NGUYỄN VĂN HÒA Đời thứ 16", doi: 16, gioiTinh: "Nam" },
                            {id: "B000000000000045", name: "13.NGUYỄN VĂN BIỆN Đời thứ 16", doi: 16, gioiTinh: "Nam" },
                            {id: "B000000000000046", name: "13.NGUYỄN VĂN TRUYỀN Đời thứ 16", doi: 16, gioiTinh: "Nam" },
                            {id: "B000000000000047", name: "13.NGUYỄN VĂN ĐIỀN Đời thứ 16", doi: 16, gioiTinh: "Nam" },
                            {id: "B000000000000048", name: "12.LUNG Đời thứ 15", doi: 15, gioiTinh: "Nam" },
                            {id: "B000000000000049", name: "12.TUNG Đời thứ 15", doi: 15, gioiTinh: "Nam" },
                            {id: "B000000000000050", name: "13.NGUYỄN VĂN HÀ Đời thứ 16", doi: 16, gioiTinh: "Nam" },
                            {id: "B000000000000051", name: "09.VƠN Đời thứ 12", doi: 12, gioiTinh: "Nam" },
                            {id: "B000000000000052", name: "09.UY Đời thứ 12", doi: 12, gioiTinh: "Nam" },
                            {id: "B000000000000053", name: "09.CỤ CHANG Đời thứ 12", doi: 12, gioiTinh: "Nam" },
                            {id: "B000000000000054", name: "10.THƯỢNG Đời thứ 13", doi: 13, gioiTinh: "Nam" },
                            {id: "B000000000000055", name: "10.CỤ HÃNH Đời thứ 13", doi: 13, gioiTinh: "Nam" },
                            {id: "B000000000000056", name: "11.NHÃ Đời thứ 14", doi: 14, gioiTinh: "Nam" },
                            {id: "B000000000000057", name: "11.CẦU Đời thứ 14", doi: 14, gioiTinh: "Nam" },
                            {id: "B000000000000058", name: "11.HÒE Đời thứ 14", doi: 14, gioiTinh: "Nam" },
                            {id: "B000000000000059", name: "12.NGUYỄN VĂN TỤNG Đời thứ 15", doi: 15, gioiTinh: "Nam" },
                            {id: "B000000000000060", name: "12.NGUYỄN VĂN LỄ Đời thứ 15", doi: 15, gioiTinh: "Nam" },
                            {id: "B000000000000061", name: "13.NGUYỄN THÀNH KÍNH Đời thứ 16", doi: 16, gioiTinh: "Nam" },
                            {id: "B000000000000062", name: "13.NGUYỄN PHÚC THÍNH Đời thứ 16", doi: 16, gioiTinh: "Nam" },
                            {id: "B000000000000063", name: "13.NGUYỄN VĂN PHÉP Đời thứ 16", doi: 16, gioiTinh: "Nam" },
                            {id: "B000000000000064", name: "12.NGUYỄN VĂN TỤ Đời thứ 15", doi: 15, gioiTinh: "Nam" },
                            {id: "B000000000000065", name: "12.NGUYỄN VĂN KIỀN Đời thứ 15", doi: 15, gioiTinh: "Nam" },
                            {id: "B000000000000066", name: "12.NGUYỄN VĂN CỰ Đời thứ 15", doi: 15, gioiTinh: "Nam" },
                            {id: "B000000000000067", name: "12.NGUYỄN VĂN HƯỚNG Đời thứ 15", doi: 15, gioiTinh: "Nam" },
                            {id: "B000000000000068", name: "13.NGUYỄN VĂN ĐÔN Đời thứ 16", doi: 16, gioiTinh: "Nam" },
                            {id: "B000000000000069", name: "13.NGUYỄN VĂN HÓA Đời thứ 16", doi: 16, gioiTinh: "Nam" },
                            {id: "B000000000000070", name: "13.NGUYỄN VĂN TIÊN Đời thứ 16", doi: 16, gioiTinh: "Nam" },
                            {id: "B000000000000071", name: "13.NGUYỄN TIẾN THỦ Đời thứ 16", doi: 16, gioiTinh: "Nam" },
                            {id: "B000000000000072", name: "13.NGUYỄN VĂN TỦNG Đời thứ 16", doi: 16, gioiTinh: "Nam" },
                            {id: "B000000000000073", name: "13.NGUYỄN VĂN DƯ Đời thứ 16", doi: 16, gioiTinh: "Nam" },
                            {id: "B000000000000074", name: "13.NGUYỄN VĂN KHÁNH Đời thứ 16", doi: 16, gioiTinh: "Nam" },
                            {id: "B000000000000075", name: "13.NGUYỄN VĂN ÁNG Đời thứ 16", doi: 16, gioiTinh: "Nam" },
                            {id: "B000000000000076", name: "13.NGUYỄN VĂN ĐỘNG Đời thứ 16", doi: 16, gioiTinh: "Nam" },
                            {id: "B000000000000077", name: "13.NGUYỄN VĂN ĐIỆN Đời thứ 16", doi: 16, gioiTinh: "Nam" },
                            {id: "B000000000000078", name: "11.CẢNH Đời thứ 14", doi: 14, gioiTinh: "Nam" },
                            {id: "B000000000000079", name: "11.QUANG Đời thứ 14", doi: 14, gioiTinh: "Nam" },
                            {id: "B000000000000080", name: "11.HOÁN Đời thứ 14", doi: 14, gioiTinh: "Nam" },
                            {id: "B000000000000081", name: "11.TƯ Đời thứ 14", doi: 14, gioiTinh: "Nam" },
                            {id: "B000000000000082", name: "11.NĂM Đời thứ 14", doi: 14, gioiTinh: "Nam" },
                            {id: "B000000000000083", name: "11.BẢY Đời thứ 14", doi: 14, gioiTinh: "Nam" },
                            {id: "B000000000000084", name: "12.NGUYỄN VĂN HỢI Đời thứ 15", doi: 15, gioiTinh: "Nam" },
                            {id: "B000000000000085", name: "13.NGUYỄN PHÚC TRƯỞNG Đời thứ 16", doi: 16, gioiTinh: "Nam" },
                            {id: "B000000000000086", name: "12.NGUYỄN VĂN TÚY Đời thứ 15", doi: 15, gioiTinh: "Nam" },
                            {id: "B000000000000087", name: "12.NGUYỄN VĂN HOAN Đời thứ 15", doi: 15, gioiTinh: "Nam" },
                            {id: "B000000000000089", name: "12.NGUYỄN VĂN HỶ Đời thứ 15", doi: 15, gioiTinh: "Nam" },
                            {id: "B000000000000090", name: "12.NGUYỄN VĂN CẢI Đời thứ 15", doi: 15, gioiTinh: "Nam" },
                            {id: "B000000000000091", name: "13.NGUYỄN VĂN QUYÊN Đời thứ 16", doi: 16, gioiTinh: "Nam" },
                            {id: "B000000000000092", name: "12.NGUYỄN VĂN CÁCH Đời thứ 15", doi: 15, gioiTinh: "Nam" },
                            {id: "B000000000000093", name: "12.NGUYỄN VĂN CHỨC Đời thứ 15", doi: 15, gioiTinh: "Nam" },
                            {id: "B000000000000094", name: "13.NGUYỄN VĂN KHỞI Đời thứ 16", doi: 16, gioiTinh: "Nam" },
                            {id: "B000000000000095", name: "13.NGUYỄN VĂN KHANG Đời thứ 16", doi: 16, gioiTinh: "Nam" },
                            {id: "B000000000000096", name: "13.NGUYỄN VĂN TRUNG Đời thứ 16", doi: 16, gioiTinh: "Nam" },
                            {id: "B000000000000097", name: "13.NGUYỄN VĂN VỤ Đời thứ 16", doi: 16, gioiTinh: "Nam" },
                            {id: "B000000000000098", name: "13.NGUYỄN VĂN THÂU Đời thứ 16", doi: 16, gioiTinh: "Nam" },
                            {id: "B000000000000099", name: "13.NGUYỄN VĂN VŨ Đời thứ 16", doi: 16, gioiTinh: "Nam" },
                            {id: "B000000000000100", name: "12.NGUYỄN VĂN DUY Đời thứ 15", doi: 15, gioiTinh: "Nam" },
                            {id: "B000000000000101", name: "12.NGUYỄN VĂN DƯỠNG Đời thứ 15", doi: 15, gioiTinh: "Nam" },
                            {id: "B000000000000102", name: "12.NGUYỄN VĂN DŨNG Đời thứ 15", doi: 15, gioiTinh: "Nam" },
                            {id: "B000000000000103", name: "13.NGUYỄN VĂN ĐOÀN Đời thứ 16", doi: 16, gioiTinh: "Nam" },
                            {id: "B000000000000104", name: "13.NGUYỄN PHÚC ẢNH Đời thứ 16", doi: 16, gioiTinh: "Nam" },
                            {id: "B000000000000105", name: "13.NGUYỄN PHÚC DƯƠNG Đời thứ 16", doi: 16, gioiTinh: "Nam" },
                            {id: "B000000000000106", name: "13.NGUYỄN THÀNH LÊ Đời thứ 16", doi: 16, gioiTinh: "Nam" },
                            {id: "B000000000000107", name: "12.NGUYỄN VĂN TÁM Đời thứ 15", doi: 15, gioiTinh: "Nam" },
                            {id: "B000000000000108", name: "12.NGUYỄN VĂN THĂNG Đời thứ 15", doi: 15, gioiTinh: "Nam" },
                            {id: "B000000000000109", name: "12.NGUYỄN VĂN LONG Đời thứ 15", doi: 15, gioiTinh: "Nam" },
                            {id: "B000000000000110", name: "12.MÃ Đời thứ 15", doi: 15, gioiTinh: "Nam" },
                            {id: "B000000000000111", name: "13.NGUYỄN VĂN QUYẾT Đời thứ 16", doi: 16, gioiTinh: "Nam" },
                            {id: "B000000000000112", name: "13.NGUYỄN VĂN TẬP Đời thứ 16", doi: 16, gioiTinh: "Nam" },
                            {id: "B000000000000113", name: "13.NGUYỄN VĂN LUYỆN Đời thứ 16", doi: 16, gioiTinh: "Nam" },
                            {id: "B000000000000114", name: "13.NGUYỄN VĂN TUẤN Đời thứ 16", doi: 16, gioiTinh: "Nam" },
                            {id: "B000000000000115", name: "13.NGUYỄN VĂN THUẤN Đời thứ 16", doi: 16, gioiTinh: "Nam" },
                            {id: "B000000000000116", name: "13.NGUYỄN VĂN THÀNH Đời thứ 16", doi: 16, gioiTinh: "Nam" },
                            {id: "B000000000000117", name: "13.NGUYỄN VĂN SẮC Đời thứ 16", doi: 16, gioiTinh: "Nam" },
                            {id: "B000000000000118", name: "13.NGUYỄN VĂN TRỤ Đời thứ 16", doi: 16, gioiTinh: "Nam" },
                            {id: "B000000000000119", name: "14.NGUYỄN THỊ NẤNG Đời thứ 17", doi: 17, gioiTinh: "Nữ" },
                            {id: "B000000000000120", name: "14.NGUYỄN THỊ LÂN Đời thứ 17", doi: 17, gioiTinh: "Nữ" },
                            {id: "B000000000000121", name: "14.NGUYỄN VĂN CHIẾN Đời thứ 17", doi: 17, gioiTinh: "Nam" },
                            {id: "B000000000000122", name: "14.NGUYỄN VĂN TRÒ Đời thứ 17", doi: 17, gioiTinh: "Nam" },
                            {id: "B000000000000123", name: "14.NGUYỄN THỊ LUÂN Đời thứ 17", doi: 17, gioiTinh: "Nữ" },
                            {id: "B000000000000124", name: "13.NGUYỄN VĂN PHỤ Đời thứ 16", doi: 16, gioiTinh: "Nam" },
                            {id: "B000000000000125", name: "14.NGUYỄN VĂN BẰNG Đời thứ 17", doi: 17, gioiTinh: "Nam" },
                            {id: "B000000000000126", name: "14.NGUYỄN THỊ KHẢI Đời thứ 17", doi: 17, gioiTinh: "Nam" },
                            {id: "B000000000000127", name: "14.NGUYỄN VĂN TUÂN Đời thứ 17", doi: 17, gioiTinh: "Nam" },
                            {id: "B000000000000128", name: "14.NGUYỄN THỊ NGUYỆT Đời thứ 17", doi: 17, gioiTinh: "Nữ" },
                            {id: "B000000000000129", name: "14.NGUYỄN VĂN NGHÉ Đời thứ 17", doi: 17, gioiTinh: "Nam" },
                            {id: "B000000000000130", name: "14.NGUYỄN THỊ TUYẾN Đời thứ 17", doi: 17, gioiTinh: "Nữ" },
                            {id: "B000000000000131", name: "14.NGUYỄN THỊ HẲNG Đời thứ 17", doi: 17, gioiTinh: "Nữ" },
                            {id: "B000000000000132", name: "14.NGUYỄN THỊ HOA Đời thứ 17", doi: 17, gioiTinh: "Nữ" },
                            {id: "B000000000000133", name: "14.NGUYỄN THỊ LAN Đời thứ 17", doi: 17, gioiTinh: "Nữ" },
                            {id: "B000000000000134", name: "14.NGUYỄN THỊ HUỆ Đời thứ 17", doi: 17, gioiTinh: "Nữ" },
                            {id: "B000000000000135", name: "14.NGUYỄN ANH NGUYÊN Đời thứ 17", doi: 17, gioiTinh: "Nam" },
                            {id: "B000000000000136", name: "14.NGUYỄN DUY SƠN Đời thứ 17", doi: 17, gioiTinh: "Nam" },
                            {id: "B000000000000137", name: "14.NGUYỄN PHÚC HẢI Đời thứ 17", doi: 17, gioiTinh: "Nam" },
                            {id: "B000000000000138", name: "14.NGUYỄN VĂN CHIẾN Đời thứ 17", doi: 17, gioiTinh: "Nam" },
                            {id: "B000000000000139", name: "13.NGUYỄN QUỐC BÌNH Đời thứ 16", doi: 16, gioiTinh: "Nam" },
                            {id: "B000000000000140", name: "14.NGUYỄN THỊ LỰC Đời thứ 17", doi: 17, gioiTinh: "Nữ" },
                            {id: "B000000000000141", name: "14.NGUYỄN VĂN BỘ Đời thứ 17", doi: 17, gioiTinh: "Nam" },
                            {id: "B000000000000142", name: "14.NGUYỄN VĂN TRỰ Đời thứ 17", doi: 17, gioiTinh: "Nam" },
                            {id: "B000000000000143", name: "14.NGUYỄN THỊ HUỆ Đời thứ 17", doi: 17, gioiTinh: "Nữ" },
                            {id: "B000000000000144", name: "14.NGUYỄN THỊ TUẤT Đời thứ 17", doi: 17, gioiTinh: "Nữ" },
                            {id: "B000000000000145", name: "14.NGUYỄN VĂN LUẬN Đời thứ 17", doi: 17, gioiTinh: "Nam" },
                            {id: "B000000000000146", name: "14.NGUYỄN THỊ DINH Đời thứ 17", doi: 17, gioiTinh: "Nữ" },
                            {id: "B000000000000147", name: "13.NGUYỄN VĂN TRUYỀN Đời thứ 16", doi: 16, gioiTinh: "Nam" },
                            {id: "B000000000000148", name: "14.NGUYỄN THỊ PHƯỢNG Đời thứ 17", doi: 17, gioiTinh: "Nữ" },
                            {id: "B000000000000149", name: "14.NGUYỄN VĂN TRƯỞNG Đời thứ 17", doi: 17, gioiTinh: "Nam" },
                            {id: "B000000000000150", name: "14.NGUYỄN THỊ THOA Đời thứ 17", doi: 17, gioiTinh: "Nữ" },
                            {id: "B000000000000151", name: "14.NGUYỄN THỊ MINH Đời thứ 17", doi: 17, gioiTinh: "Nữ" },
                            {id: "B000000000000152", name: "14.NGUYỄN THỊ MAI Đời thứ 17", doi: 17, gioiTinh: "Nữ" },
                            {id: "B000000000000153", name: "14.NGUYỄN VĂN QUỐC Đời thứ 17", doi: 17, gioiTinh: "Nam" },
                            {id: "B000000000000154", name: "14.NGUYỄN PHÚC VƯỢNG Đời thứ 17", doi: 17, gioiTinh: "Nam" },
                            {id: "B000000000000155", name: "14.NGUYỄN TUẤN ANH Đời thứ 17", doi: 17, gioiTinh: "Nam" },
                            {id: "B000000000000156", name: "14.NGUYỄN VĂN TRỌNG Đời thứ 17", doi: 17, gioiTinh: "Nam" },
                            {id: "B000000000000157", name: "14.NGUYỄN VĂN LƯU Đời thứ 17", doi: 17, gioiTinh: "Nam" },
                            {id: "B000000000000158", name: "13.NGUYỄN PHÚC LỘC Đời thứ 16", doi: 16, gioiTinh: "Nam" },
                            {id: "B000000000000159", name: "13.NGUYỄN PHÚC LÂM Đời thứ 16", doi: 16, gioiTinh: "Nam" },
                            {id: "B000000000000160", name: "14.NGUYỄN PHÚC LAI Đời thứ 17", doi: 17, gioiTinh: "Nam" },
                            {id: "B000000000000161", name: "14.NGUYỄN THỊ YẾN Đời thứ 17", doi: 17, gioiTinh: "Nữ" },
                            {id: "B000000000000162", name: "14.NGUYỄN PHÚC HƯƠNG Đời thứ 17", doi: 17, gioiTinh: "Nam" },
                            {id: "B000000000000163", name: "14.NGUYỄN VĂN BÀI Đời thứ 17", doi: 17, gioiTinh: "Nam" },
                            {id: "B000000000000164", name: "14.NGUYỄN VĂN MANH Đời thứ 17", doi: 17, gioiTinh: "Nam" },
                            {id: "B000000000000165", name: "14.NGUYỄN THỊ LAN Đời thứ 17", doi: 17, gioiTinh: "Nữ" },
                            {id: "B000000000000166", name: "13.NGUYỄN VĂN HOÀNH Đời thứ 16", doi: 16, gioiTinh: "Nam" },
                            {id: "B000000000000167", name: "14.NGUYỄN THỊ DẬU Đời thứ 17", doi: 17, gioiTinh: "Nữ" },
                            {id: "B000000000000168", name: "14.NGUYỄN VĂN LŨY Đời thứ 17", doi: 17, gioiTinh: "Nam" },
                            {id: "B000000000000169", name: "14.NGUYỄN THỊ LIỄU Đời thứ 17", doi: 17, gioiTinh: "Nữ" },
                            {id: "B000000000000170", name: "14.NGUYỄN VĂN LỠI Đời thứ 17", doi: 17, gioiTinh: "Nam" },
                            {id: "B000000000000171", name: "14.NGUYỄN VĂN LUYỄN Đời thứ 17", doi: 17, gioiTinh: "Nam" },
                            {id: "B000000000000172", name: "14.NGUYỄN THỊ LIỆU Đời thứ 17", doi: 17, gioiTinh: "Nữ" },
                            {id: "B000000000000173", name: "14.NGUYỄN VĂN THẢO Đời thứ 17", doi: 17, gioiTinh: "Nam" },
                            {id: "B000000000000174", name: "14.NGUYỄN VĂN ĐÀM Đời thứ 17", doi: 17, gioiTinh: "Nam" },
                            {id: "B000000000000175", name: "14.NGUYỄN THỊ DUNG Đời thứ 17", doi: 17, gioiTinh: "Nữ" },
                            {id: "B000000000000176", name: "14.NGUYỄN THỊ DỊU Đời thứ 17", doi: 17, gioiTinh: "Nữ" },
                            {id: "B000000000000177", name: "14.NGUYỄN THỊ LOAN Đời thứ 17", doi: 17, gioiTinh: "Nữ" },
                            {id: "B000000000000178", name: "14.NGUYỄN PHÚC LƯU Đời thứ 17", doi: 17, gioiTinh: "Nam" },
                            {id: "B000000000000179", name: "14.NGUYỄN THỊ THU Đời thứ 17", doi: 17, gioiTinh: "Nữ" },
                            {id: "B000000000000180", name: "14.NGUYỄN THỊ NHUNG Đời thứ 17", doi: 17, gioiTinh: "Nữ" },
                            {id: "B000000000000181", name: "14.NGUYỄN THỊ NHÂM Đời thứ 17", doi: 17, gioiTinh: "Nữ" },
                            {id: "B000000000000182", name: "14.NGUYỄN THỊ MAI Đời thứ 17", doi: 17, gioiTinh: "Nữ" },
                            {id: "B000000000000183", name: "14.NGUYỄN THỊ NHINH Đời thứ 17", doi: 17, gioiTinh: "Nữ" },
                            {id: "B000000000000184", name: "14.NGUYỄN VĂN CHÍNH Đời thứ 17", doi: 17, gioiTinh: "Nam" },
                            {id: "B000000000000185", name: "14.NGUYỄN THỊ PHA Đời thứ 17", doi: 17, gioiTinh: "Nữ" },
                            {id: "B000000000000186", name: "14.NGUYỄN THỊ HƯNG Đời thứ 17", doi: 17, gioiTinh: "Nữ" },
                            {id: "B000000000000187", name: "14.NGUYỄN THỊ MỪNG Đời thứ 17", doi: 17, gioiTinh: "Nữ" },
                            {id: "B000000000000188", name: "13.NGUYỄN VĂN TIÊN Đời thứ 16", doi: 16, gioiTinh: "Nam" },
                            {id: "B000000000000189", name: "14.NGUYỄN PHÚC THIÊM Đời thứ 17", doi: 17, gioiTinh: "Nam" },
                            {id: "B000000000000190", name: "14.NGUYỄN VĂN THIỀNG Đời thứ 17", doi: 17, gioiTinh: "Nam" },
                            {id: "B000000000000191", name: "14.NGUYỄN THỊ HUYỀN Đời thứ 17", doi: 17, gioiTinh: "Nữ" },
                            {id: "B000000000000192", name: "14.NGUYỄN THỊ DUNG Đời thứ 17", doi: 17, gioiTinh: "Nữ" },
                            {id: "B000000000000193", name: "14.NGUYỄN THỊ LOAN Đời thứ 17", doi: 17, gioiTinh: "Nữ" },
                            {id: "B000000000000194", name: "14.NGUYỄN VĂN CHIẾN Đời thứ 17", doi: 17, gioiTinh: "Nam" },
                            {id: "B000000000000195", name: "14.NGUYỄN THỊ NHÀI Đời thứ 17", doi: 17, gioiTinh: "Nữ" },
                            {id: "B000000000000196", name: "14.NGUYỄN THỊ NGÀ Đời thứ 17", doi: 17, gioiTinh: "Nữ" },
                            {id: "B000000000000197", name: "14.NGUYỄN THỊ NGUYỆT Đời thứ 17", doi: 17, gioiTinh: "Nữ" },
                            {id: "B000000000000198", name: "14.NGUYỄN NĂNG TĨNH Đời thứ 17", doi: 17, gioiTinh: "Nam" },
                            {id: "B000000000000199", name: "14.NGUYỄN THỊ LỰU Đời thứ 17", doi: 17, gioiTinh: "Nữ" },
                            {id: "B000000000000200", name: "14.NGUYỄN THỊ LƯU Đời thứ 17", doi: 17, gioiTinh: "Nữ" },
                            {id: "B000000000000201", name: "14.NGUYỄN THỊ HOA Đời thứ 17", doi: 17, gioiTinh: "Nữ" },
                            {id: "B000000000000202", name: "14.NGUYỄN VĂN TRUNG Đời thứ 17", doi: 17, gioiTinh: "Nam" },
                            {id: "B000000000000203", name: "14.NGUYỄN THỊ TUYẾT Đời thứ 17", doi: 17, gioiTinh: "Nữ" },
                            {id: "B000000000000204", name: "14.NGUYỄN THỊ THOA Đời thứ 17", doi: 17, gioiTinh: "Nữ" },
                            {id: "B000000000000205", name: "14.NGUYỄN THỊ THẢO Đời thứ 17", doi: 17, gioiTinh: "Nữ" },
                            {id: "B000000000000206", name: "14.NGUYỄN VĂN KIÊN Đời thứ 17", doi: 17, gioiTinh: "Nam" },
                            {id: "B000000000000207", name: "14.NGUYỄN THỊ YÊN Đời thứ 17", doi: 17, gioiTinh: "Nữ" },
                            {id: "B000000000000208", name: "14.NGUYỄN PHÚC TRƯỞNG Đời thứ 17", doi: 17, gioiTinh: "Nam" },
                            {id: "B000000000000209", name: "14.NGUYỄN PHÚC CHIẾN Đời thứ 17", doi: 17, gioiTinh: "Nam" },
                            {id: "B000000000000210", name: "14.NGUYỄN THỊ LAN Đời thứ 17", doi: 17, gioiTinh: "Nữ" },
                            {id: "B000000000000211", name: "14.NGUYỄN THỊ CÚC Đời thứ 17", doi: 17, gioiTinh: "Nữ" },
                            {id: "B000000000000212", name: "14.NGUYỄN PHÚC SƠN Đời thứ 17", doi: 17, gioiTinh: "Nam" },
                            {id: "B000000000000213", name: "14.NGUYỄN THỊ HẰNG Đời thứ 17", doi: 17, gioiTinh: "Nữ" },
                            {id: "B000000000000214", name: "14.NGUYỄN THỊ THỦY Đời thứ 17", doi: 17, gioiTinh: "Nữ" },
                            {id: "B000000000000215", name: "14.NGUYỄN PHÚC MẠNH Đời thứ 17", doi: 17, gioiTinh: "Nam" },
                            {id: "B000000000000216", name: "14.NGUYỄN PHÚC CƯỜNG Đời thứ 17", doi: 17, gioiTinh: "Nam" },
                            {id: "B000000000000217", name: "13.NGUYỄN VĂN KHẨN Đời thứ 16", doi: 16, gioiTinh: "Nam" },
                            {id: "B000000000000218", name: "13.NGUYỄN VĂN UYÊN Đời thứ 16", doi: 16, gioiTinh: "Nam" },
                            {id: "B000000000000219", name: "14.NGUYỄN THỊ ĐÀN Đời thứ 17", doi: 17, gioiTinh: "Nữ" },
                            {id: "B000000000000220", name: "14.NGUYỄN THỊ SÁO Đời thứ 17", doi: 17, gioiTinh: "Nữ" },
                            {id: "B000000000000221", name: "14.NGUYỄN THỊ SẬU Đời thứ 17", doi: 17, gioiTinh: "Nữ" },
                            {id: "B000000000000222", name: "14.NGUYỄN THỊ SẮP Đời thứ 17", doi: 17, gioiTinh: "Nữ" },
                            {id: "B000000000000223", name: "14.NGUYỄN PHÚC HIỆU Đời thứ 17", doi: 17, gioiTinh: "Nam" },
                            {id: "B000000000000228", name: "13.NGUYỄN VĂN HUÊ Đời thứ 16", doi: 16, gioiTinh: "Nam" },
                            {id: "B000000000000229", name: "14.NGUYỄN THỊ DUYỆT Đời thứ 17", doi: 17, gioiTinh: "Nữ" },
                            {id: "B000000000000230", name: "14.NGUYỄN THỊ TUYỀN Đời thứ 17", doi: 17, gioiTinh: "Nữ" },
                            {id: "B000000000000231", name: "14.NGUYỄN THỊ TÙNG Đời thứ 17", doi: 17, gioiTinh: "Nữ" },
                            {id: "B000000000000232", name: "14.NGUYỄN THỊ TÌNH Đời thứ 17", doi: 17, gioiTinh: "Nữ" },
                            {id: "B000000000000238", name: "13.NGUYỄN VĂN TIẾP Đời thứ 16", doi: 16, gioiTinh: "Nam" },
                            {id: "B000000000000239", name: "14.NGUYỄN VĂN ĐIỆP Đời thứ 17", doi: 17, gioiTinh: "Nam" },
                            {id: "B000000000000240", name: "13.NGUYỄN VĂN QUYÊN Đời thứ 16", doi: 16, gioiTinh: "Nam" },
                            {id: "B000000000000245", name: "14.NGUYỄN THỌ CHIẾN Đời thứ 17", doi: 17, gioiTinh: "Nam" },
                            {id: "B000000000000246", name: "14.NGUYỄN THỊ THỦY Đời thứ 17", doi: 17, gioiTinh: "Nữ" },
                            {id: "B000000000000247", name: "14.NGUYỄN THỊ THIÊM Đời thứ 17", doi: 17, gioiTinh: "Nữ" },
                            {id: "B000000000000248", name: "14.NGUYỄN VIỆT CƯỜNG Đời thứ 17", doi: 17, gioiTinh: "Nam" },
                            {id: "B000000000000249", name: "14.NGUYỄN VĂN QUYẾT Đời thứ 17", doi: 17, gioiTinh: "Nam" },
                            {id: "B000000000000250", name: "14.NGUYỄN THỊ HÀ Đời thứ 17", doi: 17, gioiTinh: "Nữ" },
                            {id: "B000000000000251", name: "14.NGUYỄN THỊ HIỀN Đời thứ 17", doi: 17, gioiTinh: "Nữ" },
                            {id: "B000000000000252", name: "14.NGUYỄN PHÚC THÀNH Đời thứ 17", doi: 17, gioiTinh: "Nam" },
                            {id: "B000000000000253", name: "14.NGUYỄN THỊ MIỀN Đời thứ 17", doi: 17, gioiTinh: "Nữ" },
                            {id: "B000000000000254", name: "14.NGUYỄN THỊ MÙA Đời thứ 17", doi: 17, gioiTinh: "Nữ" },
                            {id: "B000000000000255", name: "14.NGUYỄN VĂN VINH Đời thứ 17", doi: 17, gioiTinh: "Nam" },
                            {id: "B000000000000256", name: "14.NGUYỄN THỊ THOA Đời thứ 17", doi: 17, gioiTinh: "Nữ" },
                            {id: "B000000000000257", name: "14.NGUYỄN THỊ LÝ Đời thứ 17", doi: 17, gioiTinh: "Nữ" },
                            {id: "B000000000000258", name: "14.NGUYỄN THỊ HUỆ Đời thứ 17", doi: 17, gioiTinh: "Nữ" },
                            {id: "B000000000000259", name: "14.NGUYỄN THỊ THƠM Đời thứ 17", doi: 17, gioiTinh: "Nữ" },
                            {id: "B000000000000260", name: "14.NGUYỄN PHÚC VINH Đời thứ 17", doi: 17, gioiTinh: "Nam" },
                            {id: "B000000000000261", name: "14.NGUYỄN THỊ HỒNG Đời thứ 17", doi: 17, gioiTinh: "Nữ" },
                            {id: "B000000000000262", name: "14.NGUYỄN PHÚC ĐẠI Đời thứ 17", doi: 17, gioiTinh: "Nam" },
                            {id: "B000000000000263", name: "14.NGUYỄN THỊ HỒNG Đời thứ 17", doi: 17, gioiTinh: "Nữ" },
                            {id: "B000000000000264", name: "14.NGUYỄN PHÚC TRƯỜNG Đời thứ 17", doi: 17, gioiTinh: "Nam" },
                            {id: "B000000000000265", name: "14.NGUYỄN PHÚC CHIẾN Đời thứ 17", doi: 17, gioiTinh: "Nam" },
                            {id: "B000000000000266", name: "14.NGUYỄN THỊ LÝ Đời thứ 17", doi: 17, gioiTinh: "Nữ" },
                            {id: "B000000000000267", name: "14.NGUYỄN PHÚC VINH Đời thứ 17", doi: 17, gioiTinh: "Nam" },
                            {id: "B000000000000268", name: "14.NGUYỄN PHÚC TOẢN Đời thứ 17", doi: 17, gioiTinh: "Nam" },
                            {id: "B000000000000269", name: "14.NGUYỄN THỊ THU Đời thứ 17", doi: 17, gioiTinh: "Nữ" },
                            {id: "B000000000000270", name: "14.NGUYỄN MẠNH TUÂN Đời thứ 17", doi: 17, gioiTinh: "Nam" },
                            {id: "B000000000000271", name: "14.NGUYỄN PHÚC CÔNG Đời thứ 17", doi: 17, gioiTinh: "Nam" },
                            {id: "B000000000000272", name: "14.NGUYỄN THỊ THẢO Đời thứ 17", doi: 17, gioiTinh: "Nữ" },
                            {id: "B000000000000273", name: "14.NGUYỄN THỊ THANH THÚY Đời thứ 17", doi: 17, gioiTinh: "Nữ" },
                            {id: "B000000000000274", name: "14.NGUYỄN THỊ THU HẰNG Đời thứ 17", doi: 17, gioiTinh: "Nữ" },
                            {id: "B000000000000275", name: "14.NGUYỄN THỊ HUYỀN TRANG Đời thứ 17", doi: 17, gioiTinh: "Nữ" },
                            {id: "B000000000000276", name: "14.NGUYỄN PHÚC VIỆT Đời thứ 17", doi: 17, gioiTinh: "Nam" },
                            {id: "B000000000000277", name: "14.NGUYỄN PHÚC HẢI Đời thứ 17", doi: 17, gioiTinh: "Nam" },
                            {id: "B000000000000278", name: "14.NGUYỄN LÂM PHÚC HƯNG Đời thứ 17", doi: 17, gioiTinh: "Nam" },
                            {id: "B000000000000279", name: "14.NGUYỄN THỊ NGUYÊN Đời thứ 17", doi: 17, gioiTinh: "Nữ" },
                            {id: "B000000000000280", name: "14.NGUYỄN THỊ ANH ĐÀO Đời thứ 17", doi: 17, gioiTinh: "Nữ" },
                            {id: "B000000000000281", name: "14.NGUYỄN KIM CÚC Đời thứ 17", doi: 17, gioiTinh: "Nữ" },
                            {id: "B000000000000282", name: "15.NGUYỄN THÀNH LÊ Đời thứ 18", doi: 18, gioiTinh: "Nam" },
                            {id: "B000000000000283", name: "15.NGUYỄN SỸ ĐOÀN Đời thứ 18", doi: 18, gioiTinh: "Nam" },
                            {id: "B000000000000284", name: "15.NGUYỄN THỊ LIÊN Đời thứ 18", doi: 18, gioiTinh: "Nữ" },
                            {id: "B000000000000285", name: "15.NGUYỄN PHÚC TRỌNG Đời thứ 18", doi: 18, gioiTinh: "Nam" },
                            {id: "B000000000000286", name: "15.NGUYỄN THỊ ? Đời thứ 18", doi: 18, gioiTinh: "Nữ" },
                            {id: "B000000000000287", name: "15.THẮNG Đời thứ 18", doi: 18, gioiTinh: "Nam" },
                            {id: "B000000000000288", name: "15.NGUYỄN THỊ ? Đời thứ 18", doi: 18, gioiTinh: "Nam" },
                            {id: "B000000000000289", name: "15.NGUYỄN VĂN ĐỨC Đời thứ 18", doi: 18, gioiTinh: "Nam" },
                            {id: "B000000000000290", name: "15.NGUYỄN THỊ LINH Đời thứ 18", doi: 18, gioiTinh: "Nữ" },
                            {id: "B000000000000291", name: "15.NGUYỄN NGỌC CHÂM Đời thứ 18", doi: 18, gioiTinh: "Nữ" },
                            {id: "B000000000000292", name: "15.NGUYỄN NGỌC CHI Đời thứ 18", doi: 18, gioiTinh: "Nữ" },
                            {id: "B000000000000293", name: "15.NGUYỄN PHÚC TRƯỜNG Đời thứ 18", doi: 18, gioiTinh: "Nam" },
                            {id: "B000000000000294", name: "15.NGUYỄN THỊ HẠNH Đời thứ 18", doi: 18, gioiTinh: "Nữ" },
                            {id: "B000000000000295", name: "15.NGUYỄN THỊ HUYỀN Đời thứ 18", doi: 18, gioiTinh: "Nữ" },
                            {id: "B000000000000296", name: "15.NGUYỄN PHÚC LONG Đời thứ 18", doi: 18, gioiTinh: "Nam" },
                            {id: "B000000000000297", name: "15.NGUYỄN ĐỨC THẮNG Đời thứ 18", doi: 18, gioiTinh: "Nam" },
                            {id: "B000000000000298", name: "15.NGUYỄN THỊ TUYẾT Đời thứ 18", doi: 18, gioiTinh: "Nữ" },
                            {id: "B000000000000299", name: "15.NGUYỄN THỊ HƯƠNG Đời thứ 18", doi: 18, gioiTinh: "Nữ" },
                            {id: "B000000000000300", name: "15.NGUYỄN THỊ HOA Đời thứ 18", doi: 18, gioiTinh: "Nữ" },
                            {id: "B000000000000301", name: "15.NGUYỄN THỊ HUYỀN Đời thứ 18", doi: 18, gioiTinh: "Nữ" },
                            {id: "B000000000000302", name: "14.NGUYỄN THỊ YẾN Đời thứ 18", doi: 18, gioiTinh: "Nữ" },
                            {id: "B000000000000303", name: "15.NGUYỄN VĂN KHA Đời thứ 18", doi: 18, gioiTinh: "Nam" },
                            {id: "B000000000000304", name: "15.NGUYỄN VĂN KIÊN Đời thứ 18", doi: 18, gioiTinh: "Nam" },
                            {id: "B000000000000305", name: "15.NGUYỄN PHÚC HIỆP Đời thứ 18", doi: 18, gioiTinh: "Nam" },
                            {id: "B000000000000306", name: "15.NGUYỄN VĂN HÙNG Đời thứ 18", doi: 18, gioiTinh: "Nam" },
                            {id: "B000000000000307", name: "15.NGUYỄN VĂN ĐỆ Đời thứ 18", doi: 18, gioiTinh: "Nam" },
                            {id: "B000000000000308", name: "15.NGUYỄN THỊ TÂM Đời thứ 18", doi: 18, gioiTinh: "Nữ" },
                            {id: "B000000000000309", name: "15.NGUYỄN VĂN MƯỜI Đời thứ 18", doi: 18, gioiTinh: "Nam" },
                            {id: "B000000000000310", name: "15.NGUYỄN PHÚC TOÀN Đời thứ 18", doi: 18, gioiTinh: "Nam" },
                            {id: "B000000000000311", name: "15.NGUYỄN PHÚC THUẬN Đời thứ 18", doi: 18, gioiTinh: "Nam" },
                            {id: "B000000000000312", name: "15.NGUYỄN THỊ THỦY Đời thứ 18", doi: 18, gioiTinh: "Nữ" },
                            {id: "B000000000000313", name: "15.NGUYỄN PHÚC THIỆN Đời thứ 18", doi: 18, gioiTinh: "Nam" },
                            {id: "B000000000000314", name: "15.NGUYỄN PHÚC VIỆT Đời thứ 18", doi: 18, gioiTinh: "Nam" },
                            {id: "B000000000000315", name: "15.NGUYỄN PHÚC TIỆP Đời thứ 18", doi: 18, gioiTinh: "Nam" },
                            {id: "B000000000000316", name: "15.NGUYỄN THỊ QUỲNH HOA Đời thứ 18", doi: 18, gioiTinh: "Nữ" },
                            {id: "B000000000000317", name: "15.NGUYỄN PHÚC GIA KHÁNH Đời thứ 18", doi: 18, gioiTinh: "Nam" },
                            {id: "B000000000000318", name: "15.NGUYỄN PHÚC ĐẠT Đời thứ 18", doi: 18, gioiTinh: "Nam" },
                            {id: "B000000000000319", name: "15.NGUYỄN PHÚC NAM Đời thứ 18", doi: 18, gioiTinh: "Nam" },
                            {id: "B000000000000320", name: "15.NGUYỄN THỊ NGỌC KHÁNH Đời thứ 18", doi: 18, gioiTinh: "Nữ" },
                            {id: "B000000000000321", name: "15.NGUYỄN PHÚC THIỆN TOÀN Đời thứ 18", doi: 18, gioiTinh: "Nam" },
                            {id: "B000000000000322", name: "15.NGUYỄN THỊ TRANG Đời thứ 18", doi: 18, gioiTinh: "Nữ" },
                            {id: "B000000000000323", name: "15.NGUYỄN THỊ DIỄM TRINH Đời thứ 18", doi: 18, gioiTinh: "Nữ" },
                            {id: "B000000000000324", name: "15.NGUYỄN PHÚC THỊNH Đời thứ 18", doi: 18, gioiTinh: "Nam" },
                            {id: "B000000000000325", name: "15.NGUYỄN THỊ THẢO Đời thứ 18", doi: 18, gioiTinh: "Nữ" },
                            {id: "B000000000000326", name: "15.NGUYỄN PHÚC MINH ĐỨC Đời thứ 18", doi: 18, gioiTinh: "Nam" },
                            {id: "B000000000000327", name: "15.NGUYỄN PHÚC BẢO NAM Đời thứ 18", doi: 18, gioiTinh: "Nam" },
                            {id: "B000000000000328", name: "15.NGUYỄN PHÚC NAM Đời thứ 18", doi: 18, gioiTinh: "Nam" },
                            {id: "B000000000000329", name: "15.NGUYỄN THỊ HIỀN Đời thứ 18", doi: 18, gioiTinh: "Nữ" },
                            {id: "B000000000000330", name: "15.NGUYỄN THỊ NGỌC Đời thứ 18", doi: 18, gioiTinh: "Nữ" },
                            {id: "B000000000000331", name: "15.NGUYỄN THỊ NGẦN Đời thứ 18", doi: 18, gioiTinh: "Nữ" },
                            {id: "B000000000000332", name: "15.NGUYỄN THỊ NGOAN Đời thứ 18", doi: 18, gioiTinh: "Nữ" },
                            {id: "B000000000000333", name: "15.NGUYỄN THỊ HẠNH Đời thứ 18", doi: 18, gioiTinh: "Nữ" },
                            {id: "B000000000000334", name: "15.NGUYỄN THỊ THÚY HÀ Đời thứ 18", doi: 18, gioiTinh: "Nữ" },
                            {id: "B000000000000335", name: "15.NGUYỄN PHÚC KIÊN Đời thứ 18", doi: 18, gioiTinh: "Nam" },
                            {id: "B000000000000336", name: "15.NGUYỄN TRẦN HẢI ANH Đời thứ 18", doi: 18, gioiTinh: "Nữ" },
                            {id: "B000000000000337", name: "15.NGUYỄN PHÚC BẢO ANH Đời thứ 18", doi: 18, gioiTinh: "Nữ" },
                            {id: "B000000000000338", name: "15.NGUYỄN TRẦN HẢI ANH Đời thứ 18", doi: 18, gioiTinh: "Nam" },
                            {id: "B000000000000339", name: "15.NGUYỄN PHÚC PHONG Đời thứ 18", doi: 18, gioiTinh: "Nam" },
                            {id: "B000000000000340", name: "15.NGUYỄN THỊ THIẾM Đời thứ 18", doi: 18, gioiTinh: "Nữ" },
                            {id: "B000000000000341", name: "15.NGUYỄN ĐÌNH CHÚC Đời thứ 18", doi: 18, gioiTinh: "Nam" },
                            {id: "B000000000000342", name: "15.NGUYỄN THỊ HIỀN Đời thứ 18", doi: 18, gioiTinh: "Nữ" },
                            {id: "B000000000000343", name: "15.NGUYỄN THỊ HẬU Đời thứ 18", doi: 18, gioiTinh: "Nữ" },
                            {id: "B000000000000344", name: "15.NGUYỄN VĂN THẮNG Đời thứ 18", doi: 18, gioiTinh: "Nam" },
                            {id: "B000000000000345", name: "15.NGUYỄN TRẦN PHÚC DÙNG Đời thứ 18", doi: 18, gioiTinh: "Nam" },
                            {id: "B000000000000346", name: "15.NGUYỄN NAM THẮNG Đời thứ 18", doi: 18, gioiTinh: "Nam" },
                            {id: "B000000000000347", name: "15.NGUYỄN PHÚC THIỆN Đời thứ 18", doi: 18, gioiTinh: "Nam" },
                            {id: "B000000000000348", name: "15.NGUYỄN PHÚC BẢO Đời thứ 18", doi: 18, gioiTinh: "Nam" },
                            {id: "B000000000000351", name: "15.CẨM TÚ Đời thứ 18", doi: 18, gioiTinh: "Nữ" },
                            {id: "B000000000000352", name: "15.NGUYỄN MAI PHƯƠNG Đời thứ 18", doi: 18, gioiTinh: "Nữ" },
                            {id: "B000000000000353", name: "15.NGUYỄN GIA HÂN Đời thứ 18", doi: 18, gioiTinh: "Nữ" },
                            {id: "B000000000000354", name: "15.NGUYỄN GIA BẢO Đời thứ 18", doi: 18, gioiTinh: "Nam" },
                            {id: "B000000000000355", name: "15.NGUYỄN BẢO NGỌC Đời thứ 18", doi: 18, gioiTinh: "Nữ" },
                            {id: "B000000000000356", name: "15.NGUYỄN NGỌC HOA Đời thứ 18", doi: 18, gioiTinh: "Nữ" },
                            {id: "B000000000000357", name: "15.NGUYỄN PHÚC PHÚ QUÝ Đời thứ 18", doi: 18, gioiTinh: "Nam" },
                            {id: "B000000000000358", name: "15.NGUYỄN PHÚC ANH Đời thứ 18", doi: 18, gioiTinh: "Nam" },
                            {id: "B000000000000359", name: "15.NGUYỄN THỊ THÙY LINH Đời thứ 18", doi: 18, gioiTinh: "Nữ" },
                            {id: "B000000000000360", name: "15.NGUYỄN VĂN HIẾU Đời thứ 18", doi: 18, gioiTinh: "Nam" },
                            {id: "B000000000000361", name: "15.NGUYỄN HOÀI ANH Đời thứ 18", doi: 18, gioiTinh: "Nữ" },
                            {id: "B000000000000362", name: "15.NGUYỄN NGỌC DIỆP Đời thứ 18", doi: 18, gioiTinh: "Nữ" },
                            {id: "B000000000000363", name: "15.NGUYỄN THỊ LAN TRANG Đời thứ 18", doi: 18, gioiTinh: "Nữ" },
                            {id: "B000000000000364", name: "15.NGUYỄN PHÚC HIẾU Đời thứ 18", doi: 18, gioiTinh: "Nam" },
                            {id: "B000000000000365", name: "15.NGUYỄN THỊ QUỲNH ANH Đời thứ 18", doi: 18, gioiTinh: "Nữ" },
                            {id: "B000000000000366", name: "15.NGUYỄN VĂN KHÔI Đời thứ 18", doi: 18, gioiTinh: "Nam" },
                            {id: "B000000000000367", name: "15.NGUYỄN THỊ THU HIỀN Đời thứ 18", doi: 18, gioiTinh: "Nữ" },
                            {id: "B000000000000368", name: "15.NGUYỄN PHÚC KIÊM Đời thứ 18", doi: 18, gioiTinh: "Nam" },
                            {id: "B000000000000369", name: "15.NGUYỄN THỊ HỒNG Đời thứ 18", doi: 18, gioiTinh: "Nữ" },
                            {id: "B000000000000370", name: "15.NGUYỄN PHÚC HIỆP Đời thứ 18", doi: 18, gioiTinh: "Nam" },
                            {id: "B000000000000371", name: "15.NGUYỄN HỒ NGỌC LINH Đời thứ 18", doi: 18, gioiTinh: "Nữ" },
                            {id: "B000000000000372", name: "15.NGUYỄN HỒ ANH TUẤN Đời thứ 18", doi: 18, gioiTinh: "Nam" },
                            {id: "B000000000000373", name: "15.NGUYỄN PHÚC HUY Đời thứ 18", doi: 18, gioiTinh: "Nam" },
                            {id: "B000000000000374", name: "14.NGUYỄN THU VÂN Đời thứ 17", doi: 17, gioiTinh: "Nữ" },
                            {id: "B000000000000375", name: "16.NGUYỄN THÀNH BẢO AN Đời thứ 19", doi: 19, gioiTinh: "Nam" },
                            {id: "B000000000000376", name: "16.NGUYỄN PHÚC ANH Đời thứ 19", doi: 19, gioiTinh: "Nam" },
                            {id: "B000000000000377", name: "16.NGUYỄN PHÚC THUẬN PHÁT Đời thứ 19", doi: 19, gioiTinh: "Nam" },
                            {id: "B000000000000378", name: "16.NGUYỄN THỊ KIM NGÂN Đời thứ 19", doi: 19, gioiTinh: "Nữ" },
                            {id: "B000000000000379", name: "16.NGUYỄN NGỌC HIÊN Đời thứ 19", doi: 19, gioiTinh: "Nữ" },
                            {id: "B000000000000380", name: "16.NGUYỄN BẢO AN Đời thứ 19", doi: 19, gioiTinh: "Nữ" },
                            {id: "B000000000000381", name: "16.NGUYỄN HOÀI AN Đời thứ 19", doi: 19, gioiTinh: "Nữ" },
                            {id: "B000000000000382", name: "15.NGUYỄN PHÚC ĐẠT Đời thứ 18", doi: 18, gioiTinh: "Nam" },
                            {id: "B000000000000383", name: "16.NGUYỄN PHÚC THIỆN Đời thứ 19", doi: 19, gioiTinh: "Nam" },
                            {id: "B000000000000384", name: "16.NGUYỄN MỘC TRÀ Đời thứ 19", doi: 19, gioiTinh: "Nữ" },
                            {id: "B000000000000385", name: "16.NGUYỄN THỊ THANH THÙY Đời thứ 19", doi: 19, gioiTinh: "Nữ" },
                            {id: "B000000000000386", name: "16.NGUYỄN TRÚC ANH Đời thứ 19", doi: 19, gioiTinh: "Nữ" },
                            {id: "B000000000000387", name: "13.NGUYỄN THỊ LÕN Đời thứ 16", doi: 16, gioiTinh: "Nữ" },
                            {id: "B000000000000388", name: "13.NGUYỄN THỊ LÀN Đời thứ 16", doi: 16, gioiTinh: "Nữ" },
                            {id: "B000000000000389", name: "13.NGUYỄN THỊ LÀ Đời thứ 16", doi: 16, gioiTinh: "Nữ" },
                            {id: "B000000000000390", name: "13.NGUYỄN THỊ TƠ Đời thứ 16", doi: 16, gioiTinh: "Nữ" },
                            {id: "B000000000000391", name: "13.NGUYỄN THỊ LƠ Đời thứ 16", doi: 16, gioiTinh: "Nữ" },
                            {id: "B000000000000392", name: "13.NGUYỄN THỊ MƠ Đời thứ 16", doi: 16, gioiTinh: "Nữ" },
                            {id: "B000000000000393", name: "13.NGUYỄN THỊ THƠ Đời thứ 16", doi: 16, gioiTinh: "Nữ" },
                            {id: "B000000000000394", name: "14.NGUYỄN THỊ DỊU Đời thứ 17", doi: 17, gioiTinh: "Nữ" },
                            {id: "B000000000000395", name: "14.NGUYỄN PHÚC NAM Đời thứ 17", doi: 17, gioiTinh: "Nam" },
                            {id: "B000000000000396", name: "14.NGUYỄN THỊ XUÂN Đời thứ 17", doi: 17, gioiTinh: "Nữ" },
                            {id: "B000000000000397", name: "14.NGUYỄN PHÚC SANG Đời thứ 17", doi: 17, gioiTinh: "Nam" },
                            {id: "B000000000000398", name: "15.NGUYỄN PHÚC NAM Đời thứ 18", doi: 18, gioiTinh: "Nam" },
                            {id: "B000000000000399", name: "15.NGUYỄN THỊ YẾN Đời thứ 18", doi: 18, gioiTinh: "Nữ" },
                            {id: "B000000000000400", name: "13.NGUYỄN THỊ DỰ Đời thứ 16", doi: 16, gioiTinh: "Nữ" },
                            {id: "B000000000000401", name: "13.NGUYỄN THỊ NẾP Đời thứ 16", doi: 16, gioiTinh: "Nữ" },
                            {id: "B000000000000402", name: "13.NGUYỄN THỊ TẺ Đời thứ 16", doi: 16, gioiTinh: "Nữ" },
                            {id: "B000000000000403", name: "13.NGUYỄN THÀNH TRUNG Đời thứ 16", doi: 16, gioiTinh: "Nam" },
                            {id: "B000000000000404", name: "13.NGUYỄN THỊ DIỄM Đời thứ 16", doi: 16, gioiTinh: "Nữ" },
                            {id: "B000000000000405", name: "13.NGUYỄN THỊ DOANH Đời thứ 16", doi: 16, gioiTinh: "Nữ" },
                            {id: "B000000000000406", name: "13.NGUYỄN THỊ ĐẢNG Đời thứ 16", doi: 16, gioiTinh: "Nữ" },
                            {id: "B000000000000407", name: "13.NGUYỄN THỊ DÙNG Đời thứ 16", doi: 16, gioiTinh: "Nữ" },
                            {id: "B000000000000408", name: "13.NGUYỄN THỊ TOAN Đời thứ 16", doi: 16, gioiTinh: "Nữ" },
                            {id: "B000000000000409", name: "13.NGUYỄN THỊ NGOÃN Đời thứ 16", doi: 16, gioiTinh: "Nữ" },
                            {id: "B000000000000410", name: "13.NGUYỄN THỊ NGOAN Đời thứ 16", doi: 16, gioiTinh: "Nữ" },
                            {id: "B000000000000411", name: "13.NGUYỄN THỊ CẬN Đời thứ 16", doi: 16, gioiTinh: "Nữ" },
                            {id: "B000000000000412", name: "13.NGUYỄN THỊ CHĂM Đời thứ 16", doi: 16, gioiTinh: "Nữ" },
                            {id: "B000000000000413", name: "13.NGUYỄN THỊ CHANG Đời thứ 16", doi: 16, gioiTinh: "Nữ" },
                            {id: "B000000000000414", name: "13.NGUYỄN THỊ THƠI Đời thứ 16", doi: 16, gioiTinh: "Nữ" },
                            {id: "B000000000000415", name: "13.NGUYỄN THỊ THOẠN Đời thứ 16", doi: 16, gioiTinh: "Nữ" },
                            {id: "B000000000000416", name: "13.NGUYỄN THỊ THỜI Đời thứ 16", doi: 16, gioiTinh: "Nữ" },
                            {id: "B000000000000417", name: "13.NGUYỄN THỊ THẨM Đời thứ 16", doi: 16, gioiTinh: "Nữ" },
                            {id: "B000000000000418", name: "13.NGUYỄN THỊ THẠO Đời thứ 16", doi: 16, gioiTinh: "Nữ" },
                            {id: "B000000000000419", name: "13.NGUYỄN THỊ MƯU Đời thứ 16", doi: 16, gioiTinh: "Nữ" },
                            {id: "B000000000000420", name: "13.NGUYỄN THỊ MẸO Đời thứ 16", doi: 16, gioiTinh: "Nữ" },
                            {id: "B000000000000421", name: "13.NGUYỄN THỊ KẾ Đời thứ 16", doi: 16, gioiTinh: "Nữ" },
                            {id: "B000000000000422", name: "12.NGUYỄN VĂN HOAN Đời thứ 15", doi: 15, gioiTinh: "Nam" },
                            {id: "B000000000000423", name: "13.NGUYỄN THỊ HÂN Đời thứ 16", doi: 16, gioiTinh: "Nữ" },
                            {id: "B000000000000424", name: "13.NGUYỄN THỊ VÂN Đời thứ 16", doi: 16, gioiTinh: "Nữ" },
                            {id: "B000000000000425", name: "13.NGUYỄN THỊ HIỀN Đời thứ 16", doi: 16, gioiTinh: "Nữ" },
                            {id: "B000000000000426", name: "13.NGUYỄN VĂN NGUYÊN Đời thứ 16", doi: 16, gioiTinh: "Nam" },
                            {id: "B000000000000427", name: "13.NGUYỄN THỊ VỊ Đời thứ 16", doi: 16, gioiTinh: "Nữ" },
                            {id: "B000000000000428", name: "13.NGUYỄN THỊ VÌ Đời thứ 16", doi: 16, gioiTinh: "Nữ" },
                            {id: "B000000000000429", name: "14.NGUYỄN THỊ THẮM Đời thứ 17", doi: 17, gioiTinh: "Nữ" },
                            {id: "B000000000000430", name: "14.NGUYỄN THỊ THỦY Đời thứ 17", doi: 17, gioiTinh: "Nữ" },
                            {id: "B000000000000431", name: "14.NGUYỄN THỊ HUỆ Đời thứ 17", doi: 17, gioiTinh: "Nữ" },
                            {id: "B000000000000432", name: "14.NGUYỄN PHÚC MẠNH Đời thứ 17", doi: 17, gioiTinh: "Nam" },
                            {id: "B000000000000433", name: "12.NGUYỄN VĂN TÚY Đời thứ 15", doi: 15, gioiTinh: "Nam" },
                            {id: "B000000000000434", name: "13.NGUYỄN THỊ UYỂN Đời thứ 16", doi: 16, gioiTinh: "Nữ" },
                            {id: "B000000000000435", name: "13.NGUYỄN THỊ LAI Đời thứ 16", doi: 16, gioiTinh: "Nữ" },
                            {id: "B000000000000436", name: "13.NGUYỄN VĂN TÂN Đời thứ 16", doi: 16, gioiTinh: "Nam" },
                            {id: "B000000000000437", name: "13.NGUYỄN THỊ THI Đời thứ 16", doi: 16, gioiTinh: "Nữ" },
                            {id: "B000000000000438", name: "13.NGUYỄN THỊ LỊCH Đời thứ 16", doi: 16, gioiTinh: "Nữ" },
                            {id: "B000000000000439", name: "14.NGUYỄN THỊ NGỌC Đời thứ 17", doi: 17, gioiTinh: "Nữ" },
                            {id: "B000000000000440", name: "14.NGUYỄN PHÚC HÀ Đời thứ 17", doi: 17, gioiTinh: "Nam" },
                            {id: "B000000000000441", name: "14.NGUYỄN THỊ THU HUYỀN Đời thứ 17", doi: 17, gioiTinh: "Nữ" },
                            {id: "B000000000000442", name: "15.NGUYỄN PHÚC NGÂN KIM Đời thứ 18", doi: 18, gioiTinh: "Nữ" },
                            {id: "B000000000000443", name: "15.NGUYỄN PHÚC NGÂN ÁNH Đời thứ 18", doi: 18, gioiTinh: "Nữ" },
                            {id: "B000000000000444", name: "13.NGUYỄN THỊ HẠNH Đời thứ 16", doi: 16, gioiTinh: "Nữ" },
                            {id: "B000000000000445", name: "13.NGUYỄN THỊ HOA Đời thứ 16", doi: 16, gioiTinh: "Nữ" },
                            {id: "B000000000000446", name: "13.NGUYỄN THỊ NHUNG Đời thứ 16", doi: 16, gioiTinh: "Nữ" },
                            {id: "B000000000000447", name: "13.NGUYỄN THỊ TỴ Đời thứ 16", doi: 16, gioiTinh: "Nữ" },
                            {id: "B000000000000448", name: "13.NGUYỄN THỊ YÊN Đời thứ 16", doi: 16, gioiTinh: "Nữ" },
                            {id: "B000000000000449", name: "12.NGUYỄN VĂN HƯỚNG Đời thứ 15", doi: 15, gioiTinh: "Nam" },
                            {id: "B000000000000450", name: "13.NGUYỄN THỊ LÁNG Đời thứ 16", doi: 16, gioiTinh: "Nữ" },
                            {id: "B000000000000451", name: "13.NGUYỄN THỊ LAI Đời thứ 16", doi: 16, gioiTinh: "Nữ" },
                            {id: "B000000000000452", name: "12.NGUYỄN VĂN CỰ Đời thứ 15", doi: 15, gioiTinh: "Nam" },
                            {id: "B000000000000453", name: "13.NGUYỄN THỊ THỪA Đời thứ 16", doi: 16, gioiTinh: "Nữ" },
                            {id: "B000000000000454", name: "13.NGUYỄN THỊ THOAN Đời thứ 16", doi: 16, gioiTinh: "Nữ" },
                            {id: "B000000000000455", name: "13.NGUYỄN VĂN CƯ Đời thứ 16", doi: 16, gioiTinh: "Nam" },
                            {id: "B000000000000456", name: "13.NGUYỄN THỊ TỰ Đời thứ 16", doi: 16, gioiTinh: "Nữ" },
                            {id: "B000000000000457", name: "13.NGUYỄN THỊ THỨ Đời thứ 16", doi: 16, gioiTinh: "Nữ" },
                            {id: "B000000000000458", name: "12.NGUYỄN VĂN LỄ Đời thứ 15", doi: 15, gioiTinh: "Nam" },
                            {id: "B000000000000459", name: "13.NGUYỄN THỊ LÊ Đời thứ 16", doi: 16, gioiTinh: "Nữ" },
                            {id: "B000000000000460", name: "13.NGUYỄN THỊ ƠN Đời thứ 16", doi: 16, gioiTinh: "Nữ" },
                            {id: "B000000000000461", name: "13.NGUYỄN THỊ TỘ Đời thứ 16", doi: 16, gioiTinh: "Nữ" },
                            {id: "B000000000000462", name: "13.NGUYỄN THỊ THỦY Đời thứ 16", doi: 16, gioiTinh: "Nữ" },
                            {id: "B000000000000463", name: "13.NGUYỄN THỊ VIÊN Đời thứ 16", doi: 16, gioiTinh: "Nữ" },
                            {id: "B000000000000464", name: "16.NGUYỄN MINH TRÍ Đời thứ 19", doi: 19, gioiTinh: "Nam" },
                            {id: "B000000000000466", name: "14.NGUYỄN PHÚC BẢO Đời thứ 17", doi: 17, gioiTinh: "Nam" },
                            {id: "B000000000000467", name: "14. NGUYỄN NGỌC LÊ ANH Đời thứ 17", doi: 17, gioiTinh: "Nữ" },
                            {id: "B000000000000468", name: "14.NGUYỄN TRUNG QUÂN Đời thứ 17", doi: 17, gioiTinh: "Nam" },
                            {id: "B000000000000469", name: "08.TRE Đời thứ 11", doi: 11, gioiTinh: "Nữ" },
                            {id: "B000000000000470", name: "08.CHÈ Đời thứ 11", doi: 11, gioiTinh: "Nam" },
                            {id: "B000000000000471", name: "15.KHÔI Đời thứ 18", doi: 18, gioiTinh: "Nam" },
                            {id: "B000000000000472", name: "15.QUANG Đời thứ 18", doi: 18, gioiTinh: "Nam" },
                            {id: "B000000000000473", name: "14.BÁCH Đời thứ 17", doi: 17, gioiTinh: "Nam" },
                            {id: "B000000000000474", name: "15.HƯNG Đời thứ 18", doi: 18, gioiTinh: "Nam" },
                            {id: "B000000000000475", name: "16.THÀNH Đời thứ 19", doi: 19, gioiTinh: "Nam" },
                            {id: "B000000000000476", name: "16.DŨNG Đời thứ 19", doi: 19, gioiTinh: "Nam" },
                            {id: "B000000000000477", name: "15.BẢO NGỌC Đời thứ 18", doi: 18, gioiTinh: "Nam" },
                            {id: "B000000000000478", name: "15.MẠNH TRƯỜNG Đời thứ 18", doi: 18, gioiTinh: "Nam" }
                            ];
                            function handleKeyPress(e) {
            if (e.keyCode === 13) {
                                searchThanhVien();
            }
        }
                            function searchThanhVien() {
            const keyword = document.getElementById('searchInput').value.toLowerCase().trim();
                            const resultList = document.getElementById('resultList');

                            resultList.innerHTML = '';

                            if (keyword === '') {
                return;
            }

            // Dò tìm không phân biệt hoa/thường và có dấu
            const matches = dataGiaPha.filter(item => item.name.toLowerCase().includes(keyword));

                            if (matches.length === 0) {
                                resultList.innerHTML = '<li class="empty-msg">Không tìm thấy thành viên. Vui lòng thử lại.</li>';
                            return;
            }

            matches.forEach(item => {
                const li = document.createElement('li');
                            li.innerHTML = `
                            <span>${item.name} (Đời thứ ${item.doi})</span>
                            <button class="view-btn" onclick="moHoSo('${item.id}')">Xem chi tiết</button>
                            `;
                            resultList.appendChild(li);
            });
        }

                            function moHoSo(maThanhVien) {
                                // Tùy chọn 1: Sử dụng đường dẫn tương đối khi chạy trên máy tính hoặc cùng thư mục
                                // let url = `CHITIET/${maThanhVien}.htm`;

                                // Tùy chọn 2: Sử dụng đường dẫn tuyệt đối khi deploy trên GitHub Pages (Khuyên dùng)
                                let url = `https://halumglass.github.io/giapha/ChiTiet/${maThanhVien}.htm`;

                            // Mở liên kết trong một tab mới
                            window.open(url, '_blank');
        }
                        </script>
                    </body>
                </html>

