const mongoose = require('mongoose');

mongoose.set("strictQuery", false);

const url = "mongodb://127.0.0.1:27017/";
const database = 'vivek';

mongoose.connect(url+database);