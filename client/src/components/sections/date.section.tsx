import { days } from "../../constants/day.constant";
import type { Day } from "../../utils/day.util";

type DateSection = {
    dates: Day[],
    today: Date,
    month: number,
    year: number,
    selectDate: Date | null,
    setSelectDate(selectDate: Date): void
}

const DateSection = (props: DateSection) => {
    const { dates, today, year } = props;

    return (
        <div className="bg-white rounded-xl shadow-lg p-3 border border-gray-100">
            <div className="text-center mb-6">
                <h3 className="text-xl font-bold text-gray-800">
                    Tháng {dates.length > 0 ? dates[0].date.getMonth() + 1 : new Date().getMonth() + 1} năm {year}
                </h3>
            </div>
            
            <div className="space-y-2">
                <div className="grid grid-cols-7 gap-2">
                    {days.map(day => (
                        <div key={day.id} className="text-center py-2">
                            <span className="text-sm font-semibold text-gray-500">{day.name}</span>
                        </div>
                    ))}
                </div>
                
                <div className="grid grid-cols-7 gap-3">
                    {Array.from({ length: dates.length > 0 ? dates[0]?.weekNum || 0 : 0 }, (_, i) => (
                        <div key={`empty-${i}`} className="aspect-square"></div>
                    ))}
                    
                    {dates && dates.length > 0 ? dates.map((date, index) => {
                        const isToday = today.toDateString() === date.date.toDateString();
                        const isSelect = props.selectDate && props.selectDate.toDateString() === date.date.toDateString();
                        return (
                            <div key={index} className="aspect-square" onClick={() => {
                                props.setSelectDate(date.date)
                            }}>
                                <div className={`
                                    w-full h-full flex items-center justify-center p-1.5 font-medium rounded-lg cursor-pointer transition-all
                                    ${isToday 
                                        ? 'bg-blue-500 text-white shadow-md' 
                                        : 'hover:bg-gray-100 text-gray-700'
                                    }
                                    ${isSelect && !isToday ? 'ring-2 ring-blue-600' : ''}
                                `}>
                                    {date.date.getDate()}
                                </div>
                            </div>
                        );
                    }) : (
                        <div className="col-span-7 text-center text-gray-500 py-4">
                            Đang tải lịch...
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default DateSection;