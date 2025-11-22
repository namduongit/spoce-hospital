import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getMedicalPackageList } from "../../../services/medical-package.service";
import { createServiceInvoice } from "../../../services/service-invoice.service";
import useCallApi from "../../../hooks/useCallApi";
import type { MedicalPackageResponse } from "../../../responses/medical-package.response";
import type { AccountResponse } from "../../../responses/account.response";
import { getAccountList } from "../../../services/account.service";

type SelectedMedicalPackage = { medicalPackageId: number }

const CreateServiceInvoicePage = () => {
    const navigate = useNavigate();
    const { execute, notify, loading } = useCallApi();

    const [accounts, setAccounts] = useState<AccountResponse[]>([]);
    const [medicalPackages, setMedicalPackages] = useState<MedicalPackageResponse[]>([]);
    const [filteredPackages, setFilteredPackages] = useState<MedicalPackageResponse[]>([]);
    const [searchPackage, setSearchPackage] = useState<string>("");

    const [submitForm, setSubmitForm] = useState({
        patientName: "",
        patientPhone: "",

        userId: null as number | null,
        selectedPackages: [] as SelectedMedicalPackage[]
    });

    const handleGetAccountList = async () => {
        const restResponse = await execute(getAccountList());
        if (restResponse?.result) {
            const data: AccountResponse[] = restResponse.data;
            setAccounts(data);
        }
    };

    const handleGetMedicalPackages = async () => {
        const restResponse = await execute(getMedicalPackageList());
        if (restResponse?.result) {
            const data: MedicalPackageResponse[] = restResponse.data;
            const activePackages = Array.isArray(data) ? data.filter(pkg => pkg.status === 'ACTIVE') : [];
            setMedicalPackages(activePackages);
            setFilteredPackages(activePackages);
        }
    };

    const handleSearchPackages = (searchTerm: string) => {
        setSearchPackage(searchTerm);
        if (searchTerm === "") {
            setFilteredPackages(medicalPackages);
        } else {
            const filtered = medicalPackages.filter(pkg =>
                pkg.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                pkg.description.toLowerCase().includes(searchTerm.toLowerCase())
            );
            setFilteredPackages(filtered);
        }
    };

    const handleSelectUser = (accountId: number | null) => {
        setSubmitForm(prev => ({ ...prev, userId: accountId }) );
    };

    const handleAddPackage = (medicalPackage: MedicalPackageResponse) => {
        if (!submitForm.selectedPackages.some(pkg => pkg.medicalPackageId === medicalPackage.id)) {
            const selectedPackage: SelectedMedicalPackage = {
                medicalPackageId: medicalPackage.id
            };
            
            const updatedPackages = [...submitForm.selectedPackages, selectedPackage];
            
            setSubmitForm(prev => ({
                ...prev,
                selectedPackages: updatedPackages
            }));
        }
    };

    const handleRemovePackage = (packageId: number) => {
        const updatedPackages = submitForm.selectedPackages.filter(pkg => pkg.medicalPackageId !== packageId);

        setSubmitForm(prev => ({
            ...prev,
            selectedPackages: updatedPackages
        }));
    };

    const handleFormChange = (field: keyof typeof submitForm, value: string | number | null) => {
        setSubmitForm(prev => ({
            ...prev,
            [field]: value
        }));
    };

    const handleCreateServiceInvoice = async () => {
        const restResponse = await execute(createServiceInvoice({
            patientName: submitForm.patientName,
            patientPhone: submitForm.patientPhone,
            userId: submitForm.userId,
            medicalPackages: submitForm.selectedPackages.map(pkg => ({
                medicalPackageId: pkg.medicalPackageId
            }))
        }));
        notify(restResponse!, "Tạo hóa đơn dịch vụ thành công");
    };

    const getRoleName = (role: string) => {
        return role === "USER" ? "Bệnh nhân" : role === "DOCTOR" ? "Bác sĩ" : role === "ASSISTOR" ? "Trợ lý" : "Quản trị viên";
    }

    const totalAmount = submitForm.selectedPackages.reduce((total, selectedPackage) => {
        const packageDetails = medicalPackages.find(p => p.id === selectedPackage.medicalPackageId);
        return total + (packageDetails ? packageDetails.price : 0);
    }, 0);

    const getPackageDetails = (medicalPackageId: number) => {
        return medicalPackages.find(p => p.id === medicalPackageId);
    };

    useEffect(() => {
        handleGetAccountList();
        handleGetMedicalPackages();
    }, []);

    return (
        <main className="create-service-invoice-page p-4 sm:p-6">
            <div className="create-service-invoice-page__wrap max-w-7xl mx-auto">
                <div className="flex items-center justify-between mb-6">
                    <h3 className="text-xl sm:text-2xl font-bold text-blue-700">
                        Tạo hóa đơn dịch vụ
                    </h3>
                    <button
                        onClick={() => navigate("/doctor/service-invoice")}
                        className="px-4 py-2 text-gray-600 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
                    >
                        <i className="fa-solid fa-arrow-left mr-2"></i>
                        Quay lại
                    </button>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div className="space-y-6">
                        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                            <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                                <i className="fa-solid fa-user mr-2 text-blue-600"></i>
                                Thông tin bệnh nhân
                            </h4>

                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Chọn tài khoản (tùy chọn)
                                    </label>
                                    <select
                                        value={submitForm.userId || ""}
                                        onChange={(e) => handleSelectUser(e.target.value ? Number(e.target.value) : null)}
                                        className="w-full border border-gray-300 rounded-md py-2 px-3 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                        disabled={loading}
                                    >
                                        <option value="">Không chọn tài khoản</option>
                                        {accounts.map((account) => (
                                            <option key={account.id} value={account.id}>
                                                {account.id} - {account.email} - {getRoleName(account.role)}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Họ tên
                                        </label>
                                        <input
                                            type="text"
                                            value={submitForm.patientName}
                                            onChange={(e) => handleFormChange("patientName", e.target.value)}
                                            className="w-full border border-gray-300 rounded-md py-2 px-3 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                            placeholder="Nhập họ tên bệnh nhân"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Số điện thoại
                                        </label>
                                        <input
                                            type="text"
                                            value={submitForm.patientPhone}
                                            onChange={(e) => handleFormChange("patientPhone", e.target.value)}
                                            className="w-full border border-gray-300 rounded-md py-2 px-3 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                            placeholder="Nhập số điện thoại"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                            <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                                <i className="fa-solid fa-medical-kit mr-2 text-blue-600"></i>
                                Chọn gói dịch vụ
                            </h4>

                            <div className="relative mb-4">
                                <i className="fa-solid fa-search absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm"></i>
                                <input
                                    type="text"
                                    value={searchPackage}
                                    onChange={(e) => handleSearchPackages(e.target.value)}
                                    className="w-full border border-gray-300 rounded-md py-2 pl-10 pr-4 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                    placeholder="Tìm kiếm gói dịch vụ..."
                                />
                            </div>

                            <div className="max-h-90 overflow-y-auto space-y-2">
                                {filteredPackages.map((pkg) => (
                                    <div key={pkg.id} className="flex items-center justify-between p-3 border border-gray-200 rounded-md hover:bg-gray-50">
                                        <div className="flex-1">
                                            <h5 className="font-medium text-gray-900">{pkg.name}</h5>
                                            <p className="text-sm text-gray-600">{pkg.description}</p>
                                            <p className="text-sm font-semibold text-blue-600">
                                                {pkg.price.toLocaleString('vi-VN')} đ
                                            </p>
                                        </div>
                                        <button
                                            onClick={() => handleAddPackage(pkg)}
                                            disabled={submitForm.selectedPackages.some(selected => selected.medicalPackageId === pkg.id)}
                                            className="ml-3 px-3 py-1 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors text-sm font-medium disabled:bg-gray-300 disabled:cursor-not-allowed"
                                        >
                                            <i className="fa-solid fa-plus mr-1"></i>
                                            Thêm
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="space-y-6">
                        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                            <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                                <i className="fa-solid fa-receipt mr-2 text-blue-600"></i>
                                Chi tiết hóa đơn
                            </h4>

                            <div className="space-y-3 mb-4">
                                {submitForm.selectedPackages.length > 0 ? (
                                    submitForm.selectedPackages.map((selectedPackage) => {
                                        const packageDetails = getPackageDetails(selectedPackage.medicalPackageId);
                                        if (!packageDetails) return null;
                                        
                                        return (
                                            <div key={selectedPackage.medicalPackageId} className="flex items-center justify-between p-3 bg-blue-50 rounded-md">
                                                <div className="flex-1">
                                                    <h6 className="font-medium text-gray-900">{packageDetails.name}</h6>
                                                    <p className="text-sm text-gray-600">{packageDetails.description}</p>
                                                    <p className="text-sm text-gray-500">Số lượng: 1 gói</p>
                                                </div>
                                                <div className="flex items-center gap-3">
                                                    <span className="font-semibold text-blue-600">
                                                        {packageDetails.price.toLocaleString('vi-VN')} đ
                                                    </span>
                                                    <button
                                                        onClick={() => handleRemovePackage(selectedPackage.medicalPackageId)}
                                                        className="text-red-600 hover:text-red-700 transition-colors"
                                                    >
                                                        <i className="fa-solid fa-trash"></i>
                                                    </button>
                                                </div>
                                            </div>
                                        );
                                    })
                                ) : (
                                    <div className="text-center py-8 text-gray-500">
                                        <i className="fa-solid fa-medical-kit text-3xl mb-2"></i>
                                        <p>Chưa chọn gói dịch vụ nào</p>
                                    </div>
                                )}
                            </div>

                            <div className="border-t border-gray-200 pt-4">
                                <div className="flex justify-between items-center mb-4">
                                    <span className="text-lg font-semibold text-gray-900">Tổng cộng:</span>
                                    <span className="text-xl font-bold text-blue-600">
                                        {totalAmount.toLocaleString('vi-VN')} đ
                                    </span>
                                </div>

                                <button
                                    onClick={handleCreateServiceInvoice}
                                    className="w-full bg-green-600 text-white py-3 px-4 rounded-md hover:bg-green-700 transition-colors font-semibold"
                                >
                                    <i className="fa-solid fa-plus mr-2"></i>
                                    Tạo hóa đơn dịch vụ
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
};

export default CreateServiceInvoicePage;
