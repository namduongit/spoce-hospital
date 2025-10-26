import { useEffect, useState } from "react";
import { doctorStatus } from "../../../constants/status.constant";

import type { DoctorResponse } from "../../../responses/doctor.response";
import type { DepartmentResponse } from "../../../responses/department.response";

import { updateDoctor } from "../../../services/doctor.service";

import useCallApi from "../../../hooks/useCallApi";
import { validImageFile } from "../../../utils/valid.util";
import { useToast } from "../../../contexts/toast.context";
import { genders } from "../../../constants/gender.constant";

type EditDoctor = {
    doctorSelect: DoctorResponse,
    departments: DepartmentResponse[],
    setShowEdit: (showEdit: boolean) => void,
    onSuccess?: () => void
}

const EditDoctor = (props: EditDoctor) => {
    const { doctorSelect, setShowEdit, departments, onSuccess } = props;
    const { execute, notify, loading } = useCallApi();
    const { showToast } = useToast();

    const [submitData, setSubmitData] = useState({
        image: "",
        fullName: "",
        gender: "",
        phone: "",
        birthDate: "",

        degree: "",
        status: "",

        departmentId: "",
    });

    const handleChangeSubmit = (field: keyof typeof submitData, value: string) => {
        setSubmitData(prev => ({ ...prev, [field]: value }));
    }

    useEffect(() => {
        setSubmitData({
            image: doctorSelect.image ?? "",
            fullName: doctorSelect.fullName ?? "",
            gender: doctorSelect.gender ?? "",
            phone: doctorSelect.phone ?? "",
            birthDate: doctorSelect.birthDate ?? "",
            degree: doctorSelect.degree ?? "",
            status: doctorSelect.status ?? "",
            departmentId: doctorSelect.departmentId != null ? String(doctorSelect.departmentId) : "",
        });
    }, [doctorSelect]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const restResponse = await execute(updateDoctor(doctorSelect.id, submitData));
        notify(restResponse!, "Cập nhật bác sĩ thành công");
        if (restResponse?.result) {
            onSuccess?.();
            setShowEdit(false);
        }
    }

    const [selectedImage, setSelectedImage] = useState<string>("");

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        const validFile = validImageFile(file!);
        if (!validFile.isValid) {
            showToast("Cảnh báo", validFile.errorMessage, "warning");
            return;
        }
        if (file && validFile.isValid) {
            const reader = new FileReader();
            reader.onload = (event) => {
                setSelectedImage(event.target?.result as string);
                setSubmitData(prev => ({ ...prev, image: event.target?.result as string }));
            };
            reader.readAsDataURL(file);
            handleChangeSubmit("image", file as unknown as string);
        }
    };

    return (
        <div className="fixed top-0 start-0 bg-gray-400/60 w-full h-full z-10 flex justify-center items-center">
            <div className="bg-white rounded-lg p-6 w-full max-w-4xl mx-4">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-bold text-gray-800">Sửa thông tin bác sĩ - # {doctorSelect.id}</h2>
                    <button
                        onClick={() => setShowEdit(false)}
                        className="text-gray-500 hover:text-gray-700 text-xl"
                    >
                        x
                    </button>
                </div>
                <form className="flex gap-10 items-center" onSubmit={handleSubmit} >
                    <div className="flex-3">
                        <div className="flex justify-center relative">
                            {(selectedImage || submitData.image) ? (
                                <div className="relative">
                                    <img
                                        src={selectedImage || submitData.image}
                                        alt="Preview"
                                        className="w-40 h-40 object-cover rounded-md border border-gray-300"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => {
                                            setSelectedImage("");
                                            setSubmitData(prev => ({ ...prev, image: "" }));
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
                    <div className="space-y-4 flex-5">
                        <div className="flex gap-2">
                            <div className="flex-1">
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Email tài khoản
                                </label>
                                <div className="relative">
                                    <input
                                        type="email"
                                        className="w-full px-3 py-2 border text-gray-600 border-gray-300 bg-gray-50 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        disabled
                                        value={doctorSelect.email}
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="flex gap-2">
                            <div className="flex-1">
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Tên bác sĩ
                                </label>
                                <div className="relative">
                                    <input
                                        type="text"
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        value={submitData.fullName}
                                        placeholder="Nhập họ và tên"
                                        onChange={(e) => handleChangeSubmit("fullName", e.target.value)}
                                    />
                                </div>
                            </div>
                            <div className="flex-1">
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Giới tính
                                </label>
                                <select
                                    name="role"
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                        </div>

                        <div className="flex gap-2">
                            <div className="flex-1">
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Ngày sinh
                                </label>
                                <div className="relative">
                                    <input
                                        type="date"
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        value={submitData.birthDate}
                                        onChange={(e) => handleChangeSubmit("birthDate", e.target.value)}
                                    />
                                </div>
                            </div>
                            <div className="flex-1">
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Số điện thoại
                                </label>
                                <div className="relative">
                                    <input
                                        type="tel"
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        placeholder="0123 456 789"
                                        value={submitData.phone}
                                        onChange={(e) => handleChangeSubmit("phone", e.target.value)}
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="flex gap-2">
                            <div className="flex-1">
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Khoa khám *
                                </label>
                                <select
                                    name="role"
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    value={submitData.departmentId}
                                    onChange={(e) => handleChangeSubmit("departmentId", e.target.value)}
                                >
                                    <option value="">Chọn khoa khám</option>
                                    {departments.map((department) => (
                                        <option key={department.id} value={department.id}>
                                            {department.name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className="flex-1">
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Trạng thái *
                                </label>
                                <select
                                    name="role"
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    value={submitData.status}
                                    onChange={(e) => handleChangeSubmit("status", e.target.value)}
                                >
                                    <option value="">Chọn trạng thái</option>
                                    {doctorStatus.map((status) => (
                                        <option key={status.id} value={status.value}>
                                            {status.name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        <div className="relative">
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Học vị
                            </label>
                            <div className="relative">
                                <input
                                    type="text"
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder="Thạc sĩ, Tiến sĩ..."
                                    value={submitData.degree}
                                    onChange={(e) => handleChangeSubmit("degree", e.target.value)}
                                />
                            </div>
                        </div>

                        <div className="flex gap-3 pt-4">
                            <button
                                type="button"
                                className="flex-1 px-4 py-2 text-gray-600 border border-gray-300 rounded-md hover:bg-gray-50 transition"
                                onClick={() => setShowEdit(false)}
                            >
                                Hủy
                            </button>
                            <button
                                type="submit"
                                className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition disabled:opacity-50"
                                disabled={loading}
                            >
                                {loading ? "Đang cập nhật ..." : "Lưu thay đổi"}
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )

};

export default EditDoctor;
