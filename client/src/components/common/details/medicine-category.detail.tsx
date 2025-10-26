import type { MedicineCategoryResponse } from "../../../responses/medicine-category.response";

type MedicineCategoryDetail = {
    medicineCategorySelect: MedicineCategoryResponse,
    setShowDetail: (showDetail: boolean) => void
}

const MedicineCategoryDetail = (props: MedicineCategoryDetail) => {
    const { medicineCategorySelect, setShowDetail } = props;

    return (
        <div className="fixed inset-0 bg-gray-500/50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-2xl mx-4 max-h-[90vh] overflow-y-auto">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                        <i className="fa-solid fa-tags text-blue-600"></i>
                        Chi tiết loại thuốc #{medicineCategorySelect.id}
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
                            <div>
                                <label className="block text-sm font-medium text-gray-600 mb-1">Tên loại thuốc</label>
                                <p className="text-gray-900 font-medium">{medicineCategorySelect.name}</p>
                            </div>
                        </div>
                    </div>

                    <div className="border border-gray-200 rounded-lg p-4">
                        <h3 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
                            <i className="fa-solid fa-chart-bar text-green-600"></i>
                            Thống kê
                        </h3>
                        <div className="grid grid-cols-1 gap-4">
                            <div className="bg-blue-50 p-4 rounded-lg">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm font-medium text-gray-600">Số lượng thuốc</p>
                                        <p className="text-2xl font-bold text-blue-600">
                                            {medicineCategorySelect.medicineCount}
                                        </p>
                                    </div>
                                    <div className="text-blue-600">
                                        <i className="fa-solid fa-pills text-2xl"></i>
                                    </div>
                                </div>
                                <p className="text-sm text-gray-500 mt-1">
                                    thuốc thuộc loại này
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="border border-gray-200 rounded-lg p-4">
                        <h3 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
                            <i className="fa-solid fa-file-text text-purple-600"></i>
                            Mô tả
                        </h3>
                        <div className="text-gray-900 whitespace-pre-wrap">
                            {medicineCategorySelect.description || "Chưa có mô tả"}
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

export default MedicineCategoryDetail;
