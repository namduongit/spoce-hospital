import { useState } from "react";
import TablePagination from "../others/pagination";
import RoomDetail from "../../common/details/room.detail";
import EditRoom from "../edits/room.edit";

import type { RoomResponse } from "../../../responses/room.response";
import type { DepartmentResponse } from "../../../responses/department.response";

type RoomTableProps = {
    rooms: RoomResponse[],
    departments: DepartmentResponse[],
    onSuccess?: () => void,
}

const RoomTable = (props: RoomTableProps) => {
    const { rooms, departments, onSuccess } = props;

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
                                </div>
                            </td>
                        </tr>
                    )) : (
                        <tr>
                            <td colSpan={5} className="px-4 py-8 text-center text-gray-500">
                                <div className="flex flex-col items-center">
                                    <i className="fa-solid fa-door-open text-4xl mb-3 text-gray-300"></i>
                                    <p className="text-lg font-medium">Không có phòng nào</p>
                                    <p className="text-sm mt-1">Chưa có dữ liệu để hiển thị</p>
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