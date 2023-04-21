import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import NavigationBar from '../Components/NavigationBar';

const Request = () => {
  const [date, setdate] = useState('');
  const [top, settop] = useState('');
  const [bottom, setbottom] = useState('');
  const [woolen, setwoolen] = useState('');
  const [other, setOther] = useState('');
  const [service, setservice] = useState('');
  const [person, setperson] = useState('');
  const [disc, setdisc] = useState('');

  // const authToken = localStorage.getItem("authToken");
  async function handleSubmit(e) {
    e.preventDefault();
    const authToken = localStorage.getItem("authToken");
    let status= "pending";

    try {
      const response = await fetch("http://localhost:5000/api/request", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ date: date, top: top, bottom: bottom, woolen: woolen, other: other, service: service, person: person, disc: disc, authToken: authToken,status:status })
      });
      const json = await response.json();
      // console.log(json);
      if (!json.success) {
        alert("Enter valid data");
      }
      else {
        alert("Request send sucessfully");
      }
    } catch (error) {
      console.error(error);
      alert("Failed to fetch data. Please try again later.");
    };
  }
  

  return (
    <>
    <NavigationBar/>
    <div className="container my-4">
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="date">
          <Form.Label>Pickup Date</Form.Label>
          <Form.Control type="date" value={date} name='date' onChange={(e) => setdate(e.target.value)} required />
        </Form.Group>

        <Form.Group controlId="top">
          <Form.Label>Top Wear Cloth</Form.Label>
          <Form.Control type="number" value={top} name='top' onChange={(e) => settop(e.target.value)} required />
        </Form.Group>

        <Form.Group controlId="bottom">
          <Form.Label>Bottom Wear Cloth</Form.Label>
          <Form.Control type="number" value={bottom}name='bottom' onChange={(e) => setbottom(e.target.value)} required />
        </Form.Group>

        <Form.Group controlId="woolen">
          <Form.Label>Woolen Cloth</Form.Label>
          <Form.Control type="number" value={woolen}name='woolen' onChange={(e) => setwoolen(e.target.value)} required />
        </Form.Group>

        <Form.Group controlId="other">
          <Form.Label>Other</Form.Label>
          <Form.Control type="number" value={other} name='other' onChange={(e) => setOther(e.target.value)} required />
        </Form.Group>

        <Form.Group controlId="service">
          <Form.Label>Service Type</Form.Label>
          <Form.Control as="select" value={service} name='service' onChange={(e) => setservice(e.target.value)} required>
            <option value="">-- Select Service Type --</option>
            <option value="Wash">Wash</option>
            <option value="Iron">Iron</option>
          </Form.Control>
        </Form.Group>

        <Form.Group controlId="person">
          <Form.Label>Contact Person</Form.Label>
          <Form.Control type="text" value={person} name='person' onChange={(e) => setperson(e.target.value)} required />
        </Form.Group>

        <Form.Group controlId="disc">
          <Form.Label>Discription (if any)</Form.Label>
          <Form.Control as="textarea" rows={3} value={disc} name='disc' onChange={(e) => setdisc(e.target.value)}  />
        </Form.Group>

        <Button variant="primary" type="submit">Submit</Button>
      </Form>
    </div>
    </>
  );
};

export default Request;
