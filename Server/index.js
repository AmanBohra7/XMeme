const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors()); 
app.use(express.json())

app.listen(5000,()=>{
    console.log('Listening on https://localhost:5000')
})

app.get('/',(req,res)=>{
    res.json({
        message:'You are HERE!👋'
    })
})

function isValidContent(memecontent){
    return memecontent.name && memecontent.name.toString().trim() !== ''
}

app.post('/xmeme',(req,res)=>{
    if(isValidContent(req.body)){
        console.log(req.body)
        res.json({
            message:'You data is recieved!!!! :happy'
        })
    }else{
        res.status(422);
        res.json({
            message:'MEME is bad!! I think! :HEHE'
        })
    }
})

