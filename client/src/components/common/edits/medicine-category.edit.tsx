import { useEffect, useState } from "react";
import useCallApi from "../../../hooks/useCallApi";
import type { MedicineCategoryResponse } from "../../../responses/medicine-category.response";
import { updateMedicineCategory } from "../../../services/medicine.service";

type EditMedicineCategory = {
    medicineCategorySelect: MedicineCategoryResponse;
    setShowEdit: (showEdit: boolean) => void;
    onSuccess?: () => void;
}

const EditMedicineCategory = (props: EditMedicineCategory) => {
    const { medicineCategorySelect, setShowEdit, onSuccess } = props;
    const { execute, notify, loading } = useCallApi();

    const [submitData, setSubmitData] = useState({
        name: "",
        description: ""
    });

    const handleChangeSubmit = (field: keyof typeof submitData, value: string) => {
        setSubmitData(prev => ({ ...prev, [field]: value }));
    };

    useEffect(() => {
        setSubmitData({
            name: medicineCategorySelect.name || "",
            description: medicineCategorySelect.description || ""
        });
    }, [medicineCategorySelect]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const restResponse = await execute(updateMedicineCategory(medicineCategorySelect.id, submitData.name, submitData.description));
        notify(restResponse!, "Cập nhật loại thuốc thành công");
        if (restResponse?.result) {
            onSuccess?.();
            setShowEdit(false);
        }
    };

    return (
        <div className="fixed top-0 start-0 bg-gray-400/60 w-full h-full z-10 flex justify-center items-center">
            <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-bold text-gray-800">Sửa loại thuốc - # {medicineCategorySelect.id}</h2>
                    <button
                        onClick={() => setShowEdit(false)}
                        className="text-gray-500 hover:text-gray-700 text-xl"
                    >
                        x
                    </button>
                </div>
                
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Tên loại thuốc *
                        </label>
                        <input
                            type="text"
                            required
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            value={submitData.name}
                            placeholder="Nhập tên loại thuốc"
                            onChange={(e) => handleChangeSubmit("name", e.target.value)}
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Mô tả
                        </label>
                        <textarea
                            rows={3}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                            value={submitData.description}
                            placeholder="Mô tả về loại thuốc"
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

export default EditMedicineCategory;
