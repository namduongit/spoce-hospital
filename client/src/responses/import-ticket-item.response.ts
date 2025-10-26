type ImportTicketItemResponse = {
    id: number,
    medicineId: number,
    medicineName: string,
    quantity: number,
    unitPrice: number,
    
    expiryDate: Date
}

export type { ImportTicketItemResponse };