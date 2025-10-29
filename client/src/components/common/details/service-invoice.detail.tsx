import useCallApi from "../../../hooks/useCallApi";
import type { ServiceInvoiceResponse } from "../../../responses/service-nvoice.response";
import { changeServiceInvoiceStatus } from "../../../services/service-invoice.service";
import { formatDateToHourAndDay } from "../../../utils/format-date.util";
import { formatNumberPhone } from "../../../utils/format-number.util";
import { useState } from "react";

type ServiceInvoiceDetailProps = {
    serviceInvoiceSelect: ServiceInvoiceResponse,
    setShowDetail: (showDetail: boolean) => void,
    onSuccess?: () => void,
}

const ServiceInvoiceDetail = (props: ServiceInvoiceDetailProps) => {
    const { serviceInvoiceSelect, setShowDetail, onSuccess } = props;
    const [showPaymentModal, setShowPaymentModal] = useState<boolean>(false);

    const { execute, notify } = useCallApi();

    const [paymentMethod, setPaymentMethod] = useState<string>('');

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'PENDING': return 'bg-yellow-100 text-yellow-800';
            case 'COMPLETED': return 'bg-green-100 text-green-800';
            case 'CANCELLED': return 'bg-red-100 text-red-800';
            default: return 'bg-gray-100 text-gray-800';
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

    const totalPackages = serviceInvoiceSelect.medicalPackages?.length || 0;

    const handleConfirm = () => {
        setShowPaymentModal(true);
    };

    const handlePaymentConfirm = async () => {
        if (paymentMethod === 'CASH') {
            const restResponse = await execute(changeServiceInvoiceStatus(serviceInvoiceSelect.id, 'COMPLETED'));
            notify(restResponse!, "Xác nhận thanh toán thành công");
            if (restResponse?.result) {
                setShowPaymentModal(false);
                onSuccess?.();
            }
        }
        else {

        }
    };

    const handleCancel = async () => {
        const restResponse = await execute(changeServiceInvoiceStatus(serviceInvoiceSelect.id, 'CANCELLED'));
        notify(restResponse!, "Hủy hóa đơn thành công");
        if (restResponse?.result) {
            onSuccess?.();
        }
    };

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

                <div className="space-y-6">
                    <div className="text-center">
                        <span className={`px-4 py-2 rounded-full text-sm font-medium ${getStatusColor(serviceInvoiceSelect.status)}`}>
                            {getStatusText(serviceInvoiceSelect.status)}
                        </span>
                    </div>

                    <div className="border border-gray-200 rounded-lg p-4">
                        <h3 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
                            <i className="fa-solid fa-user text-blue-600"></i>
                            Thông tin bệnh nhân
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-600 mb-1">Họ và tên</label>
                                <p className="text-gray-900">{serviceInvoiceSelect.patientName}</p>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-600 mb-1">Số điện thoại</label>
                                <p className="text-gray-900">{serviceInvoiceSelect.patientPhone !== "Không có số điện thoại" ? formatNumberPhone(serviceInvoiceSelect.patientPhone) : "Không có"}</p>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-600 mb-1">Email bệnh nhân</label>
                                <p className="text-gray-900">{serviceInvoiceSelect.patientEmail || "Không có"}</p>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-600 mb-1">Mã bệnh nhân</label>
                                <p className="text-gray-900"># {serviceInvoiceSelect.patientId || "Không có"}</p>
                            </div>
                        </div>
                    </div>

                    <div className="border border-gray-200 rounded-lg p-4">
                        <h3 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
                            <i className="fa-solid fa-user-doctor text-green-600"></i>
                            Thông tin bác sĩ
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-600 mb-1">Email bác sĩ</label>
                                <p className="text-gray-900">{serviceInvoiceSelect.doctorEmail}</p>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-600 mb-1">Mã bác sĩ</label>
                                <p className="text-gray-900">#{serviceInvoiceSelect.doctorId}</p>
                            </div>
                        </div>
                    </div>

                    <div className="border border-gray-200 rounded-lg p-4">
                        <h3 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
                            <i className="fa-solid fa-info-circle text-orange-600"></i>
                            Thông tin hóa đơn
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-600 mb-1">Ngày tạo</label>
                                <p className="text-gray-900">{formatDateToHourAndDay(new Date(serviceInvoiceSelect.createAt))}</p>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-600 mb-1">Ngày cập nhật</label>
                                <p className="text-gray-900">{formatDateToHourAndDay(new Date(serviceInvoiceSelect.updateAt))}</p>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-600 mb-1">Tổng số gói dịch vụ</label>
                                <p className="text-gray-900 font-semibold">{totalPackages} gói</p>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-600 mb-1">Tổng tiền</label>
                                <p className="font-semibold text-blue-600">{serviceInvoiceSelect.totalAmount.toLocaleString('vi-VN')} ₫</p>
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
                                        <tr className="bg-gray-50 border-b">
                                            <th className="text-left py-3 px-4 font-medium text-gray-600">STT</th>
                                            <th className="text-left py-3 px-4 font-medium text-gray-600">Tên gói dịch vụ</th>
                                            <th className="text-right py-3 px-4 font-medium text-gray-600">Giá</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {serviceInvoiceSelect.medicalPackages.map((packageItem, index) => (
                                            <tr key={packageItem.medicalPackageId} className="border-b hover:bg-gray-50">
                                                <td className="py-3 px-4">{index + 1}</td>
                                                <td className="py-3 px-4 font-medium">{packageItem.medicalPackageName}</td>
                                                <td className="py-3 px-4 text-right font-semibold text-blue-600">
                                                    {packageItem.price.toLocaleString('vi-VN')} ₫
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
                                            Tổng tiền: <span className="text-blue-600">{serviceInvoiceSelect.totalAmount.toLocaleString('vi-VN')} ₫</span>
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
                                    Xác nhận đơn
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

            {showPaymentModal && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-60">
                    <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
                        <div className="text-center mb-6">
                            <h3 className="text-lg font-semibold text-gray-800 mb-2">
                                Chọn phương thức thanh toán
                            </h3>
                            <p className="text-gray-600">
                                Tổng tiền: <span className="font-bold text-blue-600">
                                    {serviceInvoiceSelect.totalAmount.toLocaleString('vi-VN')} ₫
                                </span>
                            </p>
                        </div>

                        <div className="space-y-3 mb-6">
                            <button
                                onClick={() => setPaymentMethod('CASH')}
                                className={`w-full p-4 border-2 border-gray-200 rounded-lg hover:border-green-500 hover:bg-green-50 transition-all duration-200 flex items-center gap-3
                                    ${paymentMethod === 'CASH' ? 'border-green-500 bg-green-50' : ''}
                                    `}
                            >
                                <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                                    <i className="fa-solid fa-money-bills text-green-600"></i>
                                </div>
                                <div className="text-left">
                                    <div className="font-semibold text-gray-800">Tiền mặt</div>
                                    <div className="text-sm text-gray-600">Thanh toán trực tiếp bằng tiền mặt</div>
                                </div>
                            </button>

                            <button
                                onClick={() => setPaymentMethod('TRANSFER')}
                                className={`w-full p-4 border-2 border-gray-200 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-all duration-200 flex items-center gap-3
                                    ${paymentMethod === 'TRANSFER' ? 'border-blue-500 bg-blue-50' : ''}
                                    `}
                            >
                                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                                    <i className="fa-solid fa-credit-card text-blue-600"></i>
                                </div>
                                <div className="text-left">
                                    <div className="font-semibold text-gray-800">Chuyển khoản</div>
                                    <div className="text-sm text-gray-600">Thanh toán qua ngân hàng</div>
                                </div>
                            </button>
                        </div>

                        <div className="flex gap-3">
                            <button
                                onClick={() => setShowPaymentModal(false)}
                                className="flex-1 px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 transition"
                            >
                                Hủy
                            </button>

                            <button className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
                                onClick={handlePaymentConfirm}
                            >
                                Xác nhận
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default ServiceInvoiceDetail;
