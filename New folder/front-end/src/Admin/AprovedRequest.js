import { useState, useEffect } from 'react';
import { Table, Button } from 'react-bootstrap';
import AdminNavigationBar from './AdminNavigationBar';

function RequestApproved() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("http://localhost:5000/api/aprovedRequest", {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      });
      const [jsonData] = await response.json();
      setData(jsonData);
    };

    fetchData();
  }, []);

  const handlePendingStatus = async (id) => {
    try {
      const response = await fetch(`http://localhost:5000/api/updateRequest/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          status: 'approved'
        })
      });
      const jsonData = await response.json();
      if (jsonData.success) {
        setData(prevData => prevData.map(request => request._id === id ? { ...request, status: 'approved' } : request));
      } else {
        console.log(jsonData.message);
      }
    } catch (error) {
      console.error(error.message);
    }
  }
  const handleFinishStatus = async (id) => {
    try {
      const response = await fetch(`http://localhost:5000/api/updateRequest/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          status: 'finished'
        })
      });
      const jsonData = await response.json();
      if (jsonData.success) {
        setData(prevData => prevData.map(request => request._id === id ? { ...request, status: 'finished' } : request));
      } else {
        console.log(jsonData.message);
      }
    } catch (error) {
      console.error(error.message);
    }
  }
  

  return (
    <>
      <AdminNavigationBar />
      <div className="container">
        <h1 className='text-center m-2'>Requests</h1>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Date</th>
              <th>Top Wear</th>
              <th>Bottom Wear</th>
              <th>Woolen Wear</th>
              <th>Other</th>
              <th>Service Type</th>
              <th>Contact Person</th>
              <th>Status</th>
              <th>Aproved</th>
              <th>Finish</th>
            </tr>
          </thead>
          <tbody>
            {data.map((request) => (
              <tr key={request._id}>
                <td>{request.date}</td>
                <td>{request.top}</td>
                <td>{request.bottom}</td>
                <td>{request.woolen}</td>
                <td>{request.other}</td>
                <td>{request.service}</td>
                <td>{request.person}</td>
                <td>{request.status}</td>
                <td>
                  {request.status === 'pending' && (
                    <Button variant="success" onClick={() => handlePendingStatus(request._id)}>Approve</Button>
                  )}
                </td>
                <td>
                  {request.status === 'approved' && (
                    <Button variant="primary" onClick={() => handleFinishStatus(request._id)}>Finish</Button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </>
  );
}

export default RequestApproved;
