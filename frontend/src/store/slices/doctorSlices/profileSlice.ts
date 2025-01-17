import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface IEducation {
    degree: string;
    university: string;
    yearOfCompletion: number;
}

export interface IExperience {
    place: string;
    year: string;
    experience: number;
}

export interface IAddress {
    addressLine: string;
    streetAddress: string;
    city: string;
    state: string;
    country: string;
    pincode: string;
}

interface ProfileState {
    fullName: string;
    email: string;
    phone: string;
    password: string;
    gender: 'Male' | 'Female' | '';
    profileImage: string;
    dob:  '';
    registrationNumber: string;
    registrationCouncil: string;
    registrationYear: number;
    identityProof: string;
    medicalRegistration: string;
    establishmentProof: string;
    about: string;
    educationDetails: IEducation;
    education: IEducation[];
    experience: IExperience[];
    headline: string;
    address: IAddress;
    specialization: string;
    yearsOfExperience: number;
    languageSpoken: string;
    fees: number;
    isBlocked: boolean;
    isProfileCompleted: boolean;
    isApproved: boolean;
}

const initialState: ProfileState = {
    fullName: '',
    email: '',
    phone: '',
    password: '',
    gender: '',
    profileImage: '',
    dob: '',
    registrationNumber: '',
    registrationCouncil: '',
    registrationYear: 0,
    identityProof: '',
    medicalRegistration: '',
    establishmentProof: '',
    about: '',
    educationDetails: {
        degree: '',
        university: '',
        yearOfCompletion: 0
    },
    education: [],
    experience: [],
    headline: '',
    address: {
        addressLine: '',
        streetAddress: '',
        city: '',
        state: '',
        country: '',
        pincode: ''
    },
    specialization: '',
    yearsOfExperience: 0,
    languageSpoken: '',
    fees: 0,
    isBlocked: false,
    isProfileCompleted: false,
    isApproved: false
};

const doctorProfile = createSlice({
    name: 'doctor-profile',
    initialState,
    reducers: {
        setProfileData: (state, action: PayloadAction<Partial<ProfileState>>) => {
            return { ...state, ...action.payload };
        }
    }
});

export default doctorProfile.reducer;
export const { setProfileData } = doctorProfile.actions;
