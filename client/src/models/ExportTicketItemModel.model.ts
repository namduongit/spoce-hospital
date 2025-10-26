import type { ExportTicketModel } from "./ExportTicketModel.model";
import type { MedicineModel } from "./MedicineModel.model";

type ExportTicketItemModel = {
    id: number,
    
    exportTicket: ExportTicketModel,
    medicine: MedicineModel,
    
    quantity: number
}

export type { ExportTicketItemModel };