import { useState } from "react";
import TablePagination from "../others/pagination";
import AccountDetail from "../details/account.detail";

import type { AccountResponse } from "../../../responses/account.response";

import { updateAccount } from "../../../services/account.service";

import useCallApi from "../../../hooks/useCallApi";
import EditAccount from "../edits/account.edit";

type AccountTableProps = {
    accounts: AccountResponse[];
    onSuccess?: () => void;
}

const AccountTable = (props: AccountTableProps) => {
    const { accounts, onSuccess } = props;

    const { execute, notify } = useCallApi();

    const [page, setPage] = useState<number>(1);
    const [row, setRow] = useState<number>(5);

    const [showDetail, setShowDetail] = useState<boolean>(false);
    const [showEdit, setShowEdit] = useState<boolean>(false);
    const [accountSelect, setAccountSelect] = useState<AccountResponse>({} as AccountResponse);

    const handleShow = (accountSelect: AccountResponse) => {
        setAccountSelect(accountSelect);
        setShowDetail(true);
    }

    const handleEdit = (accountSelect: AccountResponse) => {
        setAccountSelect(accountSelect);
        setShowEdit(true);
    }

    const handleChangeStatus = async (accountSelect: AccountResponse, status: string) => {
        const restResponse = await execute(updateAccount(accountSelect.id, { status }));
        notify(restResponse!, status === "INACTIVE" ? "Khóa tài khoản thành công" : "Mở khóa tài khoản thành công");
        if (restResponse?.result) {
            onSuccess?.();
        }
    }

    return (
        <>
            <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-blue-50">
                    <tr>
                        <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700"># ID</th>
                        <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Tài khoản</th>
                        <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Trạng thái</th>
                        <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Quyền hạn</th>
                        <th className="px-4 py-3 text-center text-sm font-semibold text-gray-700">Hành động</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                    {(accounts && accounts.length > 0) ? accounts.slice((page - 1) * row, page * row).map((account, idx) => (
                        <tr key={account.id} className={`${idx % 2 === 0 ? 'bg-gray-50' : 'bg-white'} hover:bg-blue-50 transition-colors`}>
                            <td className="px-4 py-3 text-sm text-gray-700 font-medium"># {account.id}</td>
                            <td className="px-4 py-3 text-sm text-gray-700 font-medium">{account.email}</td>
                            <td className="px-4 py-3 text-sm">
                                <span className={`inline-flex px-2 py-1 rounded-full text-xs font-medium 
                                                                            ${account.status === 'INACTIVE' ? 'bg-yellow-100 text-yellow-800' : ''}
                                                                            ${account.status === 'ACTIVE' ? 'bg-green-100 text-green-700' : ''}
                                                                        `}>
                                    {account.status === 'INACTIVE' ? 'Tạm khóa' : 'Họat động'}
                                </span>
                            </td>
                            <td className="px-4 py-3 text-sm text-gray-600">
                                {account.role === 'ADMIN' ? 'Quản trị viên' :
                                    account.role === 'DOCTOR' ? 'Bác sĩ' :
                                        account.role === 'ASSISTOR' ? 'Nhân viên' : 'Khách hàng'}
                            </td>
                            <td className="px-4 py-3 text-sm text-gray-600 text-center">
                                <div className="flex items-center justify-center gap-3">
                                    <button className="px-0.75 py-0.75 text-gray-600 border border-gray-300 rounded-md hover:bg-gray-50"
                                        onClick={() => handleShow(account)}
                                    >
                                        <i className="fa-solid fa-info"></i>
                                    </button>

                                    <button className="px-0.75 py-0.75 text-gray-600 border border-gray-300 rounded-md hover:bg-gray-50"
                                        onClick={() => handleEdit(account)}>
                                        <i className="fa-solid fa-wrench"></i>
                                    </button>

                                    <button className="px-0.75 py-0.75 text-gray-600 border border-gray-300 rounded-md hover:bg-gray-50"
                                        onClick={() => {
                                            handleChangeStatus(account, account.status === "ACTIVE" ? "INACTIVE" : "ACTIVE")
                                        }}
                                    >
                                        <i className={`fa-solid ${account.status === "ACTIVE" ? "fa-lock" : "fa-lock-open"}`}></i>
                                    </button>
                                </div>
                            </td>
                        </tr>
                    )) : (
                        <tr>
                            <td colSpan={5} className="px-4 py-8 text-center text-gray-500">
                                <div className="flex flex-col items-center">
                                    <i className="fa-solid fa-users text-4xl mb-3 text-gray-300"></i>
                                    <p className="text-lg font-medium">Không có tài khoản nào</p>
                                    <p className="text-sm mt-1">Chưa có dữ liệu để hiển thị</p>
                                </div>
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
            <TablePagination array={props.accounts} page={page} row={row} setPage={setPage} setRow={setRow} />
            {(showDetail && accountSelect) && (<AccountDetail accountSelect={accountSelect} setShowDetail={setShowDetail} onSuccess={onSuccess} />)}
            {(showEdit && accountSelect) && (<EditAccount accountSelect={accountSelect} setShowEdit={setShowEdit} onSuccess={onSuccess} />)}
        </>
    )
}

export default AccountTable;