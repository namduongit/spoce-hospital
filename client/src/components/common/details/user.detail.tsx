import type { ProfileDetailResponse } from "../../../responses/user.response";
import { formatNumberPhone } from "../../../utils/format-number.util";
import { formatDateVi } from "../../../utils/format-date.util";

type UserDetail = {
    userSelect: ProfileDetailResponse,
    setShowDetail: (showDetail: boolean) => void
}

const UserDetail = (props: UserDetail) => {
    const { userSelect, setShowDetail } = props;

    const getStatusColor = (status: string) => {
        return status === 'ACTIVE' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800';
    }

    const getStatusText = (status: string) => {
        return status === 'ACTIVE' ? 'Đang hoạt động' : 'Bị khóa';
    }

    const getRoleColor = (role: string) => {
        switch (role) {
            case 'ADMIN': return 'text-purple-600 bg-purple-100';
            case 'DOCTOR': return 'text-blue-600 bg-blue-100';
            case 'ASSISTOR': return 'text-orange-600 bg-orange-100';
            case 'USER': return 'text-gray-600 bg-gray-100';
            default: return 'text-gray-600 bg-gray-100';
        }
    }

    const getRoleText = (role: string) => {
        switch (role) {
            case 'ADMIN': return 'Quản trị viên';
            case 'DOCTOR': return 'Bác sĩ';
            case 'ASSISTOR': return 'Nhân viên';
            case 'USER': return 'Khách hàng';
            default: return role;
        }
    }

    return (
        <div className="fixed inset-0 bg-gray-500/50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-3xl mx-4 max-h-[90vh] overflow-y-auto">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                        <i className="fa-solid fa-user text-blue-600"></i>
                        Chi tiết người dùng
                    </h2>
                    <button
                        onClick={() => setShowDetail(false)}
                        className="text-gray-500 hover:text-gray-700 text-xl"
                    >
                        x
                    </button>
                </div>

                <div className="space-y-6">
                    <div className="text-center space-y-2">
                        <span className={`px-4 py-2 rounded-full text-sm font-medium ${getRoleColor(userSelect.role)}`}>
                            {getRoleText(userSelect.role)}
                        </span>
                        <br />
                        <span className={`px-4 py-2 rounded-full text-sm font-medium ${getStatusColor(userSelect.status)}`}>
                            {getStatusText(userSelect.status)}
                        </span>
                    </div>

                    <div className="border border-gray-200 rounded-lg p-4">
                        <h3 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
                            <i className="fa-solid fa-user-circle text-blue-600"></i>
                            Thông tin tài khoản
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-600 mb-1">Email</label>
                                <p className="text-gray-900">{userSelect.email}</p>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-600 mb-1">Loại tài khoản</label>
                                <p className="text-gray-900">{userSelect.type === 'ACCOUNT' ? 'Tài khoản' : 'Email'}</p>
                            </div>
                        </div>
                    </div>

                    <div className="border border-gray-200 rounded-lg p-4">
                        <h3 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
                            <i className="fa-solid fa-id-card text-green-600"></i>
                            Thông tin cá nhân
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-600 mb-1">Họ và tên</label>
                                <p className="text-gray-900 font-medium">
                                    {userSelect.profile?.fullName || "Chưa cập nhật"}
                                </p>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-600 mb-1">Số điện thoại</label>
                                <p className="text-gray-900">
                                    {userSelect.profile?.phone ? formatNumberPhone(userSelect.profile.phone) : "Chưa cập nhật"}
                                </p>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-600 mb-1">Ngày sinh</label>
                                <p className="text-gray-900">
                                    {userSelect.profile?.birthDate ? formatDateVi(new Date(userSelect.profile.birthDate)) : "Chưa cập nhật"}
                                </p>
                            </div>
                            <div className="md:col-span-2">
                                <label className="block text-sm font-medium text-gray-600 mb-1">Địa chỉ</label>
                                <p className="text-gray-900">
                                    {userSelect.profile?.address || "Chưa cập nhật"}
                                </p>
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
}

export default UserDetail;
