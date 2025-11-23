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
        <div className="bg-white rounded-xl shadow-lg p-2 sm:p-3 md:p-4 border border-gray-100 w-full">
            <div className="text-center mb-3 sm:mb-4 md:mb-6">
                <h3 className="text-base sm:text-lg md:text-xl font-bold text-gray-800">
                    Tháng {dates.length > 0 ? dates[0].date.getMonth() + 1 : new Date().getMonth() + 1} năm {year}
                </h3>
            </div>
            
            <div className="space-y-2">
                {/* Days of week header */}
                <div className="grid grid-cols-7 gap-1 sm:gap-2">
                    {days.map(day => (
                        <div key={day.id} className="text-center py-1 sm:py-2">
                            <span className="text-xs sm:text-sm font-semibold text-gray-500">{day.name}</span>
                        </div>
                    ))}
                </div>
                
                {/* Calendar dates */}
                <div className="grid grid-cols-7 gap-1 sm:gap-2 md:gap-3">
                    {/* Empty cells for alignment */}
                    {Array.from({ length: dates.length > 0 ? dates[0]?.weekNum || 0 : 0 }, (_, i) => (
                        <div key={`empty-${i}`} className="aspect-square"></div>
                    ))}
                    
                    {/* Date cells */}
                    {dates && dates.length > 0 ? dates.map((date, index) => {
                        const isToday = today.toDateString() === date.date.toDateString();
                        const isSelect = props.selectDate && props.selectDate.toDateString() === date.date.toDateString();
                        const isPast = date.date < new Date(today.getFullYear(), today.getMonth(), today.getDate());
                        
                        return (
                            <div 
                                key={index} 
                                className="aspect-square" 
                                onClick={() => {
                                    if (!isPast) {
                                        props.setSelectDate(date.date)
                                    }
                                }}
                            >
                                <div className={`
                                    w-full h-full flex items-center justify-center p-1 sm:p-1.5 font-medium rounded-lg transition-all text-xs sm:text-sm md:text-base
                                    ${isPast 
                                        ? 'text-gray-300 cursor-not-allowed' 
                                        : 'cursor-pointer'
                                    }
                                    ${isToday && !isPast
                                        ? 'bg-blue-500 text-white shadow-md' 
                                        : !isPast ? 'hover:bg-gray-100 text-gray-700' : ''
                                    }
                                    ${isSelect && !isToday && !isPast ? 'ring-2 ring-blue-600 bg-blue-50' : ''}
                                `}>
                                    {date.date.getDate()}
                                </div>
                            </div>
                        );
                    }) : (
                        <div className="col-span-7 text-center text-gray-500 py-4 text-xs sm:text-sm">
                            Đang tải lịch...
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default DateSection;