import { useState } from "react";
import TablePagination from "../others/pagination";
import MedicineCategoryDetail from "../details/medicine-category.detail";
import EditMedicineCategory from "../edits/medicine-category.edit";

import type { MedicineCategoryResponse } from "../../../responses/medicine-category.response";

type MedicineCategoryTableProps = {
    categories: MedicineCategoryResponse[];
    onSuccess?: () => void;
}

const MedicineCategoryTable = (props: MedicineCategoryTableProps) => {
    const { categories, onSuccess } = props;

    const [page, setPage] = useState<number>(1);
    const [row, setRow] = useState<number>(5);
    const [showDetail, setShowDetail] = useState<boolean>(false);
    const [showEdit, setShowEdit] = useState<boolean>(false);
    const [selectedCategory, setSelectedCategory] = useState<MedicineCategoryResponse | null>(null);

    const handleShowDetail = (category: MedicineCategoryResponse) => {
        setSelectedCategory(category);
        setShowDetail(true);
    };

    const handleShowEdit = (category: MedicineCategoryResponse) => {
        setSelectedCategory(category);
        setShowEdit(true);
    };

    return (
        <>
            <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-blue-50">
                    <tr>
                        <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700"># ID</th>
                        <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Tên loại thuốc</th>
                        <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Mô tả</th>
                        <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Số lượng thuốc</th>
                        <th className="px-4 py-3 text-center text-sm font-semibold text-gray-700">Hành động</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                    {(categories && categories.length > 0) ? categories.slice((page - 1) * row, page * row).map((category, idx) => (
                        <tr key={category.id} className={`${idx % 2 === 0 ? 'bg-gray-50' : 'bg-white'} hover:bg-blue-50 transition-colors`}>
                            <td className="px-4 py-3 text-sm text-gray-700 font-medium"># {category.id}</td>
                            <td className="px-4 py-3 text-sm text-gray-700 font-medium">{category.name}</td>
                            <td className="px-4 py-3 text-sm text-gray-700">{category.description || 'Không có mô tả'}</td>
                            <td className="px-4 py-3 text-sm font-medium text-blue-600">{category.medicineCount || 0} thuốc</td>
                            <td className="px-4 py-3 text-sm text-gray-600 text-center">
                                <div className="flex items-center justify-center gap-3">
                                    <button 
                                        className="px-0.75 py-0.75 text-gray-600 border border-gray-300 rounded-md hover:bg-gray-50"
                                        onClick={() => handleShowDetail(category)}
                                        title="Xem chi tiết"
                                    >
                                        <i className="fa-solid fa-info"></i>
                                    </button>

                                    <button 
                                        className="px-0.75 py-0.75 text-gray-600 border border-gray-300 rounded-md hover:bg-gray-50"
                                        onClick={() => handleShowEdit(category)}
                                        title="Chỉnh sửa"
                                    >
                                        <i className="fa-solid fa-wrench"></i>
                                    </button>
                                </div>
                            </td>
                        </tr>
                    )) : (
                        <tr>
                            <td colSpan={6} className="px-4 py-8 text-center text-gray-500">
                                <div className="flex flex-col items-center">
                                    <i className="fa-solid fa-layer-group text-4xl mb-3 text-gray-300"></i>
                                    <p className="text-lg font-medium">Không có danh mục thuốc nào</p>
                                    <p className="text-sm mt-1">Chưa có dữ liệu để hiển thị</p>
                                </div>
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
            <TablePagination array={categories} page={page} row={row} setPage={setPage} setRow={setRow} />
            
            {showDetail && selectedCategory && (
                <MedicineCategoryDetail
                    medicineCategorySelect={selectedCategory}
                    setShowDetail={setShowDetail}
                />
            )}
            
            {showEdit && selectedCategory && (
                <EditMedicineCategory
                    medicineCategorySelect={selectedCategory}
                    setShowEdit={setShowEdit}
                    onSuccess={onSuccess}
                />
            )}
        </>
    )
}

export default MedicineCategoryTable;
