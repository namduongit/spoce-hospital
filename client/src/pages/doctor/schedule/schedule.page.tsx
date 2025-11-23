import { useEffect, useState } from "react";
import { timeSlots, weekDate } from "../../../constants/day.constant";
import { getDoctorProfile } from "../../../services/doctor.service";
import useCallApi from "../../../hooks/useCallApi";
import type { DoctorDetailResponse } from "../../../responses/user.response";

const DoctorSchedulePage = () => {
    const { execute } = useCallApi();

    const [profile, setProfile] = useState<DoctorDetailResponse>({} as DoctorDetailResponse);
    const [schedule, setSchedule] = useState<{ [key: string]: string[] }>({});

    const handleGetProfile = async () => {
        const restResponse = await execute(getDoctorProfile());
        if (restResponse?.result) {
            const data: DoctorDetailResponse = restResponse.data;
            setProfile(data);
            
            // Parse workDay to schedule
            const workDay = data.profile?.workDay ?? "";
            const rows = workDay.trim().split("<br/>").map(row => row.trim());
            const parsedSchedule: { [key: string]: string[] } = {};

            rows.forEach(row => {
                const [day, times] = row.split(";");
                if (day && times) {
                    const timeRanges = times.trim().split(",").map(time => time.trim());
                    parsedSchedule[day.trim()] = timeRanges;
                }
            });

            setSchedule(parsedSchedule);
        }
    };

    useEffect(() => {
        handleGetProfile();
    }, []);

    const isHasWork = (day: string) => {
        return schedule[day] && schedule[day].length > 0;
    };

    const getStatusBadgeColor = (status: string) => {
        switch (status) {
            case "AVAILABLE":
                return "bg-green-100 text-green-800";
            case "BUSY":
                return "bg-orange-100 text-orange-800";
            case "OFFLINE":
                return "bg-red-100 text-red-800";
            default:
                return "bg-gray-100 text-gray-800";
        }
    };

    const getStatusText = (status: string) => {
        switch (status) {
            case "AVAILABLE":
                return "Sẵn sàng";
            case "BUSY":
                return "Bận";
            case "OFFLINE":
                return "Offline";
            default:
                return "Không xác định";
        }
    };

    // Count total working sessions
    const totalWorkingSessions = Object.values(schedule).reduce((sum, sessions) => sum + sessions.length, 0);

    return (
        <main className="schedule-page p-4 sm:p-6">
            <div className="schedule-page__wrap max-w-full">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
                    <div>
                        <h3 className="text-xl sm:text-2xl font-bold text-blue-700">
                            Lịch làm việc của tôi
                        </h3>
                        <p className="text-sm text-gray-600 mt-1">
                            Xem lịch làm việc trong tuần
                        </p>
                    </div>
                    <div className="mt-3 sm:mt-0">
                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusBadgeColor(profile.profile?.status || "")}`}>
                            <i className="fa-solid fa-circle-dot mr-1"></i>
                            {getStatusText(profile.profile?.status || "")}
                        </span>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                    <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
                        <div className="flex items-center">
                            <div className="p-2 bg-blue-100 rounded-lg">
                                <i className="fa-solid fa-user-md text-blue-600 text-xl"></i>
                            </div>
                            <div className="ml-3">
                                <p className="text-sm text-gray-600">Bác sĩ</p>
                                <p className="text-lg font-semibold truncate">{profile.profile?.fullName || "..."}</p>
                            </div>
                        </div>
                    </div>
                    <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
                        <div className="flex items-center">
                            <div className="p-2 bg-purple-100 rounded-lg">
                                <i className="fa-solid fa-building text-purple-600 text-xl"></i>
                            </div>
                            <div className="ml-3">
                                <p className="text-sm text-gray-600">Khoa</p>
                                <p className="text-lg font-semibold truncate">{profile.profile?.departmentName || "..."}</p>
                            </div>
                        </div>
                    </div>
                    <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
                        <div className="flex items-center">
                            <div className="p-2 bg-green-100 rounded-lg">
                                <i className="fa-solid fa-calendar-check text-green-600 text-xl"></i>
                            </div>
                            <div className="ml-3">
                                <p className="text-sm text-gray-600">Số ca làm</p>
                                <p className="text-lg font-semibold">{totalWorkingSessions} ca/tuần</p>
                            </div>
                        </div>
                    </div>
                    <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
                        <div className="flex items-center">
                            <div className="p-2 bg-orange-100 rounded-lg">
                                <i className="fa-solid fa-calendar-days text-orange-600 text-xl"></i>
                            </div>
                            <div className="ml-3">
                                <p className="text-sm text-gray-600">Số ngày làm</p>
                                <p className="text-lg font-semibold">{Object.keys(schedule).length} ngày/tuần</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6 flex items-start space-x-3">
                    <i className="fa-solid fa-info-circle text-blue-600 text-xl mt-0.5"></i>
                    <div>
                        <p className="text-sm text-blue-800">
                            <strong>Lưu ý:</strong> Đây là lịch làm việc được cấu hình bởi quản trị viên. 
                            Nếu cần thay đổi, vui lòng liên hệ với quản lý.
                        </p>
                    </div>
                </div>

                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-6">
                    <div className="flex flex-wrap gap-6 items-center">
                        <h4 className="font-semibold text-gray-700">Chú thích:</h4>
                        <div className="flex gap-2 items-center">
                            <div className="w-6 h-6 bg-green-300 rounded border border-green-400"></div>
                            <span className="text-sm font-medium text-gray-700">Ca làm việc</span>
                        </div>
                        <div className="flex gap-2 items-center">
                            <div className="w-6 h-6 bg-gray-100 rounded border border-gray-300"></div>
                            <span className="text-sm font-medium text-gray-700">Thời gian trống</span>
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="bg-blue-600 text-white font-medium">
                                    <th className="px-6 py-3 border-2 border-white text-left min-w-[120px]">
                                        <i className="fa-solid fa-clock mr-2"></i>
                                        Giờ / Ngày
                                    </th>
                                    {weekDate.map((day) => (
                                        <th className="px-8 py-3 border-2 border-white text-center min-w-[100px]" key={day}>
                                            {day}
                                        </th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {timeSlots.map((time, index) => (
                                    <tr key={index} className="hover:bg-gray-50 transition-colors">
                                        <td className="py-3 px-4 text-center border-2 border-white font-medium bg-gray-50 text-gray-700">
                                            {time.name}
                                        </td>

                                        {weekDate.map((day) => {
                                            const hasWork = isHasWork(day);
                                            if (!hasWork) {
                                                return (
                                                    <td 
                                                        key={day} 
                                                        className="border-2 border-white text-center bg-gray-100 h-12"
                                                    >
                                                    </td>
                                                );
                                            }
                                            const timeRanges = schedule[day];
                                            const isInRange = timeRanges.includes(time.name.replace("Tiết", "").trim());

                                            if (isInRange) {
                                                return (
                                                    <td 
                                                        key={day} 
                                                        className="border-2 border-white text-center bg-green-300 h-12 relative group"
                                                    >
                                                        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                                            <i className="fa-solid fa-check text-green-700"></i>
                                                        </div>
                                                    </td>
                                                );
                                            } else {
                                                return (
                                                    <td 
                                                        key={day} 
                                                        className="border-2 border-white text-center bg-gray-100 h-12"
                                                    >
                                                    </td>
                                                );
                                            }
                                        })}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {Object.keys(schedule).length > 0 && (
                    <div className="mt-6 bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                        <h4 className="font-semibold text-gray-700 mb-4">
                            <i className="fa-solid fa-list-check mr-2 text-blue-600"></i>
                            Chi tiết lịch làm việc
                        </h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {Object.entries(schedule).map(([day, sessions]) => (
                                <div key={day} className="border border-gray-200 rounded-lg p-4 hover:border-blue-300 transition-colors">
                                    <div className="flex items-center mb-2">
                                        <i className="fa-solid fa-calendar text-blue-600 mr-2"></i>
                                        <span className="font-semibold text-gray-800">{day}</span>
                                    </div>
                                    <div className="flex flex-wrap gap-1">
                                        {sessions.map((session, idx) => (
                                            <span 
                                                key={idx} 
                                                className="inline-block px-2 py-1 text-xs font-medium bg-green-100 text-green-800 rounded"
                                            >
                                                Tiết {session}
                                            </span>
                                        ))}
                                    </div>
                                    <p className="text-xs text-gray-500 mt-2">
                                        {sessions.length} ca làm việc
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {Object.keys(schedule).length === 0 && (
                    <div className="mt-6 bg-white rounded-lg shadow-sm border border-gray-200 p-12">
                        <div className="text-center">
                            <i className="fa-solid fa-calendar-xmark text-gray-300 text-5xl mb-4"></i>
                            <p className="text-lg font-medium text-gray-500">Chưa có lịch làm việc</p>
                            <p className="text-sm text-gray-400 mt-2">Vui lòng liên hệ quản trị viên để được cấu hình lịch làm việc</p>
                        </div>
                    </div>
                )}
            </div>
        </main>
    );
};

export default DoctorSchedulePage;
