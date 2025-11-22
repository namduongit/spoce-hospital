import type { PrescriptionInvoiceResponse } from "../../../responses/prescription-invoice.response";
import { formatDateToHourAndDay } from "../../../utils/format-date.util";
import { formatNumberPhone } from "../../../utils/format-number.util";

type PrescriptionInvoiceDetailProps = {
    prescriptionInvoiceSelect: PrescriptionInvoiceResponse,
    setShowDetail: (showDetail: boolean) => void
}

const PrescriptionInvoiceDetail = (props: PrescriptionInvoiceDetailProps) => {
    const { prescriptionInvoiceSelect, setShowDetail } = props;

    const getColorStatus = (status: string) => {
        switch (status) {
            case 'PENDING': return 'text-yellow-600';
            case 'PAID': return 'text-green-600';
            case 'CANCELLED': return 'text-red-600';
            default: return 'text-gray-600';
        }
    }

    const getTextStatus = (status: string) => {
        switch (status) {
            case 'PENDING': return 'Chờ xử lý';
            case 'PAID': return 'Đã thanh toán';
            case 'CANCELLED': return 'Đã hủy';
            default: return status;
        }
    }

    return (
        <div className="fixed inset-0 bg-gray-500/50 bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-lg w-11/12 max-w-5xl p-6 max-h-[80vh] overflow-y-auto
                flex flex-col space-y-5">
                <div className="border border-gray-200 rounded-lg p-4 space-y-2">
                    <h3 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
                        <i className="fa-solid fa-user text-blue-600"></i>
                        Thông tin khám
                    </h3>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                        <div>
                            <label className="block text-sm font-medium text-gray-600 mb-1">Họ và tên</label>
                            <p className="text-sm font-medium">{prescriptionInvoiceSelect.patientName}</p>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-600 mb-1">Số điện thoại</label>
                            <p className="text-sm font-medium">{prescriptionInvoiceSelect.patientPhone !== "Không có số điện thoại" ? formatNumberPhone(prescriptionInvoiceSelect.patientPhone) : "Không có"}</p>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-600 mb-1">Email bác sĩ</label>
                            <p className="text-sm font-medium">{prescriptionInvoiceSelect.doctorEmail || "Không có"}</p>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-600 mb-1">Trạng thái</label>
                            <p className={`text-sm font-medium ${getColorStatus(prescriptionInvoiceSelect.status)}`}>{getTextStatus(prescriptionInvoiceSelect.status)}</p>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-600 mb-1">Triệu chứng</label>
                            <p className="text-sm font-medium">{prescriptionInvoiceSelect.symptoms || "Không có"}</p>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-600 mb-1">Ghi chú</label>
                            <p className="text-sm font-medium">{prescriptionInvoiceSelect.note || "Không có"}</p>
                        </div>
                    </div>
                </div>

                {prescriptionInvoiceSelect.medicines && prescriptionInvoiceSelect.medicines.length > 0 && (
                    <div className="border border-gray-200 rounded-lg p-4">
                        <h3 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
                            <i className="fa-solid fa-pills text-purple-600"></i>
                            Danh sách thuốc kê đơn ({prescriptionInvoiceSelect.medicines.length})
                        </h3>
                        <div className="overflow-x-auto">
                            <table className="w-full text-sm">
                                <thead>
                                    <tr className="bg-gray-50">
                                        <th className="text-left py-3 px-4 font-medium text-gray-600">STT</th>
                                        <th className="text-left py-3 px-4 font-medium text-gray-600">Tên thuốc</th>
                                        <th className="text-center py-3 px-4 font-medium text-gray-600">Số lượng</th>
                                        <th className="text-right py-3 px-4 font-medium text-gray-600">Đơn giá</th>
                                        <th className="text-right py-3 px-4 font-medium text-gray-600">Thành tiền</th>
                                        <th className="text-left py-3 px-4 font-medium text-gray-600">Liều dùng</th>
                                        <th className="text-left py-3 px-4 font-medium text-gray-600">Cách dùng</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {prescriptionInvoiceSelect.medicines.map((medicine, index) => (
                                        <tr key={medicine.medicineId} className="hover:bg-gray-50">
                                            <td className="py-3 px-4">{index + 1}</td>
                                            <td className="py-3 px-4 font-medium">{medicine.medicineName}</td>
                                            <td className="py-3 px-4 text-center font-semibold">{medicine.quantity}</td>
                                            <td className="py-3 px-4 text-right">{medicine.unitPrice.toLocaleString('vi-VN')} đ</td>
                                            <td className="py-3 px-4 text-right font-semibold text-blue-600">
                                                {medicine.totalPrice.toLocaleString('vi-VN')} đ
                                            </td>
                                            <td className="py-3 px-4">{medicine.dosage}</td>
                                            <td className="py-3 px-4">{medicine.usageInstructions}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        <div className="mt-4 pt-4 border-t border-gray-200">
                            <div className="flex justify-between items-center">
                                <div className="mb-2">
                                    <p className="text-sm text-gray-500">Ngày kê đơn</p>
                                    <p className="text-sm text-gray-900">{formatDateToHourAndDay(new Date(prescriptionInvoiceSelect.createAt))}</p>
                                </div>

                                <div className="text-right">
                                    <p className="text-lg font-bold text-gray-800">
                                        Tổng tiền: <span className="text-blue-600">{prescriptionInvoiceSelect.totalAmount.toLocaleString('vi-VN')} đ</span>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                <div className="flex justify-end">
                    <button className="bg-blue-700 px-5 py-1 rounded text-white font-semibold 
                        hover:bg-white hover:text-blue-700 border-3 border-blue-700 transition-all" onClick={() => setShowDetail(false)}>Đóng</button>
                </div>
            </div>
        </div>
    )
}

export default PrescriptionInvoiceDetail;