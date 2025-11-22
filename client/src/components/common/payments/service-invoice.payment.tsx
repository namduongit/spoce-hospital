import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import type { ServiceInvoiceResponse } from "../../../responses/service-nvoice.response";
import useCallApi from "../../../hooks/useCallApi";
import { getServiceInvoiceById } from "../../../services/service-invoice.service";

import momoIcon from '../../../assets/icons/momo.png';
import vnpayIcon from '../../../assets/icons/vnpay.png';
import cashIcon from '../../../assets/icons/cash.png';

import { formatPriceVND } from "../../../utils/format-number.util";
import { formatDateToHourAndDay } from "../../../utils/format-date.util";
import { callCashPayment, callServiceInvoicePaymentByMomo, callServiceInvoicePaymentByVNPay } from "../../../services/payment.service";

type PaymentMethod = 'vnpay' | 'momo' | 'cash';

const ServiceInvoicePayment = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const { execute, notify, showError, loading } = useCallApi();
    const [serviceInvoice, setServiceInvoice] = useState<ServiceInvoiceResponse>({} as ServiceInvoiceResponse);
    const [selectedPayment, setSelectedPayment] = useState<PaymentMethod>('vnpay');

    const handleGetServiceInvoice = async () => {
        const restResponse = await execute(getServiceInvoiceById(Number(id)));
        showError(restResponse);
        if (restResponse?.result) setServiceInvoice(restResponse.data as ServiceInvoiceResponse);
    }

    useEffect(() => {
        id && handleGetServiceInvoice();
    }, [id])

    const handlePayment = async () => {
        if (selectedPayment === 'vnpay') {
            const restResponse = await execute(callServiceInvoicePaymentByVNPay({
                orderType: 'SERVICE INVOICE',
                orderId: Number(id)
            }));
            if (restResponse?.result && restResponse.data.paymentUrl && restResponse.data.requestFrom) {
                notify(restResponse, "Đang chuyển đến cổng thanh toán VNPay");
                window.location.href = restResponse.data.paymentUrl;
            } else {
                showError(restResponse);
            }
            return;
        }

        if (selectedPayment === 'momo') {
            const restResponse = await execute(callServiceInvoicePaymentByMomo({
                orderType: 'SERVICE INVOICE',
                orderId: Number(id)
            }));
            if (restResponse?.result && restResponse.data.paymentUrl && restResponse.data.requestFrom) {
                notify(restResponse, "Đang chuyển đến cổng thanh toán Momo");
                window.location.href = restResponse.data.paymentUrl;
            } else {
                showError(restResponse);
            }
        }

        if (selectedPayment === 'cash') {
            const restResponse = await execute(callCashPayment({
                orderType: 'SERVICE INVOICE',
                orderId: Number(id)
            }));
            if (restResponse?.result) {
                notify(restResponse, "Thanh toán thành công");
                if (restResponse.data.directUrl) {
                    setTimeout(() => {
                        window.location.href = restResponse.data.directUrl;
                    }, 1000);
                }
            }
        }
    }

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="text-lg">Đang tải...</div>
            </div>
        )
    }

    if (!serviceInvoice) {
        return (
            <div className="flex items-center justify-center h-screen m-auto">
                <div className="flex flex-col items-center text-gray-500 space-y-1">
                    <i className="fa-solid fa-clipboard-question text-6xl"></i>
                    <div className="text-lg">Không tìm thấy hóa đơn</div>
                    <span>Mã tìm: {id}</span>
                </div>
            </div>
        )
    }

    return (
        <div>
            <div className="max-w-7xl mx-auto py-10 px-10 md:px-5 lg:px-0">
                <h1 className="text-3xl font-bold text-gray-900 mb-5">Thanh toán hóa đơn</h1>

                <button
                    onClick={() => navigate(-1)}
                    className="flex items-center text-blue-600 hover:text-blue-800 transition-colors mb-1"
                >
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                    Quay lại
                </button>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <div className="bg-white rounded-lg shadow-md p-6">
                        <h2 className="text-2xl font-semibold text-gray-800 mb-6 border-b pb-3">
                            Thông tin hóa đơn
                        </h2>

                        <div className="space-y-4">
                            <div className="flex justify-between items-start">
                                <span className="text-gray-600 font-medium">Mã hóa đơn:</span>
                                <span className="text-gray-900 font-semibold">{serviceInvoice.id}</span>
                            </div>

                            <div className="flex justify-between items-start">
                                <span className="text-gray-600 font-medium">Trạng thái:</span>
                                <span className={`px-3 py-1 rounded-full text-sm font-semibold ${serviceInvoice.status === 'PAID'
                                    ? 'bg-green-100 text-green-800'
                                    : 'bg-yellow-100 text-yellow-800'
                                    }`}>
                                    {serviceInvoice.status === 'PAID' ? 'Đã thanh toán' : 'Chưa thanh toán'}
                                </span>
                            </div>

                            <div className="flex justify-between">
                                <span className="text-gray-600">Ngày tạo:</span>
                                <span className="text-gray-900">{formatDateToHourAndDay(new Date(serviceInvoice.createAt))}</span>
                            </div>
                            <div className="flex justify-between mt-2">
                                <span className="text-gray-600">Cập nhật:</span>
                                <span className="text-gray-900">{formatDateToHourAndDay(new Date(serviceInvoice.updateAt))}</span>
                            </div>


                            <div className="border-t pt-4 mt-4">
                                <h3 className="text-lg font-semibold text-gray-800 mb-3">Thông tin bệnh nhân</h3>
                                <div className="space-y-3">
                                    <div className="flex justify-between">
                                        <span className="text-gray-600">Họ tên:</span>
                                        <span className="text-gray-900 font-medium">{serviceInvoice.patientName}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-600">Số điện thoại:</span>
                                        <span className="text-gray-900 font-medium">{serviceInvoice.patientPhone}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-600">Email:</span>
                                        <span className="text-gray-900 font-medium">{serviceInvoice.patientEmail || "Không có tài khoản"}</span>
                                    </div>
                                </div>
                            </div>

                            <div className="border-t pt-4 mt-4">
                                <h3 className="text-lg font-semibold text-gray-800 mb-3">Chi tiết dịch vụ</h3>
                                <div className="space-y-3">
                                    {serviceInvoice.medicalPackages?.map((pkg, index) => (
                                        <div key={index} className="bg-gray-50 rounded-lg p-3">
                                            <div className="flex justify-between items-start mb-2">
                                                <span className="text-gray-900 font-medium flex-1">
                                                    {pkg.medicalPackageName}
                                                </span>
                                                <span className="text-blue-600 font-semibold ml-4">
                                                    {formatPriceVND(pkg.price)}
                                                </span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="border-t pt-4 mt-6">
                                <div className="flex justify-between items-center">
                                    <span className="text-xl font-bold text-gray-900">Tổng tiền:</span>
                                    <span className="text-2xl font-bold text-blue-600">
                                        {formatPriceVND(serviceInvoice.totalAmount)}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-lg shadow-md p-6">
                        <h2 className="text-2xl font-semibold text-gray-800 mb-6 border-b pb-3">
                            Phương thức thanh toán
                        </h2>

                        <div className="space-y-4 mb-8">
                            <div
                                onClick={() => setSelectedPayment('vnpay')}
                                className={`border-2 rounded-lg p-4 cursor-pointer transition-all hover:shadow-md ${selectedPayment === 'vnpay'
                                    ? 'border-blue-500 bg-blue-50'
                                    : 'border-gray-200 hover:border-gray-300'
                                    }`}
                            >
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center space-x-4">
                                        <img src={vnpayIcon} alt="VNPay" className="w-12 h-12 object-contain" />
                                        <div>
                                            <h3 className="font-semibold text-gray-900">VNPay</h3>
                                            <p className="text-sm text-gray-600">Thanh toán qua VNPay</p>
                                        </div>
                                    </div>
                                    <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${selectedPayment === 'vnpay'
                                        ? 'border-blue-500 bg-blue-500'
                                        : 'border-gray-300'
                                        }`}>
                                        {selectedPayment === 'vnpay' && (
                                            <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                            </svg>
                                        )}
                                    </div>
                                </div>
                            </div>

                            <div
                                onClick={() => setSelectedPayment('momo')}
                                className={`border-2 rounded-lg p-4 cursor-pointer transition-all hover:shadow-md ${selectedPayment === 'momo'
                                    ? 'border-pink-500 bg-pink-50'
                                    : 'border-gray-200 hover:border-gray-300'
                                    }`}
                            >
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center space-x-4">
                                        <img src={momoIcon} alt="Momo" className="w-12 h-12 object-contain" />
                                        <div>
                                            <h3 className="font-semibold text-gray-900">Momo</h3>
                                            <p className="text-sm text-gray-600">Ví điện tử Momo</p>
                                        </div>
                                    </div>
                                    <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${selectedPayment === 'momo'
                                        ? 'border-pink-500 bg-pink-500'
                                        : 'border-gray-300'
                                        }`}>
                                        {selectedPayment === 'momo' && (
                                            <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                            </svg>
                                        )}
                                    </div>
                                </div>
                            </div>

                            <div
                                onClick={() => setSelectedPayment('cash')}
                                className={`border-2 rounded-lg p-4 cursor-pointer transition-all hover:shadow-md ${selectedPayment === 'cash'
                                    ? 'border-green-500 bg-green-50'
                                    : 'border-gray-200 hover:border-gray-300'
                                    }`}
                            >
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center space-x-4">
                                        <img src={cashIcon} alt="cash" className="w-12 h-12 object-contain" />
                                        <div>
                                            <h3 className="font-semibold text-gray-900">Tiền mặt</h3>
                                            <p className="text-sm text-gray-600">Sử dụng tiền mặt để thanh toán</p>
                                        </div>
                                    </div>
                                    <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${selectedPayment === 'cash'
                                        ? 'border-green-500 bg-green-500'
                                        : 'border-gray-300'
                                        }`}>
                                        {selectedPayment === 'cash' && (
                                            <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                            </svg>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="bg-gray-50 rounded-lg p-4 mb-6">
                            <div className="flex justify-between items-center mb-3">
                                <span className="text-gray-700">Tổng hóa đơn:</span>
                                <span className="text-gray-900 font-semibold">
                                    {formatPriceVND(serviceInvoice.totalAmount)}
                                </span>
                            </div>
                            <div className="flex justify-between items-center pt-3 border-t border-gray-200">
                                <span className="text-lg font-bold text-gray-900">Số tiền thanh toán:</span>
                                <span className="text-2xl font-bold text-blue-600">
                                    {formatPriceVND(serviceInvoice.totalAmount)}
                                </span>
                            </div>
                        </div>

                        <button
                            onClick={handlePayment}
                            disabled={serviceInvoice.status === 'PAID'}
                            className={`w-full py-4 px-6 rounded-lg font-semibold text-white text-lg transition-all ${serviceInvoice.status === 'PAID'
                                ? 'bg-gray-400 cursor-not-allowed'
                                : 'bg-blue-600 hover:bg-blue-700 active:scale-95 shadow-lg hover:shadow-xl'
                                }`}
                        >
                            {serviceInvoice.status === 'PAID' ? 'Đã thanh toán' : 'Thanh toán ngay'}
                        </button>

                        {serviceInvoice.status !== 'PAID' && (
                            <p className="text-center text-sm text-gray-500 mt-4">
                                Bằng việc nhấn "Thanh toán ngay", bạn đồng ý với điều khoản sử dụng của chúng tôi
                            </p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ServiceInvoicePayment;
