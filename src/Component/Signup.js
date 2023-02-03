import { TextField, Container, Button } from "@mui/material";
import Footer from "./Footer";
import "./Login.css";

const Signup = () => {
  return (
    <>
    <div className='Login-container'>
        <h1>Sign up</h1>
      <Container fixed variant="outlined" id="Login-main-container">
        <div className="main-container">
        <div className="text-field-container2">
        <TextField id="login-textfield-one" color="info" label="Enter your name" />
        </div>
        <div className="text-field-container2">
        <TextField color="info" label="Enter your email" type="email" />
        </div>
        <div className="text-field-container2">
        <TextField color="info" label="Enter password" type="password" />
        </div>
        <div className="text-field-container2">
        <TextField color="info" label="Confirm password" type="password" />
        </div>
        <div className="text-btn-container">
        <Button variant="contained" size="large">Sign up</Button>
        </div>
        </div>
      </Container>
    </div>
    <Footer />
    </>
  );
};

export default Signup;