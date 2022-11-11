import axios from 'axios';

const PATIENT_BASE_URL = 'http://localhost:8070/api/patient';
const DOCTOR_BASE_URL = 'http://localhost:8070/api/doctor';
const OPTIONS_BASE_URL = 'http://localhost:8070/api/options/';
const APPOINTMENT_BASE_URL = 'http://localhost:8070/api/appointment';
const BASE_URL = 'http://localhost:8070/api';
const FIND_DOCTOR_API_URL = `${DOCTOR_BASE_URL}/getdoctorsbycityandspeciality`;
const LOGIN_API_URL = `${BASE_URL}/login`;
const PATIENT_REGISTRATION_API_URL = `${PATIENT_BASE_URL}/register`;
const DOCTOR_REGISTRATION_API_URL = `${DOCTOR_BASE_URL}/register`;

class ApiService {

    findDoctor(searchDTO) {
        return axios.post(FIND_DOCTOR_API_URL, searchDTO);
    }

    authenticateUser(loggedUserDTO) {
        return axios.post(LOGIN_API_URL, loggedUserDTO);
    }

    registerPatient(patientDTO) {
        return axios.post(PATIENT_REGISTRATION_API_URL, patientDTO);
    }

    registerDoctor(doctorDTO) {
        return axios.post(DOCTOR_REGISTRATION_API_URL, doctorDTO);
    }

    getOptions(type) {
        return axios.get(OPTIONS_BASE_URL+ type);
    }

    getDoctorInlineAppointments(doctorId) {
        return axios.get(DOCTOR_BASE_URL + "/myappointmentlist?doctorId=" + doctorId);
    }

    getDoctorConsultationHistory(doctorId) {
        return axios.get(DOCTOR_BASE_URL + "/myappointmentlist?doctorId=" + doctorId);
    }

    getPatientConsultationHistory(patientId) {
        return axios.get(PATIENT_BASE_URL + "/myappointmentlist?patientId=" + patientId);
    }

    requestAppointment(appDTO) {
        return axios.post(APPOINTMENT_BASE_URL + "/requestappointment", appDTO);
    }

    actionizeAppointmentRequest(appointmentId, action, slot, remarks){
        return axios.post(DOCTOR_BASE_URL + "/appointmentrequest?appointmentId="  + appointmentId + "&action=" + action + "&slot=" + slot + "&remarks=" + remarks);
    }

    getAvailableSlots(doctorId, requestedDate) {
        return axios.get(APPOINTMENT_BASE_URL + "/availableslots?doctorId=" + doctorId + "&requestedDate=" + requestedDate);
    }

    consult(consultationDTO){
        return axios.post(DOCTOR_BASE_URL + "/consult", consultationDTO);
    }

    updateDoctor(doctorDTO){
        return axios.put(DOCTOR_BASE_URL + "/update" , doctorDTO);
    }

    updatePatient(patientDTO){
        return axios.put(PATIENT_BASE_URL + "/update" , patientDTO);
    }

    processForgotPassword(email){
        return axios.post(LOGIN_API_URL + "/forgotpassword", email);
    }

    processValidateOTP(otp){
        return axios.post(LOGIN_API_URL + "/validateotp?resetPasswordOTP="+ otp);
    }

    processResetPassword(ResetPasswordRequestDTO ){
        return axios.put(LOGIN_API_URL + "/resetpassword", ResetPasswordRequestDTO);
    }
}

export default new ApiService();