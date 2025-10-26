import type { ExportTicketItemModel } from "./ExportTicketItemModel.model";
import type { ImportTicketItemModel } from "./ImportTicketItemModel.model";
import type { MedicineCategoryModel } from "./MedicineCategoryModel.model";
import type { PrescriptionInvoiceDetailModel } from "./PrescriptionInvoiceDetailModel.model";

type MedicineModel = {
    id: number,
    name: string,
    description: string,
    unit: string,
    price: number,
    manufacturer: string,
    status: 'ACTIVE' | 'INACTIVE' | 'OUT_OF_STOCK',
    currentStock: number,
    minStock: number,
    maxStock: number,

    categoryModel: MedicineCategoryModel,

    importTicketItems: ImportTicketItemModel[],
    exportTicketItems: ExportTicketItemModel[],

    prescriptionInvoiceDetails: PrescriptionInvoiceDetailModel[]
}

export type { MedicineModel };