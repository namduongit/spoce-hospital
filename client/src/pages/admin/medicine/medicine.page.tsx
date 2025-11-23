import { useEffect, useState } from "react";
import { medicineStatus, medicineCategoryStatus } from "../../../constants/medicine.constant";
import MedicineTable from "../../../components/common/tables/medicine.table";
import MedicineCategoryTable from "../../../components/common/tables/medicine-category.table";
import AddMedicine from "../../../components/common/adds/medicine.add";
import AddMedicineCategory from "../../../components/common/adds/medicine-category.add";

import type { MedicineResponse } from "../../../responses/medicine.response";
import type { MedicineCategoryResponse } from "../../../responses/medicine-category.response";
import useCallApi from "../../../hooks/useCallApi";
import { getMedicineCategoryList, getMedicineList } from "../../../services/medicine.service";

const AdminMedicinePage = () => {
    const { execute } = useCallApi();

    const [select, setSelect] = useState<string>("medicine");

    const [medicines, setMedicines] = useState<MedicineResponse[]>([]);
    const [medicinesFilter, setMedicinesFilter] = useState<MedicineResponse[]>([]);

    const [categories, setCategories] = useState<MedicineCategoryResponse[]>([]);
    const [categoriesFilter, setCategoriesFilter] = useState<MedicineCategoryResponse[]>([]);

    const [isOpenCreateMedicine, setIsOpenCreateMedicine] = useState<boolean>(false);
    const [isOpenCreateCategory, setIsOpenCreateCategory] = useState<boolean>(false);

    const [searchForm, setSearchForm] = useState({
        input: "",
        status: ""
    });

    const handleChangeSearch = (field: keyof typeof searchForm, value: string) => {
        setSearchForm(prev => ({ ...prev, [field]: value }));
    }

    const handleGetMedicineCategoryList = async () => {
        const restResponse = await execute(getMedicineCategoryList());
        if (restResponse?.result) {
            const data: MedicineCategoryResponse[] = restResponse.data;
            setCategories(data);
            setCategoriesFilter(data);
        }
    }

    const handleGetMedicineList = async () => {
        const restResponse = await execute(getMedicineList());
        if (restResponse?.result) {
            const data: MedicineResponse[] = restResponse.data;
            setMedicines(data);
            setMedicinesFilter(data);
        }
    }

    useEffect(() => {
        if (select === "medicine") {
            setMedicinesFilter(
                medicines.filter(medicine => {
                    const matchesInput =
                        searchForm.input === "" ||
                        medicine.name?.toLowerCase().includes(searchForm.input.toLowerCase()) ||
                        medicine.id?.toString().includes(searchForm.input) ||
                        medicine.categoryName?.toLowerCase().includes(searchForm.input.toLowerCase());

                    const matchesStatus =
                        searchForm.status === "" || medicine.status === searchForm.status;

                    return matchesInput && matchesStatus;
                })
            );
        } else {
            setCategoriesFilter(
                categories.filter(category => {
                    const matchesInput =
                        searchForm.input === "" ||
                        category.name?.toLowerCase().includes(searchForm.input.toLowerCase()) ||
                        category.id?.toString().includes(searchForm.input);

                    return matchesInput;
                })
            );
        }
    }, [searchForm, medicines, categories, select]);

    useEffect(() => {
        handleGetMedicineCategoryList();
        handleGetMedicineList();
    }, []);

    const stats = {
        totalMedicines: medicines.length,
        totalCategories: categories.length,
        activeMedicines: medicines.filter(m => m.status === 'active').length,
        inactiveMedicines: medicines.filter(m => m.status === 'inactive').length,
        outOfStockMedicines: medicines.filter(m => m.status === 'out_of_stock').length,
        lowStockMedicines: medicines.filter(m => m.currentStock <= m.minStock).length,
        totalCurrentStock: medicines.reduce((sum, m) => sum + (m.currentStock || 0), 0),
        averagePrice: medicines.length > 0 ?
            medicines.reduce((sum, m) => sum + (m.price || 0), 0) / medicines.length : 0,
        totalValue: medicines.reduce((sum, m) => sum + (m.price * m.currentStock || 0), 0),
    };

    return (
        <main className="p-4 sm:p-6">
            <div className="max-w-full">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
                    <div>
                        <h3 className="text-xl sm:text-2xl font-bold text-blue-700 mb-2 sm:mb-0">
                            Quản lý thuốc & loại thuốc
                        </h3>
                        <p className="text-sm text-gray-600 mt-1">
                            Quản lý các thuốc và loại thuốc trong bệnh viện
                        </p>
                    </div>
                    <div className="text-sm text-gray-600">
                        <div>Tổng: <span className="font-semibold text-blue-600">{stats.totalMedicines}</span> thuốc</div>
                        <div>Tổng: <span className="font-semibold text-blue-600">{stats.totalCategories}</span> loại thuốc</div>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-6">
                    <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
                        <div className="flex items-center">
                            <div className="p-2 bg-blue-100 rounded-lg">
                                <i className="fa-solid fa-pills text-blue-600"></i>
                            </div>
                            <div className="ml-3">
                                <p className="text-sm text-gray-600">Tổng thuốc</p>
                                <p className="text-lg font-semibold">{stats.totalMedicines}</p>
                            </div>
                        </div>
                    </div>
                    <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
                        <div className="flex items-center">
                            <div className="p-2 bg-purple-100 rounded-lg">
                                <i className="fa-solid fa-tags text-purple-600"></i>
                            </div>
                            <div className="ml-3">
                                <p className="text-sm text-gray-600">Loại thuốc</p>
                                <p className="text-lg font-semibold">{stats.totalCategories}</p>
                            </div>
                        </div>
                    </div>
                    <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
                        <div className="flex items-center">
                            <div className="p-2 bg-green-100 rounded-lg">
                                <i className="fa-solid fa-check-circle text-green-600"></i>
                            </div>
                            <div className="ml-3">
                                <p className="text-sm text-gray-600">Đang hoạt động</p>
                                <p className="text-lg font-semibold">{stats.activeMedicines}</p>
                            </div>
                        </div>
                    </div>
                    <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
                        <div className="flex items-center">
                            <div className="p-2 bg-red-100 rounded-lg">
                                <i className="fa-solid fa-exclamation-triangle text-red-600"></i>
                            </div>
                            <div className="ml-3">
                                <p className="text-sm text-gray-600">Hết hàng</p>
                                <p className="text-lg font-semibold">{stats.outOfStockMedicines}</p>
                            </div>
                        </div>
                    </div>
                    <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
                        <div className="flex items-center">
                            <div className="p-2 bg-yellow-100 rounded-lg">
                                <i className="fa-solid fa-exclamation-circle text-yellow-600"></i>
                            </div>
                            <div className="ml-3">
                                <p className="text-sm text-gray-600">Sắp hết</p>
                                <p className="text-lg font-semibold">{stats.lowStockMedicines}</p>
                            </div>
                        </div>
                    </div>
                    <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
                        <div className="flex items-center">
                            <div className="p-2 bg-orange-100 rounded-lg">
                                <i className="fa-solid fa-box text-orange-600"></i>
                            </div>
                            <div className="ml-3">
                                <p className="text-sm text-gray-600">Tồn kho</p>
                                <p className="text-lg font-semibold">{stats.totalCurrentStock.toLocaleString()}</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-6 grid gap-4 grid-cols-1 lg:grid-cols-2">
                    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:space-x-3">
                        <div className="flex-1">
                            <label className="block text-xs text-gray-600 mb-1">
                                Tìm kiếm
                            </label>
                            <div className="relative">
                                <i className="fa-solid fa-search absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm"></i>
                                <input
                                    type="text"
                                    value={searchForm.input}
                                    onChange={(event) => handleChangeSearch("input", event.target.value)}
                                    className="border border-gray-300 rounded-md py-2 pl-10 pr-4 text-sm w-full focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                                    placeholder="Tìm kiếm theo tên hoặc id ..."
                                />
                            </div>
                        </div>

                        <div className="flex-1">
                            <label className="block text-xs text-gray-600 mb-1">
                                Trạng thái
                            </label>
                            <select
                                className="w-full border border-gray-300 rounded-md py-2 px-3 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                                value={searchForm.status}
                                onChange={(event) => handleChangeSearch("status", event.target.value)}
                            >
                                <option value="">Chọn trạng thái</option>
                                {(select === "medicine" ? medicineStatus : medicineCategoryStatus).map((status) => (
                                    <option key={status.id} value={status.value}>
                                        {status.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="flex-1">
                            <label className="block text-xs text-gray-600 mb-1">
                                Trang quản lý
                            </label>
                            <select
                                className="w-full border border-gray-300 rounded-md py-2 px-3 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                                value={select}
                                onChange={(e) => setSelect(e.target.value)}
                            >
                                <option value="medicine">Quản lý thuốc</option>
                                <option value="category">Quản lý loại thuốc</option>
                            </select>
                        </div>
                    </div>

                    <div className="flex justify-end items-center gap-2">
                        <button
                            className="font-semibold bg-blue-600 text-white hover:text-blue-600 hover:bg-white hover:ring-3 hover:ring-blue-600 px-4 py-2 rounded shadow cursor-pointer flex items-center"
                            onClick={() => setIsOpenCreateMedicine(true)}
                        >
                            <i className="fa-solid fa-plus me-2"></i>
                            <span>Thêm thuốc</span>
                        </button>

                        <button
                            className="font-semibold bg-blue-600 text-white hover:text-blue-600 hover:bg-white hover:ring-3 hover:ring-blue-600 px-4 py-2 rounded shadow cursor-pointer flex items-center"
                            onClick={() => setIsOpenCreateCategory(true)}
                        >
                            <i className="fa-solid fa-plus me-2"></i>
                            <span>Thêm loại thuốc</span>
                        </button>
                    </div>
                </div>

                <div className="hidden lg:block bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                    <div className="overflow-x-auto">
                        {select === "medicine" && <MedicineTable medicines={medicinesFilter} categories={categories} onSuccess={handleGetMedicineList} />}
                        {select === "category" && <MedicineCategoryTable categories={categoriesFilter} onSuccess={handleGetMedicineCategoryList} />}
                    </div>
                </div>
            </div>

            {isOpenCreateMedicine && (<AddMedicine onClose={() => setIsOpenCreateMedicine(false)} categories={categories} onSuccess={handleGetMedicineList} />)}
            {isOpenCreateCategory && (<AddMedicineCategory onClose={() => setIsOpenCreateCategory(false)} onSuccess={handleGetMedicineCategoryList} />)}
        </main >
    )
}

export default AdminMedicinePage;