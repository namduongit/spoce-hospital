type PrescriptionInvoiceResponse = {
    id: number,
    patientName: string,
    patientPhone: string,

    symptoms: string,
    note: string,

    totalAmount: number,
    status: string,

    createAt: string,
    updateAt: string,

    patientId: number,
    patientEmail: string,

    doctorId: number,
    doctorEmail: string,

    medicines: {
        medicineId: number,
        medicineName: string,
        quantity: number,
        unitPrice: number,
        totalPrice: number,
        dosage: string,
        usageInstructions: string
    }[]
}

export type { PrescriptionInvoiceResponse };