import { IDoctorData } from "../../components/doctor/profile/validationProfile"
import { ProfileState } from "../../store/slices/doctorSlices/profileSlice";
import { api } from "../../utils/axiosInstance"

export interface IProfile {
    fullName: string;
    profileImage: string;
}

export const getProfileDetails = async (): Promise<ProfileState>=> {
    const response = await api.get<{data: ProfileState}>('/api/doctor/profile')   
    return response.data.data
}

// export const updateProfileApi = async (doctorData:IDoctorData) => {
//     return await api.patch('/api/doctor/profile-update',{...doctorData})
// }

export const updateProfileApi = async (doctorData: IDoctorData) => {
  return await api.patch('/api/doctor/profile', { ...doctorData });
};


// export const updateProfileImageApi = async (profileImage: string) => {
//     return await api.patch('/api/doctor/update-profile-image',{profileImage})
// }

export const updateDoctorProfileImage = async (profileImage: string) => {
  return await api.patch('/api/doctor/profile/image', { profileImage });
};
