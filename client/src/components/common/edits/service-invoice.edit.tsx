import { useEffect, useState } from "react";
import { serviceInvoiceStatus } from "../../../constants/status.constant";

import type { ServiceInvoiceResponse } from "../../../responses/service-nvoice.response";
import { updateServiceInvoice } from "../../../services/service-invoice.service";

import useCallApi from "../../../hooks/useCallApi";

type EditServiceInvoiceProps = {
    serviceInvoiceSelect: ServiceInvoiceResponse,
    setShowEdit: (showEdit: boolean) => void,
    onSuccess?: () => void
}

const EditServiceInvoice = (props: EditServiceInvoiceProps) => {
    const { serviceInvoiceSelect, setShowEdit, onSuccess } = props;

    const { execute, notify, loading } = useCallApi();

    const [isCompleted, setIsCompleted] = useState<boolean>(false);

    const [submitData, setSubmitData] = useState({
        patientName: "",
        patientPhone: "",
        status: "" as 'PENDING' | 'COMPLETED' | 'CANCELLED' | ""
    });

    const handleFormChange = (field: keyof typeof submitData, value: string) => {
        setSubmitData(prev => ({ ...prev, [field]: value }));
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const updateData = {
            patientName: submitData.patientName,
            patientPhone: submitData.patientPhone,
            status: submitData.status as 'PENDING' | 'COMPLETED' | 'CANCELLED'
        };
        const restResponse = await execute(updateServiceInvoice(serviceInvoiceSelect.id, updateData));
        notify(restResponse!, "Cập nhật hóa đơn dịch vụ thành công");
        if (restResponse?.result) {
            onSuccess?.();
            setShowEdit(false);
        }
    }

    const handleClose = () => {
        setSubmitData({
            patientName: "",
            patientPhone: "",
            status: ""
        });
        setShowEdit(false);
    }

    useEffect(() => {
        setSubmitData({
            patientName: serviceInvoiceSelect.patientName,
            patientPhone: serviceInvoiceSelect.patientPhone,
            status: serviceInvoiceSelect.status as 'PENDING' | 'COMPLETED' | 'CANCELLED' | ""
        });
        setIsCompleted(serviceInvoiceSelect.status === "COMPLETED" || serviceInvoiceSelect.status === "CANCELLED");
    }, [serviceInvoiceSelect]);

    return (
        <div className="fixed top-0 start-0 bg-gray-400/60 w-full h-full z-10 flex justify-center items-center">
            <div className="bg-white rounded-lg p-6 w-full max-w-4xl mx-4 max-h-[90vh] overflow-y-auto">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                        <i className="fa-solid fa-receipt text-blue-600"></i>
                        Sửa hóa đơn dịch vụ - #{serviceInvoiceSelect.id}
                    </h2>
                    <button
                        onClick={handleClose}
                        className="text-gray-500 hover:text-gray-700 text-xl"
                    >
                        x
                    </button>
                </div>

                <form className="space-y-6" onSubmit={handleSubmit}>
                    <div className="border border-gray-200 rounded-lg p-4 bg-gray-50">
                        <h3 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
                            <i className="fa-solid fa-user-doctor text-green-600"></i>
                            Thông tin bác sĩ
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Email bác sĩ
                                </label>
                                <input
                                    type="text"
                                    className="w-full px-3 py-2 border text-gray-600 border-gray-300 bg-gray-100 rounded-md cursor-not-allowed"
                                    disabled
                                    value={serviceInvoiceSelect.doctorEmail}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Tổng tiền
                                </label>
                                <input
                                    type="text"
                                    className="w-full px-3 py-2 border text-gray-600 border-gray-300 bg-gray-100 rounded-md cursor-not-allowed font-semibold"
                                    disabled
                                    value={`${serviceInvoiceSelect.totalAmount.toLocaleString('vi-VN')} ₫`}
                                />
                            </div>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Tên bệnh nhân <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="text"
                                className={`w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500
                                    ${isCompleted ? "bg-gray-50 cursor-not-allowed" : "bg-white"}`}
                                disabled={isCompleted}
                                value={submitData.patientName}
                                onChange={(e) => handleFormChange("patientName", e.target.value)}
                                placeholder="Nhập tên bệnh nhân..."
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Số điện thoại <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="tel"
                                className={`w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500
                                    ${isCompleted ? "bg-gray-50 cursor-not-allowed" : "bg-white"}`}
                                disabled={isCompleted}
                                value={submitData.patientPhone}
                                onChange={(e) => handleFormChange("patientPhone", e.target.value)}
                                placeholder="Nhập số điện thoại..."
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Trạng thái <span className="text-red-500">*</span>
                            </label>
                            <select
                                className={`w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500
                                    ${isCompleted ? "bg-gray-50 cursor-not-allowed" : "bg-white"}`}
                                disabled={isCompleted}
                                value={submitData.status}
                                onChange={(e) => handleFormChange("status", e.target.value)}
                                required
                            >
                                <option value="">Chọn trạng thái</option>
                                {serviceInvoiceStatus.map((status) => (
                                    <option key={status.id} value={status.value}>
                                        {status.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>

                    {serviceInvoiceSelect.medicalPackages && serviceInvoiceSelect.medicalPackages.length > 0 && (
                        <div className="border border-gray-200 rounded-lg p-4 bg-gray-50">
                            <h3 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
                                <i className="fa-solid fa-hand-holding-medical text-purple-600"></i>
                                Danh sách gói dịch vụ ({serviceInvoiceSelect.medicalPackages.length})
                            </h3>
                            <div className="overflow-x-auto">
                                <table className="w-full text-sm">
                                    <thead>
                                        <tr className="bg-white border-b">
                                            <th className="text-left py-2 px-3 font-medium text-gray-600">STT</th>
                                            <th className="text-left py-2 px-3 font-medium text-gray-600">Tên gói dịch vụ</th>
                                            <th className="text-right py-2 px-3 font-medium text-gray-600">Giá</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {serviceInvoiceSelect.medicalPackages.map((packageItem, index) => (
                                            <tr key={packageItem.medicalPackageId} className="border-b bg-white">
                                                <td className="py-2 px-3">{index + 1}</td>
                                                <td className="py-2 px-3 font-medium">{packageItem.medicalPackageName}</td>
                                                <td className="py-2 px-3 text-right font-semibold text-blue-600">
                                                    {packageItem.price.toLocaleString('vi-VN')} ₫
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )}

                    {isCompleted && (
                        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                            <div className="flex items-center">
                                <i className="fa-solid fa-exclamation-triangle text-yellow-600 mr-2"></i>
                                <span className="text-yellow-800 font-medium">
                                    Hóa đơn đã hoàn thành hoặc bị hủy, không thể chỉnh sửa.
                                </span>
                            </div>
                        </div>
                    )}

                    <div className="flex gap-3 pt-4 border-t border-gray-200">
                        <button
                            type="button"
                            className="flex-1 px-4 py-2 text-gray-600 border border-gray-300 rounded-md hover:bg-gray-50 transition"
                            onClick={handleClose}
                        >
                            Hủy
                        </button>
                        <button
                            type="submit"
                            className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
                            disabled={loading || isCompleted}
                        >
                            {loading ? "Đang cập nhật..." : "Lưu thay đổi"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
};

export default EditServiceInvoice;
