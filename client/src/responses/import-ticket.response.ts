import type { ImportTicketItemResponse } from "./import-ticket-item.response";

type ImportTicketResponse = {
    id: number,
    supplierName: string,
    reason: string,
    performedBy: string,
    status: string,
    
    items: ImportTicketItemResponse[],

    createdAt: string,
    updatedAt: string
}

export type { ImportTicketResponse };