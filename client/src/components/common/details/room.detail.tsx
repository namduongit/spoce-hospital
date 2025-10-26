import type { RoomResponse } from "../../../responses/room.response";

type RoomDetail = {
    roomSelect: RoomResponse,
    setShowDetail: (showDetail: boolean) => void
}

const RoomDetail = (props: RoomDetail) => {
    const { roomSelect, setShowDetail } = props;

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'EMPTY': return 'text-green-800';
            case 'FULL': return 'text-blue-700';
            case 'REPAIR': return 'text-yellow-800';
            default: return 'text-gray-800';
        }
    }

    const getStatusText = (status: string) => {
        switch (status) {
            case 'EMPTY': return 'Còn trống';
            case 'FULL': return 'Đã đầy';
            case 'REPAIR': return 'Đang sửa chữa';
            default: return status;
        }
    }

    return (
        <div className="fixed inset-0 bg-gray-500/50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-2xl mx-4 max-h-[90vh] overflow-y-auto">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                        <i className="fa-solid fa-door-open text-blue-600"></i>
                        Chi tiết phòng khám #{roomSelect.id}
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
                            Thông tin phòng khám
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-600 mb-1">Tên phòng</label>
                                <p className="text-gray-900 font-medium">{roomSelect.name}</p>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-600 mb-1">Mã khoa</label>
                                <p className="text-gray-900">{roomSelect.departmentId}</p>
                            </div>
                            <div className="md:col-span-2">
                                <label className="block text-sm font-medium text-gray-600 mb-1">Tên khoa</label>
                                <p className="text-gray-900">{roomSelect.departmentName}</p>
                            </div>
                            <div className="text-left md:col-span-2">
                                <label className="block text-sm font-medium text-gray-600 mb-1">Trạng thái</label>
                                <span className={`font-bold ${getStatusColor(roomSelect.status)}`}>
                                    {getStatusText(roomSelect.status)}
                                </span>
                            </div>
                        </div>
                    </div>
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
export default RoomDetail;