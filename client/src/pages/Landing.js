import React from 'react';
import {Container, Row, Col } from 'react-bootstrap';
import image from '../images/Landing-lg.jpg'
import image2 from '../images/Landing-md.jpg'

function Landing() {

    return (
        <Container fluid='xxl' className="px-0">
            <img src={image} alt="Climate Justice Now" className="hero-img hero-img1" />
            <img src={image2} alt="Climate Justice Now" className="hero-img hero-img2" />
            <Container fluid className="pt-3" style={{'color': 'var(--background)'}}>
                <Row>
                    <Col sm={12} className="d-flex justify-content-center">
                    <h2 className="text-center ffv gce px-4 d-flex">Global Carbon Emissions</h2>
                    </Col>
                    <Col>
                    <p className="text-center fs-5">Below are live counts of the total amount of Carbon Dioxide emitted sence the start of 2021</p>
                    </Col>
                </Row>
                <Row className="mt-4 px-6">
                    {/* Use monospace for changing numbers */}
                    <div className='gce-left mt-2'>
                        <h3 className="ffv p-2">Current AVIATION Emissions</h3>
                        <p className="px-2 m-0"></p>
                        <p className="px-2">Metric Tons</p>
                    </div>
                    <div className="gce-right mt-2">
                        <h3 className="ffv text-end p-2">Current Vehicle Emissions</h3>
                        <p className="px-2 text-end m-0"></p>
                        <p className="px-2 text-end">Metric Tons</p>
                    </div>
                    <div className='gce-left mt-2'>
                        <h3 className="ffv p-2">Current Shipping Emissions</h3>
                        <p className="px-2 m-0"></p>
                        <p className="px-2">Metric Tons</p>
                    </div>
                    <div className="gce-right mt-2">
                        <h3 className="ffv text-end p-2">Current Energy Emissions</h3>
                        <p className="px-2 text-end m-0"></p>
                        <p className="px-2 text-end">Metric Tons</p>
                    </div>
                    <div className='gce-left mt-2'>
                        <h3 className="ffv p-2">Current Global Emissions</h3>
                        <p className="px-2 m-0"></p>
                        <p className="px-2">Metric Tons</p>
                    </div>
                    <div className="gce-right mt-2">
                        <h3 className="ffv text-end p-2">Your Total Emissions</h3>
                        <p className="px-2 text-end m-0">Signup to see your emissions!</p>
                        <p className="px-2 text-end">Metric Tons</p>
                    </div>
                </Row>
            </Container>
        </Container>
    );
}

export default Landing;