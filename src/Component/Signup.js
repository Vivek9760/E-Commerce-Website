import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'
import { TextField, Container, Button } from "@mui/material";
import Footer from "./Footer";
import "./Login.css";
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { isEmail } from 'validator';

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
  const [showPassword,setShowPassword]=useState(false);
  const [showConfirmPassword,setShowConfirmPassword]=useState(false);
  const navigate = useNavigate('/');





  const saveUserInfo = async() => {
    if(name.length>0 && email.length>0 && password.length>0 && confirmPassword.length>0 && password === confirmPassword ){
      if (isEmail(email)) {
      let result = await fetch("http://localhost:5000/login",{
        method:'post',
        body:JSON.stringify({email}),
        headers:{
          'Content-Type':'application/json'
        }
      });
      result = await result.json();
      if(!result){
      console.log(result.email);
    console.log(name,email,password,confirmPassword);

    let data = await fetch("http://localhost:5000/signup",{
      method:'post',
      body:JSON.stringify({name,email,password}),
      headers:{
        'Content-Type':'application/json'
      }
    })

    data = await data.json()
    if(data){
    localStorage.setItem('user',JSON.stringify(data));
    console.log(data)
    setName('');
    setEmail('');
    setPassword('');
    setConfirmPassword('');}
  }
    else{
      console.log(result.email);
      setEmailR('Email already in use'); setEmailError(true);
      setNameR(''); setNameError(false);
      setPasswordR(''); setPasswordError(false);
      setConfirmPasswordR(''); setConfirmPasswordError(false);
    }
  }else {
    setEmailR("Enter a Valid Email");
    setEmailError(true);
    setPasswordR("");
    setPasswordError(false);
    setConfirmPasswordR(''); setConfirmPasswordError(false);
    setNameR(''); setNameError(false);
  }
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


useEffect(()=>{
  const auth = localStorage.getItem('user');
  if(auth){
    navigate('/');
  }
})


  return (
    <>
    
    <div className='Login-container'>
        <h1>Sign up</h1>
      <Container fixed variant="outlined" id="Login-main-container">
        <div className="main-container">
        <div className="text-field-container">
        <TextField  value={name}size="small" helperText={nameR} error={nameError} onChange={(e)=>{setName(e.target.value);}} label="Enter your name" />
        </div>
        <div className="text-field-container">
        <TextField size="small" helperText={emailR} error={emailError} value={email}  onChange={(e)=>{setEmail(e.target.value)}} label="Enter your email" type="email" />
        </div>
        <div className="text-field-container">
        <TextField size="small" helperText={passwordR} error={passwordError} value={password} onChange={(e)=>{setPassword(e.target.value)}} label="Enter password"  type={showPassword?"text":"password"} />
        {showPassword?<VisibilityOff className='showPassword' onClick={()=>{setShowPassword(false)}} />:<Visibility className='showPassword' onClick={()=>{setShowPassword(true)}} />}
        </div>
        <div className="text-field-container">
        <TextField size="small" helperText={confirmPasswordR} error={confirmPasswordError} value={confirmPassword} onChange={(e)=>{setConfirmPassword(e.target.value)}} label="Confirm password" type={showConfirmPassword?"text":"password"} />
        {showConfirmPassword?<VisibilityOff className='showPassword' onClick={()=>{setShowConfirmPassword(false)}} />:<Visibility className='showPassword' onClick={()=>{setShowConfirmPassword(true)}} />}
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