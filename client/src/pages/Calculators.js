import React, { useState } from 'react';
import {Container, Row, Col, Tabs, Tab } from 'react-bootstrap';
import { makes } from '../components/make'
import { models } from '../components/model';
import { vehicleApiCall, flightApiCall, shippingApiCall } from '../utils/Api';

function Calculators() {
    const [key, setKey] = useState('vehicles');
    const [make, setMake] = useState('');
    const tempResponse = (
        <div>
            <p className="text-center">Fill out the form above to see your results!</p>
        </div>
    );
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
            const response = await vehicleApiCall(vehicleMake, vehicleModel, vehicleYear, vehicleDistance, vehicleDistUnit);

            if (!response.ok) {
                alert('Vehicle Model and Year not found. Please enter a valid year for the model');
                throw new Error('Vehicle Model and Year not found. Please enter a valid year for the model');
            }

            const carbonData = await response.json();
            const jsxData = (
                <>
                    <div>
                        <p className="text-center fw-lighter ps-2">Your {vehicleMake} {vehicleModel} {vehicleYear} will emit {carbonData.carbon_lb} lbs of CO2 after driving {vehicleDistance} {vehicleDistUnit === 'mi'? "miles." : "kilometers."} </p>
                    </div>
                    <div className="d-flex justify-content-center">
                        <ul>
                            <li>Additional Info:</li>
                            <li>Total CO2 in g: {carbonData.carbon_g}</li>
                            <li>Total CO2 in Lbs: {carbonData.carbon_lb}</li>
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
            const response = await flightApiCall(arrival, depart, returnTrip);

            if (!response.ok) {
                alert('Airport code(s) not found. Please try again');
                throw new Error('Airport code(s) not found. Please try again');
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
                            <li>Total CO2 in Lbs: {carbonData[1].carbon_lb}</li>
                            <li>Total CO2 in Mt: {carbonData[1].carbon_mt}</li>
                            <li>Total CO2 per person in Lbs: {carbonData[0].carbon_lb}</li>
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
            const response = await shippingApiCall(shippingWeight, shippingWeightUnit, shippingDistance, shippingDistUnit, shippingMethod);

            if (!response.ok) {
                alert('An error has occurred. Please check values and try again.');
                throw new Error('An error has occurred. Please check values and try again.');
            }

            const carbonData = await response.json();
            const jsxData = (
                <>
                    <div>
                        <p className="text-center fw-lighter">Your package will contribute {carbonData.carbon_g < 500 ? carbonData.carbon_g + " grams" : carbonData.carbon_lb >= 1.1 && carbonData.carbon_lb <= 2250 ? carbonData.carbon_lb + " Lbs" : carbonData.carbon_mt + " Metric Tons"} of CO2 after total after traveling a distance of {carbonData.distance_value} miles by {shippingMethod}. </p>
                    </div>
                    <div className="d-flex justify-content-center">
                        <ul>
                            <li>Additional Info:</li>
                            <li>Total CO2 in g: {carbonData.carbon_g}</li>
                            <li>Total CO2 in Lbs: {carbonData.carbon_lb}</li>
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
<Container fluid='xxl' className="pt-3 px-0 fw-bolder fs-3">
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
                        <label htmlFor="depart-code">Depart:</label>
                        <input type="text" id="depart-code" maxLength={3} placeholder="Airport Code" 
                        onBlur={(e) => setDepart(e.target.value)} required />
                    </div>
                    <div>
                        <label htmlFor="arrival-code">Arrival:</label>
                        <input type="text" id="arrival-code" maxLength={3} placeholder="Airport Code" 
                        onBlur={(e) => setArrival(e.target.value)} required />
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

export default Calculators;