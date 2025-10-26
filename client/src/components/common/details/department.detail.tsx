import type { DepartmentResponse } from "../../../responses/department.response";

type DepartmentDetail = {
    departmentSelect: DepartmentResponse,
    setShowDetail: (showDetail: boolean) => void
}

const DepartmentDetail = (props: DepartmentDetail) => {
    const { departmentSelect, setShowDetail } = props;

    return (
        <div className="fixed inset-0 bg-gray-500/50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-3xl mx-4 max-h-[90vh] overflow-y-auto">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                        <i className="fa-solid fa-hospital text-blue-600"></i>
                        Chi tiết khoa #{departmentSelect.id}
                    </h2>
                    <button
                        onClick={() => setShowDetail(false)}
                        className="text-gray-500 hover:text-gray-700 text-xl"
                    >
                        x
                    </button>
                </div>

                <div className="space-y-6">
                    <div className="border border-gray-200 rounded-lg p-4">
                        <h3 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
                            <i className="fa-solid fa-info-circle text-blue-600"></i>
                            Thông tin cơ bản
                        </h3>
                        <div>
                            <label className="block text-sm font-medium text-gray-600 mb-1">Tên khoa</label>
                            <p className="text-gray-900 font-medium text-lg">{departmentSelect.name}</p>
                        </div>
                    </div>

                    <div className="border border-gray-200 rounded-lg p-4">
                        <h3 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
                            <i className="fa-solid fa-chart-bar text-green-600"></i>
                            Thống kê tổng quan
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div className="bg-blue-50 p-4 rounded-lg">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm font-medium text-gray-600">Bác sĩ</p>
                                        <p className="text-2xl font-bold text-blue-600">
                                            {departmentSelect.doctors?.length || 0}
                                        </p>
                                    </div>
                                    <div className="text-blue-600">
                                        <i className="fa-solid fa-user-doctor text-2xl"></i>
                                    </div>
                                </div>
                            </div>
                            <div className="bg-green-50 p-4 rounded-lg">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm font-medium text-gray-600">Phòng khám</p>
                                        <p className="text-2xl font-bold text-green-600">
                                            {departmentSelect.rooms?.length || 0}
                                        </p>
                                    </div>
                                    <div className="text-green-600">
                                        <i className="fa-solid fa-door-open text-2xl"></i>
                                    </div>
                                </div>
                            </div>
                            <div className="bg-orange-50 p-4 rounded-lg">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm font-medium text-gray-600">Lịch hẹn</p>
                                        <p className="text-2xl font-bold text-orange-600">
                                            {departmentSelect.appointments?.length || 0}
                                        </p>
                                    </div>
                                    <div className="text-orange-600">
                                        <i className="fa-solid fa-calendar-check text-2xl"></i>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {departmentSelect.doctors && departmentSelect.doctors.length > 0 && (
                        <div className="border border-gray-200 rounded-lg p-4">
                            <h3 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
                                <i className="fa-solid fa-user-doctor text-blue-600"></i>
                                Danh sách bác sĩ ({departmentSelect.doctors.length})
                            </h3>
                            <div className="space-y-2">
                                {departmentSelect.doctors.slice(0, 5).map((doctor) => (
                                    <div key={doctor.id} className="flex items-center justify-between py-2 px-3 bg-gray-50 rounded">
                                        <div>
                                            <p className="font-medium text-gray-900">{doctor.fullName || 'Chưa cập nhật'}</p>
                                            <p className="text-sm text-gray-600">{doctor.degree || 'Chưa cập nhật'}</p>
                                        </div>
                                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                                            doctor.status === 'AVAILABLE' ? 'bg-green-100 text-green-800' :
                                            doctor.status === 'BUSY' ? 'bg-yellow-100 text-yellow-800' : 
                                            'bg-red-100 text-red-800'
                                        }`}>
                                            {doctor.status === 'AVAILABLE' ? 'Sẵn sàng' : 
                                             doctor.status === 'BUSY' ? 'Bận' : 'Nghỉ'}
                                        </span>
                                    </div>
                                ))}
                                {departmentSelect.doctors.length > 5 && (
                                    <p className="text-sm text-gray-500 text-center py-2">
                                        và {departmentSelect.doctors.length - 5} bác sĩ khác...
                                    </p>
                                )}
                            </div>
                        </div>
                    )}

                    {departmentSelect.rooms && departmentSelect.rooms.length > 0 && (
                        <div className="border border-gray-200 rounded-lg p-4">
                            <h3 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
                                <i className="fa-solid fa-door-open text-green-600"></i>
                                Danh sách phòng khám ({departmentSelect.rooms.length})
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                {departmentSelect.rooms.map((room) => (
                                    <div key={room.id} className="flex items-center justify-between py-2 px-3 bg-gray-50 rounded">
                                        <div>
                                            <p className="font-medium text-gray-900">{room.name}</p>
                                            <p className="text-sm text-gray-600">Phòng #{room.id}</p>
                                        </div>
                                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                                            room.status === 'EMPTY' ? 'bg-green-100 text-green-800' :
                                            room.status === 'FULL' ? 'bg-blue-100 text-blue-800' : 
                                            'bg-yellow-100 text-yellow-800'
                                        }`}>
                                            {room.status === 'EMPTY' ? 'Trống' : 
                                             room.status === 'FULL' ? 'Đầy' : 'Sửa chữa'}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>

                <div className="flex justify-end mt-6">
                    <button
                        onClick={() => setShowDetail(false)}
                        className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition"
                    >
                        Đóng
                    </button>
                </div>
            </div>
        </div>
    )
}

export default DepartmentDetail;
