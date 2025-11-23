import { useEffect, useState } from "react";
import { timeSlots, weekDate } from "../../../constants/day.constant";

import { updateDoctorWorkDay } from "../../../services/doctor.service";

import useCallApi from "../../../hooks/useCallApi";
import type { DoctorResponse } from "../../../responses/doctor.response";

// Import switch input template
// Source: https://getcssscan.com/css-checkboxes-examples
import "../../../assets/css-templates/switch-input.css";

type EditCalendarModal = {
    doctorSelect: DoctorResponse,
    setShowCalendar: (setShowCalendar: boolean) => void,
    onSuccess?: () => void
}

const EditCalendarModal = (props: EditCalendarModal) => {
    const { doctorSelect, setShowCalendar, onSuccess } = props;

    const { execute, notify, loading } = useCallApi();
    const workDay = doctorSelect.workDay ?? "";

    const [editMode, setEditMode] = useState<boolean>(false);
    const [schedule, setSchedule] = useState<{ [key: string]: string[] }>({});

    const isHasWork = (day: string) => {
        return schedule[day] && schedule[day].length > 0;
    }

    const handleClose = () => {
        setShowCalendar(false);
    }

    const handleClear = () => {
        if (!editMode) return;
        setSchedule({});
    }

    const handleEditSchedule = (time: string, day: string) => {
        if (!editMode) return;
        if (schedule[day] && schedule[day].includes(time)) {
            const scheduleRanges = schedule[day].filter(s => s !== time);
            setSchedule(prev => ({ ...prev, [day]: scheduleRanges }));

        } else {
            const scheduleRanges = schedule[day] || [];
            scheduleRanges.push(time);
            scheduleRanges.sort()
            setSchedule(prev => ({ ...prev, [day]: scheduleRanges }));
        }
    }

    const handleConcatSchedule = () => {
        var scheduleString = "";
        for (let day in schedule) {
            scheduleString += day + "; " + schedule[day].join(", ") + "<br/>";
        }
        return scheduleString;
    }

    const handleSubmit = async () => {
        const restResponse = await execute(updateDoctorWorkDay(doctorSelect.id, handleConcatSchedule()));
        notify(restResponse!, "Cập nhật lịch làm việc thành công");
        if (restResponse?.result) {
            setShowCalendar(false);
            onSuccess?.();
        }
    }

    useEffect(() => {
        const rows = workDay.trim().split("<br/>").map(row => row.trim());
        const schedule: { [key: string]: string[] } = {};

        rows.forEach(rows => {
            const [day, times] = rows.split(";");
            if (day && times) {
                const timeRanges = times.trim().split(",").map(time => time.trim());
                schedule[day.trim()] = timeRanges;
            }
        });

        setSchedule(schedule);
    }, []);

    return (
        <div className="space-y-2 fixed top-0 start-0 bg-gray-900/50 w-full h-full z-50 flex justify-center items-center p-4">
            <div className="bg-white px-4 sm:px-6 py-5 space-y-5 rounded-xl shadow-2xl max-w-6xl w-full max-h-[95vh] overflow-y-auto">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between pb-4 border-b border-gray-200">
                    <div className="flex-1">
                        <h2 className="text-xl sm:text-2xl font-bold text-blue-700 flex items-center">
                            <i className="fa-solid fa-calendar-days mr-2 text-blue-600"></i>
                            Lịch làm việc của bác sĩ
                        </h2>
                        <p className="text-sm text-gray-600 mt-1">
                            <i className="fa-solid fa-user-md mr-1"></i>
                            {doctorSelect.fullName}
                        </p>
                    </div>
                    <button
                        onClick={handleClose}
                        className="text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full w-10 h-10 flex items-center justify-center transition-colors absolute top-4 right-4 sm:relative sm:top-0 sm:right-0"
                        title="Đóng"
                    >
                        <i className="fa-solid fa-times text-xl"></i>
                    </button>
                </div>

                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
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
                        <div className={`transition-all duration-300 rounded-lg px-4 py-2`}>
                            <label className="flex gap-3 items-center cursor-pointer">
                                <span className={`font-semibold transition-colors`}>
                                    {editMode ? 'Đang chỉnh sửa' : 'Chế độ xem'}
                                </span>

                                {/* <input type="checkbox" value="" className="sr-only peer" checked={editMode} onChange={() => setEditMode(!editMode)} />
                                <div className="relative w-14 h-7 bg-gray-300 
                                    peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300
                                    rounded-full peer 
                                    peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full 
                                    peer-checked:after:border-white after:content-[''] after:absolute after:top-[3px] 
                                    after:start-[3px] after:bg-white after:border-gray-300 after:border after:rounded-full 
                                    after:h-5 after:w-5 after:transition-all after:shadow-md
                                    peer-checked:bg-blue-600 hover:peer-checked:bg-blue-700"
                                    
                                >
                                </div> */}
                                <div className="checkbox-wrapper-14">
                                    <input id="s1-14" type="checkbox" className="switch" checked={editMode} onChange={() => setEditMode(!editMode)} />
                                    {/* <label htmlFor="s1-14">Switch</label> */}
                                </div>
                            </label>
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="bg-blue-600 text-white font-medium">
                                    <th className="px-4 sm:px-6 py-3 border-2 border-white text-left min-w-[100px] sm:min-w-[120px]">
                                        <i className="fa-solid fa-clock mr-2"></i>
                                        Giờ / Ngày
                                    </th>
                                    {weekDate.map((day) => (
                                        <th className="px-4 sm:px-8 py-3 border-2 border-white text-center min-w-[80px] sm:min-w-[100px]" key={day}>
                                            {day}
                                        </th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {timeSlots.map((time, index) => (
                                    <tr key={index} className={`transition-colors ${editMode ? 'hover:bg-blue-50' : 'hover:bg-gray-50'}`}>
                                        <td className="py-3 px-4 text-center border-2 border-white font-medium bg-gray-50 text-gray-700">
                                            {time.name}
                                        </td>

                                        {weekDate.map((day) => {

                                            const hasWork = isHasWork(day);
                                            if (!hasWork) {
                                                return (
                                                    <td key={day} className={`border-2 border-white text-center bg-gray-100 h-12 ${editMode ? 'cursor-pointer hover:bg-blue-100 hover:ring-2 hover:ring-inset hover:ring-blue-400' : ''}`}
                                                        onClick={() => handleEditSchedule(time.name.replace("Tiết", "").trim(), day)}
                                                    >

                                                    </td>
                                                )
                                            }
                                            const timeRanges = schedule[day];
                                            const isInRange = timeRanges.includes(time.name.replace("Tiết", "").trim());

                                            if (isInRange) {
                                                return (
                                                    <td key={day} className={`border-2 border-white text-center bg-green-300 h-12 relative group ${editMode ? 'cursor-pointer hover:bg-green-400 hover:ring-2 hover:ring-inset hover:ring-green-600' : ''}`}
                                                        onClick={() => handleEditSchedule(time.name.replace("Tiết", "").trim(), day)}
                                                    >
                                                        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                                            <i className={`fa-solid ${editMode ? 'fa-times text-red-600' : 'fa-check text-green-700'}`}></i>
                                                        </div>
                                                    </td>
                                                );
                                            } else {
                                                return (
                                                    <td key={day} className={`border-2 border-white text-center bg-gray-100 h-12 ${editMode ? 'cursor-pointer hover:bg-blue-100 hover:ring-2 hover:ring-inset hover:ring-blue-400' : ''}`}
                                                        onClick={() => handleEditSchedule(time.name.replace("Tiết", "").trim(), day)}
                                                    >
                                                        {editMode && (
                                                            <div className="opacity-0 hover:opacity-100 transition-opacity">
                                                                <i className="fa-solid fa-plus text-gray-400"></i>
                                                            </div>
                                                        )}
                                                    </td>
                                                )
                                            }
                                        })}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                <div className="flex flex-col sm:flex-row justify-end gap-3 pt-4 border-t border-gray-200">
                    <button
                        type="button"
                        onClick={handleClose}
                        className="px-6 py-2.5 text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 hover:border-gray-400 transition font-medium"
                    >
                        Hủy
                    </button>
                    <button
                        type="button"
                        onClick={handleClear}
                        disabled={!editMode || loading}
                        className={`px-6 py-2.5 rounded-lg transition font-medium ${!editMode || loading
                            ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                            : 'bg-red-600 text-white hover:bg-red-700 hover:shadow-lg'
                            }`}
                    >
                        Xóa hết
                    </button>
                    <button
                        type="submit"
                        className={`px-6 py-2.5 rounded-lg transition font-medium ${loading
                            ? 'bg-gray-400 text-white cursor-not-allowed'
                            : 'bg-blue-600 text-white hover:bg-blue-700 hover:shadow-lg'
                            }`}
                        onClick={handleSubmit}
                        disabled={loading}
                    >
                        {loading ? (
                            "Đang cập nhật..."
                        ) : (
                            "Cập nhật lịch"
                        )}
                    </button>
                </div>
            </div>
        </div>
    )
}
export default EditCalendarModal;


/** Backup handle Schedule
 * @author: namduongit

- Data: 
const workDay = `
    Thứ 2; tiết 1 đến 5, tiết 6 đến 7 <br/>
    Thứ 3; tiết 1 đến 5, tiết 7 đến 8 <br/>
    Thứ 4; tiết 1 đến 5 <br/>
`;

- useEffect:
useEffect(() => {
    const rows = workDay.trim().split("<br/>").map(row => row.trim());
    const schedule: { [key: string]: string[] } = {};

    rows.forEach(rows => {
        const [day, times] = rows.split(";");
        if (day && times) {
            const timeRanges = times.trim().split(",").map(time => time.replace("tiết", "").trim());
            schedule[day.trim()] = timeRanges;
        }
    });

    setSchedule(schedule);
}, []);

- Function
const isHasWork = (day: string) => {
    return schedule[day] && schedule[day].length > 0;
}

- Table
const hasWork = isHasWork(day);
if (!hasWork) {
    return (
        <td key={day} className="border-2 border-e border-white last:border-e-0 text-center bg-gray-100">

        </td>
    )
}
const timeRanges = schedule[day];
const isInRange = timeRanges.some(range => {
    const [start, end] = range.split("đến").map(t => t.trim());
    const startNum = parseInt(start);
    const endNum = parseInt(end);
    const currentNum = parseInt(time.name.replace("Tiết", "").trim());
    return currentNum >= startNum && currentNum <= endNum;
});

if (isInRange) {
    return (
        <td key={day} className="border-2 border-e border-white last:border-e-0 text-center bg-green-300"></td>
    );
} else {
    return (
        <td key={day} className="border-2 border-e border-white last:border-e-0 text-center bg-gray-100"></td>
    )
}
 * 
 * 
 */