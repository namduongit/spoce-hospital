import { motion } from "motion/react";
import type { AccountResponse } from "../../../responses/account.response";

type AccountDetail = {
    accountSelect: AccountResponse,
    setShowDetail: (showDetail: boolean) => void,
    onSuccess?: () => void
}

const AccountDetail = (props: AccountDetail) => {
    const { accountSelect, setShowDetail } = props;

    const getStatusColor = (status: string) => {
        return status === 'ACTIVE' ? 'text-green-600 bg-green-100' : 'text-red-600 bg-red-100';
    };

    const getRoleColor = (role: string) => {
        switch (role) {
            case 'ADMIN': return 'text-purple-600 bg-purple-100';
            case 'DOCTOR': return 'text-blue-600 bg-blue-100';
            case 'CASHIER': return 'text-orange-600 bg-orange-100';
            case 'USER': return 'text-gray-600 bg-gray-100';
            default: return 'text-gray-600 bg-gray-100';
        }
    };

    return (
        <div className="fixed top-0 start-0 bg-gray-400/60 w-full h-full z-10">
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
                className="fixed top-0 end-0 w-150 bg-white rounded shadow-2xl h-full">
                <div className="relative">
                    <div className="close-btn absolute top-0 start-0 cursor-pointer z-20" onClick={() => setShowDetail(false)}>
                        <i className="fa-solid fa-angles-right text-xl text-white p-3"></i>
                    </div>

                    <div className="flex items-center px-5 py-5 pt-10 gap-3 bg-indigo-600 text-white">
                        <div className="admin-detail__icon text-2xl bg-gray-300/50 px-2 py-2 rounded-full">
                            <i className="fa-solid fa-user-circle"></i>
                        </div>
                        <div className="font-bold">
                            <p className="flex gap-2">ID tài khoản:<span># {accountSelect.id}</span></p>
                            <p className="flex gap-2">Trạng thái:<span className={`px-2 py-1 rounded text-xs ${getStatusColor(accountSelect.status)}`}>{accountSelect.status === 'INACTIVE' ? 'Bị khóa' : ' Đang hoạt động'}</span></p>
                        </div>
                    </div>

                    <div className="px-5 py-5 flex flex-col gap-5">
                        <div className="flex flex-col gap-5">
                            <div className="px-3 py-3 bg-gray-100 rounded shadow">
                                <div className="flex gap-1 items-center font-bold mb-2">
                                    <i className="fa-solid fa-user-tag text-indigo-600 text-lg"></i>
                                    <span>Thông tin tài khoản</span>
                                </div>
                                <p className="flex justify-between text-gray-600 font-medium mb-1">
                                    Email: <span className="text-black">{accountSelect.email}</span>
                                </p>
                                <p className="flex justify-between text-gray-600 font-medium mb-1">
                                    Vai trò: <span className={`px-2 py-1 font-semibold ${getRoleColor(accountSelect.role)}`}>
                                        {accountSelect.role === 'ADMIN' ? 'Quản trị viên' :
                                            accountSelect.role === 'DOCTOR' ? 'Bác sĩ' :
                                                accountSelect.role === 'ASSISTOR' ? 'Nhân viên' : 'Khách hàng'}
                                    </span>
                                </p>
                                <p className="flex justify-between text-gray-600 font-medium mb-1">
                                    Loại tài khoản: <span className="text-black">{accountSelect.type === 'ACCOUNT' ? 'Tài khoản' : 'Email'}</span>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </motion.div>
        </div>
    )
}

export default AccountDetail;
