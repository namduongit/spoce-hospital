import { useState } from "react";
import useCallApi from "../../../hooks/useCallApi";
import { createMedicineCategory } from "../../../services/medicine.service";

type AddMedicineCategoryProps = {
    onClose: () => void;
    onSuccess?: () => void;
}

const AddMedicineCategory = (props: AddMedicineCategoryProps) => {
    const { onClose, onSuccess } = props;

    const { execute, notify, loading } = useCallApi();

    const [submitData, setSubmitData] = useState({
        name: "",
        description: ""
    });

    const handleInputChange = (field: keyof typeof submitData, value: string) => {
        setSubmitData(prev => ({ ...prev, [field]: value }));
    };

    const handleClose = () => {
        setSubmitData({ name: "", description: "" });
        onClose();
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const restResponse = await execute(createMedicineCategory(submitData));
        notify(restResponse!, "Thêm mới loại thuốc thành công");
        if (restResponse?.result) {
            handleClose();
            onSuccess?.();
        }
    };

    return (
        <div className="fixed top-0 left-0 bg-gray-400/60 w-full h-full z-50 flex justify-center items-center">
            <div className="bg-white px-8 py-6 rounded-lg shadow-lg w-full max-w-md mx-4">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-bold text-gray-800">Thêm loại thuốc mới</h2>
                    <button
                        onClick={handleClose}
                        className="text-gray-500 hover:text-gray-700 text-xl font-bold"
                        disabled={loading}
                    >
                        x
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Tên loại thuốc
                        </label>
                        <input
                            type="text"
                            value={submitData.name}
                            onChange={(e) => handleInputChange("name", e.target.value)}
                            className="w-full border rounded-md py-2 px-3 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors border-gray-300"
                            placeholder="Nhập tên loại thuốc"
                            disabled={loading}
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Mô tả
                        </label>
                        <textarea
                            value={submitData.description}
                            onChange={(e) => handleInputChange("description", e.target.value)}
                            className="w-full border border-gray-300 rounded-md py-2 px-3 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                            placeholder="Nhập mô tả loại thuốc (tùy chọn)"
                            rows={3}
                            disabled={loading}
                        />
                    </div>

                    <div className="flex gap-3 pt-4">
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
                            disabled={loading}
                        >
                            {loading ? "Đang thêm..." : "Thêm loại thuốc"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddMedicineCategory;
