import type { AccountModel } from "./AccountModel.model";
import type { PrescriptionInvoiceDetailModel } from "./PrescriptionInvoiceDetailModel.model";

type PrescriptionInvoiceModel = {
    id: number,
    patientName: string,
    patientPhone: string,

    symptoms: string,
    note: string,

    patientAccountModel: AccountModel | null,
    doctorAccountModel: AccountModel,
    
    totalAmount: number,
    status: 'PENDING' | 'PAID' | 'CANCELLED',

    createdAt: Date,
    updatedAt: Date,

    prescriptionInvoiceDetails: PrescriptionInvoiceDetailModel[]

}   

export type { PrescriptionInvoiceModel };