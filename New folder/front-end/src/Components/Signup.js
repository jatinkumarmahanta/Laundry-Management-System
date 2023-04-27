import { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import NavigationBar from './NavigationBar';

function Signup() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [number, setMobile] = useState('');
  const [password, setPassword] = useState('');

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handleMobileChange = (event) => {
    setMobile(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(`Name: ${name}\nEmail: ${email}\nMobile: ${number}\nPassword: ${password}`);
    try {
      const response = await fetch("http://localhost:5000/api/creatuser", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name: name, email: email, number: number, password: password })
      });
      const json = await response.json();
      console.log(json);
      if (!json.success) {
        alert("Enter valid data")
      }
      else { 
        alert("register sucessfully")
      }
    } catch (error) {
      console.error(error);
      alert("Failed to fetch data. Please try again later.");
    }
  };


  return (
    <>
      <NavigationBar />
      <div className="container my-4 ">
        <div className="row justify-content-center">
          <div className="col-md-6">
            <h2 className="text-center mb-4">Sign Up</h2>
            <Form onSubmit={handleSubmit}>
              <Form.Group controlId="formBasicName">
                <Form.Label>Name</Form.Label>
                <Form.Control type="text" placeholder="Enter name" name='name' value={name} onChange={handleNameChange} />
              </Form.Group>

              <Form.Group controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control type="email" placeholder="Enter email" name='email' value={email} onChange={handleEmailChange} />
              </Form.Group>

              <Form.Group controlId="formBasicMobile">
                <Form.Label>Mobile number</Form.Label>
                <Form.Control type="text" placeholder="Enter mobile number" name='number' value={number} onChange={handleMobileChange} />
              </Form.Group>

              <Form.Group controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Password" name='password' value={password} onChange={handlePasswordChange} />
              </Form.Group>

              <Button variant="dark" type="submit" className="w-100 mt-4">
                Sign Up
              </Button>
            </Form>
            <div className="text-center mt-2">
              <span>Already have an account? </span>
              <Link to="/login">Log In</Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Signup;
