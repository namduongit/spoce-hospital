import { useState } from "react";

import type { DepartmentResponse } from "../../../responses/department.response";

import { createDepartment } from "../../../services/department.service";

import useCallApi from "../../../hooks/useCallApi";

type AddDepartment = {
    setIsOpenCreateDepartment: (isOpenCreateDepartment: boolean) => void,
    departments: DepartmentResponse[],
    onSuccess?: () => void
}

const AddDepartment = (props: AddDepartment) => {
    const { departments, setIsOpenCreateDepartment, onSuccess } = props;

    const { execute, notify, loading } = useCallApi();

    const [departmentName, setDepartmentName] = useState<string>("");

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        const restResponse = await execute(createDepartment(departmentName));
        notify(restResponse!, "Thêm khoa khám thành công");
        if (restResponse?.result) {
            handleClose();
            onSuccess?.();
        }
    }

    const handleClose = () => {
        setDepartmentName("");
        setIsOpenCreateDepartment(false);
    }

    return (
        <div className="fixed inset-0 bg-gray-500/50 bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-bold text-gray-800">Thêm khoa khám</h2>
                    <button
                        onClick={handleClose}
                        className="text-gray-500 hover:text-gray-700 text-xl"
                    >
                        x
                    </button>
                </div>
                <form className="space-y-4" onSubmit={handleSubmit}>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Tên khoa khám
                        </label>
                        <input
                            type="text"
                            value={departmentName}
                            onChange={(e) => setDepartmentName(e.target.value)}
                            className="w-full px-3 py-2 border text-gray-600 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"

                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Danh sách khoa khám
                        </label>
                        <select
                            className={`w-full border border-gray-300 rounded-md px-3 py-2 text-sm ${departments.length === 0 ? "bg-gray-50 text-gray-600" : "focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"}`}
                            disabled={departments.length === 0}
                        >

                            {departments.length > 0 ? departments.map((department) => (
                                <option key={department.id} value={department.id}>
                                    {department.name}
                                </option>
                            )) : <option>Chưa có khoa khám</option>}
                        </select>
                    </div>
                    <div className="flex justify-end space-x-2">
                        <button
                            type="button"
                            onClick={handleClose}
                            className="flex-1 px-4 py-2 text-gray-600 border border-gray-300 rounded-md hover:bg-gray-50 transition"
                        >
                            Đóng
                        </button>
                        <button
                            type="submit"
                            className="flex-1 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                        >
                            {loading ? "Đang thêm..." : "Thêm khoa"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default AddDepartment;