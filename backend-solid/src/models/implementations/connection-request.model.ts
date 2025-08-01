
import { Schema, model } from "mongoose";
import { IConnectionRequest } from "../interfaces";



const ConnectionSchema = new Schema<IConnectionRequest>(
  {
    patientId: { type: Schema.Types.ObjectId, ref: "Patient", required: true },
    doctorId: { type: Schema.Types.ObjectId, ref: "Doctor", required: true },
    status: { type: String, enum: ["pending", "accepted", "rejected"], default: "pending" },
  },
  { timestamps: true }
);

export const ConnectionRequest = model<IConnectionRequest>("ConnectionRequest", ConnectionSchema);
