import type { MedicineModel } from "./MedicineModel.model";

type ImportTicketItemModel = {
    id: number,
    importTicket: any,
    medicine: MedicineModel,
    quantity: number,
    unitPrice: number,

    expiryDate: Date
}

export type { ImportTicketItemModel };