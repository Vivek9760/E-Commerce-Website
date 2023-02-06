import { TextField, Container, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Footer from "./Footer";

const Profile = () => {

    const user = JSON.parse(localStorage.getItem('user'));
    const name = user.name;
    const email = user.email;
    const id = user._id;
    const navigate = useNavigate();

    const deleteUser = () => {
        const result = fetch(`http://localhost:5000/delete/${id}`,{
            method:'delete'
        });

    if(result){
        localStorage.clear();
        navigate('/signup');
    }   else{
        console.log("Error")
    }

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
              <Button variant="contained" onClick={deleteUser} color="error" size="small">
                Delete Profile
              </Button>
            </div>
            </div>
          </Container>
        </div>
        <Footer />
        </>
    )
}

export default Profile