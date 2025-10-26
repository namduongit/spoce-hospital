import type { ExportTicketItemResponse } from "./export-ticket-item.response"

type ExportTicketResponse = {
    id: number,
    reason: string,
    performedBy: string,
    status: string,
    items: ExportTicketItemResponse[],

    createdAt: Date,
    updatedAt: Date
}

export type { ExportTicketResponse };