import React, { useState, useEffect } from 'react';
import {Container, Row, Col } from 'react-bootstrap';
import image from '../images/Landing-lg.jpg'
import image2 from '../images/Landing-md.jpg'
import moment from 'moment';

export default function Landing() {
    let currentAviationEmissions = 0;
    let currentVehicleEmissions = 0;
    let currentShippingEmissions = 0;
    let currentEnergyEmissions = 0;
    let currentGlobalEmissions = 0;

    const [aviationEmissions, setAviationEmissions] = useState('');
    const [vehicleEmissions, setVehicleEmissions] = useState('');
    const [shippingEmissions, setShippingEmissions] = useState('');
    const [energyEmissions, setEnergyEmissions] = useState('');
    const [globalEmissions, setGlobalEmissions] = useState('');

    function initializeGlobalEmissions() {
        let today = moment();
        let startOfTheYear = moment("2021-01-01 00:00:00")
        let difference = Math.round(moment.duration(today.diff(startOfTheYear)).as("seconds"));
        currentAviationEmissions = 29.90233 * difference;
        currentVehicleEmissions = 190.25875 * difference;
        currentShippingEmissions = 26.88990 * difference;
        currentEnergyEmissions = 1049.59411 * difference;
        currentGlobalEmissions = 1296.64510 * difference;
        setInterval(totalEmissions, 10);
    }

    function totalEmissions() {
        currentAviationEmissions = Math.round((currentAviationEmissions + 0.2990233) * 100) / 100;
        let tempAviation = Math.round(currentAviationEmissions);
        setAviationEmissions(tempAviation.toLocaleString());

        currentVehicleEmissions = Math.round((currentVehicleEmissions + 1.9025875) * 100) / 100;
        let tempVehicles = Math.round(currentVehicleEmissions);
        setVehicleEmissions(tempVehicles.toLocaleString());

        currentShippingEmissions = Math.round((currentShippingEmissions + 0.2688990) * 100) / 100;
        let tempShipping = Math.round(currentShippingEmissions);
        setShippingEmissions(tempShipping.toLocaleString());

        currentEnergyEmissions = Math.round((currentEnergyEmissions + 10.4959411) * 100) / 100;
        let tempEnergy = Math.round(currentEnergyEmissions);
        setEnergyEmissions(tempEnergy.toLocaleString());

        currentGlobalEmissions = Math.round((currentGlobalEmissions + 12.9664510) * 100) / 100;
        let tempGlobal = Math.round(currentGlobalEmissions);
        setGlobalEmissions(tempGlobal.toLocaleString());
    }

    useEffect(() => {
        initializeGlobalEmissions()},// eslint-disable-next-line react-hooks/exhaustive-deps
        []);
    

    return (
        <Container as="section" fluid='xxl' className="px-0">
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
                        <p className="px-2 fs-3 emissions m-0">{aviationEmissions}</p>
                        <p className="px-2">Metric Tons</p>
                    </div>
                    <div className="gce-right mt-2">
                        <h3 className="ffv text-end p-2">Current Vehicle Emissions</h3>
                        <p className="px-2 fs-3 emissions text-end m-0">{vehicleEmissions}</p>
                        <p className="px-2 text-end">Metric Tons</p>
                    </div>
                    <div className='gce-left mt-2'>
                        <h3 className="ffv p-2">Current Shipping Emissions</h3>
                        <p className="px-2 emissions fs-3 m-0">{shippingEmissions}</p>
                        <p className="px-2">Metric Tons</p>
                    </div>
                    <div className="gce-right mt-2">
                        <h3 className="ffv text-end p-2">Current Energy Emissions</h3>
                        <p className="px-2 emissions fs-3 text-end m-0">{energyEmissions}</p>
                        <p className="px-2 text-end">Metric Tons</p>
                    </div>
                    <div className='gce-left mt-2 mb-3'>
                        <h3 className="ffv p-2">Current Global Emissions</h3>
                        <p className="px-2 emissions fs-3 m-0">{globalEmissions}</p>
                        <p className="px-2">Metric Tons</p>
                    </div>
                    {/* <div className="gce-right mt-2">
                        <h3 className="ffv text-end p-2">Your Total Emissions</h3>
                        <p className="px-2 text-end m-0">Signup to see your emissions!</p>
                        <p className="px-2 text-end">Metric Tons</p>
                    </div> */}
                </Row>
                <Row className="mt-4 px-6">
                    <Col sm={12} className="d-flex justify-content-center">
                        <h2 className="text-center ffv gce px-4 d-flex">About Carbon Watchers</h2>
                    </Col>
                    <Col>
                        <p className="text-center fs-5">
                            This site was created as a way to help spread awareness about climate change. This is a personal
                            project created by Ryan Jepson, as a way to put climate change into perspective in ways that most people never
                            see. The numbers above are real time numbers base on total annual emission from 2018 as reported
                            by the <a href="https://www.iea.org/" target="_blank" rel="noreferrer" className="text-link"> 
                            International Energy Agency</a>. You will also find compelling videos on the 
                            <a href="/articles" className="text-link"> Climate Videos</a> section that talk about climate
                            change in a way that the news does not. All news articles displayed are from trusted and bi-partisan sources.
                        </p>
                    </Col>
                </Row>
            </Container>
        </Container>
    );
}