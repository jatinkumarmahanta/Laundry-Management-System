import React, { useEffect, useState } from 'react';
import { Table } from 'react-bootstrap';
import NavigationBar from '../Components/NavigationBar';


const RequestStatus = () => {
  const [data, setData] = useState([]);
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
      // console.log(authToken);
      // console.log(jsonData);
      const filteredData = jsonData.filter(item => item.authToken === authToken);
      // console.log(filteredData);
      setData(filteredData);
     
    };
    
    fetchData();
  },[]);
 
  return (
    <>
      <NavigationBar />
      <div className='m-5'>
        <h1 className='text-center'>Request Status</h1>
        <p>Number of requests: </p>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Date</th>
              <th>Service</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
          {data.map(request => (
            <tr key={request._id}>
              <td>{request.date}</td>
              <td>{request.service}</td>
              <td>{request.status}</td>
            </tr>
          ))}
        </tbody>
        </Table>
      </div>
    </>
  );
};

export default RequestStatus;
