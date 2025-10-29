import { formatNumberPhone } from "../../../utils/format-number.util";
import { formatDateToHourAndDay } from "../../../utils/format-date.util";
import type { AppointmentResponse } from "../../../responses/appointment.response";

type AppointmentDetail = {
    appointmentSelect: AppointmentResponse,
    setShowDetail: (showDetail: boolean) => void
}

const AppointmentDetail = (props: AppointmentDetail) => {
    const { appointmentSelect, setShowDetail } = props;

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'PENDING': return 'text-yellow-800';
            case 'CONFIRMED': return 'text-green-700';
            case 'COMPLETED': return 'text-blue-700';
            case 'CANCELLED': return 'text-red-700';
            default: return 'text-gray-700';
        }
    }

    const getStatusText = (status: string) => {
        switch (status) {
            case 'PENDING': return 'Chưa xác nhận';
            case 'CONFIRMED': return 'Đã xác nhận';
            case 'COMPLETED': return 'Đã hoàn thành';
            case 'CANCELLED': return 'Đã hủy';
            default: return status;
        }
    }

    return (
        <div className="fixed inset-0 bg-gray-500/50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-3xl mx-4 max-h-[90vh] overflow-y-auto">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                        <i className="fa-solid fa-calendar-check text-blue-600"></i>
                        Chi tiết lịch hẹn #{appointmentSelect.id}
                    </h2>
                    <button
                        onClick={() => setShowDetail(false)}
                        className="text-gray-500 hover:text-gray-700 text-xl"
                    >
                        x
                    </button>
                </div>

                <div className="space-y-6">
                    <div className="border border-gray-200 rounded-lg p-4">
                        <h3 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
                            <i className="fa-solid fa-user text-blue-600"></i>
                            Thông tin bệnh nhân
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-600 mb-1">Họ và tên</label>
                                <p className="text-gray-900">{appointmentSelect.fullName}</p>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-600 mb-1">Số điện thoại</label>
                                <p className="text-gray-900">{formatNumberPhone(appointmentSelect.phone)}</p>
                            </div>
                        </div>
                    </div>

                    <div className="border border-gray-200 rounded-lg p-4">
                        <h3 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
                            <i className="fa-solid fa-stethoscope text-green-600"></i>
                            Thông tin khám bệnh
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-600 mb-1">Bác sĩ</label>
                                <p className="text-gray-900">{appointmentSelect.doctorName || "Chưa cập nhật"}</p>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-600 mb-1">Khoa khám</label>
                                <p className="text-gray-900">{appointmentSelect.departmentName || "Chưa cập nhật"}</p>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-600 mb-1">Phòng khám</label>
                                <p className="text-gray-900">{appointmentSelect.roomName || "Chưa cập nhật"}</p>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-600 mb-1">Thời gian khám</label>
                                <p className="text-gray-900">{appointmentSelect.time}</p>
                            </div>
                        </div>
                    </div>

                    <div className="border border-gray-200 rounded-lg p-4 space-y-2">
                        <h3 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
                            <i className="fa-solid fa-clock text-orange-600"></i>
                            Thời gian đăng ký
                        </h3>
                        <p className="text-gray-900">{formatDateToHourAndDay(new Date(appointmentSelect.createdAt))}</p>

                        <div className="text-left">
                            <label className="block text-sm font-medium text-gray-600 mb-1">Trạng thái</label>
                            <span className={`font-bold ${getStatusColor(appointmentSelect.status)}`}>
                                {getStatusText(appointmentSelect.status)}
                            </span>
                        </div>
                    </div>

                    {appointmentSelect.note && (
                        <div className="border border-yellow-200 bg-yellow-50 rounded-lg p-4">
                            <h3 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
                                <i className="fa-solid fa-note-sticky text-yellow-600"></i>
                                Ghi chú
                            </h3>
                            <p className="text-gray-900">{appointmentSelect.note}</p>
                        </div>
                    )}
                </div>

                <div className="flex justify-end mt-6">
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

export default AppointmentDetail;
