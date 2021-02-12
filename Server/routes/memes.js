const express = require('express');
const mongoose = require('mongoose');
let router = express.Router();
let Meme = require('../models/meme.model')

// function for validation that is there any empty field send by the user or not
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

    console.log(req.body.name);

    if(!isValidContent(req.body)) return res.status(422).send({
        "Message":"Empty field not allowed!"
    })

    Meme.exists({name:req.body.name},function(err,doc){
        if(err) return console.log(err);
        else
            if(doc) return res.status(409).send({
                "Message":"Name already used!"
            })
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
                });
        })
}) // end router.POST

router.get('/:id',(req,res)=>{

    Meme.find({_id:req.params.id})
        .then(content => {
            if(content.length === 0) {
                console.log(content);
                return res.status(404).send({
                    "message":"No content of this ID!"
                });
            }
            res.send({
                id: content[0].id,
                name: content[0].name,
                url: content[0].url,
                caption: content[0].caption
            })
        })
        .catch(err => res.status(500).send(err));

}) // end router.get('/:id')

router.patch('/:id',(req,res)=>{

    Meme.findByIdAndUpdate(req.params.id,req.body,
        function(err,docs){
            if(err) res.status(404).send({"Message":"Content not found!"});
            else {
                    res.status(200).send({
                        "Message":"Content Updated!"
                    })
                    console.log(docs);
            }
        })
}) // rotuter.Patch()


module.exports = router;