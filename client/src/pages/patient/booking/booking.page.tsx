import { useEffect, useState } from "react";
import { type Day, getDaysInMonth } from "../../../utils/day.util";
import DateSection from "../../../components/sections/date.section";
import { times } from "../../../constants/time.constant";
import { formatDateVi } from "../../../utils/formatDate.util";
import useCallApi from "../../../hooks/useCallApi";
import { createAppointment } from "../../../services/user.service";
import { useNavigate } from "react-router-dom";

const navBars = [
    {
        id: 1,
        icon: <i className="fa-solid fa-calendar-days"></i>,
        name: "Thời gian và địa điểm",
        value: "time"
    },
    {
        id: 2,
        icon: <i className="fa-solid fa-note-sticky"></i>,
        name: "Phiếu đăng ký khám",
        value: "form"
    }
]

const BookingPage = () => {
    const { execute, notify, loading } = useCallApi();

    const navigate = useNavigate();

    const [selectNav, setSelectNav] = useState<string>("time");

    const today = new Date();
    const [month, setMonth] = useState<number>(today.getMonth());
    const [year, setYear] = useState<number>(today.getFullYear());

    const [nowDate, setNowDate] = useState<Day[]>([]);
    const [nextDate, setNextDate] = useState<Day[]>([]);

    const [selectDate, setSelectDate] = useState<Date | null>(null);
    const [selectTime, setSelectTime] = useState<string>("");

    const [submitData, setSubmitData] = useState({
        fullName: "",
        phone: "",
        date: "",
        time: "",
        note: ""
    });

    const handleChangeSubmit = (field: keyof typeof submitData, value: string) => {
        setSubmitData(prev => ({ ...prev, [field]: value }));
    }

    const handleClear = () => {
        setSubmitData({
            fullName: "",
            phone: "",
            date: "",
            time: "",
            note: ""
        });
        setSelectNav("time");
        setSelectTime("");
        setSelectDate(null);
    }

    const isTrueSelectDateTime = () => {
        if (selectDate && selectTime) {
            setSelectNav("form");
        }
    }

    const handleNextMonth = () => {
        if (month + 1 > 11) {
            setMonth(0);
            setYear(year + 1);
        } else {
            setMonth(month + 1);
        }
    }

    const handlePreviousMonth = () => {
        if (month - 1 < 0) {
            setMonth(11);
            setYear(year - 1);
        } else {
            setMonth(month - 1);
        }
    }

    const handleSubmit = async () => {
        const restResponse = await execute(createAppointment(submitData));
        notify(restResponse!, "Đăng ký lịch khám thành công!");
        if (restResponse?.result) {
            handleClear();
            navigate("/page/account");
        }
    }

    useEffect(() => {
        setNowDate(getDaysInMonth(month, year));
        const nextMonth = month + 1 > 11 ? 0 : month + 1;
        const nextYear = month + 1 > 11 ? year + 1 : year;
        setNextDate(getDaysInMonth(nextMonth, nextYear));
    }, [month, year]);

    useEffect(() => {
        setSubmitData(prev => ({
            ...prev,
            date: selectDate ? formatDateVi(selectDate) : "",
            time: selectTime
        }));
    }, [selectDate, selectTime])

    return (
        <div className="w-full">
            <div className="container mx-auto py-20 grid grid-cols-12 gap-4">
                <div className="col-span-12 lg:col-span-2 bg-white flex flex-col rounded-xl shadow gap-2 px-2 py-2">
                    {navBars && navBars.map(navBar => (
                        <button key={navBar.id} className={`py-3 px-3 flex justify-start items-center gap-2 font-semibold
                       ${selectNav === navBar.value ? 'bg-blue-50 rounded border-l-3 border-blue-600 text-blue-500' : 'text-black hover:bg-blue-50 hover:text-blue-600'}`}
                            onClick={() => setSelectNav(navBar.value)}
                        >
                            {navBar.icon}
                            <span>{navBar.name}</span>
                        </button>
                    ))}
                </div>
                <div className="col-span-12 lg:col-span-6 bg-white rounded-xl shadow px-5">
                    {selectNav === "time" && (
                        <div>
                            <h3 className="pt-2 text-xl font-bold text-blue-600" >Chọn ngày khám bệnh</h3>
                            <span className="text-sm text-gray-600">Vui lòng chọn ngày chính xác để đăng ký</span>
                            <div className="flex gap-10 justify-center pb-5 pt-5">
                                <DateSection dates={nowDate} today={today} month={month} year={year} selectDate={selectDate} setSelectDate={setSelectDate} />
                                <DateSection dates={nextDate} today={today} month={month + 1} year={year} selectDate={selectDate} setSelectDate={setSelectDate} />
                            </div>
                            <div className="flex gap-3 justify-end mb-5">
                                <button className="flex items-center gap-1 bg-white ring-2 ring-blue-600 px-2 py-1 rounded text-blue-600 font-semibold shadow
                                hover:bg-blue-600 hover:text-white"
                                    onClick={handlePreviousMonth}>
                                    <i className="fa-solid fa-chevron-left"></i>
                                    Tháng trước
                                </button>
                                <button className="flex items-center gap-1 bg-white ring-2 ring-blue-600 px-2 py-1 rounded text-blue-600 font-semibold shadow
                                hover:bg-blue-600 hover:text-white"
                                    onClick={handleNextMonth}>
                                    Tháng sau
                                    <i className="fa-solid fa-chevron-right"></i>
                                </button>
                            </div>
                        </div>
                    )}
                    {selectNav === "form" && (
                        <div>
                            <h3 className="pt-2 text-xl font-bold text-blue-600" >Điền thông tin khám</h3>
                            <span className="text-sm text-gray-600">Điền thông tin chính xác để liên lạc</span>
                            <div className="flex flex-col gap-5 mt-5">
                                <div className="relative">
                                    <i className="fa-solid fa-circle-user absolute top-1/2 -translate-y-1/2 mx-2 text-lg text-gray-400"></i>
                                    <input
                                        type="text"
                                        value={submitData.fullName}
                                        onChange={(event) => handleChangeSubmit("fullName", event.target.value)}
                                        className="w-full px-3 py-2 ps-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        placeholder="Nhập họ và tên"
                                        required />
                                </div>
                                <div className="relative">
                                    <i className="fa-solid fa-phone absolute top-1/2 -translate-y-1/2 mx-2 text-lg text-gray-400"></i>
                                    <input
                                        type="text"
                                        value={submitData.phone}
                                        onChange={(event) => handleChangeSubmit("phone", event.target.value)}
                                        className="w-full px-3 py-2 border ps-10 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        placeholder="Nhập số điện thoại"
                                        required />
                                </div>
                                <div className="relative">
                                    <textarea
                                        rows={5}
                                        value={submitData.note}
                                        onChange={(event) => handleChangeSubmit("note", event.target.value)}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        placeholder="Ghi chú"
                                        required></textarea>
                                </div>

                                <div className="flex justify-end pb-10">
                                    <button className="px-4 py-2 bg-blue-600 text-white font-bold rounded"
                                        onClick={handleSubmit}
                                        disabled={loading}
                                    >
                                        {loading ? "Đang gửi..." : "Gửi đăng ký"}
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
                <div className="col-span-12 lg:col-span-4 bg-white rounded-xl shadow px-5 py-4">
                    <h3 className="text-xl font-bold text-blue-600 mb-4">
                        Thời gian chọn
                    </h3>

                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-2">Ngày khám</label>
                        <div className="relative">
                            <input
                                readOnly
                                className="w-full border px-3 py-2 border-gray-300 rounded-lg text-gray-700 bg-gray-50 focus:outline-none"
                                value={selectDate ? selectDate.toLocaleDateString('vi-VN') : "Chưa chọn ngày"}
                                type="text"
                                placeholder="Chọn ngày từ lịch bên trái"
                            />
                            <i className="fa-solid fa-calendar-days absolute right-3 top-3 text-gray-400"></i>
                        </div>
                    </div>

                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-2">Giờ khám</label>
                        <select
                            className="w-full border px-3 py-2 border-gray-300 rounded-lg text-gray-700 focus:outline-none focus:border-blue-500"
                            value={selectTime}
                            onChange={(e) => setSelectTime(e.target.value)}
                            disabled={!selectDate}
                        >
                            <option value="">Chọn giờ khám</option>
                            {times.map(time => (
                                <option key={time.id} value={time.value}>
                                    {time.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    {selectDate && selectTime && (
                        <div className="bg-blue-50 rounded-lg p-3 border border-blue-200">
                            <h4 className="font-semibold text-blue-800 mb-2">
                                <i className="fa-solid fa-info-circle mr-1"></i>
                                Thông tin đặt lịch
                            </h4>
                            <div className="space-y-1 text-sm">
                                <div className="flex justify-between">
                                    <span className="text-gray-600">Ngày:</span>
                                    <span className="font-medium text-gray-800">{selectDate.toLocaleDateString('vi-VN')}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-600">Giờ:</span>
                                    <span className="font-medium text-gray-800">{selectTime}</span>
                                </div>
                            </div>
                        </div>
                    )}

                    <div className="mt-4 p-3 bg-yellow-50 rounded-lg border border-yellow-200">
                        <p className="text-xs text-yellow-700">
                            <i className="fa-solid fa-lightbulb mr-1"></i>
                            Vui lòng chọn ngày và giờ phù hợp. Bệnh viện nghỉ trưa từ 12h-13h.
                        </p>
                    </div>

                    <div className="flex justify-end mt-5 gap-2">
                        <button className="bg-blue-600 px-4 py-2 rounded text-white font-bold
                        hover:bg-white hover:ring-2 hover:ring-blue-600 hover:text-blue-600"
                            onClick={isTrueSelectDateTime}>
                            Tiếp theo
                        </button>
                        <button className="bg-orange-600 px-4 py-2 rounded text-white font-bold
                        hover:bg-white hover:ring-2 hover:ring-orange-600 hover:text-orange-600"
                            onClick={handleClear}>
                            Làm mới
                        </button>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default BookingPage;