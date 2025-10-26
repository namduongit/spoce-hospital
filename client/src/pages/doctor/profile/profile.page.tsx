import { useEffect, useState } from "react";
import { getDoctorProfile, updateDoctorProfile } from "../../../services/doctor.service";
import { getDepartmentList } from "../../../services/department.service";
import type { DoctorResponse } from "../../../responses/doctor.response";
import type { DepartmentResponse } from "../../../responses/department.response";
import useCallApi from "../../../hooks/useCallApi";
import { genders } from "../../../constants/gender.constant";

const DoctorProfilePage = () => {
    const { execute, notify, doFunc } = useCallApi();
    
    const [profile, setProfile] = useState<DoctorResponse>({} as DoctorResponse);
    const [departments, setDepartments] = useState<DepartmentResponse[]>([]);
    const [isEditing, setIsEditing] = useState(false);
    const [imagePreview, setImagePreview] = useState<string>("");
    
    const [formData, setFormData] = useState({
        image: "",
        fullName: "",
        gender: "",
        phone: "",
        birthDate: "",
        degree: "",
        departmentId: ""
    });

    const handleGetProfile = async () => {
        const restResponse = await execute(getDoctorProfile());
        doFunc(() => {
            if (restResponse?.result) {
                const data: DoctorResponse = restResponse.data;
                setProfile(data);
                setFormData({
                    image: data.image || "",
                    fullName: data.fullName || "",
                    gender: data.gender || "",
                    phone: data.phone || "",
                    birthDate: data.birthDate || "",
                    degree: data.degree || "",
                    departmentId: data.departmentId?.toString() || ""
                });
                setImagePreview(data.image || "");
            }
        });
    };

    const handleGetDepartments = async () => {
        const restResponse = await execute(getDepartmentList());
        doFunc(() => {
            if (restResponse?.result) {
                const data: DepartmentResponse[] = restResponse.data;
                setDepartments(Array.isArray(data) ? data : []);
            }
        });
    };

    const handleInputChange = (field: keyof typeof formData, value: string) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                const result = reader.result as string;
                setImagePreview(result);
                setFormData(prev => ({ ...prev, image: result }));
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        const updateData = {
            image: formData.image,
            fullName: formData.fullName,
            gender: formData.gender,
            phone: formData.phone,
            birthDay: formData.birthDate,
            degree: formData.degree,
            departmentId: formData.departmentId
        };

        const restResponse = await execute(updateDoctorProfile(updateData));
        notify(restResponse!, "Cập nhật thông tin thành công");
        doFunc(() => {
            setIsEditing(false);
            handleGetProfile();
        });
    };

    const handleCancel = () => {
        setIsEditing(false);
        setFormData({
            image: profile.image || "",
            fullName: profile.fullName || "",
            gender: profile.gender || "",
            phone: profile.phone || "",
            birthDate: profile.birthDate || "",
            degree: profile.degree || "",
            departmentId: profile.departmentId?.toString() || ""
        });
        setImagePreview(profile.image || "");
    };

    useEffect(() => {
        handleGetProfile();
        handleGetDepartments();
    }, []);

    return (
        <main className="profile-page p-4 sm:p-6">
            <div className="profile-page__wrap max-w-4xl mx-auto">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
                    <h3 className="text-xl sm:text-2xl font-bold text-blue-700 mb-2 sm:mb-0">
                        Thông tin cá nhân
                    </h3>
                    {!isEditing && (
                        <button
                            onClick={() => setIsEditing(true)}
                            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
                        >
                            <i className="fa-solid fa-edit mr-2"></i>
                            Chỉnh sửa
                        </button>
                    )}
                </div>

                <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                    <form onSubmit={handleSubmit}>
                        <div className="p-6">
                            <div className="flex flex-col items-center mb-6">
                                <div className="relative">
                                    <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-gray-200">
                                        {imagePreview ? (
                                            <img 
                                                src={imagePreview} 
                                                alt="Doctor Avatar" 
                                                className="w-full h-full object-cover"
                                            />
                                        ) : (
                                            <div className="w-full h-full bg-gray-300 flex items-center justify-center">
                                                <i className="fa-solid fa-user text-4xl text-gray-500"></i>
                                            </div>
                                        )}
                                    </div>
                                    {isEditing && (
                                        <label className="absolute bottom-0 right-0 bg-blue-600 text-white p-2 rounded-full cursor-pointer hover:bg-blue-700 transition-colors">
                                            <i className="fa-solid fa-camera"></i>
                                            <input
                                                type="file"
                                                className="hidden"
                                                accept="image/*"
                                                onChange={handleImageChange}
                                            />
                                        </label>
                                    )}
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Email
                                    </label>
                                    <input
                                        type="email"
                                        value={profile.email || ""}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-100 text-gray-600"
                                        disabled
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Họ và tên <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        value={formData.fullName}
                                        onChange={(e) => handleInputChange("fullName", e.target.value)}
                                        className={`w-full px-3 py-2 border border-gray-300 rounded-md ${
                                            isEditing ? "focus:ring-2 focus:ring-blue-500 focus:border-blue-500" : "bg-gray-100"
                                        }`}
                                        disabled={!isEditing}
                                        required
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Giới tính
                                    </label>
                                    <select
                                        value={formData.gender}
                                        onChange={(e) => handleInputChange("gender", e.target.value)}
                                        className={`w-full px-3 py-2 border border-gray-300 rounded-md ${
                                            isEditing ? "focus:ring-2 focus:ring-blue-500 focus:border-blue-500" : "bg-gray-100"
                                        }`}
                                        disabled={!isEditing}
                                    >
                                        <option value="">Chọn giới tính</option>
                                        {genders.map((gender) => (
                                            <option key={gender.id} value={gender.value}>
                                                {gender.name}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Số điện thoại <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="tel"
                                        value={formData.phone}
                                        onChange={(e) => handleInputChange("phone", e.target.value)}
                                        className={`w-full px-3 py-2 border border-gray-300 rounded-md ${
                                            isEditing ? "focus:ring-2 focus:ring-blue-500 focus:border-blue-500" : "bg-gray-100"
                                        }`}
                                        disabled={!isEditing}
                                        required
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Ngày sinh
                                    </label>
                                    <input
                                        type="date"
                                        value={formData.birthDate}
                                        onChange={(e) => handleInputChange("birthDate", e.target.value)}
                                        className={`w-full px-3 py-2 border border-gray-300 rounded-md ${
                                            isEditing ? "focus:ring-2 focus:ring-blue-500 focus:border-blue-500" : "bg-gray-100"
                                        }`}
                                        disabled={!isEditing}
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Khoa
                                    </label>
                                    <select
                                        value={formData.departmentId}
                                        onChange={(e) => handleInputChange("departmentId", e.target.value)}
                                        className={`w-full px-3 py-2 border border-gray-300 rounded-md ${
                                            isEditing ? "focus:ring-2 focus:ring-blue-500 focus:border-blue-500" : "bg-gray-100"
                                        }`}
                                        disabled={!isEditing}
                                    >
                                        <option value="">Chọn khoa</option>
                                        {departments.map((department) => (
                                            <option key={department.id} value={department.id}>
                                                {department.name}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                <div className="md:col-span-2">
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Bằng cấp/Chuyên môn
                                    </label>
                                    <textarea
                                        value={formData.degree}
                                        onChange={(e) => handleInputChange("degree", e.target.value)}
                                        rows={3}
                                        className={`w-full px-3 py-2 border border-gray-300 rounded-md ${
                                            isEditing ? "focus:ring-2 focus:ring-blue-500 focus:border-blue-500" : "bg-gray-100"
                                        }`}
                                        disabled={!isEditing}
                                        placeholder="Nhập thông tin về bằng cấp, chuyên môn..."
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Ngày bắt đầu làm việc
                                    </label>
                                    <input
                                        type="date"
                                        value={profile.workDay || ""}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-100 text-gray-600"
                                        disabled
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Trạng thái
                                    </label>
                                    <input
                                        type="text"
                                        value={
                                            profile.status === 'AVAILABLE' ? 'Có sẵn' :
                                            profile.status === 'BUSY' ? 'Bận' :
                                            profile.status === 'OFFLINE' ? 'Offline' : ''
                                        }
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-100 text-gray-600"
                                        disabled
                                    />
                                </div>
                            </div>
                        </div>

                        {isEditing && (
                            <div className="px-6 py-4 bg-gray-50 border-t flex gap-3 justify-end">
                                <button
                                    type="button"
                                    onClick={handleCancel}
                                    className="px-4 py-2 text-gray-700 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
                                >
                                    Hủy
                                </button>
                                <button
                                    type="submit"
                                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                                >
                                    <i className="fa-solid fa-save mr-2"></i>
                                    Lưu thay đổi
                                </button>
                            </div>
                        )}
                    </form>
                </div>
            </div>
        </main>
    );
};

export default DoctorProfilePage;
