import { useEffect, useState } from "react";
import person from "../../assets/images/auth/person.png"
import { useAuth } from "../../contexts/authContext";
import type { UserProfileModel } from "../../models/UserProfile.model";
import type { AppointmentModel } from "../../models/Appointment.model";
import { userDetail, updateUserProfile } from "../../services/userService";

type AccountDetail = {
    id: number,
    email: string,
    role: string,
    type: string,
    status: string,
    userProfileModel: UserProfileModel,
    userAppointmets: AppointmentModel[]
}

const AccountPage = () => {
    const auth = useAuth();
    const [activeTab, setActiveTab] = useState<string>("profile");
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const [accountDetail, setAccountDetail] = useState<AccountDetail>({
        id: 0, 
        email: "", 
        role: "", 
        type: "", 
        status: "", 
        userProfileModel: {} as UserProfileModel, 
        userAppointmets: []
    });

    const [profileForm, setProfileForm] = useState({
        fullName: "",
        phone: "",
        address: "",
        birthDate: ""
    });

    const [isEditing, setIsEditing] = useState<boolean>(false);
    const [formErrors, setFormErrors] = useState<Record<string, string>>({});

    const getUserDetail = async () => {
        try {
            setLoading(true);
            setError(null);
            const restResponse = await userDetail();
            
            if (restResponse.result) {
                const data: AccountDetail = restResponse.data;
                setAccountDetail(data);
                
                setProfileForm({
                    fullName: data.userProfileModel?.fullName || "",
                    phone: data.userProfileModel?.phone || "",
                    address: data.userProfileModel?.address || "",
                    birthDate: data.userProfileModel?.birthDay || "" // server returns birthDay
                });
            } else {
                setError(restResponse.message || "Không thể tải thông tin tài khoản");
            }
        } catch (err) {
            setError("Đã xảy ra lỗi khi tải dữ liệu");
            console.error("Error fetching user details:", err);
        } finally {
            setLoading(false);
        }
    };

    const handleInputChange = (field: keyof typeof profileForm, value: string) => {
        setProfileForm(prev => ({
            ...prev,
            [field]: value
        }));
        
        if (formErrors[field]) {
            setFormErrors(prev => ({
                ...prev,
                [field]: ""
            }));
        }
    };

    const validateForm = (): boolean => {
        const errors: Record<string, string> = {};
        
        if (!profileForm.fullName.trim()) {
            errors.fullName = "Họ và tên là bắt buộc";
        }
        
        if (!profileForm.phone.trim()) {
            errors.phone = "Số điện thoại là bắt buộc";
        } else if (!/^[0-9]{10,11}$/.test(profileForm.phone.replace(/\s/g, ""))) {
            errors.phone = "Số điện thoại không hợp lệ";
        }
        
        if (!profileForm.birthDate) {
            errors.birthDate = "Ngày sinh là bắt buộc";
        }
        
        setFormErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        if (!validateForm()) {
            return;
        }
        
        try {
            setLoading(true);
            setError(null);
            
            const profileData: UserProfileModel = {
                userId: accountDetail.id,
                fullName: profileForm.fullName,
                phone: profileForm.phone,
                address: profileForm.address,
                birthDate: profileForm.birthDate
            };
            
            const response = await updateUserProfile(profileData);
            
            if (response.result) {
                setAccountDetail(prev => ({
                    ...prev,
                    userProfileModel: response.data || profileData
                }));
                
                setIsEditing(false);
                console.log("Profile updated successfully");
            } else {
                setError(response.message || "Không thể cập nhật thông tin");
            }
        } catch (err) {
            setError("Đã xảy ra lỗi khi cập nhật thông tin");
            console.error("Error updating profile:", err);
        } finally {
            setLoading(false);
        }
    };

    // Reset form to original values
    const handleCancel = () => {
        setProfileForm({
            fullName: accountDetail.userProfileModel?.fullName || "",
            phone: accountDetail.userProfileModel?.phone || "",
            address: accountDetail.userProfileModel?.address || "",
            birthDate: accountDetail.userProfileModel?.birthDay || "" // server uses birthDay
        });
        setFormErrors({});
        setIsEditing(false);
    };

    useEffect(() => {
        getUserDetail();
    }, []);

    const menuItems = [
        {
            id: "profile",
            label: "Hồ sơ của tôi",
            icon: "fa-solid fa-user-pen",
            description: "Quản lý thông tin cá nhân"
        },
        {
            id: "appointments",
            label: "Lịch hẹn khám",
            icon: "fa-solid fa-calendar-check",
            description: "Xem lịch hẹn đã đặt"
        },
        {
            id: "history",
            label: "Lịch sử khám bệnh",
            icon: "fa-solid fa-clock-rotate-left",
            description: "Xem lịch sử khám bệnh"
        },
        {
            id: "medicine",
            label: "Lịch sử mua thuốc",
            icon: "fa-solid fa-file-medical",
            description: "Theo dõi đơn thuốc"
        },
        {
            id: "settings",
            label: "Cài đặt tài khoản",
            icon: "fa-solid fa-cog",
            description: "Tùy chỉnh tài khoản"
        }
    ];

    const renderContent = () => {
        switch (activeTab) {
            case "profile":
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
                        
                        {error && (
                            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
                                {error}
                            </div>
                        )}
                        
                        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Họ và tên <span className="text-red-500">*</span>
                                        </label>
                                        <input
                                            type="text"
                                            value={profileForm.fullName}
                                            onChange={(e) => handleInputChange('fullName', e.target.value)}
                                            disabled={!isEditing}
                                            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
                                                !isEditing 
                                                    ? 'bg-gray-50 text-gray-600 border-gray-200' 
                                                    : formErrors.fullName 
                                                        ? 'border-red-300 focus:ring-red-500 focus:border-red-500' 
                                                        : 'border-gray-300'
                                            }`}
                                            placeholder="Nhập họ và tên"
                                        />
                                        {formErrors.fullName && (
                                            <p className="mt-1 text-sm text-red-600">{formErrors.fullName}</p>
                                        )}
                                    </div>
                                    
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                                        <input
                                            type="email"
                                            value={accountDetail.email}
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
                                            value={profileForm.phone}
                                            onChange={(e) => handleInputChange('phone', e.target.value)}
                                            disabled={!isEditing}
                                            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
                                                !isEditing 
                                                    ? 'bg-gray-50 text-gray-600 border-gray-200' 
                                                    : formErrors.phone 
                                                        ? 'border-red-300 focus:ring-red-500 focus:border-red-500' 
                                                        : 'border-gray-300'
                                            }`}
                                            placeholder="0123 456 789"
                                        />
                                        {formErrors.phone && (
                                            <p className="mt-1 text-sm text-red-600">{formErrors.phone}</p>
                                        )}
                                    </div>
                                    
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Ngày sinh <span className="text-red-500">*</span>
                                        </label>
                                        <input
                                            type="date"
                                            value={profileForm.birthDate}
                                            onChange={(e) => handleInputChange('birthDate', e.target.value)}
                                            disabled={!isEditing}
                                            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
                                                !isEditing 
                                                    ? 'bg-gray-50 text-gray-600 border-gray-200' 
                                                    : formErrors.birthDate 
                                                        ? 'border-red-300 focus:ring-red-500 focus:border-red-500' 
                                                        : 'border-gray-300'
                                            }`}
                                        />
                                        {formErrors.birthDate && (
                                            <p className="mt-1 text-sm text-red-600">{formErrors.birthDate}</p>
                                        )}
                                    </div>
                                </div>
                                
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Địa chỉ</label>
                                    <textarea
                                        rows={3}
                                        value={profileForm.address}
                                        onChange={(e) => handleInputChange('address', e.target.value)}
                                        disabled={!isEditing}
                                        className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors resize-none ${
                                            !isEditing 
                                                ? 'bg-gray-50 text-gray-600 border-gray-200' 
                                                : 'border-gray-300'
                                        }`}
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
                                            onClick={handleCancel}
                                            disabled={loading}
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
                );
            case "appointments":
                return (
                    <div className="space-y-6">
                        <h2 className="text-2xl font-bold text-gray-900 mb-6">Lịch hẹn khám</h2>
                        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                            {loading ? (
                                <div className="text-center py-12">
                                    <i className="fa-solid fa-spinner fa-spin text-4xl text-blue-500 mb-4"></i>
                                    <p className="text-gray-500">Đang tải lịch hẹn...</p>
                                </div>
                            ) : accountDetail.userAppointmets && accountDetail.userAppointmets.length > 0 ? (
                                <div className="space-y-4">
                                    {accountDetail.userAppointmets.map((appointment, index) => (
                                        <div key={appointment.id || index} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                                            <div className="flex justify-between items-start">
                                                <div className="flex-1">
                                                    <h4 className="font-semibold text-gray-900">Cuộc hẹn #{appointment.id}</h4>
                                                    <p className="text-sm text-gray-600 mt-1">
                                                        Bệnh nhân: {appointment.fullName}
                                                    </p>
                                                    <p className="text-sm text-gray-600">
                                                        Thời gian: {appointment.time}
                                                    </p>
                                                    <p className="text-sm text-gray-600">
                                                        Số điện thoại: {appointment.phone}
                                                    </p>
                                                    {appointment.note && (
                                                        <p className="text-sm text-gray-600">
                                                            Ghi chú: {appointment.note}
                                                        </p>
                                                    )}
                                                </div>
                                                <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                                                    appointment.status === 'PENDING' ? 'bg-yellow-100 text-yellow-800' :
                                                    appointment.status === 'CONFIRMED' ? 'bg-blue-100 text-blue-800' :
                                                    appointment.status === 'COMPLETED' ? 'bg-green-100 text-green-800' :
                                                    appointment.status === 'CANCELED' ? 'bg-red-100 text-red-800' :
                                                    'bg-gray-100 text-gray-800'
                                                }`}>
                                                    {appointment.status === 'PENDING' ? 'Chờ xác nhận' :
                                                     appointment.status === 'CONFIRMED' ? 'Đã xác nhận' :
                                                     appointment.status === 'COMPLETED' ? 'Hoàn thành' :
                                                     appointment.status === 'CANCELED' ? 'Đã hủy' :
                                                     appointment.status}
                                                </span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="text-center py-12">
                                    <i className="fa-solid fa-calendar-xmark text-6xl text-gray-300 mb-4"></i>
                                    <p className="text-gray-500 text-lg">Bạn chưa có lịch hẹn nào</p>
                                    <button className="mt-4 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                                        Đặt lịch hẹn mới
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                );
            case "history":
                return (
                    <div className="space-y-6">
                        <h2 className="text-2xl font-bold text-gray-900 mb-6">Lịch sử khám bệnh</h2>
                        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                            <div className="text-center py-12">
                                <i className="fa-solid fa-clipboard-list text-6xl text-gray-300 mb-4"></i>
                                <p className="text-gray-500 text-lg">Chưa có lịch sử khám bệnh</p>
                            </div>
                        </div>
                    </div>
                );
            case "medicine":
                return (
                    <div className="space-y-6">
                        <h2 className="text-2xl font-bold text-gray-900 mb-6">Lịch sử mua thuốc</h2>
                        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                            <div className="text-center py-12">
                                <i className="fa-solid fa-pills text-6xl text-gray-300 mb-4"></i>
                                <p className="text-gray-500 text-lg">Chưa có lịch sử mua thuốc</p>
                            </div>
                        </div>
                    </div>
                );
            case "settings":
                return (
                    <div className="space-y-6">
                        <h2 className="text-2xl font-bold text-gray-900 mb-6">Cài đặt tài khoản</h2>
                        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                            <div className="space-y-6">
                                <div className="flex items-center justify-between py-4 border-b border-gray-100">
                                    <div>
                                        <h3 className="font-medium text-gray-900">Thông báo email</h3>
                                        <p className="text-sm text-gray-500">Nhận thông báo qua email</p>
                                    </div>
                                    <label className="relative inline-flex items-center cursor-pointer">
                                        <input type="checkbox" className="sr-only peer" />
                                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                                    </label>
                                </div>
                                <div className="flex items-center justify-between py-4 border-b border-gray-100">
                                    <div>
                                        <h3 className="font-medium text-gray-900">Thông báo SMS</h3>
                                        <p className="text-sm text-gray-500">Nhận thông báo qua tin nhắn</p>
                                    </div>
                                    <label className="relative inline-flex items-center cursor-pointer">
                                        <input type="checkbox" className="sr-only peer" />
                                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                                    </label>
                                </div>
                            </div>
                        </div>
                    </div>
                );
            default:
                return null;
        }
    };

    return (
        <main className="account-page bg-gray-50 min-h-screen">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {loading && !accountDetail.id ? (
                    <div className="flex justify-center items-center min-h-[50vh]">
                        <div className="text-center">
                            <i className="fa-solid fa-spinner fa-spin text-4xl text-blue-500 mb-4"></i>
                            <p className="text-gray-600">Đang tải thông tin tài khoản...</p>
                        </div>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                        <div className="lg:col-span-1">
                            <div className="sticky top-8 space-y-6">
                                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                                    <div className="text-center">
                                        <div className="relative inline-block">
                                            <img
                                                src={person}
                                                alt="User Avatar"
                                                className="w-20 h-20 rounded-full mx-auto border-4 border-blue-100"
                                            />
                                            <div className="absolute bottom-0 right-0 w-6 h-6 bg-green-500 rounded-full border-2 border-white"></div>
                                        </div>
                                        <h3 className="mt-4 text-lg font-semibold text-gray-900">
                                            {accountDetail.userProfileModel?.fullName || "Chưa cập nhật tên"}
                                        </h3>
                                        <p className="text-sm text-blue-600 font-medium">
                                            {auth.email || accountDetail.email || "example@email.com"}
                                        </p>
                                        <p className="text-xs text-gray-500 mt-1">
                                            {accountDetail.role === "ADMIN" ? "Quản trị viên" : 
                                             accountDetail.role === "DOCTOR" ? "Bác sĩ" : 
                                             accountDetail.role === "USER" ? "Người dùng" : "Chưa xác định"}
                                        </p>
                                        {loading && (
                                            <div className="mt-2 flex justify-center">
                                                <i className="fa-solid fa-spinner fa-spin text-blue-500"></i>
                                            </div>
                                        )}
                                    </div>
                                </div>

                                <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                                    <nav className="p-2">
                                        {menuItems.map((item) => (
                                            <button
                                                key={item.id}
                                                onClick={() => setActiveTab(item.id)}
                                                className={`w-full text-left px-4 py-3 rounded-lg mb-1 transition-all duration-200 group ${activeTab === item.id
                                                        ? 'bg-blue-50 text-blue-700 border-l-4 border-blue-600'
                                                        : 'text-gray-700 hover:bg-gray-50 hover:text-blue-600'
                                                    }`}
                                            >
                                                <div className="flex items-center space-x-3">
                                                    <i className={`${item.icon} text-lg ${activeTab === item.id ? 'text-blue-600' : 'text-gray-400 group-hover:text-blue-500'
                                                        }`}></i>
                                                    <div className="flex-1">
                                                        <div className="font-medium">{item.label}</div>
                                                        <div className="text-xs text-gray-500 mt-0.5">{item.description}</div>
                                                    </div>
                                                </div>
                                            </button>
                                        ))}
                                    </nav>
                                </div>
                            </div>
                        </div>

                        <div className="lg:col-span-3">
                            <div className="bg-gray-50">
                                {renderContent()}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </main>
    )
}

export default AccountPage;