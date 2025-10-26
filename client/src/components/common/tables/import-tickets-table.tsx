import type { ImportTicketResponse } from "../../../responses/import-ticket.response";
import ImportTicket from "../tickets/import.ticket";

type ImportTicketsTableProps = {
    importTickets: ImportTicketResponse[],
    reload: () => void
}

const ImportTicketsTable = ({ importTickets, reload }: ImportTicketsTableProps) => {
    

    if (importTickets.length === 0) {
        return (
            <div className="text-center py-12">
                <div className="mx-auto h-24 w-24 text-gray-300 mb-4">
                    <i className="fa-solid fa-download text-6xl"></i>
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">Không có phiếu nhập nào</h3>
                <p className="text-gray-500">Chưa có phiếu nhập hàng nào được tạo.</p>
            </div>
        );
    }

    return (
        <div className="space-y-4">
            {importTickets.map((ticket) => (
                <ImportTicket 
                    key={ticket.id} 
                    importTicket={ticket} 
                    onSuccess={reload} 
                />
            ))}
        </div>
    );
};

export default ImportTicketsTable;
