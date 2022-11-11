import React from 'react';
import { useState, useEffect, useReducer } from 'react';
import { MDBDataTableV5 } from 'mdbreact';
import ApiService from '../services/ApiService';
import { Modal, Button, Form } from 'react-bootstrap';
import { ToastContainer, toast} from 'react-toastify';

const PatientConsultationHistory = () => {
  const [patientId, setPatientId] = useState();
  const [search, setSearch] = useState(false);
  const [error, setError] = useState();
  const [appointmentList, setAppointmentList] = useState([]);
  const forceUpdate = useReducer(x => x + 1, 0)[1];
  const [show, setShow] = useState(false);
  const [showConsulted, setShowConsulted] = useState(false);
  const [problemDescription, setProblemDescription] = useState(null);
  const [remarks, setRemarks] = useState(null);
  const [appointmentId, setAppointmentId] = useState(null);
  const [showConsult, setShowConsult] = useState(false);
  const [requestedDate, setRequestedDate] = useState(null);
  const [medication, setMedication] = useState(null);
  const [diagnosis, setDiagnosis] = useState(null);
  const [prognosis, setPrognosis] = useState(null);

  const datatable = {
    columns: [
      {
        label: 'Appointment Id',
        field: 'appointmentId',
        width: 150,
      },
      {
        label: 'Doctor Name',
        field: 'doctorName',
        width: 150,
      },
      {
        label: 'Doctor Mobile',
        field: 'doctorMobileNo',
        width: 150,
      },
      {
        label: 'Consultation Date',
        field: 'requestedDate',
        width: 200,
      },
      {
        label: 'Slot',
        field: 'slot',
        width: 100,
      },
      {
        label: 'Status',
        field: 'status',
        width: 100,
      },
      // {
      //   label: 'Prognosis',
      //   field: 'prognosis',
      //   width: 200,
      // },
    ],
    rows: appointmentList
  }

  const getSlot = ((slot) => {
    var slotStr = "-";
    if (slot == 1)
      slotStr = "10-11 AM"
    if (slot == 2)
      slotStr = "11-12 PM"
    if (slot == 3)
      slotStr = "12-1 PM"
    if (slot == 4)
      slotStr = "2-3 PM"
    if (slot == 5)
      slotStr = "3-4 PM"
    if (slot == 6)
      slotStr = "4-5 PM"
    if (slot == 7)
      slotStr = "5-6 PM"

    return slotStr;
  });

  useEffect(() => {
    console.log('mounted');
    console.log(localStorage.getItem('userType'));

    var patient = JSON.parse(localStorage.getItem('user'));

    ApiService.getPatientConsultationHistory(patient.patientId)
      .then(resp => {

        if (appointmentList.length > 0) {
          forceUpdate();
        }
        else {
          resp.data.map(app => {
            appointmentList.push({
              'appointmentId': app.appointmentId,
              'doctorName': app.doctor.doctorName,
              'doctorCity': app.doctor.doctorCity,
              'doctorMobileNo': app.doctor.doctorMobileNo,
              'email': app.doctor.email,
              'requestedDate': app.requestedDate,
              'diagnosis': app.doctor.diagnosis,
              'medicatons': app.doctor.medicaton,
              'prognosis': app.doctor.prognosis,
              'problemDescription': app.problemDescription,
              'slot': getSlot(app.slot),
              'status': app.status,
              'remarks': app.remarks,
              clickEvent: () => modalShow(app)
            });

          })
        }
      }).catch(() => {

      })

    return () => console.log('unmounting...');
  }, [])

  const modalShow = (app) => {

    setProblemDescription(app.problemDescription);
    setRemarks(app.remarks);
    setAppointmentId(app.appointmentId);
    setDiagnosis(app.diagnosis);
    setPrognosis(app.prognosis);
    setRequestedDate(app.requestedDate);
    setMedication(app.medication);
    setShow(true);
    if(app.status === 'SCHEDULED' || app.status === 'REFUSED' || app.status === 'PENDING'){
      setShow(true);
      setShowConsulted(false);
      if(app.status === 'SCHEDULED'){
          toast.success("Appointment SCHEDULED at " + getSlot(app.slot) + " on " + app.requestedDate, {
          position: toast.POSITION.TOP_CENTER
        });
      }
      if(app.status === 'REFUSED'){
          toast.error("Appointment request has been REFUSED  by the Doctor" , {
          position: toast.POSITION.TOP_CENTER
        });
      }
      if(app.status === 'PENDING'){
          toast.warning("Appointment request is not Approved yet", {
          position: toast.POSITION.TOP_CENTER
        });
      
      }
    }
    if(app.status === 'CONSULTED'){
      setShowConsult(true);
      setShow(false);
    }
}

const modalClose = () => {
    setShow(false);
    setShowConsult(false);
}

  return (appointmentList.length > 0 ?
    <div className="container d-flex flex-column align-items-center justify-content-center">
      <div className="row mt-1" style={{ minHeight: "30px" }}>
        <span className="text-center lead" style={{ color: 'red' }} dangerouslySetInnerHTML={{ __html: error }} />
      </div>
      <div className="mt-4">
        {search ? <PatientConsultationHistory patientId={patientId} consult={true} /> : <MDBDataTableV5 small scrollX hover entriesOptions={[10, 20, 30, 40]} entries={10} pagesAmount={4} data={datatable} />}
      </div>

      <ToastContainer />
      <Form>
                <Modal centered show={show} onHide={modalClose}>
                    <Modal.Header closeButton>
                        <Modal.Title><b>Requested Appointment Details</b></Modal.Title>
                    </Modal.Header>


                    <Modal.Body>

                    <Form.Group className="mb-3" controlId="appointmentId">
                <Form.Label><b>Appointment Id -  &nbsp;
                  <span>{ appointmentId}</span>
                
                </b>
                </Form.Label>
              </Form.Group>

                            <Form.Group className="mb-3" controlId="problemDescription">
                                <Form.Label><b>Problem Description   </b></Form.Label>
                                <div>
                                  {problemDescription}
                                </div>
                            </Form.Group>
                
                            <Form.Group className="mb-3" controlId="remarks">
                                <Form.Label><b>Remarks  </b></Form.Label>
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
                <Form>
               
          <Modal centered show={showConsult} onHide={modalClose}>
            <Modal.Header closeButton>
              <Modal.Title><b>Consultation Details</b></Modal.Title>
            </Modal.Header>

            <Modal.Body>
            <Form.Group className="mb-3" controlId="appointmentId">
                <Form.Label><b>Appointment Id - &nbsp;
                {appointmentId}
                </b>
                </Form.Label>
              </Form.Group>

              <Form.Group className="mb-3" controlId="appointmentId">
                <Form.Label><b>Consultation Date - &nbsp;
                {requestedDate}
                </b>
                </Form.Label>
              </Form.Group>

            <Form.Group className="mb-3" controlId="medication">
                <Form.Label><b>Medication  </b></Form.Label>
                <div>{medication}</div>
              </Form.Group>

              <Form.Group className="mb-3" controlId="diagnosis">
                <Form.Label><b>Diagnosis  </b></Form.Label>
                <div>{diagnosis}</div>
              </Form.Group>

              <Form.Group className="mb-3" controlId="prognosis">
                <Form.Label><b>Prognosis  </b></Form.Label>
               <div>{prognosis}</div>
              </Form.Group>
    
              <Form.Group className="mb-3" controlId="remarks">
                <Form.Label><b>Remarks  </b></Form.Label>
               <div>{remarks}</div>
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
  );
}

export default PatientConsultationHistory 