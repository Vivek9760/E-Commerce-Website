import { useState } from 'react';
import { TextField, Container, Button } from "@mui/material";
import Footer from "./Footer";
import "./Login.css";

const Signup = () => {

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password,setPassword] = useState('');
  const [confirmPassword,setConfirmPassword] = useState('');
  const [nameR, setNameR] = useState('');
  const [emailR, setEmailR] = useState('');
  const [passwordR,setPasswordR] = useState('');
  const [confirmPasswordR,setConfirmPasswordR] = useState('');
  const [nameError, setNameError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [passwordError,setPasswordError] = useState(false);
  const [confirmPasswordError,setConfirmPasswordError] = useState(false);





  const saveUserInfo = async() => {
    if(name.length>0 && email.length>0 && password.length>0 && confirmPassword.length>0 && password === confirmPassword ){
    
    console.log(name,email,password,confirmPassword);

    let data = await fetch("http://localhost:5000/signup",{
      method:'post',
      body:JSON.stringify({name,email,password}),
      headers:{
        'Content-Type':'application/json'
      }
    })
    setName('');
    setEmail('');
    setPassword('');
    setConfirmPassword('');

  } 
  else{
    if(name===""){
      setNameR('*Required Field');
      setNameError(true);
    }else{setNameR(''); setNameError(false)}

    if(email===""){
      setEmailR('*Required Field');
      setEmailError(true);
    }else{setEmailR('');  setEmailError(false);}

    if(password===""){
      setPasswordR('*Required Field');
      setPasswordError(true);
    }else{setPasswordR(''); setPasswordError(false);}

    if(confirmPassword===""){
      setConfirmPasswordR('*Required Field');
      setConfirmPasswordError(true);
    }else if(password !== confirmPassword ){
      setConfirmPasswordR('Password not matched');
      setConfirmPasswordError(true);
    }else{setConfirmPasswordR(''); setConfirmPasswordError(false);}

  }
}


  return (
    <>
    <div className='Login-container'>
        <h1>Sign up</h1>
      <Container fixed variant="outlined" id="Login-main-container">
        <div className="main-container">
        <div className="text-field-container2">
        <TextField  value={name} helperText={nameR} error={nameError} onChange={(e)=>{setName(e.target.value);}} color="info" label="Enter your name" />
        </div>
        <div className="text-field-container2">
        <TextField color="info"  helperText={emailR} error={emailError} value={email}  onChange={(e)=>{setEmail(e.target.value)}} label="Enter your email" type="email" />
        </div>
        <div className="text-field-container2">
        <TextField color="info"  helperText={passwordR} error={passwordError} value={password} onChange={(e)=>{setPassword(e.target.value)}} label="Enter password" type="password" />
        </div>
        <div className="text-field-container2">
        <TextField color="info"  helperText={confirmPasswordR} error={confirmPasswordError} value={confirmPassword} onChange={(e)=>{setConfirmPassword(e.target.value)}} label="Confirm password" type="password" />
        </div>
        <div className="text-btn-container">
        <Button variant="contained" onClick={saveUserInfo} size="large">Sign up</Button>
        </div>
        </div>
      </Container>
    </div>
    <Footer />
    </>
  );
};

export default Signup;