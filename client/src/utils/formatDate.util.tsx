export function formatDateToHourAndDay(date: Date) {
    // Format 8:5 -> 08:05
    const hours = String(date.getHours()).padStart(2, '0');
    const minute = String(date.getMinutes()).padStart(2, '0');
    const day = String(date.getDay()).padStart(2, '0');
    const month = String(date.getMonth()).padStart(2, '0');
    const year = String(date.getFullYear()).padStart(4, '0');

    return `${hours}:${minute} ${day}/${month}/${year}`;
}