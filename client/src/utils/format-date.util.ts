export function formatDateToHourAndDay(date: Date) {
    // Format 8:5 -> 08:05
    const hours = String(date.getHours()).padStart(2, '0');
    const minute = String(date.getMinutes()).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth()).padStart(2, '0');
    const year = String(date.getFullYear()).padStart(4, '0');

    return `${hours}:${minute} ${day}/${month}/${year}`;
}

export function formatDateVi(date: Date) {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = String(date.getFullYear()).padStart(4, '0');

    return `${day}/${month}/${year}`;
}

export function formatDateEn(date: Date) {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = String(date.getFullYear()).padStart(4, '0');

    return `${year}-${month}-${day}`;
}