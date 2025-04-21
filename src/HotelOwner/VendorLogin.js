import React, { useState } from "react";
import Header from "./Header";
import Footer from "./Footer";
import {
  Container,
  Box,
  Typography,
  TextField,
  Button,
  IconButton,
  InputAdornment,
  Paper,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const VendorLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error("Please enter both email and password");
      return;
    }

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BASE_URL}api/auth/vendorLogin`,
        { email, password }
      );

      console.log(response);
      if (response.status === 200) {
        toast.success("Login successful!");
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("role", response.data.data.role);
        setTimeout(() => {
          navigate("/dashboard");
        }, 3000);
      }

      // Navigate to dashboard if needed
    } catch (err) {
      toast.error(
        err.response?.data?.message || "Login failed. Please try again."
      );
    }
  };

  return (
    <div
      className="container-scroller"
      style={{ backgroundColor: "#f5f7fa", minHeight: "100vh" }}
    >
      <Header />
      <Toaster />
      <div className="container-fluid page-body-wrapper d-flex align-items-center justify-content-center">
        <Container
          maxWidth="sm"
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            minHeight: "80vh",
          }}
        >
          <Paper
            elevation={4}
            sx={{
              padding: 5,
              borderRadius: 3,
              width: "100%",
              backgroundColor: "white",
            }}
          >
            <Typography
              variant="h4"
              align="center"
              gutterBottom
              sx={{ fontWeight: 600, color: "#1976d2" }}
            >
              Vendor Login
            </Typography>
            <Typography
              variant="body1"
              align="center"
              sx={{ color: "gray", mb: 3 }}
            >
              Please login to access your dashboard
            </Typography>
            <form onSubmit={handleLogin}>
              <TextField
                label="Email"
                type="email"
                fullWidth
                margin="normal"
                variant="outlined"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <TextField
                label="Password"
                type={showPassword ? "text" : "password"}
                fullWidth
                margin="normal"
                variant="outlined"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => setShowPassword(!showPassword)}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
              <Button
                type="submit"
                variant="contained"
                fullWidth
                size="large"
                sx={{
                  mt: 3,
                  backgroundColor: "#1976d2",
                  textTransform: "none",
                  fontWeight: "bold",
                  "&:hover": {
                    backgroundColor: "#125ea9",
                  },
                }}
              >
                Login
              </Button>
            </form>
          </Paper>
        </Container>
      </div>
      <Footer />
    </div>
  );
};

export default VendorLogin;
