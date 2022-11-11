import React, { useContext } from 'react';
import { Link, useNavigate, useLocation } from "react-router-dom";
import { UserContext } from './UserContext';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';



const MHNavbar = () => {
    const { user, setUser } = useContext(UserContext);
    const location = useLocation();
    const navigate = useNavigate();

    const logoutHandler = () => {
        setUser(null);
        localStorage.clear();
        navigate('/');
    }

    const dashboardHandler = () => {
        var usr = JSON.parse(localStorage.getItem("user"));
        if (usr == null)
            return '/login';
        else {
            if (usr.doctorId)
                return '/doctor';
            return '/patient';
        }
    }

    const updateProfile = () => {
        var usr = JSON.parse(localStorage.getItem("user"));
        if(usr.doctorId)
            navigate('/updateDoctor');
        else navigate('/updatePatient');
    }

    return (
        <div>
            <nav className={`navbar fixed-top navbar-expand-md navbar-dark ${location.pathname === '/' ? 'bg-transparent' : 'bg-dark'}`} aria-label="Navbar">
                <div className="container">
                    <Link to="/" className="navbar-brand" ><span><i className="fa fa-heartbeat me-2 text-info" aria-hidden="true" />мє∂ιнοѕτ</span>
                    </Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarsExample04" aria-controls="navbarsExample04" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarsExample04">
                        <ul className="navbar-nav me-auto mb-2 mb-md-0">
                            <Link to={dashboardHandler()} className="nav-link px-2 text-white"><li>Dashboard</li></Link>
                            <Link to="/blogs" className="nav-link px-2 text-white"><li>Blogs</li></Link>
                            <Link to="/about" className="nav-link px-2 text-white"><li>About</li></Link>
                        </ul>
                        {user ? (<>
                            <span style={{ color: "white" }}>{user.doctorId ? `Dr. ${user.doctorName}` : user.patientName}<i className="fa fa-user text-white fs-5 ms-2" /></span>
                            <Navbar bg="dark" expand="md" variant="dark" >
                                <Container>
                                    <Navbar.Collapse id="basic-navbar-nav" style={{ opacity: 0.5 }}>
                                        <Nav className="me-auto">
                                            <NavDropdown id="basic-nav-dropdown" menuVariant="dark">
                                                <NavDropdown.Item onClick={updateProfile}>View Profile</NavDropdown.Item>
                                                <NavDropdown.Divider />
                                                <NavDropdown.Item onClick={logoutHandler}>
                                                    Sign Out
                                                </NavDropdown.Item>
                                            </NavDropdown>
                                        </Nav>
                                    </Navbar.Collapse>
                                </Container>
                            </Navbar>
                        </>)
                            :
                            (<div className="text-end">
                                <Link to="/login"><button type="button" className="btn btn-outline-info me-2">Login</button></Link>
                                <Link to="/register"><button type="button" className="btn btn-success me-2">Sign-up</button></Link>
                            </div>)
                        }
                    </div>
                </div>
            </nav>
        </div>
    )
}

export default MHNavbar