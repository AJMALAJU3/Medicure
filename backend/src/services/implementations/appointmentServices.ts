import { IAppointmentDocument, IAppointmentRepository } from "../../repositories/interfaces/IAppointmentRepository";
import { IPatientRepository } from "../../repositories/interfaces/IPatientRepository";
import { ISlotRepository } from "../../repositories/interfaces/ISlotRepository";
import { IAppointmentServices, ICreateAppointment } from "../interfaces/IAppointmentServices";


export class AppointmentServices implements IAppointmentServices {
    private appointmentRepository: IAppointmentRepository;
    private patientRepository: IPatientRepository;
    private slotRepository: ISlotRepository;

    constructor(appointmentRepository: IAppointmentRepository, patientRepository: IPatientRepository, slotRepository: ISlotRepository) {
        this.appointmentRepository = appointmentRepository
        this.patientRepository = patientRepository
        this.slotRepository = slotRepository
    }

    async createAppointment({ doctorId, patientId, slotId, appointmentDate, status, transactionId }: ICreateAppointment): Promise<IAppointmentDocument> {
        try {
            if (!doctorId || !patientId || !slotId || !appointmentDate || !status || !transactionId) {
                console.log(doctorId, patientId, slotId, 'dl', appointmentDate, status, 'st', transactionId)
                throw new Error("All appointment fields are required.");
            }
            const response = await this.appointmentRepository.createAppointment(
                doctorId,
                patientId,
                slotId,
                appointmentDate,
                status,
                transactionId
            );
            if (!response) {
                throw new Error("Failed to create appointment.");
            }
            return response
        } catch (error) {
            console.error("Error creating appointment:", error);
            throw error(error);
        }
    }

    async getUserAppointments(userId: string): Promise<IAppointmentDocument[]> {
        try {
            if (!userId) {
                throw new Error('No user ID provided.');
            }
            return await this.appointmentRepository.getUserAppointments(userId);
        } catch (error: any) {
            throw error
        }
    }

    async getAllAppointments(): Promise<IAppointmentDocument[]> {
        try {
            return await this.appointmentRepository.getAllAppointmentsForAdmin();
        } catch (error: any) {
            throw error
        }
    }

    async getAllAppointmentsOfDoctor(_id: string): Promise<any> {
        try {
            const appointments = await this.appointmentRepository.getAllAppointmentsOfDoctor(_id);

            if (appointments.length === 0) {
                return [];
            }

            const userDetails = await Promise.all(
                appointments.map(async (appointment) => {
                    const patientDetails = await this.patientRepository.getProfileData(appointment.patientId);
                    console.log(appointment.roomId)
                    return { patientDetails, roomId: appointment.roomId, status: appointment.status, appointmentId: appointment._id }
                })
            );
            return userDetails;
        } catch (error) {
            console.error("Error fetching booked patients:", error);
            throw error;
        }
    }

    async getBookedPatients(slotId: string): Promise<any> {
        try {
            const appointments = await this.appointmentRepository.getAppointmentsBySlotId(slotId);

            if (appointments.length === 0) {
                return [];
            }

            const userDetails = await Promise.all(
                appointments.map(async (appointment) => {
                    const patientDetails = await this.patientRepository.getProfileData(appointment.patientId);
                    console.log(appointment.roomId)
                    return { patientDetails, roomId: appointment.roomId, status: appointment.status, appointmentId: appointment._id }
                })
            );
            return userDetails;
        } catch (error) {
            console.error("Error fetching booked patients:", error);
            throw error;
        }
    }

    async consultingCompleted(appointmentId: string, slotId: string): Promise<boolean> {
        try {
            const updateAppointment = await this.appointmentRepository.consultingCompleted(appointmentId);
            if (!updateAppointment) throw new Error("Failed to update appointment");
    
            const updateSlot = await this.slotRepository.consultingCompleted(slotId);
            if (!updateSlot) throw new Error("Failed to update slot");
    
            return true;
        } catch (error) {
            console.log('error occured')
            throw error
        }
    }

    async cancelAppointmentByTransactionId(transactionId: string): Promise<void> {
        try {
            await this.appointmentRepository.cancelAppointmentByTransactionId(transactionId)
        } catch(error: unknown) {
            throw error
        }
    }
    


}