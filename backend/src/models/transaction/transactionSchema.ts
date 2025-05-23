import mongoose, { Schema } from 'mongoose';
import { ITransaction } from './transactionInterface';



export const transactionSchema = new Schema<ITransaction>({
  transactionId: {
    type: String,
    required: true
  },
  senderId: {
    type: String,
    required: true,
  },
  recieverId: {
    type: String,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    enum: ['success', 'failed', 'pending', 'withdraw'],
    required: true,
  },
  transactionDate: {
    type: Date,
    required: true,
    default: Date.now
  },
});

