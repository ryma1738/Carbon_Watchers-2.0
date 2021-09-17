import React from 'react';
import { Container, Row } from 'react-bootstrap';

function Footer() {

    return (
        <Row className="m-0" style={{ "borderTop": "3px solid var(--green)", "height": "10vh"}}>
            <Container fluid='xl' className="d-flex align-items-center pe-0">
                <div>
                    <p className="m-0 ps-4">Made by Ryma1738</p>
                </div>
            </Container>
        </Row>
    )
}

export default Footer;