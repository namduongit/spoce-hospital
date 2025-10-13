import { useEffect, useState } from "react";
import { timeSlots, weekDate } from "../../../constants/day.constant";

const AdminCalendarPage = () => {
    // Day; [time1, time2, ...]
    const workDay = `
    Thứ 2; tiết 1 đến 5, tiết 6 đến 7 <br/>
    Thứ 3; tiết 1 đến 5, tiết 7 đến 8 <br/>
    Thứ 4; tiết 1 đến 5 <br/>
    `;

    const [schedule, setSchedule] = useState<{ [key: string]: string[] }>({});

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

    const isHasWork = (day: string) => {
        return schedule[day] && schedule[day].length > 0;
    }

    return (
        <div className="space-y-2">
            <h2 className="text-xl font-bold text-gray-800">Lịch làm việc của bác sĩ</h2>
            <div>

            </div>
            <div className="flex flex-row gap-2">
                <div className="flex gap-2 items-center">
                    <div className="w-20 h-7 bg-green-300 shadow-md border-green-800 border"></div>
                    <span className="font-semibold">Làm việc</span>
                </div>
                <div className="flex gap-2 items-center">
                    <div className="w-20 h-7 bg-gray-100 shadow-md border-gray-800 border"></div>
                    <span className="font-semibold">Trống</span>
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
                                    console.log({
                                        "Thứ": day,
                                        "Tiết bắt đầu": startNum,
                                        "Tiết kết thúc": endNum,
                                        "Tiết xử lý": currentNum 
                                    })
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
                            })}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}
export default AdminCalendarPage;