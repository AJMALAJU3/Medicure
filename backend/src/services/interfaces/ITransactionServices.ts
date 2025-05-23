import { ITransaction } from "../../models/transaction/transactionInterface"
import { ITransactionDocument } from "../../repositories/interfaces/ITransactionRepository"

export interface ITransactionServices {
    createTransaction ({ transactionId, senderId, recieverId, amount, status}: ICreateTransaction): Promise<ITransactionDocument>
    getTransactionsByUserId (_id: string, role: string, skip: number, limit: number ): Promise<{ transactions: ITransaction[], total: number}>
    getTransactionById(_id: string ): Promise<ITransaction>
    updateTransactionStatus( transactionId: string, status: string ): Promise<void>
    getTransactionDetails(): Promise<{revenue: number, refund: number}>
}

export interface ICreateTransaction {
    transactionId: string;
    senderId: string;
    recieverId: string;
    amount: number; 
    status: string;
}