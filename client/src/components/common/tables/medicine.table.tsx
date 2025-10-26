import { useState } from "react";
import TablePagination from "../others/pagination";
import MedicineDetail from "../details/medicine.detail";
import EditMedicine from "../edits/medicine.edit";

import type { MedicineResponse } from "../../../responses/medicine.response";
import type { MedicineCategoryResponse } from "../../../responses/medicine-category.response";

type MedicineTableProps = {
    medicines: MedicineResponse[];
    categories?: MedicineCategoryResponse[];
    onSuccess?: () => void;
}

const MedicineTable = (props: MedicineTableProps) => {
    const { medicines, categories = [], onSuccess } = props;

    const [page, setPage] = useState<number>(1);
    const [row, setRow] = useState<number>(5);
    const [showDetail, setShowDetail] = useState<boolean>(false);
    const [showEdit, setShowEdit] = useState<boolean>(false);
    const [selectedMedicine, setSelectedMedicine] = useState<MedicineResponse | null>(null);

    const handleShowDetail = (medicine: MedicineResponse) => {
        setSelectedMedicine(medicine);
        setShowDetail(true);
    };

    const handleShowEdit = (medicine: MedicineResponse) => {
        setSelectedMedicine(medicine);
        setShowEdit(true);
    };

    const getStatusColor = (status: string) => {
        switch(status) {
            case 'ACTIVE': return 'bg-green-100 text-green-800';
            case 'OUT_OF_STOCK': return 'bg-red-100 text-red-800';
            case 'INACTIVE': return 'bg-gray-100 text-gray-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    };

    const getStatusText = (status: string) => {
        switch(status) {
            case 'ACTIVE': return 'Hoạt động';
            case 'OUT_OF_STOCK': return 'Hết hàng';
            case 'INACTIVE': return 'Không hoạt động';
            default: return status;
        }
    };

    return (
        <>
            <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-blue-50">
                    <tr>
                        <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700"># ID</th>
                        <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Tên thuốc</th>
                        <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Loại thuốc</th>
                        <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Đơn vị</th>
                        <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Giá bán</th>
                        <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Tồn kho</th>
                        <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Trạng thái</th>
                        <th className="px-4 py-3 text-center text-sm font-semibold text-gray-700">Hành động</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                    {(medicines && medicines.length > 0) ? medicines.slice((page - 1) * row, page * row).map((medicine, idx) => (
                        <tr key={medicine.id} className={`${idx % 2 === 0 ? 'bg-gray-50' : 'bg-white'} hover:bg-blue-50 transition-colors`}>
                            <td className="px-4 py-3 text-sm text-gray-700 font-medium"># {medicine.id}</td>
                            <td className="px-4 py-3 text-sm text-gray-700">
                                <div>
                                    <p className="font-medium">{medicine.name}</p>
                                    <p className="text-xs text-gray-500">{medicine.description}</p>
                                </div>
                            </td>
                            <td className="px-4 py-3 text-sm text-gray-700 font-medium">{medicine.categoryName}</td>
                            <td className="px-4 py-3 text-sm text-gray-700 font-medium">{medicine.unit}</td>
                            <td className="px-4 py-3 text-sm font-medium text-green-600">{medicine.price.toLocaleString()}đ</td>
                            <td className="px-4 py-3 text-sm text-gray-700">
                                <div>
                                    <p className={`font-medium ${medicine.currentStock < medicine.minStock ? 'text-red-600' : 'text-blue-600'}`}>
                                        {medicine.currentStock} {medicine.unit}
                                    </p>
                                    <p className="text-xs text-gray-500">Min: {medicine.minStock}</p>
                                </div>
                            </td>
                            <td className="px-4 py-3 text-sm text-gray-700">
                                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(medicine.status)}`}>
                                    {getStatusText(medicine.status)}
                                </span>
                            </td>
                            <td className="px-4 py-3 text-sm text-gray-600 text-center">
                                <div className="flex items-center justify-center gap-3">
                                    <button 
                                        className="px-0.75 py-0.75 text-gray-600 border border-gray-300 rounded-md hover:bg-gray-50"
                                        onClick={() => handleShowDetail(medicine)}
                                        title="Xem chi tiết"
                                    >
                                        <i className="fa-solid fa-info"></i>
                                    </button>

                                    <button 
                                        className="px-0.75 py-0.75 text-gray-600 border border-gray-300 rounded-md hover:bg-gray-50"
                                        onClick={() => handleShowEdit(medicine)}
                                        title="Chỉnh sửa"
                                    >
                                        <i className="fa-solid fa-wrench"></i>
                                    </button>
                                </div>
                            </td>
                        </tr>
                    )) : (
                        <tr>
                            <td colSpan={8} className="px-4 py-8 text-center text-gray-500">
                                <div className="flex flex-col items-center">
                                    <i className="fa-solid fa-pills text-4xl mb-3 text-gray-300"></i>
                                    <p className="text-lg font-medium">Không có thuốc nào</p>
                                    <p className="text-sm mt-1">Chưa có dữ liệu để hiển thị</p>
                                </div>
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
            <TablePagination array={medicines} page={page} row={row} setPage={setPage} setRow={setRow} />
            
            {showDetail && selectedMedicine && (
                <MedicineDetail
                    medicineSelect={selectedMedicine}
                    setShowDetail={setShowDetail}
                />
            )}
            
            {showEdit && selectedMedicine && (
                <EditMedicine
                    medicineSelect={selectedMedicine}
                    categories={categories}
                    setShowEdit={setShowEdit}
                    onSuccess={onSuccess}
                />
            )}
        </>
    )
}

export default MedicineTable;
