import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import useCallApi from '../../../hooks/useCallApi';
import { checkPaymentInvoice } from '../../../services/payment.service';

import receipt from '../../../assets/icons/receipt.png';
import { formatPriceVND } from '../../../utils/format-number.util';
import { useAuth } from '../../../contexts/auth.context';

type PaymentCheckResponse = {
    orderId: number,
    orderType: "SERVICE INVOICE" | "PRESCRIPTION INVOICE",
    amount: number,
    directUrl: string,
    paid: boolean
}

const VNPayReturnPayment = () => {
    const { execute, notify } = useCallApi();

    const auth = useAuth();

    const [searchParams] = useSearchParams();
    const [loading, setLoading] = useState<boolean>(true);

    const [directUrl, setDirectUrl] = useState<string>("");
    const [isPaid, setIsPaid] = useState<boolean>(false);

    const [paymentInfo, setPaymentInfo] = useState({
        amount: '',
        bankCode: '',
        bankTranNo: '',
        cardType: '',
        orderInfo: '',
        payDate: '',
        responseCode: '',
        tmnCode: '',
        transactionNo: '',
        transactionStatus: '',
        txnRef: '',
        secureHash: ''
    });

    const [timeRefresh, setTimeRefresh] = useState(10);

    const handleSendCheckPayment = async () => {
        const restResponse = await execute(checkPaymentInvoice(paymentInfo));
        notify(restResponse!, "Thanh toán thành công");
        if (restResponse?.result) {
            const data: PaymentCheckResponse = restResponse.data;
            setDirectUrl(data.directUrl);
            setIsPaid(data.paid);
        } else {
            const path = paymentInfo.orderInfo.includes('PRESCRIPTION INVOICE') ? '/prescription-invoices' : '/service-invoices';
            setDirectUrl((auth.role != 'USER' && auth.role != 'DOCTOR') ? auth.role?.toLocaleLowerCase() + path : '/');
            setIsPaid(false);
        }
    }

    useEffect(() => {
        const info = {
            amount: searchParams.get('vnp_Amount') || '',
            bankCode: searchParams.get('vnp_BankCode') || '',
            bankTranNo: searchParams.get('vnp_BankTranNo') || '',
            cardType: searchParams.get('vnp_CardType') || '',
            orderInfo: searchParams.get('vnp_OrderInfo') || '',
            payDate: searchParams.get('vnp_PayDate') || '',
            responseCode: searchParams.get('vnp_ResponseCode') || '',
            tmnCode: searchParams.get('vnp_TmnCode') || '',
            transactionNo: searchParams.get('vnp_TransactionNo') || '',
            transactionStatus: searchParams.get('vnp_TransactionStatus') || '',
            txnRef: searchParams.get('vnp_TxnRef') || '',
            secureHash: searchParams.get('vnp_SecureHash') || ''
        };
        setPaymentInfo(info);
        setLoading(false);
    }, [searchParams]);

    useEffect(() => {
        !loading && handleSendCheckPayment();
    }, [paymentInfo]);

    useEffect(() => {
        if (!loading && timeRefresh > 0) {
            const timer = setTimeout(() => {
                setTimeRefresh(timeRefresh - 1);
            }, 1000);
            return () => clearTimeout(timer);
        } else if (timeRefresh === 0 && !loading) {
            window.location.href = directUrl;
        }
    }, [timeRefresh, loading]);

    return (
        <div className="w-full min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
            <div className='container bg-white rounded-md shadow-lg p-6 max-w-xl'>
                <img src={receipt} alt="Receipt" className="w-20 h-20 mx-auto mb-4" />
                <h2 className="text-2xl font-semibold mb-1 text-center">Kết quả thanh toán VNPay</h2>

                {!loading && (
                    <p className={`${isPaid ? 'text-green-600' : 'text-red-600'} text-md font-medium mb-4 text-center`}>
                        {isPaid ? "Thanh toán thành công" : "Hóa đơn đã được thanh toán hoặc hủy"}
                    </p>
                )}

                <div className='space-y-2'>
                    <div className='flex'>
                        <div className='flex-1'>Mã giao dịch:</div>
                        <div className='text-gray-700 font-medium'>{paymentInfo.transactionNo}</div>
                    </div>
                    <div className='flex'>
                        <div className='flex-1'>Nội dung thanh toán:</div>
                        <div className='text-gray-700 font-medium'>{paymentInfo.orderInfo}</div>
                    </div>
                    <div className='flex'>
                        <div className='flex-1'>Ngày thanh toán:</div>
                        <div className='text-gray-700 font-medium'>{paymentInfo.payDate}</div>
                    </div>
                    <div className='flex'>
                        <div className='flex-1'>Mã ngân hàng:</div>
                        <div className='text-gray-700 font-medium'>{paymentInfo.bankCode}</div>
                    </div>
                    <div className='flex'>
                        <div className='flex-1'>Số tiền:</div>
                        <div className='text-gray-700 font-medium'>{formatPriceVND(Number(paymentInfo.amount) / 100)}</div>
                    </div>

                    {!isPaid && (
                        <div className='px-2 py-2 bg-yellow-50 border-s-3 border-yellow-500 rounded'>
                            <p className='text-yellow-700 text-sm'>Lưu ý: Hóa đơn này đã được thanh toán hoặc đã bị hủy. Vui lòng kiểm tra lại lịch sử giao dịch của bạn.</p>
                        </div>
                    )}

                    <div className='mt-4 text-center text-sm'>
                        <p className='text-gray-600'>Cảm ơn bạn đã sử dụng dịch vụ của chúng tôi!</p>
                    </div>
                </div>

            </div>

            <div className='mt-3 text-center'>
                {!loading && (
                    <p className="text-gray-500 text-sm mt-4">
                        Trang sẽ tự động chuyển hướng trong {timeRefresh} giây...
                    </p>
                )}
                <span className='text-blue-500 text-sm cursor-pointer underline'
                    onClick={() => window.location.href = directUrl}
                >Trở về ngay</span>
            </div>
        </div>
    )
}

export default VNPayReturnPayment;