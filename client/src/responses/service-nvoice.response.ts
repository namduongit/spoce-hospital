type ServiceInvoiceResponse = {
    id: number,
    patientName: string,
    patientPhone: string,

    totalAmount: number,
    status: string,

    createAt: string,
    updateAt: string,

    patientId: number,
    patientEmail: string,

    doctorId: number,
    doctorEmail: string,

    medicalPackages: {
        medicalPackageId: number,
        medicalPackageName: string,
        price: number
    }[]
}

export type { ServiceInvoiceResponse };