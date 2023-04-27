import React, { useEffect, useState } from 'react'
import { Table, Button } from 'react-bootstrap';
import NavigationBar from '../Components/NavigationBar'

const Payment = () => {
  const [data, setData] = useState([]);
  const authToken = localStorage.getItem("authToken");

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("http://localhost:5000/api/request", {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'         
        }
      });
      const [jsonData] = await response.json();
      const filteredData = jsonData.filter(item => item.authToken === authToken);
      setData(filteredData);
    };
    fetchData();
  }, [authToken]);

  const handlePayNow = async (requestId) => {
    try {
      const response = await fetch(`http://localhost:5000/api/request/${requestId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ paid: true })
      });
  
      if (response.ok) {
        setData(prevState => {
          const updatedData = prevState.map(request => {
            if (request._id === requestId) {
              return { ...request, paid: true, total: 0 };
            }
            return request;
          });
          return updatedData;
        });
      }
    } catch (error) {
      console.error(error);
    }
  };
  
   
  return (
    <>
      <NavigationBar />
      <div className='m-5'>
        <h1 className='text-center'>Request Status</h1>
        <p>Number of requests: {data.length}</p>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Pickup Date</th>
              <th>Top wear</th>
              <th>Bottom wear</th>
              <th>Woolen wear</th>
              <th>Other</th>
              <th>Total Price</th>
              <th>Pay Now</th>
            </tr>
          </thead>
          <tbody>
          {data.map(request => (
            <tr key={request._id}>
              <td>{request.date}</td>
              <td>{request.top}*12</td>
              <td>{request.bottom}*15</td>
              <td>{request.woolen}*20</td>
              <td>{request.other}*25</td>
              <td>{request.total}</td>
              <td><Button variant="primary" onClick={() => handlePayNow(request._id)}>Pay Now</Button></td>
            </tr>
          ))}
        </tbody>
        </Table>
      </div>
    </>
  );
};
  
export default Payment;
