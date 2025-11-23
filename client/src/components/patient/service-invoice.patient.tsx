import { useState } from "react";
import type { ServiceInvoiceResponse } from "../../responses/service-nvoice.response";
import TablePagination from "../common/others/pagination";
import ServiceInvoiceDetail from "./others/service-invoice-detail";

type ServiceInvoicePatientProps = {
    serviceInvoices: ServiceInvoiceResponse[]
}

const ServiceInvoicePatient = (props: ServiceInvoicePatientProps) => {
    const { serviceInvoices } = props;

    const [row, setRow] = useState<number>(5);
    const [page, setPage] = useState<number>(1);
    const [showDetail, setShowDetail] = useState<boolean>(false);
    const [invoiceSelect, setInvoiceSelect] = useState<ServiceInvoiceResponse | null>(null);

    const handleShowDetail = (invoice: ServiceInvoiceResponse) => {
        setInvoiceSelect(invoice);
        setShowDetail(true);
    }

    return (
        <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Lịch sử khám bệnh</h2>
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                {(serviceInvoices && serviceInvoices.length > 0) ? (
                    <div className="space-y-4">
                        {serviceInvoices.slice((page - 1) * row, page * row).map((invoice, index) => (
                            <div key={index} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                                <div className="flex flex-col md:flex-row justify-between items-start">

                                    <div className="flex-1">
                                        <div className="mb-2">
                                            <p className="text-sm text-gray-500">Bác sĩ kê đơn</p>
                                            <p className="text-sm text-gray-900">{invoice.doctorEmail}</p>
                                        </div>
                                        <div className="mb-2">
                                            <p className="text-sm text-gray-500">Thông tin người khám</p>
                                            <p className="text-sm text-gray-900">Họ tên: {invoice.patientName}</p>
                                            <p className="text-sm text-gray-900">SĐT: {invoice.patientPhone}</p>
                                        </div>
                                    </div>

                                    <div className="flex flex-col items-end gap-3">
                                        <button 
                                            onClick={() => handleShowDetail(invoice)}
                                            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm flex items-center gap-2"
                                        >
                                            <i className="fa-solid fa-eye"></i>
                                            Chi tiết
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                        <TablePagination array={serviceInvoices} row={row} page={page} setRow={setRow} setPage={setPage} />
                    </div>
                ) : (
                    <div className="text-center py-12">
                        <i className="fa-solid fa-file-invoice-dollar text-6xl text-gray-300 mb-4"></i>
                        <p className="text-gray-500 text-lg">Bạn chưa có hóa đơn dịch vụ nào</p>
                    </div>
                )}
            </div>

            {(showDetail && invoiceSelect) && (
                <ServiceInvoiceDetail 
                    serviceInvoiceSelect={invoiceSelect} 
                    setShowDetail={setShowDetail}
                />
            )}
        </div>
    )
}

export default ServiceInvoicePatient;