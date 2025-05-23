import mongoose, { InferSchemaType, UpdateResult } from "mongoose";
import { ICreatePatient, IUpdateProfile } from "../../types/IPatientInterface";
import { PatientSchema } from "../../models/patient/patientSchema";
import { IPatient } from "../../models/patient/patientInterface";



export type IPatientDocument = InferSchemaType<typeof PatientSchema> 

export interface IPatientRepository {
    createUser ({fullName, email, phone, password}:ICreatePatient): Promise<IPatientDocument>
    createAuthUser({ fullName, email, profileImage, password }: ICreatePatient): Promise<IPatientDocument>
    findByEmail (email: string): Promise<IPatient> 
    findByID (patientId: string): Promise<IPatient>
    changePassword (email: string, password: string): Promise<UpdateResult>
    getProfileData(patientId: string): Promise<Partial<IPatient> | null>
    updateProfile ({ patientId, dob, gender, address}: IUpdateProfile): Promise<UpdateResult>
    profileImage({ patientId, profileImage }: { patientId: string, profileImage: string }): Promise<UpdateResult>
    getAllPatient(skip: number, limit: number): Promise<{ data: IPatientDocument[], total: number }>
    block(patientId: string): Promise<UpdateResult> 
    unblock(patientId: string): Promise<UpdateResult>
    getMinDetails(patientId: mongoose.Types.ObjectId): Promise<{ _id:mongoose.Types.ObjectId, fullName: string, profileImage: string }>
    getPatientDashboardDetails(): Promise<{ totalUsers: number, activePatients: number, blockedPatients: number }>
}