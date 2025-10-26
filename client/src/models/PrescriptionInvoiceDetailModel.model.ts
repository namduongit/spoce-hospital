import type { MedicineModel } from "./MedicineModel.model";

type PrescriptionInvoiceDetailModel = {
    id: number,
    quantity: number,
    dosage: string,
    usageInstructions: string,

    prescriptionInvoiceModel: PrescriptionInvoiceDetailModel,
    medicineModel: MedicineModel
}

export type { PrescriptionInvoiceDetailModel };