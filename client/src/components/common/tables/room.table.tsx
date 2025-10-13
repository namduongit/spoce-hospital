import { useState } from "react";
import TablePagination from "../others/pagination";
import RoomDetail from "../../common/details/room.detail";
import EditRoom from "../edits/room.edit";

import type { RoomResponse } from "../../../responses/room.response";
import type { DepartmentResponse } from "../../../responses/department.response";

import { deleteRoom } from "../../../services/room.service";

import useCallApi from "../../../hooks/useCallApi";

type RoomTable = {
    rooms: RoomResponse[],
    departments: DepartmentResponse[],
    onSuccess?: () => void,
}

const RoomTable = (props: RoomTable) => {
    const { rooms, departments, onSuccess } = props;

    const { execute, notify, doFunc } = useCallApi();

    const [page, setPage] = useState<number>(1);
    const [row, setRow] = useState<number>(5);

    const [showDetail, setShowDetail] = useState<boolean>(false);
    const [showEdit, setShowEdit] = useState<boolean>(false);
    const [roomSelect, setRoomSelect] = useState<RoomResponse>({} as RoomResponse); 
    
    const handleShow = (roomSelect: RoomResponse) => {
        setRoomSelect(roomSelect);
        setShowDetail(true);
    }

    const handleEdit = (roomSelect: RoomResponse) => {
        setRoomSelect(roomSelect);
        setShowEdit(true);
    }

    const handleDelete = async (roomSelect: RoomResponse) => {
        const restResponse = await execute(deleteRoom(roomSelect.id));
        notify(restResponse!, "Xóa phòng khám thành công");
        doFunc(() => {
            onSuccess?.();
        });
    }

    return (
        <>
            <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-blue-50">
                    <tr>
                        <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700"># ID</th>
                        <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Tên phòng</th>
                        <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Thuộc khoa</th>
                        <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Trạng thái</th>
                        <th className="px-4 py-3 text-center text-sm font-semibold text-gray-700">Hành động</th>

                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                    {(rooms && rooms.length > 0) ? rooms.slice((page - 1) * row, page * row).map((room, idx) => (
                        <tr key={room.id} className={`${idx % 2 === 0 ? 'bg-gray-50' : 'bg-white'} hover:bg-blue-50 transition-colors`}>
                            <td className="px-4 py-3 text-sm text-gray-700 font-medium"># {room.id}</td>
                            <td className="px-4 py-3 text-sm text-gray-700 font-medium">{room.name}</td>
                            <td className="px-4 py-3 text-sm text-gray-700 font-medium">{room.departmentName ? room.departmentName : 'Chưa có khoa'}</td>
                            <td className="px-4 py-3 text-sm text-gray-700 font-medium">
                                {room.status === 'EMPTY' && <span className="px-2 py-1 rounded-full bg-green-100 text-green-800 text-xs font-semibold">Trống</span>}
                                {room.status === 'FULL' && <span className="px-2 py-1 rounded-full bg-red-100 text-red-800 text-xs font-semibold">Đầy</span>}
                                {room.status === 'REPAIR' && <span className="px-2 py-1 rounded-full bg-yellow-100 text-yellow-800 text-xs font-semibold">Sửa chữa</span>}
                            </td>
                            <td className="px-4 py-3 text-sm text-gray-600 text-center">
                                <div className="flex items-center justify-center gap-3">
                                    <button className="px-0.75 py-0.75 text-gray-600 border border-gray-300 rounded-md hover:bg-gray-50" onClick={() => handleShow(room)}>
                                        <i className="fa-solid fa-info"></i>
                                    </button>

                                    <button className="px-0.75 py-0.75 text-gray-600 border border-gray-300 rounded-md hover:bg-gray-50" onClick={() => handleEdit(room)}>
                                        <i className="fa-solid fa-wrench"></i>
                                    </button>

                                    <button className="px-0.75 py-0.75 text-gray-600 border border-gray-300 rounded-md hover:bg-gray-50" onClick={() => handleDelete(room)}>
                                        <i className="fa-solid fa-trash"></i>
                                    </button>
                                </div>
                            </td>
                        </tr>
                    )) : (
                        <tr>
                            <td colSpan={5} className="px-4 py-3 text-sm text-gray-600 text-center">
                                <div className="flex justify-center items-center gap-3">
                                    <i className="fa-solid fa-inbox"></i>
                                    <span>Không tìm thấy dữ liệu</span>
                                </div>
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
            <TablePagination array={props.rooms} page={page} row={row} setPage={setPage} setRow={setRow} />
            {showDetail && <RoomDetail roomSelect={roomSelect} setShowDetail={setShowDetail} />}
            {showEdit && <EditRoom roomSelect={roomSelect} departments={departments} setShowEdit={setShowEdit} onSuccess={onSuccess} />}
        </>
    )
}

export default RoomTable;