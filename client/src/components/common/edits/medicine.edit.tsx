import { useEffect, useState } from "react";
import { medicineStatus } from "../../../constants/medicine.constant";
import useCallApi from "../../../hooks/useCallApi";
import type { MedicineResponse } from "../../../responses/medicine.response";
import type { MedicineCategoryResponse } from "../../../responses/medicine-category.response";
import { updateMedicine } from "../../../services/medicine.service";

type EditMedicine = {
    medicineSelect: MedicineResponse;
    categories: MedicineCategoryResponse[];
    setShowEdit: (showEdit: boolean) => void;
    onSuccess?: () => void;
}

const EditMedicine = (props: EditMedicine) => {
    const { medicineSelect, categories, setShowEdit, onSuccess } = props;
    const { execute, notify, loading } = useCallApi();

    console.log("Medicine to edit:", medicineSelect);

    const [submitData, setSubmitData] = useState({
        name: "",
        description: "",
        unit: "",
        price: "",
        minStock: "",
        maxStock: "",
        manufacturer: "",
        categoryId: "",
        status: ""
    });

    const handleChangeSubmit = (field: keyof typeof submitData, value: string) => {
        setSubmitData(prev => ({ ...prev, [field]: value }));
    };

    useEffect(() => {
        setSubmitData({
            name: medicineSelect.name || "",
            description: medicineSelect.description || "",
            unit: medicineSelect.unit || "",
            price: medicineSelect.price ? medicineSelect.price.toString() : "",
            minStock: medicineSelect.minStock ? medicineSelect.minStock.toString() : "",
            maxStock: medicineSelect.maxStock ? medicineSelect.maxStock.toString() : "",
            manufacturer: medicineSelect.manufacturer || "",
            categoryId: medicineSelect.categoryId ? medicineSelect.categoryId.toString() : "",
            status: medicineSelect.status || ""
        });
    }, [medicineSelect]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        const restResponse = await execute(updateMedicine(medicineSelect.id, {
            name: submitData.name,
            description: submitData.description,
            unit: submitData.unit,
            price: Number(submitData.price),
            manufacturer: submitData.manufacturer,
            status: submitData.status,
            minStock: Number(submitData.minStock),
            maxStock: Number(submitData.maxStock),
            categoryId: Number(submitData.categoryId)
        }));
        notify(restResponse!, "Cập nhật thuốc thành công");
        if (restResponse?.result) {
            onSuccess?.();
            setShowEdit(false);
        }
    };

    return (
        <div className="fixed top-0 start-0 bg-gray-400/60 w-full h-full z-10 flex justify-center items-center">
            <div className="bg-white rounded-lg p-6 w-full max-w-4xl mx-4 max-h-[90vh] overflow-y-auto">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-bold text-gray-800">Sửa thông tin thuốc - # {medicineSelect.id}</h2>
                    <button
                        onClick={() => setShowEdit(false)}
                        className="text-gray-500 hover:text-gray-700 text-xl"
                    >
                        x
                    </button>
                </div>
                
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Tên thuốc 
                            </label>
                            <input
                                type="text"
                                
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                value={submitData.name}
                                placeholder="Nhập tên thuốc"
                                onChange={(e) => handleChangeSubmit("name", e.target.value)}
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Loại thuốc 
                            </label>
                            <select
                                
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                value={submitData.categoryId}
                                onChange={(e) => handleChangeSubmit("categoryId", e.target.value)}
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
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Đơn vị 
                            </label>
                            <input
                                type="text"
                                
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                value={submitData.unit}
                                placeholder="Viên, chai, hộp..."
                                onChange={(e) => handleChangeSubmit("unit", e.target.value)}
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Trạng thái 
                            </label>
                            <select
                                
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                value={submitData.status}
                                onChange={(e) => handleChangeSubmit("status", e.target.value)}
                            >
                                <option value="">Chọn trạng thái</option>
                                {medicineStatus.map((status) => (
                                    <option key={status.id} value={status.value}>
                                        {status.name}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Giá bán (VND) 
                            </label>
                            <input
                                type="number"
                                
                                min="0"
                                step="1000"
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                value={submitData.price}
                                placeholder="Giá bán"
                                onChange={(e) => handleChangeSubmit("price", e.target.value)}
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Tồn kho tối thiểu 
                            </label>
                            <input
                                type="number"
                                
                                min="0"
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                value={submitData.minStock}
                                placeholder="Số lượng tối thiểu"
                                onChange={(e) => handleChangeSubmit("minStock", e.target.value)}
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Tồn kho tối đa 
                            </label>
                            <input
                                type="number"
                                
                                min="0"
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                value={submitData.maxStock}
                                placeholder="Số lượng tối đa"
                                onChange={(e) => handleChangeSubmit("maxStock", e.target.value)}
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Nhà sản xuất
                            </label>
                            <input
                                type="text"
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                value={submitData.manufacturer}
                                placeholder="Tên nhà sản xuất"
                                onChange={(e) => handleChangeSubmit("manufacturer", e.target.value)}
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Mô tả
                        </label>
                        <textarea
                            rows={3}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                            value={submitData.description}
                            placeholder="Mô tả về thuốc"
                            onChange={(e) => handleChangeSubmit("description", e.target.value)}
                        />
                    </div>

                    <div className="flex gap-3 pt-4">
                        <button
                            type="button"
                            className="flex-1 px-4 py-2 text-gray-600 border border-gray-300 rounded-md hover:bg-gray-50 transition"
                            onClick={() => setShowEdit(false)}
                        >
                            Hủy
                        </button>
                        <button
                            type="submit"
                            className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition disabled:opacity-50"
                            disabled={loading}
                        >
                            {loading ? "Đang cập nhật..." : "Lưu thay đổi"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditMedicine;
