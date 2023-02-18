import { TextField, Container, Button, Snackbar, Alert } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Delete, Edit } from "@mui/icons-material";
import { useState } from "react";
import Footer from "./Footer";

const Profile = () => {

    const [open, setOpen] = useState(false);
    const user = JSON.parse(localStorage.getItem('user'));
    const name = user.name;
    const email = user.email;
    const id = user._id;
    const navigate = useNavigate();

    const deleteUser = async() => {
        const result = await fetch(`http://localhost:5000/delete/${id}`,{
            method:'delete',
            headers:{
                'Content-Type':'application/json',
            authorization : JSON.parse(localStorage.getItem('token'))
        }
        });
         await fetch(`http://localhost:5000/deleteProducts/${id}`,{
          method : 'delete',
          headers:{
              'Content-Type':'application/json',
          authorization : JSON.parse(localStorage.getItem('token'))
      }
        })
        await fetch(`http://localhost:5000/wishlists/${id}`,{
          method : 'delete',
          headers:{
              'Content-Type':'application/json',
          authorization : JSON.parse(localStorage.getItem('token'))
      }
    })

    if(result){
        setOpen(true);
    }   else{
        console.log("Error")
    }}

    const handleClose = () =>{
        setOpen(false);
        localStorage.clear();
        navigate('/signup');
    }

    let vertical = 'top';
    let horizontal = 'right';

    const editDetails = () => {
        navigate('/editProfile')
    }

    return(
        <>
        <div className='Login-container'>
            <h1>Profile</h1>
          <Container fixed variant="outlined" id="Login-main-container">
            <div className="main-container">
            <div className="text-field-container">
            <TextField  color="error" size="small" value={name}  label="Name" />
            </div>
            <div className="text-field-container">
            <TextField color="error" size="small"value={email}   label="E-mail" type="email" />
            </div>
            <div className="text-btn-container">
              <Button startIcon={<Edit />} onClick={editDetails} variant="contained" color="success" size="small">
                Edit Profile
              </Button>
            </div>
            </div>
          </Container>
        </div>
            <div className="text-deleteBtn-container">
              <Button startIcon={<Delete />} variant="contained" onClick={deleteUser} color="error" size="small">
                Delete Profile
              </Button>
            </div>
       
        <Snackbar anchorOrigin={{ vertical, horizontal }} open={open} autoHideDuration={1500} onClose={handleClose}>
        <Alert onClose={handleClose} severity="error" >
          Profile deleted successfully
        </Alert>
      </Snackbar>
  
        <Footer />
        </>
    )
}

export default Profile