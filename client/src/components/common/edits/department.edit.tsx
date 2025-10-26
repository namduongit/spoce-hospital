import { useEffect, useState } from "react";
import type { DepartmentResponse } from "../../../responses/department.response";

type EditDepartment = {
    departmentSelect: DepartmentResponse;
    setShowEdit: (showEdit: boolean) => void;
    onSuccess?: () => void;
}

const EditDepartment = (props: EditDepartment) => {
    const { departmentSelect, setShowEdit } = props;

    const [submitData, setSubmitData] = useState({
        name: ""
    });

    const handleChangeSubmit = (field: keyof typeof submitData, value: string) => {
        setSubmitData(prev => ({ ...prev, [field]: value }));
    };

    useEffect(() => {
        setSubmitData({
            name: departmentSelect.name || ""
        });
    }, [departmentSelect]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        // Tạm thời disable function này vì chưa có updateDepartment API
        // const restResponse = await execute(updateDepartment(departmentSelect.id, submitData));
        // notify(restResponse!, "Cập nhật khoa thành công");
        // if (restResponse?.result) {
        //     onSuccess?.();
        //     setShowEdit(false);
        // }
        
        // Tạm thời chỉ hiển thị thông báo
        alert("Chức năng đang được phát triển");
        setShowEdit(false);
    };

    return (
        <div className="fixed top-0 start-0 bg-gray-400/60 w-full h-full z-10 flex justify-center items-center">
            <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-bold text-gray-800">Sửa thông tin khoa - # {departmentSelect.id}</h2>
                    <button
                        onClick={() => setShowEdit(false)}
                        className="text-gray-500 hover:text-gray-700 text-xl"
                    >
                        x
                    </button>
                </div>
                
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Tên khoa *
                        </label>
                        <input
                            type="text"
                            required
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            value={submitData.name}
                            placeholder="Nhập tên khoa"
                            onChange={(e) => handleChangeSubmit("name", e.target.value)}
                        />
                    </div>

                    <div className="flex gap-3 pt-4">
                        <button
                            type="button"
                            className="flex-1 px-4 py-2 text-gray-600 border border-gray-300 rounded-md hover:bg-gray-50 transition"
                            onClick={() => setShowEdit(false)}
                        >
                            Hủy
                        </button>
                        <button
                            type="submit"
                            className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition disabled:opacity-50"
                        >
                            Lưu thay đổi
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditDepartment;
