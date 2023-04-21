import { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import NavigationBar from './NavigationBar';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  let navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch("http://localhost:5000/api/loginuser", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email: email, password: password })
      });
      const json = await response.json();
      console.log(json);
      if (!json.success) {
        alert("Enter valid data")
      }
      if (json.success) {
        localStorage.setItem("authToken", json.authToken)
        if (localStorage.getItem("authToken") === "admin@gmail.com") {
          navigate("/admin");
        } else {
          console.log(localStorage.getItem("authToken"));
          navigate("/");

        }
      }
    } catch (error) {
      console.error(error);
      alert("Failed to fetch data. Please try again later.");
    }
  };

  return (
    <>
      <NavigationBar />
      <div className="container my-4">
        <div className="row justify-content-center">
          <div className="col-md-6">
            <h2 className="text-center mb-4">Log In</h2>
            <Form onSubmit={handleSubmit}>
              <Form.Group controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control type="email" placeholder="Enter email" value={email} onChange={handleEmailChange} />
              </Form.Group>

              <Form.Group controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Password" value={password} onChange={handlePasswordChange} />
              </Form.Group>

              <Button variant="primary" type="submit" className="w-100 mt-4">
                Log In
              </Button>
              <div className="text-center mt-3">
                <span className="mr-2">Don't have an account?</span>
                <Link to="/signup">Sign Up</Link>
              </div>
            </Form>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
