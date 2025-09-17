const ScheduleNowButton = () => {
    return (
        <button className="schedule-now-button flex gap-2 justify-center items-center font-bold text-white py-2 px-3 rounded-[5px] bg-blue-600 cursor-pointer">
            <i className="fa-solid fa-calendar-days"></i>
            <span>Đặt lịch ngay</span>
        </button>
    )
}

export default ScheduleNowButton;