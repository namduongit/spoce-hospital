// PDF utility for generating tickets
export type TicketData = {
    id: number;
    type: 'import' | 'export';
    performedBy: string;
    createdAt: string;
    reason: string;
    supplierName?: string;
    items: Array<{
        medicineId: number;
        medicineName: string;
        quantity: number;
        unitPrice?: number;
    }>;
    status: string;
};

export const generateTicketPDF = (data: TicketData) => {
    // Tạo nội dung HTML cho phiếu
    const content = `
        <!DOCTYPE html>
        <html lang="vi">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Phiếu ${data.type === 'import' ? 'Nhập' : 'Xuất'} #${data.id}</title>
            <style>
                body {
                    font-family: Arial, sans-serif;
                    margin: 0;
                    padding: 20px;
                    color: #333;
                }
                .header {
                    text-align: center;
                    margin-bottom: 30px;
                    border-bottom: 2px solid #333;
                    padding-bottom: 20px;
                }
                .title {
                    font-size: 24px;
                    font-weight: bold;
                    margin-bottom: 10px;
                }
                .info-grid {
                    display: grid;
                    grid-template-columns: 1fr 1fr;
                    gap: 20px;
                    margin-bottom: 30px;
                }
                .info-item {
                    margin-bottom: 10px;
                }
                .label {
                    font-weight: bold;
                    color: #666;
                }
                table {
                    width: 100%;
                    border-collapse: collapse;
                    margin-bottom: 20px;
                }
                th, td {
                    border: 1px solid #ddd;
                    padding: 8px;
                    text-align: left;
                }
                th {
                    background-color: #f5f5f5;
                    font-weight: bold;
                }
                .total-row {
                    background-color: #f9f9f9;
                    font-weight: bold;
                }
                .footer {
                    margin-top: 40px;
                    text-align: center;
                    color: #666;
                    font-size: 12px;
                }
                @media print {
                    body { margin: 0; }
                    .no-print { display: none; }
                }
            </style>
        </head>
        <body>
            <div class="header">
                <div class="title">PHIẾU ${data.type === 'import' ? 'NHẬP' : 'XUẤT'} KHO</div>
                <div>Số phiếu: #${data.id}</div>
            </div>

            <div class="info-grid">
                <div>
                    <div class="info-item">
                        <span class="label">Người thực hiện:</span> ${data.performedBy}
                    </div>
                    <div class="info-item">
                        <span class="label">Ngày tạo:</span> ${new Date(data.createdAt).toLocaleString('vi-VN')}
                    </div>
                    <div class="info-item">
                        <span class="label">Trạng thái:</span> ${getStatusText(data.status)}
                    </div>
                </div>
                <div>
                    ${data.supplierName ? `
                        <div class="info-item">
                            <span class="label">Nhà cung cấp:</span> ${data.supplierName}
                        </div>
                    ` : ''}
                    <div class="info-item">
                        <span class="label">Lý do:</span> ${data.reason}
                    </div>
                </div>
            </div>

            <table>
                <thead>
                    <tr>
                        <th>STT</th>
                        <th>Mã thuốc</th>
                        <th>Tên thuốc</th>
                        <th>Số lượng</th>
                        ${data.type === 'import' ? '<th>Đơn giá</th><th>Thành tiền</th>' : ''}
                    </tr>
                </thead>
                <tbody>
                    ${data.items.map((item, index) => `
                        <tr>
                            <td>${index + 1}</td>
                            <td>${item.medicineId}</td>
                            <td>${item.medicineName}</td>
                            <td>${item.quantity.toLocaleString()}</td>
                            ${data.type === 'import' && item.unitPrice ? `
                                <td>${item.unitPrice.toLocaleString()} VNĐ</td>
                                <td>${(item.quantity * item.unitPrice).toLocaleString()} VNĐ</td>
                            ` : ''}
                        </tr>
                    `).join('')}
                    ${data.type === 'import' ? `
                        <tr class="total-row">
                            <td colspan="5" style="text-align: right;">Tổng cộng:</td>
                            <td>${data.items.reduce((sum, item) => sum + (item.quantity * (item.unitPrice || 0)), 0).toLocaleString()} VNĐ</td>
                        </tr>
                    ` : ''}
                </tbody>
            </table>

            <div class="footer">
                <p>Phiếu được tạo tự động từ hệ thống quản lý bệnh viện</p>
                <p>In lúc: ${new Date().toLocaleString('vi-VN')}</p>
            </div>
        </body>
        </html>
    `;

    // Tạo và mở cửa sổ in
    const printWindow = window.open('', '_blank');
    if (printWindow) {
        printWindow.document.write(content);
        printWindow.document.close();
        printWindow.focus();
        
        // Đợi nội dung load xong rồi mới in
        printWindow.onload = () => {
            printWindow.print();
        };
    } else {
        alert('Không thể mở cửa sổ in. Vui lòng kiểm tra cài đặt popup blocker.');
    }
};

const getStatusText = (status: string): string => {
    switch (status) {
        case 'COMPLETED': return 'Hoàn thành';
        case 'PENDING': return 'Chờ xử lý';
        case 'CANCELLED': return 'Đã hủy';
        default: return status;
    }
};
