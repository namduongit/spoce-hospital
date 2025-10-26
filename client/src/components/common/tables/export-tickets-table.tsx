import type { ExportTicketResponse } from "../../../responses/export-ticket.response";
import ExportTicket from "../tickets/export.ticket";

type ExportTicketsTableProps = {
    exportTickets: ExportTicketResponse[],
    reload?: () => void
}

const ExportTicketsTable = ({ exportTickets, reload }: ExportTicketsTableProps) => {
    if (exportTickets.length === 0) {
        return (
            <div className="text-center py-12">
                <div className="mx-auto h-24 w-24 text-gray-300 mb-4">
                    <i className="fa-solid fa-upload text-6xl"></i>
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">Không có phiếu xuất nào</h3>
                <p className="text-gray-500">Chưa có phiếu xuất hàng nào được tạo.</p>
            </div>
        );
    }

    return (
        <div className="space-y-4">
            {exportTickets.map((ticket) => (
                <ExportTicket key={ticket.id} exportTicket={ticket} onSuccess={reload} />
            ))}
        </div>
    );
};

export default ExportTicketsTable;
