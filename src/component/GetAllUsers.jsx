import React, { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import UserService from '../service/UserService';

const GetAllUsers = () => {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    UserService.GetAllUser()
      .then((response) => {
        setUsers(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleLogout = () => {
    Swal.fire({
      title: 'Logout',
      text: 'Are you sure you want to logout?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, logout!',
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.removeItem('userInfo');
        navigate('/');
      }
    });
  };

  return (
    <div className="center-table" style={{ position: 'relative' }}>
      <Button
        variant="outlined"
        color="secondary"
        style={{ position: 'absolute', top: 20, right: 20 }}
        onClick={handleLogout}
      >
        Logout
      </Button>
      <h1 style={{ marginBottom: '20px' }}>List of users</h1>
      <TableContainer component={Paper} style={{ boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', borderRadius: '8px', marginTop: '20px' }}>
        <Table style={{ minWidth: '650px', backgroundColor: '#f5f5f5' }}>
          <TableHead style={{ backgroundColor: '#2196f3', color: 'white' }}>
            <TableRow>
              <TableCell>First Name</TableCell>
              <TableCell>Last Name</TableCell>
              <TableCell>Mobile</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Password</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.userId} style={{ borderBottom: '1px solid #ddd' }}>
                <TableCell>{user.firstName}</TableCell>
                <TableCell>{user.lastName}</TableCell>
                <TableCell>{user.mobileNum}</TableCell>
                <TableCell>{user.userCredentials.emailId}</TableCell>
                <TableCell>{user.userCredentials.password}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default GetAllUsers;
