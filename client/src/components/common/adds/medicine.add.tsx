import { useState, type FormEvent } from "react";
import useCallApi from "../../../hooks/useCallApi";
import type { MedicineCategoryResponse } from "../../../responses/medicine-category.response";
import { formatPriceVND } from "../../../utils/format-number.util";
import { createMedicine } from "../../../services/medicine.service";

type AddMedicineModalProps = {
    categories: MedicineCategoryResponse[],
    onClose: () => void,
    onSuccess?: () => void
}

const AddMedicine = (props: AddMedicineModalProps) => {
    const { onClose, onSuccess, categories } = props;

    const { execute, notify, loading } = useCallApi();

    const [submitData, setSubmitData] = useState({
        name: "",
        description: "",
        unit: "",
        price: "",
        manufacturer: "",
        minStock: "",
        maxStock: "",
        categoryId: ""
    });

    const handleSubmitChange = (field: keyof typeof submitData, value: string) => {
        setSubmitData(prev => ({ ...prev, [field]: value }));
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault()
        const restResponse = await execute(createMedicine(submitData));
        notify(restResponse!, "Thêm thuốc thành công");
        if (restResponse?.result) {
            onSuccess?.();
            handleClose();
        }
    };

    const handleClose = () => {
        setSubmitData({
            name: "",
            description: "",
            unit: "",
            price: "",
            manufacturer: "",
            minStock: "",
            maxStock: "",
            categoryId: ""
        });
        onClose();
    };

    return (
        <div className="fixed top-0 left-0 bg-gray-400/60 w-full h-full z-50 flex justify-center items-center">
            <div className="bg-white px-8 py-6 rounded-lg shadow-lg w-full max-w-2xl mx-4 max-h-[90vh] overflow-y-auto">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-bold text-gray-800">Thêm thuốc mới</h2>
                    <button
                        onClick={handleClose}
                        className="text-gray-500 hover:text-gray-700 text-xl font-bold"
                        disabled={loading}
                    >
                        x
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Tên thuốc 
                            </label>
                            <input
                                type="text"
                                value={submitData.name}
                                onChange={(e) => handleSubmitChange("name", e.target.value)}
                                className="w-full border rounded-md py-2 px-3 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 border-gray-300 transition-colors"
                                placeholder="Nhập tên thuốc"
                                disabled={loading}
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Đơn vị tính 
                            </label>
                            <input
                                type="text"
                                value={submitData.unit}
                                onChange={(e) => handleSubmitChange("unit", e.target.value)}
                                className="w-full border rounded-md py-2 px-3 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 border-gray-300 transition-colors"
                                placeholder="VD: viên, ml, gói"
                                disabled={loading}
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Giá bán (VNĐ) 
                            </label>
                            <input
                                type="number"
                                value={submitData.price}
                                onChange={(e) => handleSubmitChange("price", e.target.value)}
                                className="w-full border rounded-md py-2 px-3 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 border-gray-300 transition-colors"
                                placeholder="Nhập giá bán"
                                min="0"
                                step="0.01"
                                disabled={loading}
                            />
                            <div className="text-xs text-gray-500 mt-1">
                                {Number(submitData.price) > 0 && `≈ ${formatPriceVND(Number(submitData.price))}`}
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Nhà sản xuất
                            </label>
                            <input
                                type="text"
                                value={submitData.manufacturer}
                                onChange={(e) => handleSubmitChange("manufacturer", e.target.value)}
                                className="w-full border border-gray-300 rounded-md py-2 px-3 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                                placeholder="Nhập nhà sản xuất (tùy chọn)"
                                disabled={loading}
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Loại thuốc 
                            </label>
                            <select
                                value={submitData.categoryId}
                                onChange={(e) => handleSubmitChange("categoryId", e.target.value)}
                                className="w-full border rounded-md py-2 px-3 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 border-gray-300 transition-colors"
                                disabled={loading}
                            >
                                <option value="">Chọn loại thuốc</option>
                                {categories.map((category) => (
                                    <option key={category.id} value={category.id}>
                                        {category.name}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Tồn kho tối thiểu 
                            </label>
                            <input
                                type="number"
                                value={submitData.minStock}
                                onChange={(e) => handleSubmitChange("minStock", e.target.value)}
                                className="w-full border rounded-md py-2 px-3 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 border-gray-300 transition-colors"
                                placeholder="Nhập số lượng tối thiểu"
                                min="0"
                                disabled={loading}
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Tồn kho tối đa 
                            </label>
                            <input
                                type="number"
                                value={submitData.maxStock}
                                onChange={(e) => handleSubmitChange("maxStock", e.target.value)}
                                className="w-full border rounded-md py-2 px-3 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 border-gray-300 transition-colors"
                                placeholder="Nhập số lượng tối đa"
                                min="0"
                                disabled={loading}
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Mô tả
                        </label>
                        <textarea
                            value={submitData.description}
                            onChange={(e) => handleSubmitChange("description", e.target.value)}
                            className="w-full border border-gray-300 rounded-md py-2 px-3 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                            placeholder="Nhập mô tả thuốc (tùy chọn)"
                            rows={3}
                            disabled={loading}
                        />
                    </div>

                    <div className="flex justify-end space-x-3">
                        <button
                            type="button"
                            onClick={handleClose}
                            className="flex-1 px-4 py-2 text-gray-600 border border-gray-300 rounded-md hover:bg-gray-50 transition"
                            disabled={loading}
                        >
                            Hủy
                        </button>
                        <button
                            type="submit"
                            className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition disabled:opacity-50"
                            onClick={handleSubmit}
                            disabled={loading}
                        >
                            {loading ? "Đang thêm..." : "Thêm thuốc"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddMedicine;
