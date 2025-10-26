import { useState } from "react";
import { roomStatus } from "../../../constants/status.constant";

import type { DepartmentResponse } from "../../../responses/department.response";

import { createRoom } from "../../../services/room.service";

import useCallApi from "../../../hooks/useCallApi";

type AddRoomProps = {
    departments: DepartmentResponse[],
    setIsOpenCreateRoom: (isOpenCreateRoom: boolean) => void,
    onSuccess?: () => void
}

const AddRoom = (props: AddRoomProps) => {
    const { departments, setIsOpenCreateRoom, onSuccess } = props;

    const { execute,notify, loading } = useCallApi();

    const [submitData, setSubmitData] = useState({
        name: "",
        status: "",
        departmentId: 0
    });

    const handleChangeSubmit = (field: keyof typeof submitData, value: string) => {
        setSubmitData(prev => ({ ...prev, [field]: value }));
    }

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        const restResponse = await execute(createRoom(submitData));
        notify(restResponse!, "Thêm phòng khám thành công");
        if (restResponse?.result) {
            setIsOpenCreateRoom(false);
            onSuccess?.();
        }

    }

    return (
        <div className="fixed inset-0 bg-gray-500/50 bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-bold text-gray-800">Tạo phòng khám</h2>
                    <button
                        onClick={() => props.setIsOpenCreateRoom(false)}
                        className="text-gray-500 hover:text-gray-700 text-xl"
                    >
                        x
                    </button>
                </div>
                <form className="space-y-4" onSubmit={handleSubmit}>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Tên phòng khám
                        </label>
                        <div className="relative">
                            <input
                                type="text"
                                value={submitData.name}
                                onChange={(e) => handleChangeSubmit("name", e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="Nhập tên phòng khám"
                                required
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Thuộc về khoa
                        </label>
                        <select
                            value={submitData.departmentId}
                            onChange={(event) => handleChangeSubmit("departmentId", event.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        >
                            <option value="">Chọn khoa khám</option>
                            {departments.map(department => (
                                <option key={department.id} value={department.id}>{department.name}</option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Trạng thái
                        </label>
                        <select
                            value={submitData.status}
                            onChange={(event) => handleChangeSubmit("status", event.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        >
                            <option value="">Chọn trạng thái</option>
                            {roomStatus.map(status => (
                                <option key={status.id} value={status.value}>{status.name}</option>
                            ))}
                        </select>
                    </div>

                    <div className="flex gap-3 pt-4">
                        <button
                            type="button"
                            onClick={() => props.setIsOpenCreateRoom(false)}
                            className="flex-1 px-4 py-2 text-gray-600 border border-gray-300 rounded-md hover:bg-gray-50 transition"
                        >
                            Hủy
                        </button>
                        <button
                            type="submit"
                            disabled={loading}
                            className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition disabled:opacity-50"
                        >
                            {loading ? "Đang thêm..." : "Thêm phòng"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default AddRoom;