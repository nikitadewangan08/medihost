// import React from 'react'

// const About = () => {
//     return (
//         <div>
//             <div className="bg-dark">
//                 <div className="container text-white py-5">
//                     <div className="row h-100 align-items-center py-5">
//                         <div className="col-lg-6">
//                             <h1 className="display-4">About us</h1>
//                             <p className="lead mb-0">MediHost is our effort to simply the lives of millions of users by providing easy to access centralized system for all there needs.</p>
//                         </div>
//                         <div className="col-lg-6 d-none d-lg-block"><img src="images/about.png" alt="" className="img-fluid" /></div>
//                     </div>
//                 </div>
//             </div>

//             <div className="bg-white py-5">
//                 <div className="container py-5">
//                     <div className="row align-items-center mb-5">
//                         <div className="col-lg-6 order-2 order-lg-1"><i className="fas fa-briefcase-medical fa-2x mb-3 text-primary" ></i> 
//                             <h2 className="font-weight-light">What is MediHost?</h2>
//                             <p className="font-italic text-muted mb-4">MediHost helps people track their health history through a centralized and secure place. All other health information is accurate and according to medical standards. We make tracking simpler, because getting information doesn’t need to be any harder!</p>
//                         </div>
//                         <div className="col-lg-5 px-5 mx-auto order-1 order-lg-2"><img src="images/healthify.jpg" alt="" className="img-fluid mb-4 mb-lg-0" /></div>
//                     </div>
//                     <div className="row align-items-center">
//                         <div className="col-lg-5 px-5 mx-auto"><img src="images/more.png" alt="" className="img-fluid mb-4 mb-lg-0" /></div>
//                         <div className="col-lg-6"><i className="fas fa-mortar-pestle fa-2x mb-3 text-primary"></i>
//                             <h2 className="font-weight-light">More than just an app</h2>
//                             <p className="font-italic text-muted mb-4">MediHost is also a consultation platform for doctors which after seeing your history can also give better suggestions for staying healthy and fit. It is also a source of latest health related blogs and trends!</p>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     )
// }

// export default About


import React from 'react'

const About = () => {
    return (
        <div>
            <div className="bg-dark">
                <div className="container text-white py-1">
                    <div className="row h-100 align-items-center py-1">
                        <div className="col-lg-6 mt-1">
                            <div><h3 className="display-4 mb-2 py-5 mt-1" ><span style={{color: "green"}}>Stay Safe.Stay Healthy</span></h3></div>
                            <h1 className="display-4 py-2">About us</h1>
                            <p className="lead mb-3 py-5">MediHost is a online platform built to connect any individual with a known and best Medical Practitioner who is serving in the Health Care Industry through online for various value added Services.</p>
                         </div>  
                    
                        <div className="col-lg-6 d-none d-lg-block"><img src="images/about.png" alt="" className="img-fluid" /></div>
                    </div>
                </div>
            </div>
                

            <div className="bg-white py-5">
                <div className="container py-2">
                    <div className="row align-items-center mb-10">
                        <div className="col-lg-6 order-2 order-lg-1"><i className="fas fa-briefcase-medical fa-2x mb-3 text-danger" ></i> 
                            <h2 className="font-weight-light" style={{color: "red"}}>What is MediHost?</h2>
                            <p className="font-italic text-muted mb-20"><span style={{color: "red"}}>MediHost</span> is an online healthcare platform supporting the healthcare professionals in Managing their appointments with Medicine prescriptions.</p>
                        </div>
                        <div className="col-lg-5 px-5 mx-auto order-1 order-lg-2"><img src="images/medihost.png" alt="" className="img-fluid mb-4 mb-lg-0" /></div>
                    </div>
                    <div className="row align-items-center py-5 mb-2">
                        <div className="col-lg-5 px-5 py-5 mx-auto mb-15"><img src="images/appointment.jpg" alt="" className="img-fluid mb-4 mb-lg-0" /></div>
                        <div className="col-lg-6"><i className="fas fa-calendar-alt fa-2x mb-3 text-primary"></i>
                            <h2 className="font-weight-light" style={{color: "blue"}}>Appointment Confirmation</h2>
                            <p className="font-italic text-muted mb-10">You receive an instant confirmation on your booked appointment and any other services that you might have availed through booking like re-scheduling your appointment, etc.</p>
                        </div>
                    </div>

                    <div className="row align-items-center mb-30">
                        <div className="col-lg-6 order-2 order-lg-1"><i className="fas fa-file-medical-alt fa-2x mb-3 text-success" ></i> 
                            <h2 className="font-weight-light" style={{color: "green"}}>Health Records</h2>
                            <p className="font-italic text-muted mb-30"><span className="font-weight-bolder" style={{color: "darkgreen"}}>MediHost</span> provides you the option to get medicine prescriptions. This will enable you to preserve the complete health history and access these vital details at anytime from anywhere. The Medical Practitioner can also update these medical records.</p>   
                        </div>
                        <div className="col-lg-5 px-5 mx-auto order-1 order-lg-2"><img src="images/records.png" alt="" className="img-fluid mb-4 mb-lg-0" /></div>
                    </div>

                    
                </div>
            </div>
        </div>
    )
}

export default About