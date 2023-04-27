import React, { useState, useEffect } from 'react';
import { Table, Card } from 'react-bootstrap';
import NavigationBar from './NavigationBar';

function Dashboard() {
  const [data, setData] = useState([]);
  // const [requests, setRequests] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      // Fetch price data
      const response = await fetch("http://localhost:5000/api/price", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
        }
      });
      const [jsonData] = await response.json();
      setData(jsonData);
    };

    fetchData();
  }, []);

  let [requests, setRequests] = useState([]);
  const authToken = localStorage.getItem("authToken");

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("http://localhost:5000/api/requestStatus", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'         
        }
      });
      const [jsonData] = await response.json();
      // console.log(jsonData);
      const filteredData = jsonData.filter(item => item.authToken === authToken);
      setRequests(filteredData);
    };
    
    fetchData();
  }, []);

  
  // count the number of requests in each status
  const pendingRequests = requests.filter((item) => item.status === 'pending');
  const receivedRequests = requests.filter((item) => item.status === 'received');
  const approvedRequests = requests.filter((item) => item.status === 'approved');
  const finishedRequests = requests.filter((item) => item.status === 'finished');
  const deliverdRequests = requests.filter((item) => item.status === 'deliverd');


  const getPendingRequests = pendingRequests.length;
  const getApprovedRequests = approvedRequests.length;
  const getReceivedRequests = receivedRequests.length;
  const getFinishedRequests = finishedRequests.length;
  const getDeliverdRequests = deliverdRequests.length;
 

  return (
    <>
      <NavigationBar />
      <div className="container my-4">
        <h1 className="text-center">Dashboard</h1>
        <div className="row">
          <div className="col-md">
            <Card bg="secondary" text="white" className="mb-3">
              <Card.Header>Pending Requests</Card.Header>
              <Card.Body>
                <Card.Title>{getPendingRequests}</Card.Title>
              </Card.Body>
            </Card>
          </div>
          <div className="col-md">
            <Card bg="secondary" text="white" className="mb-3">
              <Card.Header>Approved Requests</Card.Header>
              <Card.Body>
                <Card.Title>{getApprovedRequests}</Card.Title>
              </Card.Body>
            </Card>
          </div>
          <div className="col-md">
            <Card bg="secondary" text="white" className="mb-3">
              <Card.Header>Received Requests</Card.Header>
              <Card.Body>
                <Card.Title>{getReceivedRequests}</Card.Title>
              </Card.Body>
            </Card>
          </div>
          <div className="col-md">
            <Card bg="secondary" text="white" className="mb-3">
              <Card.Header>Finished Requests</Card.Header>
              <Card.Body>
                <Card.Title>{getFinishedRequests}</Card.Title>
              </Card.Body>
            </Card>
          </div>
          <div className="col-md">
            <Card bg="secondary" text="white" className="mb-3">
              <Card.Header>Deliverd Requests</Card.Header>
              <Card.Body>
                <Card.Title>{getDeliverdRequests}</Card.Title>
              </Card.Body>
            </Card>
          </div>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Product</th>
                <th>Price</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item) => (
                <tr key={item._id}>
                  <td>{item.product}</td>
                  <td>{item.price}$</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </div>
    </>
  );
}

export default Dashboard;
