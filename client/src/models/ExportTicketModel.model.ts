import type { AccountModel } from "./AccountModel.model"
import type { ExportTicketItemModel } from "./ExportTicketItemModel.model"

type ExportTicketModel = {
    id: number,
    reason: string,
    status: 'PENDING' | 'COMPLETED' | 'CANCELLED',

    performedBy: AccountModel,
    items: ExportTicketItemModel[],

    createdAt: Date,
    updatedAt: Date
}

export type { ExportTicketModel };