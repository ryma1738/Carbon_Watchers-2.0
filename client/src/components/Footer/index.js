import React from 'react';
import { Container, Row } from 'react-bootstrap';

function Footer() {

    return (
        <Row as="footer" className="m-0" style={{ "borderTop": "3px solid var(--green)", "height": "10vh"}}>
            <Container fluid='xl' className="d-flex align-items-center px-4">
                <div>
                    <p className="m-0">
                        Made by <a href="https://github.com/ryma1738" className="text-link" target="_blank" rel="noreferrer">Ryma1738</a></p>
                </div>
                <div className="ms-auto me-4">
                    <p className="mb-0">Sources:</p>
                </div>
                <div>
                    <p className="mb-0"><a href="https://www.iea.org/" target="_blank" rel="noreferrer" className="text-link">IEA</a></p>
                </div>
            </Container>
        </Row>
    )
}

export default Footer;