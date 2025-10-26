import { useState } from "react";

import useCallApi from "../../../hooks/useCallApi";
import { createMedicalPackage } from "../../../services/medical-package.service";
import { medicalPackageStatus } from "../../../constants/status.constant";
import { formatPriceVND } from "../../../utils/formatNumber.util";


type AddMedicalPackageProps = {
    setIsOpenCreateMedicalPackage: (isOpenCreateMedicalPackage: boolean) => void,
    onSuccess?: () => void
}

const AddMedicalPackage = (props: AddMedicalPackageProps) => {
    const { setIsOpenCreateMedicalPackage, onSuccess } = props;

    const { execute, notify, loading } = useCallApi();

    const [submitData, setSubmitData] = useState({
        name: "",
        description: "",
        status: "",
        price: ""
    });

    const handleChangeSubmit = (field: keyof typeof submitData, value: string) => {
        setSubmitData(prev => ({ ...prev, [field]: value }));
    }

    const handleClose = () => {
        setSubmitData({ name: "", description: "", status: "", price: "" });
        setIsOpenCreateMedicalPackage(false);
    };

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        const restResponse = await execute(createMedicalPackage(submitData));
        notify(restResponse!, "Tạo gói dịch vụ thành công");
        if (restResponse?.result) {
            handleClose();
            onSuccess?.();
        }
    }

    return (
        <div className="fixed inset-0 bg-gray-500/50 bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-bold text-gray-800">Tạo gói dịch vụ mới</h2>
                    <button
                        onClick={handleClose}
                        className="text-gray-500 hover:text-gray-700 text-xl"
                    >
                        x
                    </button>
                </div>
                <form className="space-y-4" onSubmit={handleSubmit}>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Tên gói dịch vụ
                        </label>
                        <div className="relative">
                            <input
                                type="text"
                                name="name"
                                value={submitData.name}
                                onChange={(e) => handleChangeSubmit("name", e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="Nhập tên gói dịch vụ"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Giá tiền
                        </label>
                        <div className="relative">
                            <input
                                type="number"
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
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Mô tả
                        </label>
                        <div className="relative">
                            <textarea
                                rows={3}
                                value={submitData.description}
                                onChange={(e) => handleChangeSubmit("description", e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="Nhập mô tả"
                            ></textarea>
                        </div>
                    </div>


                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Trạng thái
                        </label>
                        <select
                            value={submitData.status}
                            onChange={(e) => handleChangeSubmit("status", e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            <option value="">Chọn trạng thái</option>
                            {medicalPackageStatus.map(status => (
                                <option key={status.id} value={status.value}>{status.name}</option>
                            ))}
                        </select>
                    </div>

                    <div className="flex gap-3 pt-4">
                        <button
                            type="button"
                            onClick={handleClose}
                            className="flex-1 px-4 py-2 text-gray-600 border border-gray-300 rounded-md hover:bg-gray-50 transition"
                        >
                            Đóng
                        </button>
                        <button
                            type="submit"
                            disabled={loading}
                            className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition disabled:opacity-50"
                        >
                            {loading ? "Đang thêm..." : "Thêm gói dịch vụ"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
};

export default AddMedicalPackage;