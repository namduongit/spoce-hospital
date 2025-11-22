import { useEffect, useState } from "react";
import person from "../../../assets/images/auth/person.png"
import ServiceInvoicePatient from "../../../components/patient/service-invoice.patient";
import PrescriptionInvoicePatient from "../../../components/patient/prescription-invoice.patient";
import SettingDetail from "../../../components/patient/setting.patient";

import { getUserDetail, getAppointmentList, getServiceInvoiceList, getPrescriptionInvoiceList } from "../../../services/user.service";

import useCallApi from "../../../hooks/useCallApi";
import type { ProfileDetailResponse, UserDetailResponse } from "../../../responses/user.response";
import AccountPatient from "../../../components/patient/account.patient";
import type { AppointmentResponse } from "../../../responses/appointment.response";
import AppointmentPatient from "../../../components/patient/appointment.patient";
import type { ServiceInvoiceResponse } from "../../../responses/service-nvoice.response";
import type { PrescriptionInvoiceResponse } from "../../../responses/prescription-invoice.response";

const AccountPage = () => {
    const { execute } = useCallApi();
    const [activeTab, setActiveTab] = useState<string>("profile");

    const [userDetail, setUserDetail] = useState<UserDetailResponse>({} as UserDetailResponse);
    const [profileDetail, setProfileDetail] = useState<ProfileDetailResponse>({} as ProfileDetailResponse);

    const [appointments, setAppointments] = useState<AppointmentResponse[]>([]);
    const [serviceInvoices, setServiceInvoices] = useState<ServiceInvoiceResponse[]>([]);
    const [prescriptionInvoices, setPrescriptionInvoices] = useState<PrescriptionInvoiceResponse[]>([]);

    const [name, setName] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [role, setRole] = useState<string>("");

    const handleGetUserDetail = async () => {
        const restResponse = await execute(getUserDetail());
        if (restResponse?.result) {
            const data: ProfileDetailResponse = restResponse.data;
            setUserDetail(data.profile);
            setProfileDetail(data);
        }
    };

    const handleGetAppointmentList = async () => {
        const restResponse = await execute(getAppointmentList());
        if (restResponse?.result) {
            const data: AppointmentResponse[] = restResponse.data;
            setAppointments(data);
        }
    }

    const handleGetServiceInvoiceList = async () => {
        const restResponse = await execute(getServiceInvoiceList());
        if (restResponse?.result) {
            const data: ServiceInvoiceResponse[] = restResponse.data;
            setServiceInvoices(data);
        }
    }

    const handleGetPrescriptionInvoiceList = async () => {
        const restResponse = await execute(getPrescriptionInvoiceList());
        if (restResponse?.result) {
            const data: PrescriptionInvoiceResponse[] = restResponse.data;
            setPrescriptionInvoices(data);
        }
    }

    useEffect(() => {
        handleGetUserDetail();
        handleGetAppointmentList();
        handleGetServiceInvoiceList();
        handleGetPrescriptionInvoiceList();
    }, []);

    useEffect(() => {
        setEmail(profileDetail.email);
        setRole(profileDetail.role);
        setName(userDetail.fullName);
    }, [profileDetail, userDetail]);

    const menuItems = [
        {
            id: "profile",
            label: "Hồ sơ của tôi",
            icon: "fa-solid fa-user-pen",
            description: "Quản lý thông tin cá nhân"
        },
        {
            id: "appointments",
            label: "Lịch hẹn khám",
            icon: "fa-solid fa-calendar-check",
            description: "Xem lịch hẹn đã đặt"
        },
        {
            id: "history",
            label: "Lịch sử khám bệnh",
            icon: "fa-solid fa-clock-rotate-left",
            description: "Xem lịch sử khám bệnh"
        },
        {
            id: "medicine",
            label: "Lịch sử mua thuốc",
            icon: "fa-solid fa-file-medical",
            description: "Theo dõi đơn thuốc"
        },
        {
            id: "settings",
            label: "Cài đặt tài khoản",
            icon: "fa-solid fa-cog",
            description: "Tùy chỉnh tài khoản"
        }
    ];

    const renderContent = () => {
        switch (activeTab) {
            case "profile":
                return (<AccountPatient userDetail={userDetail} email={email} onSuccess={handleGetUserDetail} />)
            case "appointments":
                return (<AppointmentPatient appointments={appointments} />);
            case "history":
                return (<ServiceInvoicePatient serviceInvoices={serviceInvoices} />)
            case "medicine":
                return (<PrescriptionInvoicePatient prescriptionInvoices={prescriptionInvoices} />)
            case "settings":
                return (<SettingDetail />)
            default:
                return null;
        }
    };

    return (
        <main className="account-page bg-gray-50 min-h-screen">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                    <div className="lg:col-span-1">
                        <div className="sticky top-8 space-y-6">
                            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                                <div className="text-center">
                                    <div className="relative inline-block">
                                        <img
                                            src={person}
                                            alt="User Avatar"
                                            className="w-20 h-20 rounded-full mx-auto border-4 border-blue-100"
                                        />
                                        <div className="absolute bottom-0 right-0 w-6 h-6 bg-green-500 rounded-full border-2 border-white"></div>
                                    </div>
                                    <h3 className="mt-4 text-lg font-semibold text-gray-900">
                                        {name || "Chưa cập nhật tên"}
                                    </h3>
                                    <p className="text-sm text-blue-600 font-medium">
                                        {email || "example@email.com"}
                                    </p>
                                    <p className="text-xs text-gray-500 mt-1">
                                        {role === "ADMIN" ? "Quản trị viên" :
                                            role === "DOCTOR" ? "Bác sĩ" :
                                                role === "USER" ? "Người dùng" : "Chưa xác định"}
                                    </p>
                                </div>
                            </div>

                            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                                <nav className="p-2">
                                    {menuItems.map((item) => (
                                        <button
                                            key={item.id}
                                            onClick={(e) => {
                                                e.preventDefault();
                                                setActiveTab(item.id);
                                            }}
                                            className={`w-full text-left px-4 py-3 rounded-lg mb-1 transition-all duration-200 group block no-underline ${activeTab === item.id
                                                ? 'bg-blue-50 text-blue-700 border-l-4 border-blue-600'
                                                : 'text-gray-700 hover:bg-gray-50 hover:text-blue-600'
                                                }`}
                                        >
                                            <div className="flex items-center space-x-3">
                                                <i className={`${item.icon} text-lg ${activeTab === item.id ? 'text-blue-600' : 'text-gray-400 group-hover:text-blue-500'
                                                    }`}></i>
                                                <div className="flex-1">
                                                    <div className="font-medium">{item.label}</div>
                                                    <div className="text-xs text-gray-500 mt-0.5">{item.description}</div>
                                                </div>
                                                <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                                                    <i className="fa-solid fa-arrow-right text-xs text-blue-500"></i>
                                                </div>
                                            </div>
                                        </button>
                                    ))}
                                </nav>
                            </div>
                        </div>
                    </div>

                    <div className="lg:col-span-3">
                        <div className="bg-gray-50">
                            {renderContent()}
                        </div>
                    </div>
                </div>
            </div>
        </main>
    )
}

export default AccountPage;