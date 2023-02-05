const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors');
const url = "mongodb://127.0.0.1:27017/";
const database = 'vivek';
const app = express();
app.use(express.json());
app.use(cors());
mongoose.set("strictQuery", false);

mongoose.connect(url+database);

const userSchema = new mongoose.Schema({
    name:String,
    email:String,
    password:String
})

const User = mongoose.model('users',userSchema);


app.post('/signup', async(req,res)=>{
    let user = new User(req.body);
    await user.save();
    user = user.toObject();
    delete user.password
    res.send(user);
})

app.post('/login',async(req,res)=>{
    let data =await User.findOne(req.body);
    if(data){
    data = data.toObject();
    delete data.password
    res.send(data);}
    else{
        res.send(false)
    }
})

app.listen(5000)



