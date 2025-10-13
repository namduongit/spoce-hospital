import { useEffect, useState } from "react";
import { roomStatus } from "../../../constants/status.constant";

import type { RoomResponse } from "../../../responses/room.response";
import type { DepartmentResponse } from "../../../responses/department.response";

import { updateRoom } from "../../../services/room.service";

import useCallApi from "../../../hooks/useCallApi";

type EditRoom = {
    roomSelect: RoomResponse,
    departments: DepartmentResponse[],
    setShowEdit: (show: boolean) => void,
    onSuccess?: () => void
}

const EditRoom = (props: EditRoom) => {
    const { roomSelect, departments, setShowEdit, onSuccess } = props;

    const { execute, notify, doFunc, loading } = useCallApi();

    const [submitData, setSubmitData] = useState({
        name: "",
        status: "",
        departmentId: 0
    });

    const handleFormChange = (field: keyof typeof submitData, value: string) => {
        setSubmitData(prev => ({ ...prev, [field]: value }));
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const restResponse = await execute(updateRoom(roomSelect.id, submitData));
        notify(restResponse!, "Cập nhật phòng khám thành công");
        doFunc(() => {
            onSuccess?.();
            setShowEdit(false);
        });
    }

    useEffect(() => {
        setSubmitData({
            name: roomSelect.name,
            status: roomSelect.status,
            departmentId: roomSelect.departmentId
        })
    }, [roomSelect]);

    return (
        <div className="fixed top-0 start-0 bg-gray-400/60 w-full h-full z-10 flex justify-center items-center">
            <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-bold text-gray-800">Sửa phòng - # {roomSelect.id}</h2>
                    <button
                        onClick={() => setShowEdit(false)}
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
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                value={submitData.name}
                                onChange={(e) => handleFormChange("name", e.target.value)}
                            />
                        </div>
                    </div>

                    <div>
                        <div className="flex gap-2">
                            <div className="flex-1">
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Chọn khoa
                                </label>
                                <select
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    required
                                    value={submitData.departmentId}
                                    onChange={(e) => handleFormChange("departmentId", e.target.value)}
                                >
                                    <option value="">Chưa chọn</option>
                                    {departments.map((department) => (
                                        <option key={department.id} value={department.id} selected={department.id.toString() === submitData.departmentId.toString()}>
                                            {department.name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className="flex-1">
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Trạng thái
                                </label>
                                <select
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    required
                                    value={submitData.status}
                                    onChange={(e) => handleFormChange("status", e.target.value)}
                                >
                                    <option value="">Chưa chọn</option>
                                    {roomStatus.map((status) => (
                                        <option key={status.id} value={status.value} selected={status.value === roomSelect.status}>
                                            {status.name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>
                    </div>


                    <div className="flex gap-3 pt-4">
                        <button
                            type="button"
                            className="flex-1 px-4 py-2 text-gray-600 border border-gray-300 rounded-md hover:bg-gray-50 transition"
                        >
                            Hủy
                        </button>
                        <button
                            type="submit"
                            className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition disabled:opacity-50"
                        >
                            {loading ? "Đang cập nhật..." : "Lưu thay đổi"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )

};

export default EditRoom;
