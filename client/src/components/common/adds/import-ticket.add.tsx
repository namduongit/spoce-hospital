import { useState, type FormEvent } from "react";
import useCallApi from "../../../hooks/useCallApi";
import type { MedicineResponse } from "../../../responses/medicine.response";
import { formatPriceVND } from "../../../utils/formatNumber.util";
import { formatDateVi, formatDateEn } from "../../../utils/formatDate.util";
import { createImportTicket } from "../../../services/import-ticket.service";

type ImportItem = {
    medicineId: string,
    medicineName: string,
    quantity: string,
    price: string,
    expiryDate: string
    
};

type AddImportProps = {
    medicines: MedicineResponse[];
    onClose: () => void;
    onSuccess?: () => void;
};

const AddImport = (props: AddImportProps) => {
    const { onClose, onSuccess, medicines } = props;

    const { execute, notify, loading } = useCallApi();

    const [submitData, setSubmitData] = useState({
        reason: "",
        supplierName: "",
        importDate: formatDateEn(new Date())
    });

    const [importItems, setImportItems] = useState<ImportItem[]>([]);

    const handleSubmitChange = (field: keyof typeof submitData, value: string) => {
        setSubmitData(prev => ({ ...prev, [field]: value }));
    };

    const handleItemChange = (index: number, field: keyof ImportItem, value: string) => {
        setImportItems(prev => {
            const newItems = [...prev];
            newItems[index] = { ...newItems[index], [field]: value };
            if (field === "medicineId") {
                const selectedMedicine = medicines.find(med => med.id.toString() === value);
                if (selectedMedicine) {
                    newItems[index].medicineName = selectedMedicine.name;
                }
            }
            
            return newItems;
        });
    };

    const addImportItem = () => {
        setImportItems(prev => [ ...prev, { medicineId: "", medicineName: "", quantity: "", price: "", expiryDate: "" } ]);
    };

    const removeImportItem = (index: number) => {
        if (importItems.length > 1) {
            setImportItems(prev => prev.filter((_, i) => i !== index));
        }
    };

    const calculateTotalValue = () => {
        return importItems.reduce((total, item) => {
            const quantity = Number(item.quantity) || 0;
            const price = Number(item.price) || 0;
            return total + (quantity * price);
        }, 0);
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        const restResponse = await execute(createImportTicket({
            reason: submitData.reason,
            supplierName: submitData.supplierName,
            items: importItems.map(item => ({
                medicineId: Number(item.medicineId),
                quantity: Number(item.quantity),
                unitPrice: Number(item.price),
                expiryDate: item.expiryDate
            }))
        }));
        notify(restResponse!, "Tạo phiếu nhập thành công");
        if (restResponse?.result) {
            handleClose();
            onSuccess?.();
        }
    };

    const handleClose = () => {
        setSubmitData({
            reason: "",
            supplierName: "",
            importDate: formatDateEn(new Date())
        });
        setImportItems([]);
        onClose();
    };

    return (
        <div className="fixed top-0 left-0 bg-gray-400/60 w-full h-full z-50 flex justify-center items-center">
            <div className="bg-white px-8 py-6 rounded-lg shadow-lg w-full max-w-6xl mx-4 max-h-[90vh] overflow-y-auto">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-bold text-gray-800">Tạo phiếu nhập hàng</h2>
                    <button
                        onClick={handleClose}
                        className="text-gray-500 hover:text-gray-700 text-xl font-bold"
                        disabled={loading}
                    >
                        x
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="bg-gray-50 p-4 rounded-lg">
                        <h3 className="text-lg font-semibold text-gray-700 mb-4">Thông tin phiếu nhập</h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Ngày nhập
                                </label>
                                <input
                                    type="date"
                                    value={submitData.importDate}
                                    onChange={(e) => handleSubmitChange("importDate", e.target.value)}
                                    className="w-full border rounded-md py-2 px-3 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 border-gray-300 transition-colors bg-gray-100"
                                    disabled={loading}
                                    readOnly
                                />
                                <div className="text-xs text-gray-500 mt-1">
                                    Hôm nay: {formatDateVi(new Date())}
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Lý do nhập hàng
                                </label>
                                <input
                                    type="text"
                                    value={submitData.reason}
                                    onChange={(e) => handleSubmitChange("reason", e.target.value)}
                                    className="w-full border rounded-md py-2 px-3 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 border-gray-300 transition-colors"
                                    placeholder="VD: Nhập hàng định kỳ, Bổ sung tồn kho..."
                                    disabled={loading}
                                    
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Tên nhà cung cấp
                                </label>
                                <input
                                    type="text"
                                    value={submitData.supplierName}
                                    onChange={(e) => handleSubmitChange("supplierName", e.target.value)}
                                    className="w-full border rounded-md py-2 px-3 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 border-gray-300 transition-colors"
                                    placeholder="Nhập tên nhà cung cấp"
                                    disabled={loading}
                                    
                                />
                            </div>
                        </div>
                    </div>

                    <div>
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-lg font-semibold text-gray-700">Chi tiết sản phẩm nhập</h3>
                            <button
                                type="button"
                                onClick={addImportItem}
                                className="px-4 py-2 bg-green-600 text-white text-sm rounded-md hover:bg-green-700 transition"
                                disabled={loading}
                            >
                                + Thêm sản phẩm
                            </button>
                        </div>

                        <div className="space-y-4">
                            {importItems.map((item, index) => (
                                <div key={index} className="border border-gray-200 rounded-lg p-4 bg-white">
                                    <div className="flex justify-between items-start mb-3">
                                        <h4 className="text-md font-medium text-gray-700">Sản phẩm #{index + 1}</h4>
                                        {importItems.length > 1 && (
                                            <button
                                                type="button"
                                                onClick={() => removeImportItem(index)}
                                                className="text-red-500 hover:text-red-700 text-sm font-medium"
                                                disabled={loading}
                                            >
                                                Xóa
                                            </button>
                                        )}
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                Thuốc <span className="text-red-500">*</span>
                                            </label>
                                            <select
                                                value={item.medicineId}
                                                onChange={(e) => handleItemChange(index, "medicineId", e.target.value)}
                                                className="w-full border rounded-md py-2 px-3 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 border-gray-300 transition-colors"
                                                disabled={loading}
                                                
                                            >
                                                <option value="">Chọn thuốc</option>
                                                {medicines.map((medicine) => (
                                                    <option key={medicine.id} value={medicine.id}>
                                                        {medicine.name} ({medicine.unit}) - {formatPriceVND(medicine.price)}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                Số lượng <span className="text-red-500">*</span>
                                            </label>
                                            <input
                                                type="number"
                                                value={item.quantity}
                                                onChange={(e) => handleItemChange(index, "quantity", e.target.value)}
                                                className="w-full border rounded-md py-2 px-3 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 border-gray-300 transition-colors"
                                                placeholder="Số lượng"
                                                min="1"
                                                disabled={loading}
                                                
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                Giá nhập (VNĐ) <span className="text-red-500">*</span>
                                            </label>
                                            <input
                                                type="number"
                                                value={item.price}
                                                onChange={(e) => handleItemChange(index, "price", e.target.value)}
                                                className="w-full border rounded-md py-2 px-3 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 border-gray-300 transition-colors"
                                                placeholder="Giá nhập"
                                                min="0"
                                                step="0.01"
                                                disabled={loading}
                                                
                                            />
                                            <div className="text-xs text-gray-500 mt-1">
                                                {Number(item.price) > 0 && `≈ ${formatPriceVND(Number(item.price))}`}
                                            </div>
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                Ngày hết hạn <span className="text-red-500">*</span>
                                            </label>
                                            <input
                                                type="date"
                                                value={item.expiryDate}
                                                onChange={(e) => handleItemChange(index, "expiryDate", e.target.value)}
                                                className="w-full border rounded-md py-2 px-3 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 border-gray-300 transition-colors"
                                                disabled={loading}
                                                
                                                min={formatDateEn(new Date())}
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                Thành tiền
                                            </label>
                                            <div className="w-full border rounded-md py-2 px-3 text-sm bg-gray-50 border-gray-300">
                                                {formatPriceVND((Number(item.quantity) || 0) * (Number(item.price) || 0))}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="mt-4 p-4 bg-blue-50 rounded-lg">
                            <div className="flex justify-between items-center">
                                <span className="text-lg font-semibold text-gray-700">Tổng giá trị nhập:</span>
                                <span className="text-xl font-bold text-blue-600">
                                    {formatPriceVND(calculateTotalValue())}
                                </span>
                            </div>
                        </div>
                    </div>

                    <div className="flex justify-end space-x-3">
                        <button
                            type="button"
                            onClick={handleClose}
                            className="flex-1 max-w-32 px-4 py-2 text-gray-600 border border-gray-300 rounded-md hover:bg-gray-50 transition"
                            disabled={loading}
                        >
                            Hủy
                        </button>
                        <button
                            type="submit"
                            className="flex-1 max-w-40 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition disabled:opacity-50"
                            disabled={loading}
                        >
                            {loading ? "Đang tạo..." : "Tạo phiếu nhập"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddImport;
