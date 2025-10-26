import { useEffect, useState } from "react";
import useCallApi from "../../../hooks/useCallApi";
import { getMedicalPackageList } from "../../../services/medical-package.service";
import AddMedicalPackage from "../../../components/common/adds/medical-package.add";
import type { MedicalPackageResponse } from "../../../responses/medical-package.response";
import MedicalPackageTable from "../../../components/common/tables/medical-package.table";
import { medicalPackageStatus, moneyStatus } from "../../../constants/status.constant";

const AdminMedicalPackagePage = () => {
    const { execute } = useCallApi();

    const [medicalPackages, setMedicalPackages] = useState<MedicalPackageResponse[]>([]);
    const [medicalPackagesFilter, setMedicalPackagesFilter] = useState<MedicalPackageResponse[]>([]);

    const [isOpenCreateMedicalPackage, setIsOpenCreateMedicalPackage] = useState<boolean>(false);

    const [searchForm, setSearchForm] = useState({
        input: "",
        status: "",
        price: ""
    });

    const handleChangeSearch = (field: keyof typeof searchForm, value: string) => {
        setSearchForm(prev => ({
            ...prev,
            [field]: value
        }));
    }

    const handleGetMedicalPackageList = async () => {
        const restResponse = await execute(getMedicalPackageList());
        if (restResponse?.result) {
            const data: any[] = restResponse.data;
            setMedicalPackages(Array.isArray(data) ? data : []);
            setMedicalPackagesFilter(Array.isArray(data) ? data : []);
        }
    }

    useEffect(() => {
        setMedicalPackagesFilter(medicalPackages.filter(medicalPackage => {
            const matchesInput = searchForm.input === "" ||
                medicalPackage.name?.toLowerCase().includes(searchForm.input.toLowerCase()) ||
                medicalPackage.id?.toString().includes(searchForm.input);

            const matchesStatus = searchForm.status === "" || medicalPackage.status === searchForm.status;

            return matchesInput && matchesStatus;
        }));
        if (searchForm.price !== "") {
            const sortedPackages = [...medicalPackagesFilter].sort((a, b) => {
                if (searchForm.price === "ASC") {
                    return (a.price || 0) - (b.price || 0);
                } else if (searchForm.price === "DESC") {
                    return (b.price || 0) - (a.price || 0);
                }
                return 0;
            }
            );
            setMedicalPackagesFilter(sortedPackages);
        }

    }, [searchForm, medicalPackages]);

    useEffect(() => {
        handleGetMedicalPackageList();
    }, []);

    const stats = {
        totalPackages: medicalPackages.length,
        activePackages: medicalPackages.filter(p => p.status === 'ACTIVE').length,
        inactivePackages: medicalPackages.filter(p => p.status === 'INACTIVE').length,
        totalValue: medicalPackages.reduce((sum, p) => sum + (p.price || 0), 0),
        averagePrice: medicalPackages.length > 0 ?
            medicalPackages.reduce((sum, p) => sum + (p.price || 0), 0) / medicalPackages.length : 0,
        popularPackages: medicalPackages.filter(p => p.status === 'ACTIVE').slice(0, 3)
    };

    return (
        <main className="p-4 sm:p-6">
            <div className="max-w-full">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
                    <h3 className="text-xl sm:text-2xl font-bold text-blue-700 mb-2 sm:mb-0">
                        Quản lý gói dịch vụ khám
                    </h3>
                    <div className="text-sm text-gray-600">
                        <div>Tổng: <span className="font-semibold text-blue-600">{stats.totalPackages}</span> gói dịch vụ</div>
                        <div>Hoạt động: <span className="font-semibold text-green-600">{stats.activePackages}</span></div>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-6">
                    <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
                        <div className="flex items-center">
                            <div className="p-2 bg-blue-100 rounded-lg">
                                <i className="fa-solid fa-box text-blue-600"></i>
                            </div>
                            <div className="ml-3">
                                <p className="text-sm text-gray-600">Tổng gói dịch vụ</p>
                                <p className="text-lg font-semibold">{stats.totalPackages}</p>
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
                                <p className="text-lg font-semibold">{stats.activePackages}</p>
                            </div>
                        </div>
                    </div>
                    <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
                        <div className="flex items-center">
                            <div className="p-2 bg-red-100 rounded-lg">
                                <i className="fa-solid fa-circle-xmark text-red-600"></i>
                            </div>
                            <div className="ml-3">
                                <p className="text-sm text-gray-600">Không hoạt động</p>
                                <p className="text-lg font-semibold">{stats.inactivePackages}</p>
                            </div>
                        </div>
                    </div>
                    <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
                        <div className="flex items-center">
                            <div className="p-2 bg-purple-100 rounded-lg">
                                <i className="fa-solid fa-money-bill text-purple-600"></i>
                            </div>
                            <div className="ml-3">
                                <p className="text-sm text-gray-600">Tổng giá trị</p>
                                <p className="text-lg font-semibold">{stats.totalValue.toLocaleString()}đ</p>
                            </div>
                        </div>
                    </div>
                    <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
                        <div className="flex items-center">
                            <div className="p-2 bg-orange-100 rounded-lg">
                                <i className="fa-solid fa-chart-line text-orange-600"></i>
                            </div>
                            <div className="ml-3">
                                <p className="text-sm text-gray-600">Giá trung bình</p>
                                <p className="text-lg font-semibold">{stats.averagePrice.toLocaleString()}đ</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-6 grid gap-4 grid-cols-1 lg:grid-cols-2">
                    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:space-x-3">
                        <div className="appointments__filter__item relative flex-1">
                            <i className="fa-solid fa-search absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm"></i>
                            <input
                                type="text"
                                value={searchForm.input}
                                onChange={(e) => handleChangeSearch("input", e.target.value)}
                                className="border border-gray-300 rounded-md py-2 pl-10 pr-4 text-sm w-full focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                                placeholder="Tìm kiếm theo tên hoặc id ..."
                            />
                        </div>

                        <div className="flex-1">
                            <select
                                className="w-full border border-gray-300 rounded-md py-2 px-3 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                                value={searchForm.status}
                                onChange={(e) => handleChangeSearch("status", e.target.value)}
                            >
                                <option value="">Chọn trạng thái</option>
                                {medicalPackageStatus.map((status) => (
                                    <option key={status.id} value={status.value}>{status.name}</option>
                                ))}
                            </select>
                        </div>

                        <div className="flex-1">
                            <select
                                className="w-full border border-gray-300 rounded-md py-2 px-3 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                                value={searchForm.price}
                                onChange={(e) => handleChangeSearch("price", e.target.value)}
                            >
                                <option value="">Sắp xếp tiền theo</option>
                                {moneyStatus.map((status) => (
                                    <option key={status.id} value={status.value}>{status.name}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                    <div className="flex justify-end items-center gap-2">
                        <button className="font-semibold bg-blue-600 text-white hover:text-blue-600 hover:bg-white hover:ring-3 hover:ring-blue-600 px-4 py-2 rounded shadow cursor-pointer flex items-center"
                            onClick={() => setIsOpenCreateMedicalPackage(true)}
                        >
                            <i className="fa-solid fa-plus me-2"></i>
                            <span>Thêm gói dịch vụ</span>
                        </button>
                    </div>
                </div>

                <div className="hidden lg:block bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                    <div className="overflow-x-auto">
                        <MedicalPackageTable medicalPackages={medicalPackagesFilter} onSuccess={handleGetMedicalPackageList} />
                    </div>
                </div>
            </div>

            {isOpenCreateMedicalPackage && <AddMedicalPackage setIsOpenCreateMedicalPackage={setIsOpenCreateMedicalPackage} onSuccess={handleGetMedicalPackageList} />}

        </main >
    )
}

export default AdminMedicalPackagePage;