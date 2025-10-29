import { useState, type FormEvent } from "react";
import useCallApi from "../../../hooks/useCallApi";
import type { MedicineResponse } from "../../../responses/medicine.response";
import { formatDateVi, formatDateEn } from "../../../utils/format-date.util";
import { createExportTicket } from "../../../services/export-ticket.service";

type ExportItem = {
    medicineId: string,
    medicineName: string,
    quantity: string,
    availableStock: number
};

type AddExportModalProps = {
    medicines: MedicineResponse[];
    onClose: () => void;
    onSuccess?: () => void;
};

const AddExport = (props: AddExportModalProps) => {
    const { onClose, onSuccess, medicines } = props;

    const { execute, notify, loading } = useCallApi();

    const [submitData, setSubmitData] = useState({
        reason: "",
        exportDate: formatDateEn(new Date())
    });

    const [exportItems, setExportItems] = useState<ExportItem[]>([]);

    const handleSubmitChange = (field: keyof typeof submitData, value: string) => {
        setSubmitData(prev => ({ ...prev, [field]: value }));
    };

    const handleItemChange = (index: number, field: keyof ExportItem, value: string) => {
        setExportItems(prev => {
            const newItems = [...prev];
            newItems[index] = { ...newItems[index], [field]: value };
            
            if (field === "medicineId") {
                const selectedMedicine = medicines.find(med => med.id.toString() === value);
                if (selectedMedicine) {
                    newItems[index].medicineName = selectedMedicine.name;
                    newItems[index].availableStock = selectedMedicine.currentStock || 0;
                }
            }
            
            return newItems;
        });
    };

    const addExportItem = () => {
        setExportItems(prev => [
            ...prev,
            {
                medicineId: "",
                medicineName: "",
                quantity: "",
                availableStock: 0
            }
        ]);
    };

    const removeExportItem = (index: number) => {
        if (exportItems.length > 1) {
            setExportItems(prev => prev.filter((_, i) => i !== index));
        }
    };

    const calculateTotalQuantity = () => {
        return exportItems.reduce((total, item) => {
            const quantity = Number(item.quantity) || 0;
            return total + quantity;
        }, 0);
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        const restResponse = await execute(createExportTicket({
            reason: submitData.reason,
            items: exportItems.map(item => ({
                medicineId: Number(item.medicineId),
                quantity: Number(item.quantity)
            }))
        }));
        notify(restResponse!, "Tạo phiếu xuất thành công");
        if (restResponse?.result) {
            handleClose();
            onSuccess?.();
        }
    };

    const handleClose = () => {
        setSubmitData({
            reason: "",
            exportDate: formatDateEn(new Date())
        });
        setExportItems([
            {
                medicineId: "",
                medicineName: "",
                quantity: "",
                availableStock: 0
            }
        ]);
        onClose();
    };

    return (
        <div className="fixed top-0 left-0 bg-gray-400/60 w-full h-full z-50 flex justify-center items-center">
            <div className="bg-white px-8 py-6 rounded-lg shadow-lg w-full max-w-5xl mx-4 max-h-[90vh] overflow-y-auto">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-bold text-gray-800">Tạo phiếu xuất hàng</h2>
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
                        <h3 className="text-lg font-semibold text-gray-700 mb-4">Thông tin phiếu xuất</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Ngày xuất 
                                </label>
                                <input
                                    type="date"
                                    value={submitData.exportDate}
                                    onChange={(e) => handleSubmitChange("exportDate", e.target.value)}
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
                                    Lý do xuất hàng 
                                </label>
                                <input
                                    type="text"
                                    value={submitData.reason}
                                    onChange={(e) => handleSubmitChange("reason", e.target.value)}
                                    className="w-full border rounded-md py-2 px-3 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 border-gray-300 transition-colors"
                                    placeholder="VD: Bán lẻ, Trả hàng hết hạn, Hỏng hóc..."
                                    disabled={loading}
                                    
                                />
                            </div>
                        </div>
                    </div>

                    <div>
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-lg font-semibold text-gray-700">Chi tiết sản phẩm xuất</h3>
                            <button
                                type="button"
                                onClick={addExportItem}
                                className="px-4 py-2 bg-red-600 text-white text-sm rounded-md hover:bg-red-700 transition"
                                disabled={loading}
                            >
                                + Thêm sản phẩm
                            </button>
                        </div>

                        <div className="space-y-4">
                            {exportItems.map((item, index) => (
                                <div key={index} className="border border-gray-200 rounded-lg p-4 bg-white">
                                    <div className="flex justify-between items-start mb-3">
                                        <h4 className="text-md font-medium text-gray-700">Sản phẩm #{index + 1}</h4>
                                        {exportItems.length > 1 && (
                                            <button
                                                type="button"
                                                onClick={() => removeExportItem(index)}
                                                className="text-red-500 hover:text-red-700 text-sm font-medium"
                                                disabled={loading}
                                            >
                                                Xóa
                                            </button>
                                        )}
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                                        <div className="md:col-span-2">
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                Thuốc 
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
                                                        {medicine.name} ({medicine.unit}) - Tồn: {medicine.currentStock || 0}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                Tồn kho hiện tại
                                            </label>
                                            <div className="w-full border rounded-md py-2 px-3 text-sm bg-gray-50 border-gray-300">
                                                <span className={`font-medium ${item.availableStock > 0 ? 'text-green-600' : 'text-red-600'}`}>
                                                    {item.availableStock} {item.medicineName ? medicines.find(m => m.id.toString() === item.medicineId)?.unit : ''}
                                                </span>
                                            </div>
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                Số lượng xuất 
                                            </label>
                                            <input
                                                type="number"
                                                value={item.quantity}
                                                onChange={(e) => handleItemChange(index, "quantity", e.target.value)}
                                                className={`w-full border rounded-md py-2 px-3 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
                                                    Number(item.quantity) > item.availableStock 
                                                        ? 'border-red-500 bg-red-50' 
                                                        : 'border-gray-300'
                                                }`}
                                                placeholder="Số lượng"
                                                disabled={loading}
                                                
                                            />
                                            {Number(item.quantity) > item.availableStock && item.availableStock > 0 && (
                                                <div className="text-xs text-red-500 mt-1">
                                                    Không đủ hàng trong kho!
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="mt-4 p-4 bg-red-50 rounded-lg">
                            <div className="flex justify-between items-center">
                                <span className="text-lg font-semibold text-gray-700">Tổng số lượng xuất:</span>
                                <span className="text-xl font-bold text-red-600">
                                    {calculateTotalQuantity()} sản phẩm
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
                            className="flex-1 max-w-40 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition disabled:opacity-50"
                            disabled={loading}
                        >
                            {loading ? "Đang tạo..." : "Tạo phiếu xuất"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddExport;
