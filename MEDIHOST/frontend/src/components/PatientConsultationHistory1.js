// import React from 'react';
// import { MDBDataTableV5 } from 'mdbreact';
// import { useEffect } from 'react';
// import { useState } from 'react';
// import { Link } from 'react-router-dom';
// import ApiService from '../services/ApiService';

// export default function PatientConsultationHistory({patientId, consult}) {
//   const [found, setFound] = useState(true);
//   const [patient, setPatient] = useState();  
//   const [appointmentList, setAppointmentList] = useState([]);
//   const [datatable, setDatatable] = useState({
//     columns: [
//             {
//               label: 'Appointment Id',
//               field: 'appointmentId',
//               width: 150,
//             },
//             {
//               label: 'Doctor Name',
//               field: 'doctorName',
//               width: 150,
//             },
//             {
//               label: 'Doctor Mobile',
//               field: 'doctorMobileNo',
//               width: 150,
//             },
//             {
//               label: 'Consultation Date',
//               field: 'requestedDate',
//               width: 200,
//             },
//             {
//               label: 'Slot',
//               field: 'slot',
//               width: 100,
//             },
//             {
//               label: 'Status',
//               field: 'status',
//               width: 100,
//             },
//             // {
//             //   label: 'Prognosis',
//             //   field: 'prognosis',
//             //   width: 200,
//             // },
//           ],
//           rows: appointmentList
//   });

//   useEffect(() => {
//       ApiService.getPatientConsultationHistory(patient.patientId)
//           .then(resp => {
//               const data = resp.data;
//               setPatient(data.patient);
//               let rows = [];
//               data.patient_consultations.forEach(c=>{
//                 c.consultations.forEach(cons=>{
//                   rows.push({
//                     name: c.doctor.name,
//                     address: c.doctor.address,
//                     mobile: c.doctor.mobile,
//                     cid: cons.cid,
//                     date: cons.date,
//                     diagnosis: cons.diagnosis,
//                     medicines: cons.medicines,
//                     prognosis: cons.prognosis
//                   })
//                 })
//               })
//               setDatatable(prevState=>({...prevState, rows}));
//               setFound(true);
//           }).catch(() => {
//               setDatatable(prevState=>({...prevState, rows: []}));
//               setFound(false);
//         })
//   },[patientId]);

//   return (
//     <div className="container d-flex flex-column align-items-center justify-content-center">  
//       { found && consult && patient &&
//         <table className="table caption-top">
//           <caption className="text-center"><b>Patient Details</b></caption>
//           <thead className = "table-dark">
//               <tr>
//                 <th>ID</th>
//                 <th>Name</th>
//                 <th>Mobile</th>
//                 <th>Email</th>
//                 <th>Address</th>
//                 <th>City</th>
//               </tr>
//           </thead>
//           <tbody>
//             <tr>
//               <td >{patient.patientId}</td>
//               <td>{patient.patientName}</td>
//               <td>{patient.patientMobileNo}</td>
//               <td>{patient.email}</td>
//               <td>{patient.patientAddress}</td>
//               <td>{patient.patientCity}</td>
//             </tr>
//           </tbody>
//         </table>
//       }
//       <div className = 'row mt-4'>
//         <MDBDataTableV5 small scrollX hover order={['date', 'asc']} entriesOptions={[5, 10, 15, 20]} entries={5} pagesAmount={4} data={datatable} />
//       </div>
//       <div>
//         {found && consult ? <Link to={"/consult"} state={{patient: JSON.stringify(patient)}} className="btn btn-primary">Consult</Link> : ''}
//       </div>
//     </div>
//   );
// }