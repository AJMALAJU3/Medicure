import { api } from "../../utils/axiosInstance"

export interface UserDetailsPartial {
    _id: string;
    fullName: string;
    profileImage: string;
    gender: string;
  }

  export interface fetchBookedPatientsResponse {
    recordId: {_id: string, isCompleted: boolean};
    appointmentId: string;
    patientDetails: UserDetailsPartial;
    roomId: string;
    status: string;
  }
  
  export const fetchBookedPatients = async (slotId: string): Promise<{bookedPatientsData: fetchBookedPatientsResponse[]}> => {
    try {
      const response = await api.get<{bookedPatientsData: fetchBookedPatientsResponse[]}>(`/api/appointment/bookedPatients/${slotId}`);
      console.log(response)
      return response.data;
    } catch (error) {
      console.error("Error fetching booked patients:", error);
      throw error; 
    }
  };

  export const fetchAllAppointmentsApi = async (): Promise<{bookedPatientsData: fetchBookedPatientsResponse[]}> => {
    try {
      const response = await api.get<{bookedPatientsData: fetchBookedPatientsResponse[]}>(`/api/appointment/get-appointments-doctor`);
      console.log(response)
      return response.data;
    } catch (error) {
      console.error("Error fetching booked patients:", error);
      throw error; 
    }
  };
  