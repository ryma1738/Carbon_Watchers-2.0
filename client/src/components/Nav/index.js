import React from 'react';
import {Nav, Navbar, Container} from 'react-bootstrap';

function Navigator() {

    return (
        <Container as="header" fluid="xxl" className="d-flex justify-content-start" style={{ 'background': 'var(--darkBackground)', 'borderBottom': '3px solid var(--green)'}}>
            <Navbar expand='lg' variant="dark" className="fit ffv me-0 ms-3">
                <Navbar.Brand className="fw-bold fs-0">Carbon Watchers</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="nav-font ms-auto">
                        <Nav.Link href="/" className="nav-items">Carbon Emissions</Nav.Link>
                        <Nav.Link href="/calculators" className="nav-items ">CARBON CALCULATORS</Nav.Link>
                        <Nav.Link href="/articles" className="text-end">News and Articles</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        </Container>
    );
}

export default Navigator;