import { motion } from "motion/react";
import type { RoomResponse } from "../../../responses/room.response";

type RoomDetail = {
    roomSelect: RoomResponse,
    setShowDetail: (showDetail: boolean) => void
}

const RoomDetail = (props: RoomDetail) => {
    const { roomSelect, setShowDetail } = props;

    const getStatusColor = (status: string) => {
        return status === 'EMPTY' ? 'bg-green-100 text-green-800' :
            status === 'FULL' ? 'bg-blue-100 text-blue-700' :
                status === 'REPAIR' ? 'bg-yellow-100 text-yellow-800' : '';
    }

    return (
        <div className="admin-detail-account fixed top-0 start-0 bg-gray-400/60 w-full h-full z-10">
            <motion.div
                initial={{
                    x: 650
                }}
                animate={{
                    x: 0
                }}
                transition={{
                    duration: 0.5,
                    type: "spring"
                }}
                className="admin-detail__wrap fixed top-0 end-0 w-150 bg-white rounded shadow-2xl h-full">
                <div className="admin-detail__content relative">
                    <div className="close-btn absolute top-0 start-0 cursor-pointer z-20" onClick={() => setShowDetail(false)}>
                        <i className="fa-solid fa-angles-right text-xl text-white p-3"></i>
                    </div>

                    <div className="admin-detail__header flex items-center px-5 py-5 pt-10 gap-3 bg-indigo-600 text-white">
                        <div className="admin-detail__icon text-2xl bg-gray-300/50 px-2 py-2 rounded-full">
                            <i className="fa-solid fa-user-circle"></i>
                        </div>
                        <div className="admin-detail__tag font-bold">
                            <p className="flex gap-2">ID phòng khám:
                                <span># {roomSelect.id}</span>
                            </p>
                            <p className="flex gap-2">Trạng thái:
                                <span className={`px-2 py-1 rounded text-xs ${getStatusColor(roomSelect.status)}`}>
                                    {roomSelect.status === 'EMPTY' ? 'Còn trống' : ''}
                                    {roomSelect.status === 'FULL' ? 'Đã đầy' : ''}
                                    {roomSelect.status === 'REPAIR' ? 'Đang sửa chữa' : ''}
                                </span>
                            </p>
                        </div>
                    </div>

                    <div className="admin-detail__body px-5 py-5 flex flex-col gap-5">
                        <div className="admin-detail__list flex flex-col gap-5">
                            <div className="admin-detail__item px-3 py-3 bg-gray-100 rounded shadow">
                                <div className="admin-detail__icon flex gap-1 items-center font-bold mb-2">
                                    <i className="fa-solid fa-user-tag text-indigo-600 text-lg"></i>
                                    <span>Thông tin phòng khám</span>
                                </div>
                                <p className="flex justify-between text-gray-600 font-medium mb-1">
                                    Tên phòng: <span className="text-black">{roomSelect.name}</span>
                                </p>
                                <p className="flex justify-between text-gray-600 font-medium mb-1">
                                    Mã khoa:
                                    <span className={`text-black`}>{roomSelect.departmentId}</span>
                                </p>
                                <p className="flex justify-between text-gray-600 font-medium mb-1">
                                    Tên khoa:
                                    <span className={`text-black`}>{roomSelect.departmentName}</span>
                                </p>
                            </div>
                        </div>

                        <div className="admin-detail__button flex gap-2">

                        </div>
                    </div>
                </div>
            </motion.div>
        </div>
    )
}
export default RoomDetail;