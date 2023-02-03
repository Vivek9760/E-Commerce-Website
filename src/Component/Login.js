import { TextField, Container, Button } from "@mui/material";
import Footer from "./Footer";
import "./Login.css";

const Login = () => {
  return (
    <>
    <div className='Login-container'>
        <h1>Log In</h1>
      <Container fixed variant="outlined" id="Login-main-container">
        <div className="main-container">
        <div className="text-field-container">
        <TextField id="login-textfield-one" color="info" label="Enter your e-mail" />
        </div>
        <div className="text-field-container">
        <TextField color="info" label="Enter your password" type="password" />
        </div>
        <div className="text-btn-container">
        <Button variant="contained" size="large">Log In</Button>
        </div>
        </div>
      </Container>
    </div>
    <Footer />
    </>
  );
};

export default Login;
