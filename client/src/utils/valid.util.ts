export const validNumberPhone = (numberPhone: string) => {
    return (!/^[0-9]{10,11}$/.test(numberPhone.replace(/\s/g, "")));
}

export const validEmail = (email: string) => {
    
}

export const validImageFile = (file: File) => {
    const allowedTypes = ['image/png', 'image/jpg', 'image/jpeg'];
    const maxSize = 5 * 1024 * 1024;
    return {
        isValid: allowedTypes.includes(file.type) && file.size <= maxSize,
        errorMessage: !allowedTypes.includes(file.type) ? 'Chỉ được phép chọn file PNG hoặc JPG!' : (file.size > maxSize ? 'File quá lớn! Vui lòng chọn file nhỏ hơn 5MB.' : '')
    }
}