import { useEffect, useState } from "react";
import { timeSlots, weekDate } from "../../../constants/day.constant";

import { updateDoctorWorkDay } from "../../../services/doctor.service";

import useCallApi from "../../../hooks/useCallApi";
import type { DoctorResponse } from "../../../responses/doctor.response";

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
        <div className="space-y-2 fixed top-0 start-0 bg-gray-400/60 w-full h-full z-10 flex justify-center items-center">
            <div className="bg-white px-10 py-5 space-y-5 rounded-lg shadow-lg">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-bold text-gray-800">Lịch làm việc của bác sĩ</h2>
                    <button
                        onClick={handleClose}
                        className="text-gray-500 hover:text-gray-700 text-xl"
                    >
                        x
                    </button>
                </div>

                <div className="flex justify-between items-center">
                    <div className="flex gap-5 items-center">
                        <div className="flex gap-2 items-center">
                            <div className="w-5 h-5 bg-green-300 rounded"></div>
                            <span className="font-semibold">Làm việc</span>
                        </div>
                        <div className="flex gap-2 items-center">
                            <div className="w-5 h-5 bg-gray-100 rounded"></div>
                            <span className="font-semibold">Trống</span>
                        </div>
                    </div>
                    <div>
                        <label className="flex gap-3 items-center cursor-pointer">
                            <input type="checkbox" value="" className="sr-only peer" onClick={() => setEditMode(!editMode)} />
                            <span className="font-semibold">Sửa</span>
                            <div className="relative w-11 h-6 bg-gray-200 
                            peer-focus:outline-none
                            dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-200 
                            peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full 
                            peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] 
                            after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all 
                            dark:border-gray-700 peer-checked:bg-blue-600 dark:peer-checked:bg-blue-600"></div>
                        </label>
                    </div>
                </div>
                <table className="w-full">
                    <thead>
                        <tr className="bg-gray-900 text-white font-medium">
                            <th className="px-10 py-2 border-2 border-e border-b border-white">Giờ / Ngày</th>
                            {weekDate.map((day) => (
                                <th className="px-10 py-2 border-2 border-e border-b border-white last:border-e-0" key={day}>{day}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {timeSlots.map((time, index) => (
                            <tr key={index} className={`cursor-pointer bg-gray-100`}>
                                <td className="py-2.5 text-center border-2 border-e border-white font-medium">{time.name}</td>

                                {weekDate.map((day) => {

                                    const hasWork = isHasWork(day);
                                    if (!hasWork) {
                                        return (
                                            <td key={day} className="border-2 border-e border-white last:border-e-0 text-center bg-gray-100"
                                                onClick={() => handleEditSchedule(time.name.replace("Tiết", "").trim(), day)}
                                            >

                                            </td>
                                        )
                                    }
                                    const timeRanges = schedule[day];
                                    const isInRange = timeRanges.includes(time.name.replace("Tiết", "").trim());

                                    if (isInRange) {
                                        return (
                                            <td key={day} className="border-2 border-e border-white last:border-e-0 text-center bg-green-300"
                                                onClick={() => handleEditSchedule(time.name.replace("Tiết", "").trim(), day)}
                                            ></td>
                                        );
                                    } else {
                                        return (
                                            <td key={day} className="border-2 border-e border-white last:border-e-0 text-center bg-gray-100"
                                                onClick={() => handleEditSchedule(time.name.replace("Tiết", "").trim(), day)}
                                            ></td>
                                        )
                                    }
                                })}
                            </tr>
                        ))}
                    </tbody>
                </table>
                <div className="flex justify-end gap-2">
                    <div className="flex-8"></div>
                    <button
                        type="button"
                        onClick={handleClose}
                        className="flex-1 px-4 py-2 text-gray-600 border border-gray-300 rounded-md hover:bg-gray-50 transition"
                    >
                        Hủy
                    </button>
                    <button
                        type="button"
                        onClick={handleClear}
                        className="flex-1 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition"
                    >
                        Xóa hết
                    </button>
                    <button
                        type="submit"
                        className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
                        onClick={handleSubmit}
                        disabled={loading}
                    >
                        {loading ? "Đang cập nhật" : "Cập nhật"}
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