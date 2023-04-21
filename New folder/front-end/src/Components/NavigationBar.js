import React from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Nav } from 'react-bootstrap';


const NavigationBar = () => {
  const handleLogout = () => {
    localStorage.removeItem("authToken");
  }
  return (
    <Navbar className='bg-light' expand="lg">
      <div className='d-flex me-auto'>
        <Navbar.Brand as={Link} to="/">Laundry Management System</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        {(localStorage.getItem("authToken")) ? <Nav className="mr-auto">
          <Nav.Link as={Link} to="/dashboard">Dashboard</Nav.Link>
          <Nav.Link as={Link} to="/laundry-requests">Laundry Requests</Nav.Link>
        </Nav> : <Nav className="mr-auto">
          <Nav.Link as={Link} to="/dashboard">Dashboard</Nav.Link>
        </Nav>}
      </div>
      <Nav>
        {!(localStorage.getItem("authToken")) ?
          <div className='d-flex mx-1'>
            <Nav.Link as={Link} to="/login">Log In</Nav.Link>
            <Nav.Link as={Link} to="/signup">Sign Up</Nav.Link>
          </div> : <div className='d-flex mx-1'> <Nav.Link as={Link} to="/request-status">Request Status</Nav.Link>
            <Nav.Link as={Link} to="/" onClick={handleLogout}>logout</Nav.Link>
          </div>
        }
      </Nav>

    </Navbar >
  );
}

export default NavigationBar;