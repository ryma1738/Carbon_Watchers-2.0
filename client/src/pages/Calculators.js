import React, { useState } from 'react';
import {Container, Row, Col, Tabs, Tab, Spinner, OverlayTrigger, Tooltip } from 'react-bootstrap';
import { makes } from '../components/make'
import { models } from '../components/model';
import { vehicleApiCall, flightApiCall, shippingApiCall } from '../utils/Api';

export default function Calculators() {
    const [key, setKey] = useState('vehicles');
    const [make, setMake] = useState('');
    const tempResponse = (
        <div>
            <p className="text-center">Fill out the form above to see your results!</p>
        </div>
    );
    const loadingResponse = (
        <Col sm={12} className='d-flex justify-content-center align-items-center' style={{ "minHeight": "20vh" }}>
            <Spinner animation="border" role="status" size="lg">
                <span className="visually-hidden">Loading...</span>
            </Spinner>
        </Col>
    )
    // vehicle states / functions
    const [vehicleMake, setVehicleMake] = useState('');
    const [vehicleModel, setVehicleModel] = useState('');
    const [vehicleYear, setVehicleYear] = useState('');
    const [vehicleDistance, setVehicleDistance] = useState('');
    const [vehicleDistUnit, setVehicleDistUnit] = useState('mi');
    const [vehicleResponse, setVehicleResponse] = useState(tempResponse);
    async function vehicleSubmit(e) {
        e.preventDefault();
        if (vehicleMake && vehicleModel && vehicleYear && vehicleDistance && vehicleDistUnit) {
            setVehicleResponse(loadingResponse);
            const response = await vehicleApiCall(vehicleMake, vehicleModel, vehicleYear, vehicleDistance, vehicleDistUnit);

            if (!response.ok) {
                setVehicleResponse((
                    <p className="p-3 text-center">Vehicle Model and Year configuration not found. Please enter a valid year for the model.</p>
                    ));
                return;
            }

            const carbonData = await response.json();
            const jsxData = (
                <>
                    <div>
                        <p className="text-center fw-lighter ps-2">Your {vehicleMake} {vehicleModel} {vehicleYear} will emit {carbonData.carbon_lb.toLocaleString()} lbs of CO2 after driving {vehicleDistance} {vehicleDistUnit === 'mi'? "miles." : "kilometers."} </p>
                    </div>
                    <div className="d-flex justify-content-center">
                        <ul>
                            <li>Additional Info:</li>
                            <li>Total CO2 in grams: {carbonData.carbon_g.toLocaleString()}</li>
                            <li>Total CO2 in Lbs: {carbonData.carbon_lb.toLocaleString()}</li>
                            <li>Total CO2 in Mt: {carbonData.carbon_mt}</li>
                        </ul>
                    </div>
                </>
            );
            setVehicleResponse(jsxData);
        } else alert('You must enter all values to submit!');
    }

    // Flight states / functions
    const [depart, setDepart] = useState('');
    const [arrival, setArrival] = useState('');
    const [returnTrip, setReturn] = useState(false);
    const [flightResponse, setFlightResponse] = useState(tempResponse);
    async function flightSubmit(e) {
        e.preventDefault();
        if (depart && arrival) {
            setFlightResponse(loadingResponse);
            const response = await flightApiCall(arrival, depart, returnTrip);
            
            if (!response.ok) {
                setFlightResponse((
                    <p className="p-3 text-center">Airport code(s) not found. You can find the 3 letter airport code 
                    by Googleing your departing and or destination airport. It will be located in the google description under Code: </p>
                ));
                return;
            }

            const carbonData = await response.json();
            const jsxData = (
                <>
                    <div>
                        <p className="text-center fw-lighter ps-2">Your flight will emit {carbonData[1].carbon_mt} metric tons of CO2 after total after traveling a distance of {carbonData[0].distance_value} miles. </p>
                    </div>
                    <div className="d-flex justify-content-center">
                        <ul>
                            <li>Additional Info:</li>
                            <li>Total CO2 in Lbs: {carbonData[1].carbon_lb.toLocaleString()}</li>
                            <li>Total CO2 in Mt: {carbonData[1].carbon_mt}</li>
                            <li>Total CO2 per person in Lbs: {carbonData[0].carbon_lb.toLocaleString()}</li>
                            <li>Total CO2 per person in Mt: {carbonData[0].carbon_mt}</li>
                        </ul>
                    </div>
                </>
            );
            setFlightResponse(jsxData)

        } else alert('You must enter a departing and arriving airport code!');
    }

    //Shipping states / functions
    const [shippingMethod, setShippingMethod] = useState('truck');
    const [shippingDistance, setShippingDistance] = useState('');
    const [shippingDistUnit, setShippingDistUnit] = useState('mi');
    const [shippingWeight, setShippingWeight] = useState('');
    const [shippingWeightUnit, setShippingWeightUnit] = useState('g');
    const [shippingResponse, setShippingResponse] = useState(tempResponse);
    async function shippingSubmit(e) {
        e.preventDefault();
        if (shippingMethod && shippingDistance && shippingDistUnit && shippingWeight && shippingWeightUnit) {
            setShippingResponse(loadingResponse);
            const response = await shippingApiCall(shippingWeight, shippingWeightUnit, shippingDistance, shippingDistUnit, shippingMethod);

            if (!response.ok) {
                setShippingResponse((
                    <p className="p-3 text-center">An error has occurred. Please check values and try again.</p>
                ));
                return;
            }

            const carbonData = await response.json();
            const jsxData = (
                <>
                    <div>
                        <p className="text-center fw-lighter">Your package will contribute {carbonData.g < 500 ? carbonData.g + " grams" : carbonData.carbon_lb >= 1.1 && carbonData.carbon_lb <= 2250 ? carbonData.carbon_lb.toLocaleString() + " Lbs" : carbonData.carbon_mt + " Metric Tons"} of CO2 after total after traveling a distance of {carbonData.distance_value} miles by {shippingMethod}. </p>
                    </div>
                    <div className="d-flex justify-content-center">
                        <ul>
                            <li>Additional Info:</li>
                            <li>Total CO2 in grams: {carbonData.carbon_g.toLocaleString()}</li>
                            <li>Total CO2 in Lbs: {carbonData.carbon_lb.toLocaleString()}</li>
                            <li>Total CO2 in Mt: {carbonData.carbon_mt}</li>
                        </ul>
                    </div>
                </>
            );
            setShippingResponse(jsxData)
        } else alert('You must enter all values to submit!')
    }

    //Main JSX
    return (
<Container  as="section" fluid='xxl' className="pt-3 px-0 fw-bolder fs-3">
    <Tabs activeKey={key} onSelect={(k) => setKey(k)} className="px-tabs" id="calculatorTabs" style={{ "borderBottom": "2px solid var(--silver)", "borderTop": "none"}}>
            {/* Vehicle Page */}
            <Tab eventKey="vehicles" title="Vehicles" className=" fw-bolder fs-3" >
                <div className="vehicles" style={{"minHeight": "90vh"}}>
                    <div className="calculator-form-divider"></div>
                <Col md={8} lg={6} as="form" className="mx-auto pt-2 calculator-form" 
                id="vehicle-form" onSubmit={(e) => vehicleSubmit(e)}>
                        <div className="d-block">
                            <h3 className="text-center ffv">Calculate your vehicles emissions</h3>
                        </div>
                        <div>
                            <label htmlFor="make">Make:</label>
                            <select id="make" 
                            onChange={(e) => setMake(e.target.value)} 
                            onBlur={(e) => setVehicleMake(e.target.value)} 
                            required>
                                {makes}
                            </select>
                        </div>
                        <div>
                            <label htmlFor="model">Model:</label>
                        <select id="model" placeholder="d-none" onBlur={(e) => setVehicleModel(e.target.value)} required>
                            <option disabled selected value=''>Model</option>
                                {models[make]}
                            </select>
                        </div>
                        <div>
                            <label htmlFor="year">Year:</label>
                            <input id="year" type="number" min="1900" max="2030" placeholder="2000" 
                            step="1" onBlur={(e) => setVehicleYear(e.target.value)} required/>
                        </div>
                        <div className="calculator-form-small">
                            <label htmlFor="distanceValue" className="me-auto">Distance:</label>
                            <input id="distanceValue" type="number" min='0' placeholder="1000"
                            onBlur={(e) => setVehicleDistance(e.target.value)}  />
                            <label htmlFor="distanceUnit" className="ps-0">Unit:</label>
                            <select id="distanceUnit" onBlur={(e) => setVehicleDistUnit(e.target.value)} 
                            required>
                                <option selected value="mi" className="ps-0">Miles</option>
                                <option value="km">Km</option>
                            </select>
                        </div>
                        <div>
                            <button type="submit">Submit</button>
                        </div>
                    </Col>
                    <div className="calculator-box-divider"></div>
                    <Col md={8} lg={6} as="form" className="mx-auto pt-2 calculator-box" id="vehicleResponse">
                        <div>
                            <h3 className="text-center ffv">Results:</h3>
                        </div>
                        {vehicleResponse}
                    </Col>
                </div>
            </Tab>
            {/* End Vehicle Page */}
            {/* Flight Page */}
            <Tab eventKey="flights" title="Flights" tabClassName="mx-2">
            <div className="flight" style={{ "minHeight": "90vh" }}>
                <div className="calculator-form-divider"></div>
                <Col md={8} lg={6}  as="form" className="mx-auto pt-2 calculator-form" 
                id="flight-form" onSubmit={(e) => flightSubmit(e)}>
                    <div className="d-block">
                        <h3 className="text-center ffv">Calculate your flights emissions</h3>
                    </div>
                    <div>
                        <label htmlFor="depart-code">Depart: </label>
                        <input type="text" id="depart-code" className="input-tip" maxLength={3} placeholder="Airport Code" 
                        onBlur={(e) => setDepart(e.target.value)} required />
                        <OverlayTrigger
                        key="depart"
                        placement="bottom"
                        overlay={
                            <Tooltip id={`tooltip-depart`}>
                            You can find the 3 letter airport code by Googleing the airport you
                            departed from. It will be located in the google description under Code:
                            </Tooltip>
                        }
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="me-2" viewBox="0 0 16 16">
                                <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                                <path d="M5.255 5.786a.237.237 0 0 0 .241.247h.825c.138 0 .248-.113.266-.25.09-.656.54-1.134 1.342-1.134.686 0 1.314.343 1.314 1.168 0 .635-.374.927-.965 1.371-.673.489-1.206 1.06-1.168 1.987l.003.217a.25.25 0 0 0 .25.246h.811a.25.25 0 0 0 .25-.25v-.105c0-.718.273-.927 1.01-1.486.609-.463 1.244-.977 1.244-2.056 0-1.511-1.276-2.241-2.673-2.241-1.267 0-2.655.59-2.75 2.286zm1.557 5.763c0 .533.425.927 1.01.927.609 0 1.028-.394 1.028-.927 0-.552-.42-.94-1.029-.94-.584 0-1.009.388-1.009.94z" />
                            </svg>
                        </OverlayTrigger>
                    </div>
                    <div>
                        <label htmlFor="arrival-code">Arrival:</label>
                                <input type="text" id="arrival-code" className="input-tip" maxLength={3} placeholder="Airport Code"
                        onBlur={(e) => setArrival(e.target.value)} required />
                        <OverlayTrigger
                        key="arrival"
                        placement="bottom"
                        overlay={
                            <Tooltip id={`tooltip-arrival`}>
                            You can find the 3 letter airport code by Googleing the airport you will land at.
                            It will be located in the google description under Code:
                            </Tooltip>
                        }
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="me-2" viewBox="0 0 16 16">
                                <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                                <path d="M5.255 5.786a.237.237 0 0 0 .241.247h.825c.138 0 .248-.113.266-.25.09-.656.54-1.134 1.342-1.134.686 0 1.314.343 1.314 1.168 0 .635-.374.927-.965 1.371-.673.489-1.206 1.06-1.168 1.987l.003.217a.25.25 0 0 0 .25.246h.811a.25.25 0 0 0 .25-.25v-.105c0-.718.273-.927 1.01-1.486.609-.463 1.244-.977 1.244-2.056 0-1.511-1.276-2.241-2.673-2.241-1.267 0-2.655.59-2.75 2.286zm1.557 5.763c0 .533.425.927 1.01.927.609 0 1.028-.394 1.028-.927 0-.552-.42-.94-1.029-.94-.584 0-1.009.388-1.009.94z" />
                            </svg>
                        </OverlayTrigger>
                    </div>
                    <Row className="">
                        <Col sm={12} md={8} className="d-flex">

                            <label htmlFor="return-trip" style={{"cursor": "pointer"}}>Include Round Trip:</label>
                            <div className="wrapper">
                                <div className="switch_box m-0">
                                    <input type="checkbox" className="switch_1 my-auto" id="return-trip"
                                    onBlur={(e) => setReturn(e.target.value)}/>
                                </div>
                            </div>
                        </Col>
                        <Col sm={12} md={4}>
                            <button type="submit">Submit</button>
                        </Col>
                    </Row>
                </Col>
                <div className="calculator-box-divider"></div>
                <Col md={8} lg={6} as="form" className="mx-auto pt-2 calculator-box" id="vehicleResponse">
                    <div>
                        <h3 className="text-center ffv">Results:</h3>
                    </div>
                    {flightResponse}
                </Col>
            </div>
            </Tab>
            {/* End Flight Page */}
            {/* Shipping Page */}
            <Tab eventKey="shipping" title="Shipping">
                <div className="shipping" style={{ "minHeight": "90vh" }}>
                    <div className="calculator-form-divider"></div>
                    <Col md={8} lg={6}  as="form" className="mx-auto pt-2 calculator-form"
                        id="flight-form" onSubmit={(e) => shippingSubmit(e)}>
                        <div className="d-block">
                            <h3 className="text-center ffv">Calculate Package Shipping Emissions</h3>
                        </div>
                    <div>
                        <label htmlFor="shippingMethod">Method:</label>
                        <select id="shippingMethod" onBlur={(e) => setShippingMethod(e.target.value)} required>
                            <option value="truck">Truck</option>
                            <option value="train">Train</option>
                            <option value="plane">Plane</option>
                            <option value="ship">Ship</option>
                        </select>
                    </div>
                        
                    <div className="calculator-form-small">
                        <label htmlFor="shippingDistance" className="me-auto">Distance:</label>
                        <input type="number" id="shippingDistance" min='0' placeholder="100" 
                        onBlur={(e) => setShippingDistance(e.target.value)} required/>
                        <label htmlFor="shippingDistUnit">Unit:</label>
                        <select id="shippingDistUnit" onBlur={(e) => setShippingDistUnit(e.target.value)} required>
                            <option value="mi">Miles</option>
                            <option value="km">KM</option>
                        </select>
                    </div>
                    <div className="calculator-form-small">
                        <label htmlFor="weight" className="me-auto">Weight:  </label>
                        <input type="number" id="weight" min="1" max="100000" placeholder="Weight" 
                        onBlur={(e) => setShippingWeight(e.target.value)} required />
                        <label htmlFor="weightUnit">Unit:</label>
                        <select id="weightUnit" onBlur={(e) => setShippingWeightUnit(e.target.value)} required>
                            <option value="g">G</option>
                            <option value="kg">KG</option>
                            <option value="lb">LB</option>
                            <option value="mt">MT</option>
                        </select>
                    </div>
                        <div>
                            <button type="submit">Submit</button>
                        </div>
                    </Col>
                    <div className="calculator-box-divider"></div>
                    <Col md={8} lg={6} as="form" className="mx-auto pt-2 calculator-box" id="vehicleResponse">
                        <div>
                            <h3 className="text-center ffv">Results:</h3>
                        </div>
                        {shippingResponse}
                    </Col>
                </div>
            </Tab>
            {/* End Shipping Page */}
    </Tabs>
</Container>
    )
}