import { formatNumberPhone } from "../../../utils/format-number.util";
import { formatDateVi } from "../../../utils/format-date.util";
import type { DoctorResponse } from "../../../responses/doctor.response";

type DoctorDetail = {
    doctorSelect: DoctorResponse,
    setShowDetail: (showDetail: boolean) => void,
    onSuccess?: () => void,
}

const DoctorDetail = (props: DoctorDetail) => {
    const { doctorSelect, setShowDetail } = props;

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'AVAILABLE': return 'text-green-800';
            case 'OFFLINE': return 'text-red-800';
            case 'BUSY': return 'text-yellow-800';
            default: return 'text-gray-800';
        }
    }

    const getStatusText = (status: string) => {
        switch (status) {
            case 'AVAILABLE': return 'Đang làm';
            case 'OFFLINE': return 'Tạm nghỉ';
            case 'BUSY': return 'Đang bận';
            default: return status;
        }
    }

    return (
        <div className="fixed inset-0 bg-gray-500/50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-3xl mx-4 max-h-[90vh] overflow-y-auto">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                        <i className="fa-solid fa-user-doctor text-blue-600"></i>
                        Chi tiết bác sĩ #{doctorSelect.id}
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
                            Thông tin cá nhân
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-600 mb-1">Họ và tên</label>
                                <p className="text-gray-900">{doctorSelect.fullName || "Chưa cập nhật"}</p>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-600 mb-1">Email</label>
                                <p className="text-gray-900">{doctorSelect.email || "Chưa cập nhật"}</p>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-600 mb-1">Số điện thoại</label>
                                <p className="text-gray-900">{doctorSelect.phone ? formatNumberPhone(doctorSelect.phone) : "Chưa cập nhật"}</p>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-600 mb-1">Giới tính</label>
                                <p className="text-gray-900">
                                    {doctorSelect.gender === 'MALE' ? 'Nam' :
                                        doctorSelect.gender === 'FEMALE' ? 'Nữ' : 'Khác'}
                                </p>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-600 mb-1">Ngày sinh</label>
                                <p className="text-gray-900">
                                    {doctorSelect.birthDate ? formatDateVi(new Date(doctorSelect.birthDate)) : "Chưa cập nhật"}
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="border border-gray-200 rounded-lg p-4">
                        <h3 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
                            <i className="fa-solid fa-briefcase text-green-600"></i>
                            Thông tin công việc
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-600 mb-1">Bằng cấp</label>
                                <p className="text-gray-900">{doctorSelect.degree || "Chưa cập nhật"}</p>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-600 mb-1">Khoa</label>
                                <p className="text-gray-900">{doctorSelect.departmentName || "Chưa cập nhật"}</p>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-600 mb-1">Mã khoa</label>
                                <p className="text-gray-900">{doctorSelect.departmentId || "Chưa cập nhật"}</p>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-600 mb-1">Trạng thái làm việc</label>
                                <span className={`font-bold ${getStatusColor(doctorSelect.status)}`}>
                                    {getStatusText(doctorSelect.status)}
                                </span>
                            </div>
                        </div>
                    </div>
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
};

export default DoctorDetail;