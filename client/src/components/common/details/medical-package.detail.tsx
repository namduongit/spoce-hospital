import type { MedicalPackageResponse } from "../../../responses/medical-package.response";
import { formatPriceVND } from "../../../utils/format-number.util";

type MedicalPackageDetail = {
    medicalPackageSelect: MedicalPackageResponse,
    setShowDetail: (showDetail: boolean) => void
}

const MedicalPackageDetail = (props: MedicalPackageDetail) => {
    const { medicalPackageSelect, setShowDetail } = props;

    const getStatusColor = (status: string) => {
        return status === 'ACTIVE' ? 'text-green-800' : 'text-red-800';
    }

    const getStatusText = (status: string) => {
        return status === 'ACTIVE' ? 'Hoạt động' : 'Dừng hoạt động';
    }

    return (
        <div className="fixed inset-0 bg-gray-500/50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-2xl mx-4 max-h-[90vh] overflow-y-auto">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                        <i className="fa-solid fa-box-open text-blue-600"></i>
                        Chi tiết gói dịch vụ #{medicalPackageSelect.id}
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
                        <div className="space-y-3">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-600 mb-1">Tên gói dịch vụ</label>
                                    <p className="text-gray-900 font-medium">{medicalPackageSelect.name}</p>
                                </div>
                                <div>
                                    <div className="text-left">
                                        <label className="block text-sm font-medium text-gray-600 mb-1">Trạng thái</label>
                                        <span className={`font-bold ${getStatusColor(medicalPackageSelect.status)}`}>
                                            {getStatusText(medicalPackageSelect.status)}
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-600 mb-1">Giá gói</label>
                                <p className="font-semibold text-lg text-green-600">
                                    {formatPriceVND(medicalPackageSelect.price)}
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="border border-gray-200 rounded-lg p-4">
                        <h3 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
                            <i className="fa-solid fa-file-text text-green-600"></i>
                            Mô tả chi tiết
                        </h3>
                        <div className="text-gray-900 whitespace-pre-wrap">
                            {medicalPackageSelect.description || "Chưa có mô tả"}
                        </div>
                    </div>
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

export default MedicalPackageDetail;
