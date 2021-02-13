const express = require('express');
const swaggerUI = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');
const cors = require('cors');
const mongoose = require('mongoose');
const memes = require('./routes/memes');

require('dotenv').config();

const app = express();
const swaggerApp = express();

swaggerApp.use(cors());
app.use(cors()); 
app.use(express.json())
app.use('/memes',memes);

// const uri = process.env.ATLAS_URI;
let uri;
if(process.env.NODE_ENV === "development")
    uri = 'mongodb://localhost:27017/memes'
else
    uri = process.env.ATLAS_URI ;

mongoose.connect(uri,{useNewUrlParser:true,useCreateIndex:true,useUnifiedTopology:true,useFindAndModify:false})
const connection = mongoose.connection;
connection.once('open',()=>{
    console.log("MongoDB database connection established successfully!")
})

app.listen(8081,()=>{
    console.log('Listening on https://localhost:8081/memes');
})

swaggerApp.use('/swagger-ui', swaggerUI.serve, swaggerUI.setup(swaggerDocument));

swaggerApp.listen(8080,()=>{
    console.log('Listening on https://server_ip:8080/swagger-ui');
})
