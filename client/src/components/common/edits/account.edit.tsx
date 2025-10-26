import { useEffect, useState } from "react";
import useCallApi from "../../../hooks/useCallApi";
import type { AccountResponse } from "../../../responses/account-detail.response";
import { updateAccount } from "../../../services/account.service";
import { accountStatus } from "../../../constants/status.constant";
import { roles } from "../../../constants/role.constant";

type EditAccount = {
    accountSelect: AccountResponse,
    setShowEdit: (edit: boolean) => void,
    onSuccess?: () => void
}

const EditAccount = (props: EditAccount) => {
    const { accountSelect, setShowEdit, onSuccess } = props;

    const { execute, notify, loading } = useCallApi();

    const [showPassword, setShowPassword] = useState<boolean>(false);

    const [submitData, setSubmitData] = useState({
        password: "",
        role: "",
        status: ""
    });

    const handleChangeSubmit = (field: keyof typeof submitData, value: string) => {
        setSubmitData(prev => ({ ...prev, [field]: value }));
    }

    const handleChange = async () => {
        const restResponse = await execute(updateAccount(accountSelect.id, submitData));
        notify(restResponse!, "Cập nhật thông tin thành công");
        if (restResponse?.result) {
            onSuccess?.();
        }
    }

    useEffect(() => {
        setSubmitData({
            password: "",
            role: accountSelect.role,
            status: accountSelect.status
        });
    }, [accountSelect]);


    return (
        <div className="fixed top-0 start-0 w-full h-full bg-gray-400/60 flex items-center justify-center z-20">
            <div className="bg-white w-100 rounded-lg shadow-lg p-6 space-y-3">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-bold text-gray-800">Sửa thông tin tài khoản - # {accountSelect.id}</h2>
                    <button
                        onClick={() => setShowEdit(false)}
                        className="text-gray-500 hover:text-gray-700 text-xl"
                    >
                        x
                    </button>
                </div>
                
                <div>
                    <label className="block text-gray-700 font-medium mb-2">Email</label>
                    <input type="text" readOnly={true}
                        value={accountSelect.email}
                        className="w-full border border-gray-300 rounded px-3 py-2 bg-gray-50 text-gray-700" />
                </div>

                <div>
                    <label className="block text-gray-700 font-medium mb-2">Mật khẩu mới:</label>
                    <div className="relative">
                        <i className={`fa-solid ${showPassword ? 'fa-eye' : 'fa-eye-slash'} absolute top-1/2 -translate-y-1/2 end-3 text-gray-400 cursor-pointer`}
                            onClick={() => setShowPassword(!showPassword)}></i>
                        <input type={showPassword ? 'text' : 'password'} required
                            value={submitData.password}
                            placeholder="Nhập mật khẩu mới"
                            onChange={(e) => handleChangeSubmit("password", e.target.value)}
                            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" />
                    </div>
                </div>

                <div>
                    <label className="block text-gray-700 font-medium mb-2">Vai trò:</label>
                    <select
                        value={submitData.role} required
                        onChange={(e) => handleChangeSubmit("role", e.target.value)}
                        className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        <option value="">Chọn vai trò</option>
                        {roles && roles.map(role => (
                            <option key={role.id} value={role.value}>{role.name}</option>
                        ))}
                    </select>
                </div>


                <div>
                    <label className="block text-gray-700 font-medium mb-2">Trạng thái:</label>
                    <select
                        value={submitData.status} required
                        onChange={(e) => handleChangeSubmit("role", e.target.value)}
                        className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        <option value="">Chọn trạng thái</option>
                        {accountStatus && accountStatus.map(status => (
                            <option key={status.id} value={status.value}>{status.name}</option>
                        ))}
                    </select>
                </div>


                <div className="flex justify-end gap-3">
                    <button className="flex-1 px-4 py-2 text-gray-600 border border-gray-300 rounded-md hover:bg-gray-50 transition"
                        onClick={() => setShowEdit(false)}>
                        Hủy
                    </button>
                    <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 flex-1"
                        onClick={handleChange}
                        disabled={loading}
                    >
                        {loading ? 'Đang xử lý...' : 'Xác nhận'}
                    </button>
                </div>
            </div>
        </div>
    )
}

export default EditAccount;