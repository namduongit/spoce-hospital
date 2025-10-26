import type { AccountResponse } from "../../../responses/account-detail.response";

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
        <div className="fixed inset-0 bg-gray-500/50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-2xl mx-4 max-h-[90vh] overflow-y-auto">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                        <i className="fa-solid fa-user-circle text-blue-600"></i>
                        Chi tiết tài khoản #{accountSelect.id}
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
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-600 mb-1">Email</label>
                                <p className="text-gray-900">{accountSelect.email}</p>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-600 mb-1">Loại tài khoản</label>
                                <p className="text-gray-900">{accountSelect.type === 'ACCOUNT' ? 'Tài khoản' : 'Email'}</p>
                            </div>
                        </div>
                    </div>

                    <div className="border border-gray-200 rounded-lg p-4">
                        <h3 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
                            <i className="fa-solid fa-user-tag text-green-600"></i>
                            Vai trò và trạng thái
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-600 mb-1">Vai trò</label>
                                <span className={`px-3 py-1 rounded-full text-sm font-medium ${getRoleColor(accountSelect.role)}`}>
                                    {accountSelect.role === 'ADMIN' ? 'Quản trị viên' :
                                        accountSelect.role === 'DOCTOR' ? 'Bác sĩ' :
                                            accountSelect.role === 'ASSISTOR' ? 'Nhân viên' : 'Khách hàng'}
                                </span>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-600 mb-1">Trạng thái</label>
                                <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(accountSelect.status)}`}>
                                    {accountSelect.status === 'INACTIVE' ? 'Bị khóa' : 'Đang hoạt động'}
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

export default AccountDetail;
