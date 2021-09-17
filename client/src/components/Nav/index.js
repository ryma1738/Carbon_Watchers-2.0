import React from 'react';
import {Nav, Navbar, Container} from 'react-bootstrap';

function Navigator() {

    return (
        <Container fluid style={{ 'background': 'var(--darkBackground)', 'borderBottom': '3px solid var(--green)' }}>
            <Navbar expand='lg' variant="dark">
                <Container className="ffv" style={{'color': 'var(--lightGreen)' }}>
                    <Navbar.Brand  className="fw-bold fs-1">Carbon Watchers</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="ms-auto fs-3">
                            <Nav.Link href="/" className="nav-items">Home</Nav.Link>
                            <Nav.Link href="/calculators" className="nav-items">CARBON CALCULATORS</Nav.Link>
                            <Nav.Link href="/login" className="nav-items">Login</Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                    </Container>
            </Navbar>
        </Container>
    );
}

export default Navigator;