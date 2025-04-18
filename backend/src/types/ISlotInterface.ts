import { ISlotSchema } from "../models/slot/slotInterface";

export interface ISlot {
  doctorId?: string;
  startTime: string;
  endTime: string;
  slotLimit: number;
  avgConsultTime: string;
  bookedSlot?: number;
  createdAt?: Date;
  _id?: string; 
}
