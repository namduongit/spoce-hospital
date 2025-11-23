import { roles } from "../../../constants/role.constant";
import { accountStatus } from "../../../constants/status.constant";
import { useEffect, useState } from "react";
import AddAccount from "../../../components/common/adds/account.add";
import AccountTable from "../../../components/common/tables/account.table";

import { getAccountList } from "../../../services/account.service";

import useCallApi from "../../../hooks/useCallApi";
import type { AccountResponse } from "../../../responses/account.response";

const AdminAccountPage = () => {
    const { execute } = useCallApi();

    const [accounts, setAccounts] = useState<AccountResponse[]>([]);
    const [accountsFilter, setAccountsFilter] = useState<AccountResponse[]>([]);

    const [isOpenCreateAccount, setIsOpenCreateAccount] = useState<boolean>(false);

    const [searchForm, setSearchForm] = useState({
        input: "",
        role: "",
        status: ""
    });

    const handleChangeSearch = (field: keyof typeof searchForm, value: string) => {
        setSearchForm(prev => ({ ...prev, [field]: value }));
    }

    const handleGetAccountList = async () => {
        const restResponse = await execute(getAccountList());
        if (restResponse?.result) {
            const data: AccountResponse[] = restResponse.data;
            setAccounts(data);
            setAccountsFilter(data);
        }
    }

    useEffect(() => {
        setAccountsFilter(
            accounts.filter(account => {
                const matchesInput =
                    searchForm.input === "" ||
                    account.email?.toLowerCase().includes(searchForm.input.toLowerCase()) ||
                    account.id?.toString().includes(searchForm.input);

                const matchesRole =
                    searchForm.role === "" || account.role === searchForm.role;

                const matchesStatus =
                    searchForm.status === "" || account.status === searchForm.status;

                return matchesInput && matchesRole && matchesStatus;
            })
        );
    }, [searchForm, accounts]);

    useEffect(() => {
        handleGetAccountList();
    }, []);

    const stats = {
        totalAccounts: accounts.length,
        activeAccounts: accounts.filter(a => a.status === 'ACTIVE').length,
        inactiveAccounts: accounts.filter(a => a.status === 'INACTIVE').length,
        adminAccounts: accounts.filter(a => a.role === 'ADMIN').length,
        doctorAccounts: accounts.filter(a => a.role === 'DOCTOR').length,
        assistorAccounts: accounts.filter(a => a.role === 'ASSISTOR').length,
        patientAccounts: accounts.filter(a => a.role === 'USER').length,
    };

    return (
        <main className="p-4 sm:p-6">
            <div className="max-w-full">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
                    <div>
                        <h3 className="text-xl sm:text-2xl font-bold text-blue-700 mb-2 sm:mb-0">
                            Quản lý tài khoản
                        </h3>
                        <p className="text-sm text-gray-600 mt-1">Quản lý các tài khoản trong hệ thống</p>
                    </div>

                    <div className="text-sm text-gray-600">
                        <div>Tổng: <span className="font-semibold text-blue-600">{stats.totalAccounts}</span> tài khoản</div>
                        <div>Hoạt động: <span className="font-semibold text-green-600">{stats.activeAccounts}</span></div>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-6">
                    <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
                        <div className="flex items-center">
                            <div className="p-2 bg-blue-100 rounded-lg">
                                <i className="fa-solid fa-users text-blue-600"></i>
                            </div>
                            <div className="ml-3">
                                <p className="text-sm text-gray-600">Tổng tài khoản</p>
                                <p className="text-lg font-semibold">{stats.totalAccounts}</p>
                            </div>
                        </div>
                    </div>
                    <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
                        <div className="flex items-center">
                            <div className="p-2 bg-green-100 rounded-lg">
                                <i className="fa-solid fa-check-circle text-green-600"></i>
                            </div>
                            <div className="ml-3">
                                <p className="text-sm text-gray-600">Hoạt động</p>
                                <p className="text-lg font-semibold">{stats.activeAccounts}</p>
                            </div>
                        </div>
                    </div>
                    <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
                        <div className="flex items-center">
                            <div className="p-2 bg-purple-100 rounded-lg">
                                <i className="fa-solid fa-user-md text-purple-600"></i>
                            </div>
                            <div className="ml-3">
                                <p className="text-sm text-gray-600">Bác sĩ</p>
                                <p className="text-lg font-semibold">{stats.doctorAccounts}</p>
                            </div>
                        </div>
                    </div>
                    <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
                        <div className="flex items-center">
                            <div className="p-2 bg-orange-100 rounded-lg">
                                <i className="fa-solid fa-user text-orange-600"></i>
                            </div>
                            <div className="ml-3">
                                <p className="text-sm text-gray-600">Nhân viên</p>
                                <p className="text-lg font-semibold">{stats.assistorAccounts}</p>
                            </div>
                        </div>
                    </div>
                    <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
                        <div className="flex items-center">
                            <div className="p-2 bg-red-100 rounded-lg">
                                <i className="fa-solid fa-user text-red-600"></i>
                            </div>
                            <div className="ml-3">
                                <p className="text-sm text-gray-600">Bệnh nhân</p>
                                <p className="text-lg font-semibold">{stats.patientAccounts}</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-6 grid gap-4 grid-cols-1 lg:grid-cols-2">
                    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:space-x-3">
                        <div className="relative flex-1">
                            <label className="block text-xs text-gray-600 mb-1">
                                Tìm kiếm
                            </label>
                            <div className="relative">
                                <i className="fa-solid fa-search absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm"></i>
                                <input
                                    value={searchForm.input}
                                    onChange={(event) => handleChangeSearch("input", event.target.value)}
                                    type="text"
                                    className="border border-gray-300 rounded-md py-2 pl-10 pr-4 text-sm w-full focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                                    placeholder="Tìm theo tên tài khoản hoặc id ..."
                                />
                            </div>
                        </div>

                        <div className="flex-1">
                            <label className="block text-xs text-gray-600 mb-1">
                                Chọn quyền
                            </label>
                            <select
                                className="w-full border border-gray-300 rounded-md py-2 px-3 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                                value={searchForm.role}
                                onChange={(event) => handleChangeSearch("role", event.target.value)}
                            >
                                <option value="">Chọn quyền</option>
                                {roles.map((role) => (
                                    <option key={role.id} value={role.value}>
                                        {role.name}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="flex-1">
                            <label className="block text-xs text-gray-600 mb-1">
                                Chọn trạng thái
                            </label>
                            <select
                                className="w-full border border-gray-300 rounded-md py-2 px-3 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                                value={searchForm.status}
                                onChange={(event) => handleChangeSearch("status", event.target.value)}
                            >
                                <option value="">Chọn trạng thái</option>
                                {accountStatus.map((status) => (
                                    <option key={status.id} value={status.value}>
                                        {status.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>
                    <div className="flex justify-end items-center gap-2">
                        <button className="font-semibold bg-blue-600 text-white hover:text-blue-600 hover:bg-white hover:ring-3 hover:ring-blue-600 px-4 py-2 rounded shadow cursor-pointer flex items-center"
                            onClick={() => setIsOpenCreateAccount(true)}>
                            <i className="fa-solid fa-plus me-2"></i>
                            <span>Thêm tài khoản</span>
                        </button>
                    </div>
                </div>

                <div className="hidden lg:block bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                    <div className="overflow-x-auto">
                        <AccountTable accounts={accountsFilter} onSuccess={handleGetAccountList} />
                    </div>
                </div>
            </div>

            {isOpenCreateAccount && (
                <AddAccount
                    setIsOpenCreateAccount={setIsOpenCreateAccount}
                    onSuccess={handleGetAccountList}
                />
            )}

        </main >
    )
}

export default AdminAccountPage;
