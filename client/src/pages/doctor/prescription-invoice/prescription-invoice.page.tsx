import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import type { MedicineModel } from "../../../models/MedicineModel.model";
import { getMedicineList } from "../../../services/medicine.service";

import { createPrescriptionInvoice } from "../../../services/prescription-invoice.service";
import useCallApi from "../../../hooks/useCallApi";
import { getAccountList } from "../../../services/account.service";
import type { AccountResponse } from "../../../responses/account.response";

type SelectedMedicine = { medicineId: number, quantity: number, dosage: string, usageInstructions: string }

const CreatePrescriptionInvoicePage = () => {
    const navigate = useNavigate();
    const { execute, notify, loading } = useCallApi();

    const [accounts, setAccounts] = useState<AccountResponse[]>([]);

    const [medicines, setMedicines] = useState<MedicineModel[]>([]);
    const [filteredMedicines, setFilteredMedicines] = useState<MedicineModel[]>([]);

    const [searchMedicine, setSearchMedicine] = useState("");

    const [submitForm, setSubmitForm] = useState({
        patientName: "",
        patientPhone: "",

        symptoms: "",
        note: "",

        userId: null as number | null,
        selectedMedicines: [] as SelectedMedicine[],
    });

    const handleGetAccountList = async () => {
        const restResponse = await execute(getAccountList());
        if (restResponse?.result) {
            const data: AccountResponse[] = restResponse.data;
            setAccounts(Array.isArray(data) ? data : []);
        }
    };

    const handleGetMedicines = async () => {
        const restResponse = await execute(getMedicineList());
        if (restResponse?.result) {
            const data: MedicineModel[] = restResponse.data;
            setMedicines(Array.isArray(data) ? data : []);
            setFilteredMedicines(Array.isArray(data) ? data : []);
        }
    };

    const handleSearchMedicines = (searchTerm: string) => {
        setSearchMedicine(searchTerm);
        if (searchTerm === "") {
            setFilteredMedicines(medicines);
        } else {
            const filtered = medicines.filter(med =>
                med.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                med.manufacturer.toLowerCase().includes(searchTerm.toLowerCase())
            );
            setFilteredMedicines(filtered);
        }
    };

    const handleSelectAccount = (accountId: number | null) => {
        setSubmitForm(prev => ({ ...prev, userId: accountId }));
    };

    const handleAddMedicine = (medicine: MedicineModel) => {
        if (!submitForm.selectedMedicines.some(med => med.medicineId === medicine.id)) {
            const selectedMedicine: SelectedMedicine = {
                medicineId: medicine.id,
                quantity: 1,
                dosage: "",
                usageInstructions: "",
            };

            const updatedMedicines = [...submitForm.selectedMedicines, selectedMedicine];

            setSubmitForm(prev => ({
                ...prev,
                selectedMedicines: updatedMedicines,
            }));
        }
    };

    const handleRemoveMedicine = (medicineId: number) => {
        const updatedMedicines = submitForm.selectedMedicines.filter(med => med.medicineId !== medicineId);

        setSubmitForm(prev => ({
            ...prev,
            selectedMedicines: updatedMedicines,
        }));
    };

    const handleUpdateMedicineQuantity = (medicineId: number, quantity: number) => {
        if (quantity <= 0) return;

        const updatedMedicines = submitForm.selectedMedicines.map(med => {
            if (med.medicineId === medicineId) {
                return { ...med, quantity };
            }
            return med;
        });

        setSubmitForm(prev => ({
            ...prev,
            selectedMedicines: updatedMedicines,
        }));
    };

    const handleUpdateMedicineDosage = (medicineId: number, dosage: string) => {
        const updatedMedicines = submitForm.selectedMedicines.map(med => {
            if (med.medicineId === medicineId) {
                return { ...med, dosage };
            }
            return med;
        });

        setSubmitForm(prev => ({
            ...prev,
            selectedMedicines: updatedMedicines
        }));
    };

    const handleUpdateMedicineUsageInstructions = (medicineId: number, usageInstructions: string) => {
        const updatedMedicines = submitForm.selectedMedicines.map(med => {
            if (med.medicineId === medicineId) {
                return { ...med, usageInstructions };
            }
            return med;
        });

        setSubmitForm(prev => ({
            ...prev,
            selectedMedicines: updatedMedicines
        }));
    };

    const handleFormChange = (field: keyof typeof submitForm, value: string | number | null) => {
        setSubmitForm(prev => ({
            ...prev,
            [field]: value
        }));
    };

    const handleCreatePrescriptionInvoice = async () => {
        const restResponse = await execute(createPrescriptionInvoice({
            userId: submitForm.userId,
            patientName: submitForm.patientName,
            patientPhone: submitForm.patientPhone,
            symptoms: submitForm.symptoms,
            note: submitForm.note,
            medicines: submitForm.selectedMedicines.map(medicine => ({
                medicineId: medicine.medicineId,
                quantity: medicine.quantity,
                dosage: medicine.dosage,
                usageInstructions: medicine.usageInstructions
            }))
        }));
        notify(restResponse!, "Tạo hóa đơn kê thuốc thành công");
    };

    const getRoleName = (role: string) => {
        return role === "USER" ? "Bệnh nhân" : role === "DOCTOR" ? "Bác sĩ" : role === "ASSISTOR" ? "Trợ lý" : "Quản trị viên";
    }

    const totalAmount = submitForm.selectedMedicines.reduce((total, selectedMedicine) => {
        const medicine = medicines.find(m => m.id === selectedMedicine.medicineId);
        return total + (medicine ? medicine.price * selectedMedicine.quantity : 0);
    }, 0);

    const getMedicineDetails = (medicineId: number) => {
        return medicines.find(m => m.id === medicineId);
    };

    const getMedicineColorStatus = (status: string) => {
        switch (status) {
            case "ACTIVE":
                return "text-green-800";
            case "INACTIVE":
                return "text-red-800";
            case "OUT_OF_STOCK":
                return "text-yellow-800";
            default:
                return "text-gray-800";
        }
    };

    useEffect(() => {
        handleGetAccountList();
        handleGetMedicines();
    }, []);

    return (
        <main className="create-prescription-invoice-page p-4 sm:p-6">
            <div className="create-prescription-invoice-page__wrap max-w-7xl mx-auto">
                <div className="flex items-center justify-between mb-6">
                    <div>
                        <h3 className="text-xl sm:text-2xl font-bold text-blue-700">
                            Tạo hóa đơn kê thuốc
                        </h3>
                        <p className="text-sm text-gray-600 mt-1">Kê thuốc theo chỉ định của bác sĩ</p>
                    </div>
                    <button
                        onClick={() => navigate("/doctor/prescription-invoice")}
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
                                        onChange={(e) => handleSelectAccount(e.target.value ? Number(e.target.value) : null)}
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
                                            required
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Số điện thoại
                                        </label>
                                        <input
                                            type="tel"
                                            value={submitForm.patientPhone}
                                            onChange={(e) => handleFormChange("patientPhone", e.target.value)}
                                            className="w-full border border-gray-300 rounded-md py-2 px-3 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                            placeholder="Nhập số điện thoại"
                                            maxLength={15}
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Triệu chứng
                                    </label>
                                    <input
                                        type="text"
                                        value={submitForm.symptoms}
                                        onChange={(e) => handleFormChange("symptoms", e.target.value)}
                                        className="w-full border border-gray-300 rounded-md py-2 px-3 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Ghi chú
                                    </label>

                                    <textarea
                                        value={submitForm.note}
                                        onChange={(e) => handleFormChange("note", e.target.value)}
                                        className="w-full border border-gray-300 rounded-md py-2 px-3 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                        rows={3}
                                        placeholder="Nhập ghi chú về tình trạng bệnh nhân hoặc lưu ý đặc biệt..."
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                            <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                                <i className="fa-solid fa-pills mr-2 text-blue-600"></i>
                                Chọn thuốc
                            </h4>

                            <div className="relative mb-4">
                                <i className="fa-solid fa-search absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm"></i>
                                <input
                                    type="text"
                                    value={searchMedicine}
                                    onChange={(e) => handleSearchMedicines(e.target.value)}
                                    className="w-full border border-gray-300 rounded-md py-2 pl-10 pr-4 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                    placeholder="Tìm kiếm thuốc..."
                                />
                            </div>

                            <div className="max-h-60 overflow-y-auto space-y-2">
                                {filteredMedicines.length > 0 ? (
                                    filteredMedicines.map((medicine) => (
                                        <div key={medicine.id} className="flex items-center justify-between p-3 border border-gray-200 rounded-md hover:bg-gray-50">
                                            <div className="flex-1">
                                                <h5 className="font-medium text-gray-900">{medicine.name}</h5>
                                                <p className="text-sm text-gray-600">
                                                    Nhà sản xuất: {medicine.manufacturer}
                                                </p>
                                                <p className="text-sm text-gray-600">
                                                    Đơn vị: {medicine.unit} | Tồn kho: {medicine.currentStock}
                                                </p>

                                                <p className="text-sm text-gray-600 flex gap-2">
                                                    Trạng thái:
                                                    <span className={`font-semibold ${getMedicineColorStatus(medicine.status)}`}>
                                                        {medicine.status === "ACTIVE" ? "Hoạt động" : medicine.status === "INACTIVE" ? "Không hoạt động" : medicine.status === "OUT_OF_STOCK" ? "Hết hàng" : "Không xác định"}
                                                    </span>
                                                </p>

                                                <p className="text-sm font-semibold text-blue-600">
                                                    {medicine.price.toLocaleString('vi-VN')} /{medicine.unit}
                                                </p>
                                            </div>
                                            <button
                                                onClick={() => handleAddMedicine(medicine)}
                                                disabled={submitForm.selectedMedicines.some(selected => selected.medicineId === medicine.id)}
                                                className="ml-3 px-3 py-1 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors text-sm font-medium disabled:bg-gray-300 disabled:cursor-not-allowed"
                                            >
                                                <i className="fa-solid fa-plus mr-1"></i>
                                                {submitForm.selectedMedicines.some(selected => selected.medicineId === medicine.id) ? 'Đã thêm' : 'Thêm'}
                                            </button>
                                        </div>
                                    ))
                                ) : (
                                    <div className="text-center py-8 text-gray-500">
                                        <i className="fa-solid fa-search text-3xl mb-2"></i>
                                        <p>
                                            {searchMedicine
                                                ? `Không tìm thấy thuốc nào với từ khóa "${searchMedicine}"`
                                                : "Không có thuốc nào khả dụng"
                                            }
                                        </p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    <div className="space-y-6">
                        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                            <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center justify-between">
                                <span className="flex items-center">
                                    <i className="fa-solid fa-receipt mr-2 text-blue-600"></i>
                                    Chi tiết đơn thuốc
                                </span>
                                {submitForm.selectedMedicines.length > 0 && (
                                    <span className="text-sm bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                                        {submitForm.selectedMedicines.length} loại thuốc
                                    </span>
                                )}
                            </h4>

                            <div className="space-y-4 mb-4">
                                {submitForm.selectedMedicines.length > 0 ? (
                                    submitForm.selectedMedicines.map((selectedMedicine) => {
                                        const medicineDetails = getMedicineDetails(selectedMedicine.medicineId);
                                        if (!medicineDetails) return null;

                                        const totalPrice = medicineDetails.price * selectedMedicine.quantity;

                                        return (
                                            <div key={selectedMedicine.medicineId} className="p-4 bg-blue-50 rounded-md">
                                                <div className="flex items-start justify-between mb-3">
                                                    <div className="flex-1">
                                                        <h6 className="font-medium text-gray-900">{medicineDetails.name}</h6>
                                                        <p className="text-sm text-gray-600">
                                                            {medicineDetails.price.toLocaleString('vi-VN')} /{medicineDetails.unit}
                                                        </p>
                                                    </div>
                                                    <button
                                                        onClick={() => handleRemoveMedicine(selectedMedicine.medicineId)}
                                                        className="text-red-600 hover:text-red-700 transition-colors"
                                                    >
                                                        <i className="fa-solid fa-trash"></i>
                                                    </button>
                                                </div>

                                                <div className="grid grid-cols-2 gap-3 mb-3">
                                                    <div>
                                                        <label className="block text-xs font-medium text-gray-700 mb-1">
                                                            Số lượng
                                                        </label>
                                                        <div className="flex items-center">
                                                            <button
                                                                type="button"
                                                                onClick={() => handleUpdateMedicineQuantity(selectedMedicine.medicineId, selectedMedicine.quantity - 1)}
                                                                className="px-2 py-1 bg-gray-200 text-gray-600 rounded-l-md hover:bg-gray-300 transition-colors"
                                                                disabled={selectedMedicine.quantity <= 1}
                                                            >
                                                                -
                                                            </button>
                                                            <input
                                                                type="number"
                                                                value={selectedMedicine.quantity}
                                                                onChange={(e) => handleUpdateMedicineQuantity(selectedMedicine.medicineId, Number(e.target.value))}
                                                                className="w-16 text-center border-t border-b border-gray-200 py-1 text-sm"
                                                                min="1"
                                                                max={medicineDetails.currentStock}
                                                            />
                                                            <button
                                                                type="button"
                                                                onClick={() => handleUpdateMedicineQuantity(selectedMedicine.medicineId, selectedMedicine.quantity + 1)}
                                                                className="px-2 py-1 bg-gray-200 text-gray-600 rounded-r-md hover:bg-gray-300 transition-colors"
                                                                disabled={selectedMedicine.quantity >= medicineDetails.currentStock}
                                                            >
                                                                +
                                                            </button>
                                                        </div>
                                                    </div>

                                                    <div>
                                                        <label className="block text-xs font-medium text-gray-700 mb-1">
                                                            Thành tiền
                                                        </label>
                                                        <span className="block py-1 text-sm font-semibold text-blue-600">
                                                            {totalPrice.toLocaleString('vi-VN')}
                                                        </span>
                                                    </div>
                                                </div>

                                                <div className="grid grid-cols-2 gap-3">
                                                    <div>
                                                        <label className="block text-xs font-medium text-gray-700 mb-1">
                                                            Liều lượng
                                                        </label>
                                                        <input
                                                            type="text"
                                                            value={selectedMedicine.dosage}
                                                            onChange={(e) => handleUpdateMedicineDosage(selectedMedicine.medicineId, e.target.value)}
                                                            className="w-full border border-gray-300 rounded-md py-1 px-2 text-sm focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                                                            placeholder="VD: 2 viên x 3 lần/ngày"
                                                        />
                                                    </div>

                                                    <div>
                                                        <label className="block text-xs font-medium text-gray-700 mb-1">
                                                            Hướng dẫn sử dụng
                                                        </label>
                                                        <input
                                                            type="text"
                                                            value={selectedMedicine.usageInstructions}
                                                            onChange={(e) => handleUpdateMedicineUsageInstructions(selectedMedicine.medicineId, e.target.value)}
                                                            className="w-full border border-gray-300 rounded-md py-1 px-2 text-sm focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                                                            placeholder="VD: Sau ăn, uống 7 ngày"
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    })
                                ) : (
                                    <div className="text-center py-8 text-gray-500">
                                        <i className="fa-solid fa-pills text-3xl mb-2"></i>
                                        <p>Chưa chọn thuốc nào</p>
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

                                <div className="relative">
                                    <button
                                        onClick={handleCreatePrescriptionInvoice}
                                        disabled={loading}
                                        className="w-full bg-green-600 text-white py-3 px-4 rounded-md hover:bg-green-700 transition-colors font-semibold"
                                    >
                                        {loading ? (
                                            <>
                                                <i className="fa-solid fa-spinner fa-spin mr-2"></i>
                                                Đang xử lý...
                                            </>
                                        ) : (
                                            <>
                                                <i className="fa-solid fa-plus mr-2"></i>
                                                Tạo hóa đơn kê thuốc
                                            </>
                                        )}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
};

export default CreatePrescriptionInvoicePage;
