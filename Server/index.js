const express = require('express');

const ip = require('ip');
const ipAddress = ip.address();

const cors = require('cors');
const mongoose = require('mongoose');
const memes = require('./routes/memes');

require('dotenv').config();

const app = express();

app.use(cors()); 
app.use(express.json())
app.use('/memes',memes);

// const uri = process.env.ATLAS_URI;
const uri = 'mongodb://localhost:27017/memes'
mongoose.connect(uri,{useNewUrlParser:true,useCreateIndex:true,useUnifiedTopology:true,useFindAndModify:false})
const connection = mongoose.connection;
connection.once('open',()=>{
    console.log("MongoDB database connection established successfully!")
})

app.listen(5000,()=>{
    console.log('Listening on https://localhost:5000/memes');
    console.log(`Network access via: ${ipAddress}!`);
})