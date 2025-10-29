import { useEffect, useState } from "react";
import useCallApi from "../../../hooks/useCallApi";
import type { MedicalPackageResponse } from "../../../responses/medical-package.response";
import { updateMedicalPackage } from "../../../services/medical-package.service";
import { formatPriceVND } from "../../../utils/format-number.util";

type EditMedicalPackage = {
    medicalPackageSelect: MedicalPackageResponse;
    setShowEdit: (edit: boolean) => void;
    onSuccess?: () => void;
}

const EditMedicalPackage = (props: EditMedicalPackage) => {
    const { medicalPackageSelect, setShowEdit, onSuccess } = props;

    const { execute, notify, loading } = useCallApi();

    const [submitData, setSubmitData] = useState({
        name: "",
        description: "",
        price: "",
        status: ""
    });

    const handleChangeSubmit = (field: keyof typeof submitData, value: string) => {
        setSubmitData(prev => ({ ...prev, [field]: value }));
    }

    const handleChange = async () => {
        const restResponse = await execute(updateMedicalPackage(medicalPackageSelect.id, submitData));
        notify(restResponse!, "Cập nhật gói khám thành công");
        if (restResponse?.result) {
            onSuccess?.();
            setShowEdit(false);
        }
    }

    useEffect(() => {
        setSubmitData({
            name: medicalPackageSelect.name || "",
            description: medicalPackageSelect.description || "",
            price: medicalPackageSelect.price ? medicalPackageSelect.price.toString() : "",
            status: medicalPackageSelect.status || ""
        });
    }, [medicalPackageSelect]);

    return (
        <div className="fixed top-0 start-0 w-full h-full bg-gray-400/60 flex items-center justify-center z-20">
            <div className="bg-white w-full max-w-md rounded-lg shadow-lg p-6 space-y-4">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-bold text-gray-800">Sửa gói khám - # {medicalPackageSelect.id}</h2>
                    <button
                        onClick={() => setShowEdit(false)}
                        className="text-gray-500 hover:text-gray-700 text-xl"
                    >
                        x
                    </button>
                </div>

                <div>
                    <label className="block text-gray-700 font-medium mb-2">Tên gói khám *</label>
                    <input 
                        type="text" 
                        required
                        value={submitData.name}
                        placeholder="Nhập tên gói khám"
                        onChange={(e) => handleChangeSubmit("name", e.target.value)}
                        className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" 
                    />
                </div>

                <div>
                    <label className="block text-gray-700 font-medium mb-2">Mô tả</label>
                    <textarea 
                        rows={3}
                        value={submitData.description}
                        placeholder="Nhập mô tả gói khám"
                        onChange={(e) => handleChangeSubmit("description", e.target.value)}
                        className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none" 
                    />
                </div>

                <div>
                    <label className="block text-gray-700 font-medium mb-2">Giá tiền (VND) *</label>
                    <div className="relative">
                        <input 
                            type="number" 
                            required
                            min="0"
                            step="1000"
                            value={submitData.price}
                            placeholder="Nhập giá tiền"
                            onChange={(e) => handleChangeSubmit("price", e.target.value)}
                            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" 
                        />
                        <div className="text-xs text-gray-500 mt-1">
                            {Number(submitData.price) > 0 && `≈ ${formatPriceVND(Number(submitData.price))}`}
                        </div>
                    </div>
                </div>

                <div>
                    <label className="block text-gray-700 font-medium mb-2">Trạng thái *</label>
                    <select
                        value={submitData.status} 
                        required
                        onChange={(e) => handleChangeSubmit("status", e.target.value)}
                        className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        <option value="">Chọn trạng thái</option>
                        <option value="ACTIVE">Hoạt động</option>
                        <option value="INACTIVE">Dừng hoạt động</option>
                    </select>
                </div>

                <div className="flex justify-end gap-3 pt-4">
                    <button 
                        className="flex-1 px-4 py-2 text-gray-600 border border-gray-300 rounded-md hover:bg-gray-50 transition"
                        onClick={() => setShowEdit(false)}
                        disabled={loading}
                    >
                        Hủy
                    </button>
                    <button 
                        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 flex-1 transition"
                        onClick={handleChange}
                        disabled={loading || !submitData.name || !submitData.status || Number(submitData.price) <= 0}
                    >
                        {loading ? 'Đang xử lý...' : 'Cập nhật'}
                    </button>
                </div>
            </div>
        </div>
    )
}

export default EditMedicalPackage;
