import React, {useEffect} from 'react'
import { Link } from 'react-router-dom'
import './home.css'
import Footer from './Footer.js'

const Home = () => {

    // useEffect(() => {
    //     console.log('mounted');
    //     localStorage.clear();
    //     return () => console.log('unmounting...');
    //   }, [])

    return (
        <div className="video-background-holder">
            <div className="video-background-overlay"></div>
            <video playsInline="playsinline" autoPlay="autoplay" muted="muted" loop="loop">
                <source src="/videos/video1.mp4" type="video/mp4"/>
            </video>
            <div className="video-background-content container h-100">
                <div className="d-flex h-100 text-center align-items-center">
                    <div className="w-100 text-white">
                        <main className="px-3">
                            <h1 className="font-weight-bold text-primary">мє∂ιнοѕτ</h1>

                            <p className="lead">An extensive online doctor consultation management system. For wellness and service providers.</p>
                            <p className="lead">
                                <Link to="/about" className="btn btn-lg btn-secondary text-info fw-bold border-white bg-white m-4">Learn more</Link>
                            </p>
                        </main>
                    </div>
                </div>
            </div>
            <Footer />
        </div>

    )
}

export default Home