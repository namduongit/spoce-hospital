import { useEffect, useState } from "react";
import { getDoctorProfile } from "../../../services/doctor.service";
import useCallApi from "../../../hooks/useCallApi";
import type { DoctorDetailResponse } from "../../../responses/user.response";

const DoctorProfilePage = () => {
    const { execute, doFunc } = useCallApi();
    
    const [profile, setProfile] = useState<DoctorDetailResponse>({} as DoctorDetailResponse);

    const handleGetProfile = async () => {
        const restResponse = await execute(getDoctorProfile());
        doFunc(() => {
            if (restResponse?.result) {
                const data: DoctorDetailResponse = restResponse.data;
                setProfile(data);
            }
        });
    }

    const getGenderLabel = (gender: string) => {
        switch (gender) {
            case "MALE":
                return "Nam";
            case "FEMALE":
                return "Nữ";
            case "OTHER":
                return "Khác";
            default:
                return "Chưa cập nhật";
        }
    };

    const getStatusLabel = (status: string) => {
        switch (status) {
            case "AVAILABLE":
                return "Có sẵn";
            case "BUSY":
                return "Bận";
            case "OFFLINE":
                return "Offline";
            default:
                return "Chưa cập nhật";
        }
    };

    useEffect(() => {
        handleGetProfile();
    }, []);

    return (
        <main className="profile-page p-4 sm:p-6">
            <div className="profile-page__wrap max-w-4xl mx-auto">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
                    <h3 className="text-xl sm:text-2xl font-bold text-blue-700 mb-2 sm:mb-0">
                        Thông tin cá nhân
                    </h3>
                </div>

                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6 flex items-start space-x-3">
                    <i className="fa-solid fa-info-circle text-blue-600 text-xl mt-0.5"></i>
                    <div>
                        <p className="text-sm text-blue-800">
                            <strong>Lưu ý:</strong> Thông tin cá nhân không thể tự thay đổi. 
                            Vui lòng liên hệ với quản trị viên nếu cần cập nhật thông tin.
                        </p>
                    </div>
                </div>

                <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                    <div className="p-6">

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Email
                                </label>
                                <input
                                    type="email"
                                    value={profile.email || "example@gmail.com"}
                                    className="w-full px-4 py-3 text-gray-600 bg-gray-50 border border-gray-200 rounded-lg cursor-not-allowed"
                                    disabled
                                />
                                <p className="mt-1 text-xs text-gray-500">Email không thể thay đổi</p>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Họ và tên
                                </label>
                                <input
                                    type="text"
                                    value={profile.profile?.fullName || "Chưa cập nhật"}
                                    className="w-full px-4 py-3 text-gray-600 bg-gray-50 border border-gray-200 rounded-lg cursor-not-allowed"
                                    disabled
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Giới tính
                                </label>
                                <input
                                    type="text"
                                    value={getGenderLabel(profile.profile?.gender || "")}
                                    className="w-full px-4 py-3 text-gray-600 bg-gray-50 border border-gray-200 rounded-lg cursor-not-allowed"
                                    disabled
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Số điện thoại
                                </label>
                                <input
                                    type="tel"
                                    value={profile.profile?.phone || "Chưa cập nhật"}
                                    className="w-full px-4 py-3 text-gray-600 bg-gray-50 border border-gray-200 rounded-lg cursor-not-allowed"
                                    disabled
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Ngày sinh
                                </label>
                                <input
                                    type="text"
                                    value={profile.profile?.birthDate ? new Date(profile.profile.birthDate).toLocaleDateString('vi-VN') : "Chưa cập nhật"}
                                    className="w-full px-4 py-3 text-gray-600 bg-gray-50 border border-gray-200 rounded-lg cursor-not-allowed"
                                    disabled
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Khoa
                                </label>
                                <input
                                    type="text"
                                    value={profile.profile?.departmentName || "Chưa cập nhật"}
                                    className="w-full px-4 py-3 text-gray-600 bg-gray-50 border border-gray-200 rounded-lg cursor-not-allowed"
                                    disabled
                                />
                            </div>

                            <div className="md:col-span-2">
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Bằng cấp/Chuyên môn
                                </label>
                                <textarea
                                    value={profile.profile?.degree || "Chưa cập nhật"}
                                    rows={3}
                                    className="w-full px-4 py-3 text-gray-600 bg-gray-50 border border-gray-200 rounded-lg cursor-not-allowed resize-none"
                                    disabled
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Lịch làm việc
                                </label>
                                <input
                                    type="text"
                                    value={"Xem lịch để biết chi tiết"}
                                    className="w-full px-4 py-3 text-gray-600 bg-gray-50 border border-gray-200 rounded-lg cursor-not-allowed"
                                    disabled
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Trạng thái
                                </label>
                                <input
                                    type="text"
                                    value={getStatusLabel(profile.profile?.status || "")}
                                    className="w-full px-4 py-3 text-gray-600 bg-gray-50 border border-gray-200 rounded-lg cursor-not-allowed"
                                    disabled
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
};

export default DoctorProfilePage;
