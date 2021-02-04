const express = require('express');
const cors = require('cors');

const app = express();

var id = 1;

app.use(cors()); 
app.use(express.json())

app.listen(5000,()=>{
    console.log('Listening on https://localhost:5000/memes')
})

app.get('/memes',(req,res)=>{
    res.json({
        message:'Currently no DATABASE!'
    })
})

app.get('/memes/:id',(req,res)=>{
    res.json({
        id_called: req.params.id
    })
})

function isValidContent(memecontent){
    return memecontent.name && memecontent.name.toString().trim() !== ''
        && memecontent.url && memecontent.url.toString().trim() !== ''
        && memecontent.caption && memecontent.caption.toString().trim() !== ''
}

app.post('/memes',(req,res)=>{
    if(isValidContent(req.body)){
        console.log(req.body)
        res.json({
            id : id
        })
        ++id;
    }else{
        res.status(422);
        res.json({
            message:'MEME is bad!! I think! :HEHE'
        })
    }
})

