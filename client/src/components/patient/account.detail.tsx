import { useEffect, useState, type FormEvent } from "react";
import useCallApi from "../../hooks/useCallApi";
import type { ProfileDetailResponse } from "../../responses/_user.response";
import { updateProfileDetail } from "../../services/_user.service";

type AccountDetail = {
    profileDetail: ProfileDetailResponse,
    email: string,
    onSuccess?: () => void
}

const AccountDetail = (props: AccountDetail) => {
    const { execute, notify, loading } = useCallApi();
    const { profileDetail, email, onSuccess } = props;

    const [isEditing, setIsEditing] = useState<boolean>(false);

    const [submitData, setSubmitData] = useState({
        fullName: "",
        phone: "",
        address: "",
        birthDate: ""
    });

    const handleChangeSubmit = (field: keyof typeof submitData, value: string) => {
        setSubmitData(prev => ({ ...prev, [field]: value }));
    }

    const handleCancel = () => {
        setIsEditing(false);
        setSubmitData({
            fullName: profileDetail.fullName,
            phone: profileDetail.phone,
            address: profileDetail.address,
            birthDate: profileDetail.birthDate
        });
    }

    const handleSubmit = async (event: FormEvent) => {
        event.preventDefault();
        const restResponse = await execute(updateProfileDetail(submitData));
        notify(restResponse!, "Cập nhật thông tin cá nhân thành công");
        if (restResponse?.result) {
            setIsEditing(false);
            onSuccess?.();
        }
    };

    useEffect(() => {
        setSubmitData({
            fullName: profileDetail.fullName,
            phone: profileDetail.phone,
            address: profileDetail.address,
            birthDate: profileDetail.birthDate
        });
    }, [profileDetail]);

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-gray-900">Thông tin cá nhân</h2>
                {!isEditing && (
                    <button
                        onClick={() => setIsEditing(true)}
                        className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium flex items-center space-x-2"
                    >
                        <i className="fa-solid fa-edit"></i>
                        <span>Chỉnh sửa</span>
                    </button>
                )}
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Họ và tên <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="text"
                                disabled={!isEditing}
                                value={submitData.fullName}
                                onChange={(e) => handleChangeSubmit("fullName", e.target.value)}
                                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors 
                                    ${!isEditing ? 'bg-gray-50 text-gray-600 border-gray-200' : 'border-gray-300'}`}
                                placeholder="Nhập họ và tên"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                            <input
                                type="email"
                                value={email}
                                disabled={true}
                                className="w-full px-4 py-3 text-gray-500 bg-gray-50 border border-gray-200 rounded-lg cursor-not-allowed"
                            />
                            <p className="mt-1 text-xs text-gray-500">Email không thể thay đổi</p>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Số điện thoại <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="tel"
                                disabled={!isEditing}
                                value={submitData.phone}
                                onChange={(e) => handleChangeSubmit("phone", e.target.value)}
                                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors
                                    ${!isEditing ? 'bg-gray-50 text-gray-600 border-gray-200' : 'border-gray-300'}`}
                                placeholder="0123 456 789"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Ngày sinh <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="date"
                                lang="vi"
                                disabled={!isEditing}
                                value={submitData.birthDate ? new Date(submitData.birthDate).toISOString().split('T')[0] : ''}
                                onChange={(e) => handleChangeSubmit("birthDate", e.target.value)}
                                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors 
                                     ${!isEditing ? 'bg-gray-50 text-gray-600 border-gray-200' : 'border-gray-300'}`}
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Địa chỉ</label>
                        <textarea
                            rows={3}
                            disabled={!isEditing}
                            value={submitData.address}
                            onChange={(e) => handleChangeSubmit("address", e.target.value)}
                            className={`w-full px-4 py-3 ring ring-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors resize-none 
                                ${!isEditing ? 'bg-gray-50 text-gray-600 border-gray-200' : 'border-gray-300'}`}
                            placeholder="Nhập địa chỉ của bạn"
                        />
                    </div>

                    {isEditing && (
                        <div className="flex space-x-4">
                            <button
                                type="submit"
                                disabled={loading}
                                className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium flex items-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {loading ? (
                                    <>
                                        <i className="fa-solid fa-spinner fa-spin"></i>
                                        <span>Đang cập nhật...</span>
                                    </>
                                ) : (
                                    <>
                                        <i className="fa-solid fa-save"></i>
                                        <span>Lưu thay đổi</span>
                                    </>
                                )}
                            </button>
                            <button
                                type="button"
                                disabled={loading}
                                onClick={handleCancel}
                                className="bg-gray-500 text-white px-6 py-3 rounded-lg hover:bg-gray-600 transition-colors font-medium flex items-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                <i className="fa-solid fa-times"></i>
                                <span>Hủy</span>
                            </button>
                        </div>
                    )}
                </form>
            </div>
        </div>
    )
}

export default AccountDetail;