import React from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

const NavBar = () => {
    return (
        <Navbar bg="dark" data-bs-theme="dark">
            <Container>
            <Navbar.Brand href="/home">PassTrack</Navbar.Brand>
            <Nav className="me-auto" >
                <Nav.Link href="/home">About</Nav.Link>
                <Nav.Link href="/flights">Flights</Nav.Link>
                <Nav.Link href="/passengers">Passengers</Nav.Link>
                <Nav.Link href="/registration">Register</Nav.Link>
            </Nav>
            </Container>
        </Navbar>
    );
};

export default NavBar;