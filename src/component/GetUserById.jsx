import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import UserService from '../service/UserService';
import Swal from 'sweetalert2';

const GetUserById = () => {
  const { emailId } = useParams();
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    UserService.getUserByEmail(emailId)
      .then((response) => {
        setUser(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [emailId]);

  const handleLogout = () => {
    Swal.fire({
      title: 'Logout',
      text: 'Are you sure you want to logout?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Yes, logout!',
      cancelButtonText: 'Cancel',
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.removeItem('user'); 
        localStorage.removeItem('userInfo');
        navigate('/');
        Swal.fire({
          title: 'Logged Out',
          text: 'You have been successfully logged out.',
          icon: 'success',
        });
      }
    });
  };

  return (
    <div>
      <Button variant="outlined" color="secondary" style={{ position: 'absolute', top: 20, right: 20 }} onClick={handleLogout}>
        Logout
      </Button>
      <TableContainer component={Paper} style={{ margin: '20px auto', padding: '20px', borderRadius: '8px', border: '1px solid #ddd', maxWidth: '800px', backgroundColor: '#f0f0f0' }}>
        <Table>
          <TableHead style={{ marginBottom: '10px' }}>
            <TableRow>
              <TableCell>First Name</TableCell>
              <TableCell>Last Name</TableCell>
              <TableCell>Mobile</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Password</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {user && (
              <TableRow>
                <TableCell>{user.firstName}</TableCell>
                <TableCell>{user.lastName}</TableCell>
                <TableCell>{user.mobileNum}</TableCell>
                <TableCell>{user.userCredentials.emailId}</TableCell>
                <TableCell>{user.userCredentials.password}</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default GetUserById;
