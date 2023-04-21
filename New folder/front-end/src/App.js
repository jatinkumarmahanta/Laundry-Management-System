import React from 'react';
import './App.css';
import { BrowserRouter , Routes , Route } from "react-router-dom";
import MainPage from './Pages/MainPage';
import Login from './Components/Login';
import Signup from './Components/Signup';
import Request from './Pages/Request';
import RequestStatus from './Pages/RequestStatus';
import Dashboard from './Components/Dashboard';
import AdminHome from './Admin/AdminHome';
import AdminDashboard from './Admin/AdminDashboard';
import AprovedRequest from './Admin/AprovedRequest';


function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<MainPage/>}/>
      <Route path="/dashboard" element={<Dashboard/>}/>
      <Route path="/login" element={<Login/>}/>
      <Route path="/signup" element={<Signup/>}/>
      <Route path="/laundry-requests" element={<Request/>}/>
      <Route path="/request-status" element={<RequestStatus/>}/>
      <Route path="/admin" element={<AdminHome/>}/>
      <Route path="/admin/dashboard" element={<AdminDashboard/>}/>
      <Route path="/admin/aproveRequests" element={<AprovedRequest/>}/>
    </Routes>
    </BrowserRouter>
  );
}

export default App;
