import React, { useState } from 'react';
import { TextField, Button, Card, CardContent, Container, Typography , Radio, RadioGroup, FormControlLabel} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { FaCheck } from 'react-icons/fa';
import UserService from '../service/UserService';
import Swal from 'sweetalert2';

const Register = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [mobileNum, setMobileNum] = useState('');
  const [emailId, setEmailId] = useState('');
  const [password, setPassword] = useState('');
  const [userType, setUserType] = useState('U');
  const [isSubmitting, setIsSubmitting] = useState(false);

  
  const [firstNameError, setFirstNameError] = useState('');
  const [lastNameError, setLastNameError] = useState('');
  const [mobileNumError, setMobileNumError] = useState('');
  const [emailIdError, setEmailIdError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const history = useNavigate();

  const validateForm = () => {
    let isValid = true;

    
    if (!firstName) {
      setFirstNameError('First Name is required');
      isValid = false;
    } else if (!/^[A-Za-z]+$/.test(firstName)) {
      setFirstNameError('Name should contain only alphabets');
      isValid = false;
    } else {
      setFirstNameError('');
    }

    
    if (!lastName) {
      setLastNameError('Last Name is required');
      isValid = false;
    } else if (!/^[A-Za-z]+$/.test(lastName)) {
      setLastNameError('Name should contain only alphabets');
      isValid = false;
    } else {
      setLastNameError('');
    }

    
    if (!mobileNum) {
      setMobileNumError('Mobile Number is required');
      isValid = false;
    } else if (!/^[6789]\d{9}$/.test(mobileNum) || mobileNum.length !== 10) {
      setMobileNumError('Invalid Mobile Number. It should start with 6, 7, 8, or 9 and be exactly 10 digits');
      isValid = false;
    } else {
      setMobileNumError('');
    }

    
    if (!emailId) {
      setEmailIdError('Email is required');
      isValid = false;
    } else if (!/^[^\s@]+@gmail\.com$/.test(emailId)) {
      setEmailIdError('Invalid Email Id.');
      isValid = false;
    } else {
      setEmailIdError('');
    }

    
    if (!password) {
      setPasswordError('Password is required');
      isValid = false;
    } else if (!/(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9])/.test(password) || password.length < 6) {
      setPasswordError('Password should contain at least one uppercase letter, one number, one special character, and be at least 6 characters long');
      isValid = false;
    } else {
      setPasswordError('');
    }

    return isValid;
  };

  const handleInputChange = (field, value, setError) => {
    setError('');
    field(value);
  };

  const saveUser = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    const userCredentials = { emailId, password };
    const user = { firstName, lastName, mobileNum, userCredentials , userType};

    try {
      const response = await UserService.RegisterUser(user);
      console.log(response.data);
      Swal.fire({
        title: 'Success!',
        text: 'Registration successful!',
        icon: 'success',
        confirmButtonText: 'OK',
      }).then(() => {
        history('/');
      });
    } catch (error) {
      console.error('Registration failed:', error.response ? error.response.data : error.message);
      Swal.fire({
        title: 'Error!',
        text: 'Registration failed. Please try again.',
        icon: 'error',
        confirmButtonText: 'OK',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Container maxWidth="sm" style={{ marginTop: '20px', backgroundColor: '#f0f0f0', padding: '20px', borderRadius: '8px' }}>
      <Card>
        <CardContent>
          <Typography variant="h4" align="center" gutterBottom>
            Registration
          </Typography>
          <form>
            <TextField
              label="First Name"
              variant="outlined"
              fullWidth
              margin="normal"
              value={firstName}
              onChange={(e) => handleInputChange(setFirstName, e.target.value, setFirstNameError)}
              error={!!firstNameError}
              helperText={firstNameError}
            />
            <TextField
              label="Last Name"
              variant="outlined"
              fullWidth
              margin="normal"
              value={lastName}
              onChange={(e) => handleInputChange(setLastName, e.target.value, setLastNameError)}
              error={!!lastNameError}
              helperText={lastNameError}
            />
            <TextField
              label="Mobile"
              variant="outlined"
              type="number"
              fullWidth
              margin="normal"
              value={mobileNum}
              onChange={(e) => handleInputChange(setMobileNum, e.target.value, setMobileNumError)}
              error={!!mobileNumError}
              helperText={mobileNumError}
            />
            <TextField
              label="Email"
              variant="outlined"
              type="email"
              fullWidth
              margin="normal"
              value={emailId}
              onChange={(e) => handleInputChange(setEmailId, e.target.value, setEmailIdError)}
              error={!!emailIdError}
              helperText={emailIdError}
            />
            <TextField
              label="Password"
              variant="outlined"
              type="password"
              fullWidth
              margin="normal"
              value={password}
              onChange={(e) => handleInputChange(setPassword, e.target.value, setPasswordError)}
              error={!!passwordError}
              helperText={passwordError}
            />
            <RadioGroup row aria-label="userType" name="userType" value={userType} onChange={(e) => setUserType(e.target.value === 'U' ? 'U' : 'A')}>
              <FormControlLabel value="U" control={<Radio />} label="User" />
              <FormControlLabel value="A" control={<Radio />} label="Admin" />
            </RadioGroup>
            <Button
              variant="contained"
              color="success"
              onClick={(e) => saveUser(e)}
              style={{
                marginTop: '20px',
                backgroundColor: '#2196f3',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
              disabled={isSubmitting}
            >
              {isSubmitting ? <FaCheck className="icon-spin" /> : 'Submit'}
            </Button>
          </form>
        </CardContent>
      </Card>
    </Container>
  );
};

export default Register;
