import { api, type RestResponse } from "../api/api"

export const callServiceInvoicePaymentByVNPay = async (params: PaymentParams) => {
    const response = await api.post('/api/payment/vnpay/service-invoice/payment-url', params);
    const restResponse: RestResponse = response.data;
    return restResponse;
}   

export const callPrescriptionInvoicePaymentByVNPay = async (params: PaymentParams) => {
    const response = await api.post('/api/payment/vnpay/prescription-invoice/payment-url', params);
    const restResponse: RestResponse = response.data;
    return restResponse;
}

export const checkPaymentInvoice = async (params: PaymentCheckParams) => {
    const response = await api.post('/api/payment/vnpay/valid/check-payment', params);
    const restResponse: RestResponse = response.data;
    return restResponse;
}

export const checkMomoPaymentInvoice = async (params: MomoPaymentCheckParams) => {
    const response = await api.post('/api/payment/momo/valid/check-payment', params);
    const restResponse: RestResponse = response.data;
    return restResponse;
}

export const callServiceInvoicePaymentByMomo = async (params: PaymentParams) => {
    const response = await api.post('/api/payment/momo/service-invoice/payment-url', params);
    const restResponse: RestResponse = response.data;
    return restResponse;
}

export const callPrescriptionInvoicePaymentByMomo = async (params: PaymentParams) => {
    const response = await api.post('/api/payment/momo/prescription-invoice/payment-url', params);
    const restResponse: RestResponse = response.data;
    return restResponse;
}

export const callCashPayment = async (params: PaymentParams) => {
    const response = await api.post('/api/payment/cash/payment', params);
    const restResponse: RestResponse = response.data;
    return restResponse;
}

type PaymentParams = {
    orderType: "SERVICE INVOICE" | "PRESCRIPTION INVOICE",
    orderId: number
}

type PaymentCheckParams = {
    amount: string,
    bankCode: string,
    bankTranNo: string,
    cardType: string,
    orderInfo: string,
    payDate: string,
    responseCode: string,
    tmnCode: string,
    transactionNo: string,
    transactionStatus: string,
    txnRef: string,
    secureHash: string
}

type MomoPaymentCheckParams = {
    partnerCode: string,
    orderId: string,
    requestId: string,
    amount: string,
    orderInfo: string,
    orderType: string,
    transId: string,
    resultCode: string,
    message: string,
    payType: string,
    responseTime: string,
    extraData: string,
    signature: string
}