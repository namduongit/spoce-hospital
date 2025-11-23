import { useEffect, useState } from "react";
import { roomStatus } from "../../../constants/status.constant";
import AddDepartment from "../../../components/common/adds/department.add";
import DepartmentTable from "../../../components/common/tables/department.table";
import RoomTable from "../../../components/common/tables/room.table";
import AddRoom from "../../../components/common/adds/room.add";

import type { DepartmentResponse } from "../../../responses/department.response";
import type { RoomResponse } from "../../../responses/room.response";

import { getDepartmentList } from "../../../services/department.service";
import { getRoomList } from "../../../services/room.service";


import useCallApi from "../../../hooks/useCallApi";

const AdminDepartmentPage = () => {
    const { execute } = useCallApi();

    const [select, setSelect] = useState<string>("department");

    const [departments, setDepartments] = useState<DepartmentResponse[]>([]);
    const [departmentsFilter, setDepartmentsFilter] = useState<DepartmentResponse[]>([]);

    const [rooms, setRooms] = useState<RoomResponse[]>([]);
    const [roomsFilter, setRoomsFilter] = useState<RoomResponse[]>([]);

    const [isOpenCreateDepartment, setIsOpenCreateDepartment] = useState<boolean>(false);
    const [isOpenCreateRoom, setIsOpenCreateRoom] = useState<boolean>(false);

    const [searchForm, setSearchForm] = useState({
        input: "",
        status: ""
    });

    const handleSearchFormChange = (field: keyof typeof searchForm, value: string) => {
        setSearchForm(prev => ({ ...prev, [field]: value }));
    }

    const handleGetDepartmentList = async () => {
        const restResponse = await execute(getDepartmentList());
        if (restResponse?.result) {
            const data: DepartmentResponse[] = restResponse.data;
            setDepartments(Array.isArray(data) ? data : []);
            setDepartmentsFilter(Array.isArray(data) ? data : []);
        }
    }

    const handleGetRoomList = async () => {
        const restResponse = await execute(getRoomList());
        if (restResponse?.result) {
            const data: RoomResponse[] = restResponse.data;
            setRooms(Array.isArray(data) ? data : []);
            setRoomsFilter(Array.isArray(data) ? data : []);
        }
    }

    useEffect(() => {
        if (select === "department") {
            setDepartmentsFilter(
                departments.filter(department => {
                    const matchesInput =
                        searchForm.input === "" ||
                        department.name?.toLowerCase().includes(searchForm.input.toLowerCase()) ||
                        department.id?.toString().includes(searchForm.input);

                    return matchesInput;
                })
            );
        } else {
            setRoomsFilter(
                rooms.filter(room => {
                    const matchesInput =
                        searchForm.input === "" ||
                        room.name?.toLowerCase().includes(searchForm.input.toLowerCase()) ||
                        room.id?.toString().includes(searchForm.input) ||
                        room.departmentName?.toLowerCase().includes(searchForm.input.toLowerCase());

                    const matchesStatus =
                        searchForm.status === "" || room.status === searchForm.status;

                    return matchesInput && matchesStatus;
                })
            );
        }

    }, [searchForm, departments, rooms]);

    useEffect(() => {
        handleGetDepartmentList();
        handleGetRoomList();
    }, []);

    // Tính toán thống kê
    const stats = {
        totalDepartments: departments.length,
        totalRooms: rooms.length,
        activeRooms: rooms.filter(r => r.status === 'EMPTY').length,
        inactiveRooms: rooms.filter(r => r.status === 'FULL').length,
        maintenanceRooms: rooms.filter(r => r.status === 'REPAIR').length,
    };

    return (
        <main className="p-4 sm:p-6">
            <div className="max-w-full">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
                    <div>
                        <h3 className="text-xl sm:text-2xl font-bold text-blue-700 mb-2 sm:mb-0">
                            Quản lý phòng khám & khoa khám
                        </h3>
                        <p className="text-sm text-gray-600 mt-1">Quản lý các phòng và khoa khám trong bệnh viện</p>
                    </div>
                    <div className="text-sm text-gray-600">
                        <div>Tổng: <span className="font-semibold text-blue-600">{stats.totalRooms}</span> phòng khám</div>
                        <div>Tổng: <span className="font-semibold text-blue-600">{stats.totalDepartments}</span> khoa khám</div>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-6">
                    <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
                        <div className="flex items-center">
                            <div className="p-2 bg-blue-100 rounded-lg">
                                <i className="fa-solid fa-building text-blue-600"></i>
                            </div>
                            <div className="ml-3">
                                <p className="text-sm text-gray-600">Tổng khoa</p>
                                <p className="text-lg font-semibold">{stats.totalDepartments}</p>
                            </div>
                        </div>
                    </div>
                    <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
                        <div className="flex items-center">
                            <div className="p-2 bg-green-100 rounded-lg">
                                <i className="fa-solid fa-door-open text-green-600"></i>
                            </div>
                            <div className="ml-3">
                                <p className="text-sm text-gray-600">Tổng phòng</p>
                                <p className="text-lg font-semibold">{stats.totalRooms}</p>
                            </div>
                        </div>
                    </div>
                    <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
                        <div className="flex items-center">
                            <div className="p-2 bg-purple-100 rounded-lg">
                                <i className="fa-solid fa-check-circle text-purple-600"></i>
                            </div>
                            <div className="ml-3">
                                <p className="text-sm text-gray-600">Phòng hoạt động</p>
                                <p className="text-lg font-semibold">{stats.activeRooms}</p>
                            </div>
                        </div>
                    </div>
                    <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
                        <div className="flex items-center">
                            <div className="p-2 bg-orange-100 rounded-lg">
                                <i className="fa-solid fa-circle-xmark text-orange-600"></i>
                            </div>
                            <div className="ml-3">
                                <p className="text-sm text-gray-600">Phòng hết chỗ</p>
                                <p className="text-lg font-semibold">{stats.inactiveRooms}</p>
                            </div>
                        </div>
                    </div>
                    <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
                        <div className="flex items-center">
                            <div className="p-2 bg-red-100 rounded-lg">
                                <i className="fa-solid fa-tools text-red-600"></i>
                            </div>
                            <div className="ml-3">
                                <p className="text-sm text-gray-600">Bảo trì</p>
                                <p className="text-lg font-semibold">{stats.maintenanceRooms}</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-6 grid gap-4 grid-cols-1 lg:grid-cols-2">
                    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:space-x-3">
                        <div className="flex-1">
                            <label className="block text-xs text-gray-600 mb-1">
                                Tìm kiếm
                            </label>
                            <div className="relative">
                                <i className="fa-solid fa-search absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm"></i>
                                <input
                                    type="text"
                                    value={searchForm.input}
                                    onChange={(event) => handleSearchFormChange("input", event.target.value)}
                                    className="border border-gray-300 rounded-md py-2 pl-10 pr-4 text-sm w-full focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                                    placeholder="Tìm kiếm theo tên hoặc id ..."
                                />
                            </div>
                        </div>

                        <div className="flex-1">
                            <label className="block text-xs text-gray-600 mb-1">
                                Trạng thái
                            </label>
                            <select
                                className={`w-full border border-gray-300 rounded-md py-2 px-3 text-sm ${select === "department" ? "bg-gray-50 text-gray-600" : "focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"}`}
                                disabled={select === "department"}
                                value={searchForm.status}
                                onChange={(event) => handleSearchFormChange("status", event.target.value)}
                            >
                                <option value="">Chọn trạng thái</option>
                                {roomStatus.map((status) => (
                                    <option key={status.id} value={status.value}>
                                        {status.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="flex-1">
                            <label className="block text-xs text-gray-600 mb-1">
                                Trang quản lý
                            </label>
                            <select
                                className="w-full border border-gray-300 rounded-md py-2 px-3 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                                value={select}
                                onChange={(e) => setSelect(e.target.value)}
                            >
                                <option value="department">Quản lý khoa</option>
                                <option value="room">Quản lý phòng</option>
                            </select>
                        </div>
                    </div>
                    <div className="flex justify-end items-center gap-2">
                        <button className="font-semibold bg-blue-600 text-white hover:text-blue-600 hover:bg-white hover:ring-3 hover:ring-blue-600 px-4 py-2 rounded shadow cursor-pointer flex items-center"
                            onClick={() => setIsOpenCreateRoom(true)}>
                            <i className="fa-solid fa-plus me-2"></i>
                            <span>Thêm phòng</span>
                        </button>
                        <button className="font-semibold bg-blue-600 text-white hover:text-blue-600 hover:bg-white hover:ring-3 hover:ring-blue-600 px-4 py-2 rounded shadow cursor-pointer flex items-center"
                            onClick={() => setIsOpenCreateDepartment(true)}>
                            <i className="fa-solid fa-plus me-2"></i>
                            <span>Thêm khoa</span>
                        </button>
                    </div>
                </div>

                <div className="hidden lg:block bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                    <div className="overflow-x-auto">
                        {select === "department" && <DepartmentTable departments={departmentsFilter} onSuccess={handleGetDepartmentList} />}
                        {select === "room" && <RoomTable rooms={roomsFilter} departments={departments} onSuccess={handleGetRoomList} />}
                    </div>
                </div>
            </div>

            {isOpenCreateDepartment && <AddDepartment setIsOpenCreateDepartment={setIsOpenCreateDepartment} departments={departmentsFilter} onSuccess={handleGetDepartmentList} />}
            {isOpenCreateRoom && <AddRoom setIsOpenCreateRoom={setIsOpenCreateRoom} onSuccess={handleGetRoomList} departments={departmentsFilter} />}

        </main >
    )
}

export default AdminDepartmentPage;