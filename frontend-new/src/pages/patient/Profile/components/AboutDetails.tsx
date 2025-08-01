import type { PatientProfile } from "@/types/patient";


interface IAboutDetailsProps {
    patientData: PatientProfile;
    handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}
const AboutDetails:React.FC<IAboutDetailsProps> = ({patientData, handleChange}) => {
    const {personal} = patientData
    
    return (
        <div className="flex flex-wrap gap-3">
            <div className="w-[250px]">
                <label htmlFor="dob" className="block text-sm text-gray-400">
                    Date Of Birth*
                </label>
                <input
                    type="date"
                    name="dob"
                    value={personal.dob || ''}
                    onChange={(e) => handleChange(e)}
                    className="w-full border-2 border-gray-300 rounded-md p-2 outline-none focus:border-blue-300 bg-transparent transition-all text-gray-500"
                    placeholder="DD/MM/YYYY"
                />
            </div>

            <div className="w-[250px]">
                <label htmlFor="gender" className="block text-sm text-gray-400">
                    Gender*
                </label>
                <input
                    type="text"
                    name="gender"
                    value={personal.gender || ''}
                    onChange={(e) => handleChange(e)}
                    className="w-full border-2 border-gray-300 rounded-md p-2 outline-none focus:border-blue-300 bg-transparent transition-all text-gray-500"
                />
            </div>

            <div className="w-[250px]">
                <label htmlFor="bloodGroup" className="block text-sm text-gray-400">
                    Blood Group*
                </label>
                <input
                    type="text"
                    name="bloodGroup"
                    value={personal.bloodGroup || ''}
                    onChange={(e) => handleChange(e)}
                    className="w-full border-2 border-gray-300 rounded-md p-2 outline-none focus:border-blue-300 bg-transparent transition-all text-gray-500"
                />
            </div>
        </div>
    );
}

export default AboutDetails;
