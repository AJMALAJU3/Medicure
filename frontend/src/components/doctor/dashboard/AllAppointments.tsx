import React, { useEffect, useState } from 'react'
import { fetchAllAppointmentsApi, fetchBookedPatientsResponse } from '../../../sevices/appointments/fetchBookedPatients';
import { useDispatch } from 'react-redux';
import { setPatientId, setRecordId, setRoomId } from '../../../store/slices/commonSlices/videoConsultSlice';
import { useNavigate } from 'react-router-dom';
import { MedicalRecordProvider } from '../../../context/MedicalReportProvider';
import { MedicalRecordForm } from '../../../pages/doctor/MedicalReport';
import { updateMedicalRecordApi } from '../../../sevices/medicalRecords/medicalRecord';
import { IMedicalRecord } from '../../../types/record/record';
import { setError } from '../../../store/slices/commonSlices/notificationSlice';


const BookedAppointments: React.FC = () => {
  const [patientDetails, setPatientDetails] = useState<fetchBookedPatientsResponse[] | null>(null)
    const [medicalReport, setMedicalReport] = useState<boolean>(false)
    const [reportId, setReportId] = useState<string>('')
  const dispatch = useDispatch()
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPatients = async () => {
        const {bookedPatientsData} = await fetchAllAppointmentsApi()
        setPatientDetails(bookedPatientsData.reverse())
    }
    fetchPatients()
  }, [])

  const createRoomHandler = (roomId: string, appointmentId: string, patientId: string, recordId: string) => {
      dispatch(setPatientId(patientId))
      dispatch(setRoomId(roomId))
      dispatch(setRecordId(recordId))
      navigate(`/consult/meeting/${roomId}?appointment=${appointmentId}`)
    }

  const handleReport = (id: string) => {
    setReportId(id)
    setMedicalReport(true)
  }

   const handleMedicalReportUpload = async (isCompleted: boolean, state: IMedicalRecord) => {
      try {
        if (reportId) {
          await updateMedicalRecordApi(reportId, { ...state, isCompleted });
        }
        setMedicalReport(false);
      } catch (error) {
        console.error("Error updating medical record:", error);
        dispatch(setError("Error updating medical record"))
      }
    }

  return (
   
      <div className=''>
        {patientDetails && patientDetails.map((patient) => (
          <div key={patient.patientDetails._id} className="flex justify-between p-2 items-center border-b border-gray-300 relative mb-2  duration-300" >
          <div className='flex'>
            <div className="w-14 h-14 bg-blue-200 rounded-full">
              <img src={patient.patientDetails.profileImage} alt={patient.patientDetails.fullName} className="w-full h-full object-cover rounded-full" />
            </div>
            <div className="ml-2">
              <p className="font-semibold text-lg">{patient.patientDetails.fullName}</p>
              <p className="text-xs text-neutral-500 "> ({patient.patientDetails.gender})</p>
            </div>
          </div>

          <div className='flex gap-2'>
            <button className='px-2 text-white bg-gray-300 rounded-md active:scale-90 duration-300'>profile</button>
            <button className={`px-2 text-white  ${patient.recordId?.isCompleted ? 'bg-green-600/70' : 'bg-orange-500'} rounded-md active:scale-90 duration-300 ${patient.status === 'Completed' ? '' : 'hidden'}`}
              onClick={() => !patient.recordId?.isCompleted && handleReport(patient.recordId?._id)}>report</button>
            <button className={`px-3 text-white bg-blue-400 rounded-md active:scale-90 duration-300 ${patient.status === 'Scheduled' ? '' : 'hidden'}`} onClick={() => createRoomHandler(patient.roomId, patient.appointmentId, patient.patientDetails._id, patient.recordId._id)}>join</button>
          </div>
          </div>
        ))}
        <MedicalRecordProvider recordId={reportId}>{medicalReport && <MedicalRecordForm handleMedicalReportUpload={handleMedicalReportUpload} endCall={true} />}</MedicalRecordProvider>
             

    </div>

  )
}

export default BookedAppointments
