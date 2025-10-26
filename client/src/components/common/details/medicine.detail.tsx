import type { MedicineResponse } from "../../../responses/medicine.response";
import { formatPriceVND } from "../../../utils/formatNumber.util";

type MedicineDetail = {
    medicineSelect: MedicineResponse,
    setShowDetail: (showDetail: boolean) => void
}

const MedicineDetail = (props: MedicineDetail) => {
    const { medicineSelect, setShowDetail } = props;

    const getStatusColor = (status: string) => {
        return status === 'ACTIVE' ? 'text-green-800' : 'text-red-800';
    }

    const getStatusText = (status: string) => {
        return status === 'ACTIVE' ? 'Đang kinh doanh' : 'Ngừng kinh doanh';
    }

    const getStockStatus = (current: number, min: number, max: number) => {
        if (current <= min) return { color: 'text-red-600', text: 'Thiếu hàng' };
        if (current >= max) return { color: 'text-orange-600', text: 'Tồn kho cao' };
        return { color: 'text-green-600', text: 'Bình thường' };
    }

    const stockStatus = getStockStatus(medicineSelect.currentStock, medicineSelect.minStock, medicineSelect.maxStock);

    return (
        <div className="fixed inset-0 bg-gray-500/50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-3xl mx-4 max-h-[90vh] overflow-y-auto">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                        <i className="fa-solid fa-pills text-blue-600"></i>
                        Chi tiết thuốc #{medicineSelect.id}
                    </h2>
                    <button
                        onClick={() => setShowDetail(false)}
                        className="text-gray-500 hover:text-gray-700 text-xl"
                    >
                        x
                    </button>
                </div>

                <div className="space-y-6">
                    <div className="border border-gray-200 rounded-lg p-4">
                        <h3 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
                            <i className="fa-solid fa-info-circle text-blue-600"></i>
                            Thông tin cơ bản
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-600 mb-1">Tên thuốc</label>
                                <p className="text-gray-900 font-medium">{medicineSelect.name}</p>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-600 mb-1">Đơn vị</label>
                                <p className="text-gray-900">{medicineSelect.unit}</p>
                            </div>
                            <div className="text-left">
                                <label className="block text-sm font-medium text-gray-600 mb-1">Trạng thái</label>
                                <p className={`font-bold ${getStatusColor(medicineSelect.status)}`}>{getStatusText(medicineSelect.status)}</p>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-600 mb-1">Nhà sản xuất</label>
                                <p className="text-gray-900">{medicineSelect.manufacturer}</p>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-600 mb-1">Loại thuốc</label>
                                <p className="text-gray-900">{medicineSelect.categoryName}</p>
                            </div>
                        </div>
                    </div>

                    <div className="border border-gray-200 rounded-lg p-4">
                        <h3 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
                            <i className="fa-solid fa-dollar-sign text-green-600"></i>
                            Thông tin giá
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-600 mb-1">Giá bán</label>
                                <p className="font-semibold text-lg text-green-600">
                                    {formatPriceVND(medicineSelect.price)}
                                </p>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-600 mb-1">Giá nhập</label>
                                <p className="font-semibold text-lg text-blue-600">
                                    Chưa cập nhật
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="border border-gray-200 rounded-lg p-4">
                        <h3 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
                            <i className="fa-solid fa-warehouse text-orange-600"></i>
                            Thông tin tồn kho
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-600 mb-1">Tồn kho hiện tại</label>
                                <p className={`font-semibold text-lg ${stockStatus.color}`}>
                                    {medicineSelect.currentStock} {medicineSelect.unit}
                                </p>
                                <p className={`text-sm ${stockStatus.color}`}>{stockStatus.text}</p>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-600 mb-1">Tồn kho tối thiểu</label>
                                <p className="text-gray-900 font-medium">
                                    {medicineSelect.minStock} {medicineSelect.unit}
                                </p>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-600 mb-1">Tồn kho tối đa</label>
                                <p className="text-gray-900 font-medium">
                                    {medicineSelect.maxStock} {medicineSelect.unit}
                                </p>
                            </div>
                        </div>
                    </div>

                    {medicineSelect.description && (
                        <div className="border border-gray-200 rounded-lg p-4">
                            <h3 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
                                <i className="fa-solid fa-file-text text-purple-600"></i>
                                Mô tả
                            </h3>
                            <div className="text-gray-900 whitespace-pre-wrap">
                                {medicineSelect.description}
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
        </div >
    )
}

export default MedicineDetail;
