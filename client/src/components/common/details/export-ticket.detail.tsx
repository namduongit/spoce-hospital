import type { ExportTicketResponse } from "../../../responses/export-ticket.response";
import { formatDateToHourAndDay } from "../../../utils/formatDate.util";

type ExportTicketDetail = {
    exportTicketSelect: ExportTicketResponse,
    setShowDetail: (showDetail: boolean) => void
}

const ExportTicketDetail = (props: ExportTicketDetail) => {
    const { exportTicketSelect, setShowDetail } = props;

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'PENDING': return 'bg-yellow-100 text-yellow-800';
            case 'COMPLETED': return 'bg-green-100 text-green-800';
            case 'CANCELLED': return 'bg-red-100 text-red-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    }

    const getStatusText = (status: string) => {
        switch (status) {
            case 'PENDING': return 'Đang chờ';
            case 'COMPLETED': return 'Hoàn thành';
            case 'CANCELLED': return 'Đã hủy';
            default: return status;
        }
    }

    const totalItems = exportTicketSelect.items?.reduce((sum, item) => sum + item.quantity, 0) || 0;

    return (
        <div className="fixed inset-0 bg-gray-500/50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-4xl mx-4 max-h-[90vh] overflow-y-auto">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                        <i className="fa-solid fa-arrow-up-from-bracket text-red-600"></i>
                        Chi tiết phiếu xuất #{exportTicketSelect.id}
                    </h2>
                    <button
                        onClick={() => setShowDetail(false)}
                        className="text-gray-500 hover:text-gray-700 text-xl"
                    >
                        x
                    </button>
                </div>

                <div className="space-y-6">
                    <div className="text-center">
                        <span className={`px-4 py-2 rounded-full text-sm font-medium ${getStatusColor(exportTicketSelect.status)}`}>
                            {getStatusText(exportTicketSelect.status)}
                        </span>
                    </div>

                    <div className="border border-gray-200 rounded-lg p-4">
                        <h3 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
                            <i className="fa-solid fa-info-circle text-blue-600"></i>
                            Thông tin phiếu xuất
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-600 mb-1">Người thực hiện</label>
                                <p className="text-gray-900">{exportTicketSelect.performedBy}</p>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-600 mb-1">Thời gian tạo</label>
                                <p className="text-gray-900">{formatDateToHourAndDay(new Date(exportTicketSelect.createdAt))}</p>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-600 mb-1">Thời gian cập nhật</label>
                                <p className="text-gray-900">{formatDateToHourAndDay(new Date(exportTicketSelect.updatedAt))}</p>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-600 mb-1">Tổng số mặt hàng</label>
                                <p className="text-gray-900 font-semibold">{totalItems} sản phẩm</p>
                            </div>
                        </div>
                    </div>

                    <div className="border border-gray-200 rounded-lg p-4">
                        <h3 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
                            <i className="fa-solid fa-file-text text-green-600"></i>
                            Lý do xuất
                        </h3>
                        <p className="text-gray-900">{exportTicketSelect.reason}</p>
                    </div>
                    
                    {exportTicketSelect.items && exportTicketSelect.items.length > 0 && (
                        <div className="border border-gray-200 rounded-lg p-4">
                            <h3 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
                                <i className="fa-solid fa-pills text-purple-600"></i>
                                Danh sách thuốc xuất ({exportTicketSelect.items.length})
                            </h3>
                            <div className="overflow-x-auto">
                                <table className="w-full text-sm">
                                    <thead>
                                        <tr className="bg-gray-50 border-b">
                                            <th className="text-left py-3 px-4 font-medium text-gray-600">STT</th>
                                            <th className="text-left py-3 px-4 font-medium text-gray-600">Tên thuốc</th>
                                            <th className="text-center py-3 px-4 font-medium text-gray-600">Số lượng</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {exportTicketSelect.items.map((item, index) => (
                                            <tr key={item.id} className="border-b hover:bg-gray-50">
                                                <td className="py-3 px-4">{index + 1}</td>
                                                <td className="py-3 px-4 font-medium">{item.medicineName}</td>
                                                <td className="py-3 px-4 text-center font-semibold">{item.quantity}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )}
                </div>

                <div className="flex justify-end mt-6">
                    <button
                        onClick={() => setShowDetail(false)}
                        className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition"
                    >
                        Đóng
                    </button>
                </div>
            </div>
        </div>
    )
}

export default ExportTicketDetail;
