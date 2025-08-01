import { Schema, model } from 'mongoose';
import { IPatient } from '@/models';

const PatientSchema = new Schema<IPatient>(
  {
    personal: {
     profileImage: { type: String, default: null },
      fullName: { type: String, required: true },
      mobile: { type: String, required: true},
      email: { type: String, required: true, unique: true },
      password: { type: String, required: true },
      gender: { type: String, enum: ['Male', 'Female', 'Other']},
      dob: { type: String },
      bloodGroup: { type: String },
      languageSpoken: [{ type: String }],
    },

    contact: {
      address: {
        addressLine: {type: String},
        street: { type: String },
        city: { type: String },
        state: { type: String },
        country: { type: String },
        pincode: { type: String },
        geo: {
          lat: { type: Number },
          lng: { type: Number },
        },
      },
      emergencyContact: {
        name: { type: String },
        relation: { type: String },
        phone: { type: String },
      },
    },

    status: {
      isBlocked: { type: Boolean, default: false },
      isVerified: { type: Boolean, default: false },
      isProfileCompleted: { type: Boolean, default: false },
    },

   
  },
  {
    timestamps: true, 
  }
);

export const PatientModel = model<IPatient>('Patient', PatientSchema);
