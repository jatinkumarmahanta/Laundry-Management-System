import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Nav, Container } from 'react-bootstrap';


const NavigationBar = () => {
  const [expanded, setExpanded] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("authToken");
  }

  return (
    <Navbar className='bg-light' expand="lg" expanded={expanded}>
      <Container fluid>
        <Navbar.Brand as={Link} to="/">Laundry Management System</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" onClick={() => setExpanded(expanded ? false : "expanded")} />
        <Navbar.Collapse id="responsive-navbar-nav">
          {(localStorage.getItem("authToken")) ? <Nav className="me-auto">
            <Nav.Link as={Link} to="/dashboard">Dashboard</Nav.Link>
            <Nav.Link as={Link} to="/laundry-requests">Laundry Requests</Nav.Link>
            <Nav.Link as={Link} to="/request-status">Request Status</Nav.Link>
          </Nav> : <Nav className="me-auto">
            <Nav.Link as={Link} to="/dashboard">Dashboard</Nav.Link>
          </Nav>}
          <Nav>
            {!(localStorage.getItem("authToken")) ?
              <div className='d-flex mx-1'>
                <Nav.Link as={Link} to="/login">Log In</Nav.Link>
                <Nav.Link as={Link} to="/signup">Sign Up</Nav.Link>
              </div> : <div className='d-flex mx-1'>
                <Nav.Link as={Link} to="/" onClick={handleLogout}>logout</Nav.Link>
              </div>
            }
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar >
  );
}

export default NavigationBar;
