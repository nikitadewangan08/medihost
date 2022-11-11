import React from 'react';
import { useState, useEffect, useReducer } from 'react';
import PatientConsultationHistory from './PatientConsultationHistory';
import { MDBDataTableV5 } from 'mdbreact';
import ApiService from '../services/ApiService';
import { Modal, Button, Form } from 'react-bootstrap';
import { ToastContainer, toast} from 'react-toastify';

const DoctorConsultationHistory = () => {
  const [patient_id, setPatientId] = useState();
  const [search, setSearch] = useState(false);
  const [error, setError] = useState();
  const [appointmentList, setAppointmentList] = useState([]);
  const [show, setShow] = useState(false);
  const [patientName, SetPatientName] = useState(false);
  const [problemDescription, setProblemDescription] = useState(null);
  const forceUpdate = useReducer(x => x + 1, 0)[1];
  const [medication, setMedication] = useState(null);
  const [diagnosis, setDiagnosis] = useState(null);
  const [prognosis, setPrognosis] = useState(null);
  const [remarks, setRemarks] = useState(null);

  const datatable = {
    columns: [
      {
        label: 'Appointment Id',
        field: 'appointmentId',
        width: 200,
      },
      {
        label: "Patient Name",
        field: 'patientName',
        width: 250,
      },
      {
        label: 'Problem Description',
        field: 'problemDescription',
        width: 500,
      },
      {
        label: 'Status',
        field: 'status',
        width: 100,
      }
    ],
    rows: appointmentList
  }

  useEffect(() => {
    console.log('mounted');
    console.log(localStorage.getItem('userType'));

    var doctor = JSON.parse(localStorage.getItem('user'));
    console.log('Doctor details - ' + doctor);

    ApiService.getDoctorConsultationHistory(doctor.doctorId)
      .then(resp => {

        if (appointmentList.length > 0) {
          forceUpdate();
        }
        else {
          resp.data.map(app => {
            if(app.status==='REFUSED' || app.status==='CONSULTED'){
            appointmentList.push({
              'appointmentId': app.appointmentId,
              'patientName': app.patient.patientName,
              'status': app.status,
              'problemDescription': app.problemDescription,
              clickEvent: () => modalShow(app)
            });
          }
          })
        }
      }).catch(() => {

      })

    return () => console.log('unmounting...');
  }, [])

  const searchHandler = () => {
    const input = parseInt(document.getElementById('inp').value);
    if (!isNaN(input)) {
      setPatientId(input);
      setSearch(true);
      setError(null);
    } else {
      setSearch(false);
      setError('Please enter a valid patient id.')
    }
  }

  // const enterPressed = (event) => {
  //   if (event.key === 'Enter') {
  //     searchHandler();
  //   }
  // }

  const modalShow = (app) => {
    SetPatientName(app.patient.patientName);
    setProblemDescription(app.problemDescription);
    setMedication(app.medication);
    setDiagnosis(app.diagnosis);
    setPrognosis(app.prognosis);
    setRemarks(app.remarks);

    if(app.status === 'CONSULTED'){
      setShow(true);
    }
    if(app.status === 'REFUSED'){
      setShow(false);
      toast.error("This Appointment Request was Refused", {
      position: toast.POSITION.TOP_RIGHT
      });
    }
}

const modalClose = () => {
    setShow(false);
}

  return (appointmentList.length > 0 ?
    <div className="container d-flex flex-column align-items-center justify-content-center">
      <div className="row mt-1" style={{ minHeight: "30px" }}>
        <span className="text-center lead" style={{ color: 'red' }} dangerouslySetInnerHTML={{ __html: error }} />
      </div>
      <div className="mt-4">
        {search ? <PatientConsultationHistory pid={patient_id} consult={true} /> : <MDBDataTableV5 small scrollX hover entriesOptions={[10, 20, 30, 40]} entries={10} pagesAmount={4} data={datatable} />}
      </div>

      <ToastContainer />

      <Form>
                <Modal centered show={show} onHide={modalClose}>
                    <Modal.Header closeButton>
                        <Modal.Title><b>Consultation Details</b></Modal.Title>
                    </Modal.Header>

                    <Modal.Body>
                    <Form.Group className="mb-3" controlId="patientName">
                                <Form.Label><b>Patient Name</b></Form.Label>
                                <div>
                                  {patientName}
                                </div>
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="problemDescription">
                                <Form.Label><b>Problem Description</b></Form.Label>
                                <div>
                                  {problemDescription}
                                </div>
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="medication">
                                <Form.Label><b>Medication</b></Form.Label>
                                <div>
                                  {medication}
                                </div>
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="diagnosis">
                                <Form.Label><b>Diagnosis</b></Form.Label>
                                <div>
                                  {diagnosis}
                                </div>
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="prognosis">
                                <Form.Label><b>Prognosis</b></Form.Label>
                                <div>
                                  {prognosis}
                                </div>
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="remarks">
                                <Form.Label><b>Remarks</b></Form.Label>
                                <div>
                                  {remarks}
                                </div>
                            </Form.Group>
                    </Modal.Body>

                    <Modal.Footer>
                        <Button variant="primary" onClick={modalClose}>Close</Button>
                        {/* <Button variant="primary" type="submit" >Send Request</Button> */}
                    </Modal.Footer>
                </Modal>
                </Form>
    </div>
    :
    <div class="spinner-border text-secondary m-5" role="status">
      <span class="sr-only">Loading...</span>
    </div>
  )
}

export default DoctorConsultationHistory