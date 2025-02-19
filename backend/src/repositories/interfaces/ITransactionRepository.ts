import { InferSchemaType } from "mongoose";
import { transactionSchema } from "../../models/transaction/transactionSchema";
import { ITransaction } from "../../models/transaction/transactionInterface";


export type ITransactionDocument = InferSchemaType<typeof transactionSchema>;

export interface ITransactionRepository {
    createTransaction (senderId: string, recieverId: string, amount: number, status: string): Promise<ITransactionDocument>
    getTransactions( id: string, role: string ): Promise<ITransaction[]>
}