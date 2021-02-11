const express = require('express');
const mongoose = require('mongoose');
let router = express.Router();
let Meme = require('../models/meme.model')

function isValidContent(memecontent){
    return memecontent.name && memecontent.name.toString().trim() !== ''
        && memecontent.url && memecontent.url.toString().trim() !== ''
        && memecontent.caption && memecontent.caption.toString().trim() !== ''
}


router.get('/',(req,res)=>{
        Meme.find().limit(100)
        .then(memes => {
            let newObject = new Array();
            memes.map( (m) => {
                let data = {
                    id: m._id,
                    name: m.name,
                    url: m.url,
                    caption: m.caption
                }
                newObject.push(data);
            } )
            newObject.reverse();
            // console.log(newObject);
            res.status(200).json(newObject);
        })
        .catch(err => res.status(422).send(err))
    })
    
router.post('/',(req,res)=>{
        const xmeme = new Meme({
            _id: new mongoose.Types.ObjectId(),
            name: req.body.name,
            url: req.body.url,
            caption: req.body.caption
        })
        xmeme.save()
            .then( result => {
                // console.log(result);
                res.json({
                    id: xmeme._id
                })
            } )
            .catch( err => {
                console.log(err);
                res.status(400).send({
                    err: err
                })
            } );
       
    })

router.get('/:id',(req,res)=>{
    Meme.find({_id:req.params.id})
        .then(content => {
            res.send({
                id: content[0].id,
                name: content[0].name,
                url: content[0].url,
                caption: content[0].caption
            })
        })
        .catch(err => res.status(404).send(err));
})

router.patch('/:id',(req,res)=>{
    Meme.findByIdAndUpdate(req.params.id,req.body,
        function(err,docs){
            if(err) res.status(404);
            else {
                if(docs === null)  res.status(404).send();
                else{
                    res.status(200).send(docs);
                    console.log(docs)
                }
            }
        })

})


module.exports = router;