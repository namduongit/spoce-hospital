import type { AccountModel } from "./AccountModel.model";
import type { ImportTicketItemModel } from "./ImportTicketItemModel.model";

type ImportTicketModel = {
    id: number,
    reason: string,
    status: 'PENDING' | 'COMPLETED' | 'CANCELLED',

    performedBy: AccountModel,
    totalAmount: number,
    items: ImportTicketItemModel[],

    createdAt: Date,
    updatedAt: Date
}

export type { ImportTicketModel };