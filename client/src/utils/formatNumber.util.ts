export const formatNumberPhone = (numberPhone: string): string => {
    return numberPhone
        .split("")
        .map((num, index) => (index === 3 || index === 6 ? num + "." : num))
        .join("");
}