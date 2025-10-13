import { motion } from "motion/react";
import { formatNumberPhone } from "../../../utils/formatNumber.util";
import { formatDateVi } from "../../../utils/formatDate.util";
import { useState } from "react";
import EditCalendarModal from "../edits/calendar.edit";
import type { DoctorResponse } from "../../../responses/doctor.response";

type DoctorDetail = {
    doctorSelect: DoctorResponse,
    setShowDetail: (showDetail: boolean) => void,
    onSuccess?: () => void,
}

const DoctorDetail = (props: DoctorDetail) => {
    const { doctorSelect, setShowDetail, onSuccess } = props;
    
    const [showCalendar, setShowCalendar] = useState<boolean>(false);

    const getStatusColor = (status: string) => {
        return status === 'AVAILABLE' ? 'bg-green-100 text-green-800' :
            status === 'OFFLINE' ? 'bg-red-100 text-red-800' :
                status === 'BUSY' ? 'bg-yellow-100 text-yellow-800' : '';
    }

    return (
        <div className="fixed top-0 start-0 bg-gray-400/60 w-full h-full z-10">
            <motion.div
                initial={{
                    x: 650
                }}
                animate={{
                    x: 0
                }}
                transition={{
                    duration: 0.5,
                    type: "spring"
                }}
                className="fixed top-0 end-0 w-150 bg-white rounded shadow-2xl h-full">
                <div className="admin-detail__content relative">
                    <div className="close-btn absolute top-0 start-0 cursor-pointer z-20" onClick={() => setShowDetail(false)}>
                        <i className="fa-solid fa-angles-right text-xl text-white p-3"></i>
                    </div>

                    <div className="flex items-center px-5 py-5 pt-10 gap-3 bg-indigo-600 text-white">
                        <div className="text-2xl bg-gray-300/50 px-2 py-2 rounded-full">
                            <i className="fa-solid fa-user-circle"></i>
                        </div>
                        <div className="font-bold">
                            <p className="flex gap-2">ID bác sĩ:
                                <span># {doctorSelect.id}</span>
                            </p>
                            <p className="flex gap-2">Trạng thái:
                                <span className={`px-2 py-1 rounded text-xs ${getStatusColor(doctorSelect.status)}`}>
                                    {doctorSelect.status === 'AVAILABLE' ? 'Đang làm' : ''}
                                    {doctorSelect.status === 'OFFLINE' ? 'Tạm nghỉ' : ''}
                                    {doctorSelect.status === 'BUSY' ? 'Đang bận' : ''}
                                </span>
                            </p>
                        </div>
                    </div>

                    <div className="px-5 py-5 flex flex-col gap-5">
                        <div className="flex flex-col gap-5">
                            <div className="px-3 py-3 bg-gray-100 rounded shadow">
                                <div className="flex gap-1 items-center font-bold mb-2">
                                    <i className="fa-solid fa-user-tag text-indigo-600 text-lg"></i>
                                    <span>Thông tin bác sĩ</span>
                                </div>
                                <p className="flex justify-between text-gray-600 font-medium mb-1">
                                    Tên bác sĩ: <span className="text-black">{doctorSelect.fullName ?? "Chưa cập nhật"}</span>
                                </p>
                                <p className="flex justify-between text-gray-600 font-medium mb-1">
                                    Ngày sinh: <span className="text-black">{doctorSelect.birthDate ? formatDateVi(new Date(doctorSelect.birthDate)) : "Chưa cập nhật"}</span>
                                </p>
                                <p className="flex justify-between text-gray-600 font-medium mb-1">
                                    Tài khoản: <span className="text-black">{doctorSelect.email ?? "Chưa cập nhật"}</span>
                                </p>
                                <p className="flex justify-between text-gray-600 font-medium mb-1">
                                    Số điện thoại:
                                    <span className={`font-semibold`}>{doctorSelect.phone ? formatNumberPhone(doctorSelect.phone) : "Chưa cập nhật"}</span>
                                </p>
                                <p className="flex justify-between text-gray-600 font-medium mb-1">
                                    Giới tính: <span className="text-black">{doctorSelect.gender === 'MALE' ? 'Nam' : doctorSelect.gender === 'FEMALE' ? 'Nữ' : 'Khác'}</span>
                                </p>
                            </div>
                        </div>

                        <div className="flex flex-col gap-5">
                            <div className="px-3 py-3 bg-gray-100 rounded shadow">
                                <div className="flex gap-1 items-center font-bold mb-2">
                                    <i className="fa-solid fa-calendar-day text-lg text-green-600"></i>
                                    <span>Thông tin làm việc</span>
                                </div>
                                <p className="flex justify-between text-gray-600 font-medium mb-1">
                                    Bằng cấp: <span className="text-black">{doctorSelect.degree}</span>
                                </p>
                                <p className="flex justify-between text-gray-600 font-medium mb-1">
                                    Mã khoa: <span className="text-black">{doctorSelect.departmentId ?? "Chưa cập nhật"}</span>
                                </p>
                                <p className="flex justify-between text-gray-600 font-medium mb-1">
                                    Tên khoa:
                                    <span className="text-black">{doctorSelect.departmentName ?? "Chưa cập nhật"}</span>
                                </p>

                            </div>
                        </div>

                        <div className="flex gap-2 flex-col">
                            <button className="w-full px-3 py-2 rounded font-bold text-white bg-blue-600 hover:bg-blue-700 shadow cursor-pointer transition-colors flex items-center justify-center gap-2"
                            onClick={() => setShowCalendar(true)}
                            >
                                <i className="fa-solid fa-calendar-days"></i>
                                <span>Thông tin lịch làm việc</span>
                            </button>

                            <button className="w-full px-3 py-2 rounded font-bold text-white bg-green-600 hover:bg-green-700 shadow cursor-pointer transition-colors">
                                Đổi mật khẩu
                            </button>
                        </div>
                    </div>
                </div>
            </motion.div>
            {showCalendar && (<EditCalendarModal setShowCalendar={setShowCalendar} setShowDetail={setShowDetail} workDay={doctorSelect.workDay ?? ""} doctorId={doctorSelect.id} onSuccess={onSuccess} />)}
        </div>
    )
};

export default DoctorDetail;