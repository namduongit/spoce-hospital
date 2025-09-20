
import { useState } from "react";

import { rooms } from "../../../models/data";
import { departments } from "../../../models/data";
import { appointments } from "../../../models/data";

import { rows } from "../../contexts/utils.context";
import PaginationComponent from "../../components/paginations/table.pagination";

const DoctorAppointmentPage = () => {
    const [row, setRow] = useState<number>(5);
    const [page, setPage] = useState<number>(1);

    return (
        <main className="appointment-page">
            <div className="appointment-page__warp">
                <h3 className="text-2xl font-bold mb-6 text-blue-700">Danh sách cuộc hẹn</h3>

                <div className="appointment__sort">
                    <div className="appointment__filter flex justify-between">
                        <div className="appointment__select">
                            <select name="" className="border border-gray-300 rounded-md py-2 px-4 me-3 w-50">
                                <option value="">Chọn phòng</option>
                                {rooms.map((room) => (
                                    <option key={room.id} value={room.id}>
                                        {room.name}
                                    </option>
                                ))}
                            </select>

                            <select name="" className="border border-gray-300 rounded-md py-2 px-4 me-3 w-50">
                                <option value="">Chọn khoa</option>
                                {departments.map((department) => (
                                    <option key={department.id} value={department.id}>
                                        {department.name}
                                    </option>
                                ))}
                            </select>

                            <select name="" className="border border-gray-300 rounded-md py-2 px-4 w-50">
                                <option value="">Số hàng</option>
                                {rows.map((row) => (
                                    <option key={row.id} value={row.id} onClick={() => setRow(row.value)}>
                                        {row.name}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="appointment__search relative w-100">
                            <i className="fa-brands fa-searchengin absolute start-0 top-1/2 -translate-y-1/2 text-gray-500 px-2"></i>
                            <input type="text" className="border border-gray-300 rounded-md py-2 px-4 ps-8 w-[100%]" placeholder="Nhập tên bệnh nhân"/>
                        </div>
                    </div>

                    <div className="appointment__status">
                        
                    </div>
                </div>

                <div className="appointment__data mt-5 overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200 rounded-lg overflow-hidden shadow-md bg-white">
                        <thead className="bg-blue-50">
                            <tr>
                                <th className="px-4 py-2 text-left text-[16px] font-semibold text-gray-700"># ID</th>
                                <th className="px-4 py-2 text-left text-[16px] font-semibold text-gray-700">Họ tên</th>
                                <th className="px-4 py-2 text-left text-[16px] font-semibold text-gray-700">Trạng thái</th>
                                <th className="px-4 py-2 text-left text-[16px] font-semibold text-gray-700">Số điện thoại</th>
                                <th className="px-4 py-2 text-left text-[16px] font-semibold text-gray-700">Thời gian</th>
                                <th className="px-4 py-2 text-left text-[16px] font-semibold text-gray-700">Hành động</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {appointments.slice((page - 1) * row, page * row).map((appointment, idx) => (
                                <tr key={appointment.id} className={idx % 2 === 0 ? 'bg-gray-50 hover:bg-blue-50 transition' : 'bg-white hover:bg-blue-50 transition'}>
                                    <td className="px-4 py-2 text-sm text-gray-700 font-medium">{appointment.id}</td>
                                    <td className="px-4 py-2 text-sm text-gray-700">{appointment.fullName}</td>
                                    <td className="px-4 py-2 text-sm">
                                        <span className={`px-3 py-1 rounded-full text-xs font-bold 
                                            ${appointment.status === 'CANCELED' ? 'bg-gray-200 text-gray-700' : ''}
                                            ${appointment.status === 'CONFIRMED' ? 'bg-blue-100 text-blue-700' : ''}
                                            ${appointment.status === 'PENDING' ? 'bg-yellow-100 text-yellow-800' : ''}
                                            ${appointment.status === 'COMPLETED' ? 'bg-green-100 text-green-700' : ''}
                                        `}>{appointment.status}</span>
                                    </td>
                                    <td className="px-4 py-2 text-sm text-gray-500">{appointment.phone}</td>
                                    <td className="px-4 py-2 text-sm text-gray-500">{appointment.time}</td>
                                    <td className="px-4 py-2 flex gap-2">
                                        <button className="px-3 py-1 bg-blue-100 text-blue-700 rounded hover:bg-blue-200 transition text-xs font-semibold">Xem</button>
                                        <button className="px-3 py-1 bg-red-100 text-red-700 rounded hover:bg-red-200 transition text-xs font-semibold">Hủy</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <div className="appointment__pagination mt-5">
                    <PaginationComponent array={appointments} page={page} setPage={setPage } row={row} />
                </div>
            </div>
        </main>
    )
}

export default DoctorAppointmentPage;