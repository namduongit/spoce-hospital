import { useEffect, useState } from "react";
import { appointmentStatus } from "../../../constants/status.constant";

import type { AppointmentResponse } from "../../../responses/appointment.response";
import type { DepartmentResponse } from "../../../responses/department.response";
import type { RoomResponse } from "../../../responses/room.response";
import type { DoctorResponse } from "../../../responses/doctor.response";

import { updateAppointment } from "../../../services/appointment.service";

import useCallApi from "../../../hooks/useCallApi";

type EditAppointment = {
    appointmentSelect: AppointmentResponse,
    departments: DepartmentResponse[],
    rooms: RoomResponse[],
    doctors: DoctorResponse[],
    setShowEdit: (showEdit: boolean) => void,
    onSuccess?: () => void
}

const EditAppointment = (props: EditAppointment) => {
    const { appointmentSelect, setShowEdit, departments, rooms, doctors, onSuccess } = props;

    const { execute, notify, loading } = useCallApi();

    const [isSuccess, setIsSuccess] = useState<boolean>(false);

    const [submitData, setSubmitData] = useState({
        phone: "",
        departmentId: "",
        doctorId: "",
        roomId: "",
        time: "",
        note: "",
        status: ""
    });

    const handleFormChange = (field: keyof typeof submitData, value: string) => {
        setSubmitData(prev => ({ ...prev, [field]: value }));
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const restResponse = await execute(updateAppointment(appointmentSelect.id, submitData));
        notify(restResponse!, "Cập nhật lịch khám thành công");
        if (restResponse?.result) {
            onSuccess?.();
            setShowEdit(false);
        }
    }

    const handleClose = () => {
        setSubmitData({
            phone: "",
            departmentId: "",
            doctorId: "",
            roomId: "",
            time: "",
            note: "",
            status: ""
        });
        setShowEdit(false);
    }

    useEffect(() => {
        setSubmitData({
            phone: appointmentSelect.phone,

            departmentId: appointmentSelect.departmentId?.toString(),
            doctorId: appointmentSelect.doctorId?.toString(),
            roomId: appointmentSelect.roomId?.toString(),

            time: appointmentSelect.time,
            note: appointmentSelect.note,
            status: appointmentSelect.status
        });
        setIsSuccess(appointmentSelect.status == "COMPLETED" || appointmentSelect.status == "CANCELLED");
    }, [appointmentSelect]);

    return (
        <div className="fixed top-0 start-0 bg-gray-400/60 w-full h-full z-10 flex justify-center items-center">
            <div className="bg-white rounded-lg p-6 w-full max-w-2xl mx-4">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-bold text-gray-800">Sửa lịch khám - # {appointmentSelect.id}</h2>
                    <button
                        onClick={handleClose}
                        className="text-gray-500 hover:text-gray-700 text-xl"
                    >
                        x
                    </button>
                </div>
                <form className="space-y-4" onSubmit={handleSubmit}>
                    <div className="flex gap-2">
                        <div className="flex-1">
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Họ tên bệnh nhân
                            </label>
                            <div className="relative">
                                <input
                                    type="text"
                                    className="w-full px-3 py-2 border text-gray-600 border-gray-300 bg-gray-50 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    disabled
                                    value={appointmentSelect.fullName}
                                />
                            </div>
                        </div>
                        <div className="flex-1">
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Số điện thoại
                            </label>
                            <div className="relative">
                                <input
                                    type="text"
                                    className={`w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500
                                    ${isSuccess ? "bg-gray-50" : "bg-white"}`}
                                    disabled={isSuccess}
                                    value={submitData.phone}
                                    onChange={(e) => handleFormChange("phone", e.target.value)}
                                />
                            </div>
                        </div>
                    </div>

                    <div className="flex gap-2">
                        <div className="flex-1">
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Khoa khám
                            </label>
                            <select
                                name="role"
                                className={`w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500
                                    ${isSuccess ? "bg-gray-50" : "bg-white"}`}
                                disabled={isSuccess}
                                value={submitData.departmentId}
                                onChange={(e) => handleFormChange("departmentId", e.target.value)}
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
                                Trạng thái
                            </label>
                            <select
                                name="role"
                                className={`w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500
                                    ${isSuccess ? "bg-gray-50" : "bg-white"}`}
                                disabled={isSuccess}
                                value={submitData.status}
                                onChange={(e) => handleFormChange("status", e.target.value)}
                            >
                                <option value="">Chọn trạng thái</option>
                                {appointmentStatus.map((status) => (
                                    <option key={status.id} value={status.value}>
                                        {status.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>

                    <div className="flex gap-2">
                        <div className="flex-1">
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Bác sĩ
                            </label>
                            <select
                                name="role"
                                className={`w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500
                                    ${isSuccess ? "bg-gray-50" : "bg-white"}`}
                                disabled={isSuccess}
                                value={submitData.doctorId}
                                onChange={(e) => handleFormChange("doctorId", e.target.value)}
                            >
                                <option value="">Chọn bác sĩ</option>
                                {doctors.map((doctor) => (
                                    <option key={doctor.id} value={doctor.id}>
                                        {doctor.fullName}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="flex-1">
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Phòng khám
                            </label>
                            <select
                                name="role"
                                className={`w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500
                                    ${isSuccess ? "bg-gray-50" : "bg-white"}`}
                                disabled={isSuccess}
                                value={submitData.roomId}
                                onChange={(e) => handleFormChange("roomId", e.target.value)}
                            >
                                <option value="">Chọn phòng khám</option>
                                {rooms.map((room) => (
                                    <option key={room.id} value={room.id}>
                                        {room.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Thời gian
                        </label>
                        <div className="relative">
                            <input
                                className={`w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500
                                    ${isSuccess ? "bg-gray-50" : "bg-white"}`}
                                disabled={isSuccess}
                                value={submitData.time}
                                onChange={(e) => handleFormChange("time", e.target.value)}
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Ghi chú
                        </label>
                        <textarea
                            className={`w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500
                                    ${isSuccess ? "bg-gray-50" : "bg-white"}`}
                            disabled={isSuccess} rows={3}
                            value={submitData.note}
                            onChange={(e) => handleFormChange("note", e.target.value)}
                        >

                        </textarea>
                    </div>


                    <div className="flex gap-3 pt-4">
                        <button
                            type="button"
                            className="flex-1 px-4 py-2 text-gray-600 border border-gray-300 rounded-md hover:bg-gray-50 transition"
                            onClick={handleClose}
                        >
                            Hủy
                        </button>
                        <button
                            type="submit"
                            className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition disabled:opacity-50"
                            disabled={loading}
                        >
                            {loading ? "Đang cập nhật..." : "Lưu thay đổi"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )

};

export default EditAppointment;
