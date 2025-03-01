export interface IPaymentServices {
    checkoutSession (data: ICheckoutSession): Promise<any>
    webhookHandler(bodyData: any, sig: string): Promise<void>
    processRefund(transactionId: string): Promise<any>
}

export interface ICheckoutSession {
    doctorName: string, 
    specialization: string, 
    startTime: string, 
    endTime: string, 
    duration: string, 
    fees: number, 
    doctorId: string, 
    patientId: string, 
    slotId: string, 
    appointmentDate: string
}