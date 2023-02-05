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
    const data = new User(req.body);
    await data.save();
    res.send(data)
})

app.listen(5000)



