import { useState } from "react";
import { validImageFile } from "../../../utils/valid.util";
import { useToast } from "../../../contexts/toast.context";
import { genders } from "../../../constants/gender.constant";

import type { DepartmentResponse } from "../../../responses/department.response";

import { createDoctor } from "../../../services/doctor.service";

import useCallApi from "../../../hooks/useCallApi";

type AddDoctorProps = {
    setIsOpenCreateDoctor: (isOpenCreateDoctor: boolean) => void,
    departments: DepartmentResponse[]
    onSuccess?: () => void;
}

const AddDoctor = (props: AddDoctorProps) => {
    const { setIsOpenCreateDoctor, departments, onSuccess } = props;

    const { execute, notify, loading } = useCallApi();
    const { showToast } = useToast();

    const [submitData, setSubmitData] = useState({
        image: "",
        email: "",
        password: "",
        passwordConfirm: "",
        fullName: "",
        birthDate: "",
        gender: "",
        departmentId: "",
        degree: "",
        phone: ""
    });

    const handleChangeSubmit = (field: keyof typeof submitData, value: string) => {
        setSubmitData(prev => ({ ...prev, [field]: value }));
    }

    const [selectedImage, setSelectedImage] = useState<string>("");
    const [imageFile, setImageFile] = useState<File | null>(null);

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        const validFile = validImageFile(file!);
        if (!validFile.isValid) {
            showToast("Cảnh báo", validFile.errorMessage, "warning");
            return;
        }
        if (file && validFile.isValid) {
            setImageFile(file);
            const reader = new FileReader();
            reader.onload = (event) => {
                setSelectedImage(event.target?.result as string);
            };
            reader.readAsDataURL(file);
            handleChangeSubmit("image", file as unknown as string);
        }
    };

    const handleClose = () => {
        setSelectedImage("");
        setImageFile(null);
        setIsOpenCreateDoctor(false);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const restResponse = await execute(createDoctor(submitData));
        notify(restResponse!, "Tạo bác sĩ thành công");
        if (restResponse?.result) {
            handleClose();
            onSuccess?.();
        }
    };

    return (
        <div className="fixed inset-0 bg-gray-500/50 bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-3xl mx-4">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-bold text-gray-800">Tạo bác sĩ</h2>
                    <button
                        onClick={handleClose}
                        className="text-gray-500 hover:text-gray-700 text-xl w-8 h-8 flex items-center justify-center"
                    >
                        x
                    </button>
                </div>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="flex gap-2 items-center">
                        <div className="flex-1 flex flex-col gap-2">
                            <div className="flex justify-center relative">
                                {selectedImage ? (
                                    <div className="relative">
                                        <img
                                            src={selectedImage}
                                            alt="Preview"
                                            className="w-40 h-40 object-cover rounded-md border border-gray-300"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => {
                                                setSelectedImage("");
                                                setImageFile(null);
                                            }}
                                            className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm hover:bg-red-600 transition-colors"
                                        >
                                            x
                                        </button>
                                    </div>
                                ) : (
                                    <div className="w-40 h-40 bg-gray-100 rounded-md border border-gray-300 flex items-center justify-center">
                                        <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                        </svg>
                                    </div>
                                )}
                            </div>
                            <div className="relative">
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Ảnh đại diện *
                                </label>
                                <input
                                    className="w-full border border-gray-300 rounded-md px-2 py-1 text-sm file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                                    type="file"
                                    accept=".png,.jpg,.jpeg,image/png,image/jpg,image/jpeg"
                                    onChange={handleImageChange}
                                />
                                <p className="text-xs text-gray-500 mt-1">Chỉ chấp nhận file PNG, JPG (tối đa 5MB)</p>
                            </div>
                        </div>
                        <div className="flex-1 flex gap-2 flex-col">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Email tài khoản *
                                </label>
                                <div className="relative">
                                    <input
                                        type="text"
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        placeholder="Nhập email"
                                        required
                                        value={submitData.email}
                                        onChange={(e) => handleChangeSubmit("email", e.target.value)}
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Mật khẩu *
                                </label>
                                <div className="relative">
                                    <input
                                        type="password"
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        placeholder="Nhập mật khẩu"
                                        required
                                        value={submitData.password}
                                        onChange={(e) => handleChangeSubmit("password", e.target.value)}
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Mật khẩu xác nhận *
                                </label>
                                <div className="relative">
                                    <input
                                        type="password"
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        placeholder="Nhập mật khẩu xác nhận"
                                        required
                                        value={submitData.passwordConfirm}
                                        onChange={(e) => handleChangeSubmit("passwordConfirm", e.target.value)}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                    <hr className="text-gray-400 mb-2" />

                    <div className="space-y-4">
                        <h2 className="text-lg font-semibold text-gray-800 mb-2">Thông tin bác sĩ</h2>
                        <div className="flex gap-2">
                            <div className="flex-1">
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Họ và tên *
                                </label>
                                <div className="relative">
                                    <input
                                        type="text"
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        placeholder="Nhập họ và tên"
                                        required
                                        value={submitData.fullName}
                                        onChange={(e) => handleChangeSubmit("fullName", e.target.value)}
                                    />
                                </div>
                            </div>

                            <div className="flex-1">
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Ngày sinh *
                                </label>
                                <input
                                    type="date"
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    required
                                    value={submitData.birthDate}
                                    onChange={(e) => handleChangeSubmit("birthDate", e.target.value)}
                                />
                            </div>
                        </div>
                        <div className="flex gap-2">
                            <div className="flex-1">
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Giới tính *
                                </label>
                                <select
                                    className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                                    value={submitData.gender}
                                    onChange={(e) => handleChangeSubmit("gender", e.target.value)}
                                >
                                    <option value="">Chọn giới tính</option>
                                    {genders.map((gender) => (
                                        <option key={gender.id} value={gender.value}>
                                            {gender.name}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div className="flex-1">
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Khoa khám bệnh *
                                </label>
                                <select
                                    className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                                    value={submitData.departmentId}
                                    onChange={(e) => handleChangeSubmit("departmentId", e.target.value)}
                                >
                                    <option value="">Chọn khoa khám bệnh</option>
                                    {departments && departments.length > 0 ? (
                                        departments.map((department) => (
                                            <option key={department.id} value={department.id}>
                                                {department.name}
                                            </option>
                                        ))
                                    ) : (
                                        <option disabled>Không có khoa nào</option>
                                    )}
                                </select>
                            </div>
                        </div>

                        <div className="flex gap-2">
                            <div className="flex-1">
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Trình độ *
                                </label>
                                <input
                                    type="text"
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder="Nhập trình độ"
                                    required
                                    value={submitData.degree}
                                    onChange={(e) => handleChangeSubmit("degree", e.target.value)}
                                />
                            </div>
                            <div className="flex-1">
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Số điện thoại *
                                </label>
                                <input
                                    type="text"
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder="Nhập số điện thoại"
                                    required
                                    value={submitData.phone}
                                    onChange={(e) => handleChangeSubmit("phone", e.target.value)}
                                />
                            </div>
                        </div>
                    </div>

                    <div className="flex gap-3 pt-4">
                        <button
                            type="button"
                            onClick={handleClose}
                            className="flex-1 px-4 py-2 text-gray-600 border border-gray-300 rounded-md hover:bg-gray-50 transition"
                        >
                            Đóng
                        </button>
                        <button
                            type="submit"
                            disabled={loading}
                            className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition disabled:opacity-50"
                        >
                            {loading ? "Đang thêm..." : "Thêm bác sĩ"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
};

export default AddDoctor;