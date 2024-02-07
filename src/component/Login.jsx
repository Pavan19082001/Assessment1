import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Button,
  TextField,
  Paper,
  Typography,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  Box,
} from "@mui/material";
import { IoMdLogIn } from "react-icons/io";
import UserService from "../service/UserService";
import Swal from "sweetalert2";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
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

  const onSubmit = (e) => {
    e.preventDefault();
    const credentials = { username, password };

        // User login
        const user = users.find(
          (u) =>
            credentials.username === u.userCredentials.emailId &&
            credentials.password === u.userCredentials.password
        );

        if (!user) {
          console.log("Invalid credentials");
          Swal.fire({
            title: "Error!",
            text: "Invalid credentials",
            icon: "error",
            confirmButtonText: "OK",
          });
          return;
        }
    
        if (user.userType === "A") {
          // Admin login
          console.log("Admin login successful");
          Swal.fire({
            title: "Success!",
            text: "Admin login successful",
            icon: "success",
            confirmButtonText: "OK",
          }).then(() => {
            navigate("/getAllUsers");
          });
        } else {
          // User login
          console.log("Login successful");
          Swal.fire({
            title: "Success!",
            text: "Login successful",
            icon: "success",
            confirmButtonText: "OK",
          }).then(() => {
            navigate(`/getUsersById/${user.userCredentials.emailId}`);
          });
        }
  }

  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      height="100vh"
      style={{
        background: "linear-gradient(to right, #3494E6, #EC6EAD)",
        color: "white",
      }}
    >
      <Paper
        elevation={3}
        style={{ maxWidth: "450px", padding: "20px", borderRadius: "8px" }}
      >
        <Typography variant="h5" align="center" gutterBottom>
          Login
        </Typography>

        <FormControl
          component="form"
          onSubmit={(e) => {
            e.preventDefault();
            onSubmit(e);
          }}
        >

          <TextField
            fullWidth
            label="Email"
            variant="outlined"
            margin="normal"
            autoComplete="off"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />

          <TextField
            fullWidth
            type="password"
            label="Password"
            variant="outlined"
            margin="normal"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <Button
            type="submit"
            variant="contained"
            color="success"
            fullWidth
            style={{ marginTop: "20px" }}
          >
            <IoMdLogIn style={{ marginRight: "5px" }} /> Login
          </Button>

          <Link
            to="/"
            style={{
              display: "block",
              textAlign: "center",
              marginTop: "10px",
              color: "white",
            }}
          >
            Cancel
          </Link>

          <Typography
            variant="body2"
            align="right"
            style={{ marginTop: "10px", color: "black" }}
          >
            Not Registered?{" "}
            <Link
              to="/register"
              style={{ color: "blue", textDecoration: "none" }}
            >
              Register here
            </Link>
          </Typography>
        </FormControl>
      </Paper>
    </Box>
  );
};

export default Login;
