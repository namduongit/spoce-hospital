export type Day = {
    weekDay: string,
    weekNum: number,
    month: number,
    year: number,
    date: Date
}

export const weekdays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

export function getDaysInMonth(month: number, year: number) {
    const date = new Date(year, month, 1);
    var days: Day[] = [];
    while (date.getMonth() === month) {
        days.push({
            weekDay: weekdays[(date.getDay() + 6) % 7],
            weekNum: (date.getDay() + 6) % 7,
            month: date.getMonth(),
            year: date.getFullYear(),
            date: new Date(date)
        });
        date.setDate(date.getDate() + 1);
    }
    return days;
}
