import { useNavigate } from "react-router-dom";
import useCallApi from "../../../hooks/useCallApi";
import type { ServiceInvoiceResponse } from "../../../responses/service-nvoice.response";
import { changeServiceInvoiceStatus } from "../../../services/service-invoice.service";
import { formatDateToHourAndDay } from "../../../utils/format-date.util";
import { formatNumberPhone, formatPriceVND } from "../../../utils/format-number.util";

type ServiceInvoiceDetailProps = {
    serviceInvoiceSelect: ServiceInvoiceResponse,
    setShowDetail: (showDetail: boolean) => void,
    onSuccess?: () => void,
}

const ServiceInvoiceDetail = (props: ServiceInvoiceDetailProps) => {
    const { serviceInvoiceSelect, setShowDetail, onSuccess } = props;
    const navigate = useNavigate();
    const { execute, notify } = useCallApi();

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'PENDING': return 'text-yellow-800';
            case 'COMPLETED': return 'text-green-800';
            case 'CANCELLED': return 'text-red-800';
            default: return 'text-gray-800';
        }
    }

    const getStatusText = (status: string) => {
        switch (status) {
            case 'PENDING': return 'Chờ xử lý';
            case 'COMPLETED': return 'Đã hoàn thành';
            case 'CANCELLED': return 'Đã hủy';
            default: return status;
        }
    }

    const handleConfirm = () => {
        navigate(`/payment/service-invoice/${serviceInvoiceSelect.id}`);
    }

    const handleCancel = async () => {
        const restResponse = await execute(changeServiceInvoiceStatus(serviceInvoiceSelect.id, 'CANCELLED'));
        notify(restResponse!, "Hủy hóa đơn dịch vụ thành công");
        if (restResponse?.result) {
            setShowDetail(false);
            onSuccess?.();
        }
    }

    return (
        <div className="fixed inset-0 bg-gray-500/50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-5xl mx-4 max-h-[90vh] overflow-y-auto">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                        <i className="fa-solid fa-receipt text-blue-600"></i>
                        Chi tiết hóa đơn dịch vụ #{serviceInvoiceSelect.id}
                    </h2>
                    <button
                        onClick={() => setShowDetail(false)}
                        className="text-gray-500 hover:text-gray-700 text-xl"
                    >
                        x
                    </button>
                </div>

                <div className="space-y-4">
                    <div className="border border-gray-200 rounded-lg p-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="flex items-start gap-3">
                                <i className="fa-solid fa-user text-blue-600 mt-1"></i>
                                <div className="flex-1">
                                    <p className="text-sm text-gray-600 mb-1">Bệnh nhân</p>
                                    <p className="font-semibold text-gray-900">{serviceInvoiceSelect.patientName}</p>
                                    <p className="text-sm text-gray-600">
                                        {serviceInvoiceSelect.patientPhone !== "Không có số điện thoại" ? formatNumberPhone(serviceInvoiceSelect.patientPhone) : "Không có SĐT"}
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-start gap-3">
                                <i className="fa-solid fa-user-doctor text-green-600 mt-1"></i>
                                <div className="flex-1">
                                    <p className="text-sm text-gray-600 mb-1">Bác sĩ chỉ định</p>
                                    <p className="font-semibold text-gray-900">{serviceInvoiceSelect.doctorEmail}</p>
                                    <p className="text-sm text-gray-600">Mã BS: #{serviceInvoiceSelect.doctorId}</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-3">
                                <i className="fa-solid fa-calendar text-purple-600 mt-1"></i>
                                <div className="flex-1">
                                    <p className="text-sm text-gray-600 mb-1">Ngày tạo hóa đơn</p>
                                    <p className="font-semibold text-gray-900">{formatDateToHourAndDay(new Date(serviceInvoiceSelect.createAt))}</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-3">
                                <i className="fa-solid fa-info-circle text-orange-600 mt-1"></i>
                                <div className="flex-1">
                                    <p className="text-sm text-gray-600 mb-1">Trạng thái</p>
                                    <p className={`font-semibold ${getStatusColor(serviceInvoiceSelect.status)}`}>
                                        {getStatusText(serviceInvoiceSelect.status)}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {serviceInvoiceSelect.medicalPackages && serviceInvoiceSelect.medicalPackages.length > 0 && (
                        <div className="border border-gray-200 rounded-lg p-4">
                            <h3 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
                                <i className="fa-solid fa-hand-holding-medical text-purple-600"></i>
                                Danh sách gói dịch vụ ({serviceInvoiceSelect.medicalPackages.length})
                            </h3>
                            <div className="overflow-x-auto">
                                <table className="w-full text-sm">
                                    <thead>
                                        <tr className="bg-gray-50">
                                            <th className="text-left py-3 px-4 font-medium text-gray-600">STT</th>
                                            <th className="text-left py-3 px-4 font-medium text-gray-600">Tên gói dịch vụ</th>
                                            <th className="text-right py-3 px-4 font-medium text-gray-600">Giá</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {serviceInvoiceSelect.medicalPackages.map((packageItem, index) => (
                                            <tr key={packageItem.medicalPackageId} className=" hover:bg-gray-50">
                                                <td className="py-3 px-4">{index + 1}</td>
                                                <td className="py-3 px-4 font-medium">{packageItem.medicalPackageName}</td>
                                                <td className="py-3 px-4 text-right font-semibold text-blue-600">
                                                    {packageItem.price.toLocaleString('vi-VN')}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                            <div className="mt-4 pt-4 border-t border-gray-200">
                                <div className="flex justify-end">
                                    <div className="text-right">
                                        <p className="text-lg font-bold text-gray-800">
                                            Tổng tiền: <span className="text-blue-600">{formatPriceVND(serviceInvoiceSelect.totalAmount)}</span>
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                <div className="flex justify-between mt-6 pt-4 border-t border-gray-200">
                    <div className="flex gap-2">
                        {serviceInvoiceSelect.status === 'PENDING' && (
                            <>
                                <button
                                    onClick={handleCancel}
                                    className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition flex items-center gap-2"
                                >
                                    Hủy hóa đơn
                                </button>
                                <button
                                    onClick={handleConfirm}
                                    className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition flex items-center gap-2"
                                >
                                    Tiến hành thanh toán
                                </button>
                            </>
                        )}
                    </div>
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

export default ServiceInvoiceDetail;
