import { useState } from "react";
import { TextField, Container, Button } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import Footer from "./Footer";
import "./Login.css";
import { useNavigate } from "react-router-dom";
// import { isEmail } from "validator";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [emailR, setEmailR] = useState("");
  const [passwordR, setPasswordR] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  const LogIn = async () => {
    if (email.length > 0 && password.length > 0) {
      // if (isEmail(email)) {
        let result = await fetch("http://localhost:5000/login", {
          method: "post",
          body: JSON.stringify({ email, password }),
          headers: {
            "Content-Type": "application/json",
          },
        });
        result = await result.json();
        console.log(result);
        if (result) {
          localStorage.setItem("user", JSON.stringify(result));
          navigate("/");
          setEmail("");
          setPassword("");
        } else {
          setEmailR("Check your email & password ");
          setEmailError(true);
          setPasswordError(true);
        }
      // } else {
      //   setEmailR("Enter a Valid Email");
      //   setEmailError(true);
      //   setPasswordR("");
      //   setPasswordError(false);
      // }
    } else {
      if (email === "") {
        setEmailR("*Required Field");
        setEmailError(true);
      } else {
        setEmailR("");
        setEmailError(false);
      }

      if (password === "") {
        setPasswordR("*Required Field");
        setPasswordError(true);
      } else {
        setPasswordR("");
        setPasswordError(false);
      }
    }
  };

  return (
    <>
      <div className="Login-container">
        <h1>Log In</h1>
        <Container fixed variant="outlined" id="Login-main-container">
          <div className="main-container">
            <div className="text-field-container">
              <TextField
                size="small"
                helperText={emailR}
                error={emailError}
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                label="Enter your email"
                type="email"
              />
            </div>
            <div className="text-field-container">
              <TextField
                size="small"
                helperText={passwordR}
                error={passwordError}
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                label="Enter password"
                type={showPassword ? "text" : "password"}
              />
              {showPassword ? (
                <VisibilityOff
                  className="showPassword"
                  onClick={() => {
                    setShowPassword(false);
                  }}
                />
              ) : (
                <Visibility
                  className="showPassword"
                  onClick={() => {
                    setShowPassword(true);
                  }}
                />
              )}
            </div>
            <div className="text-btn-container">
              <Button variant="contained" onClick={LogIn} size="large">
                Log In
              </Button>
            </div>
          </div>
        </Container>
      </div>
      <Footer />
    </>
  );
};

export default Login;
