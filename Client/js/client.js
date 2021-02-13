console.log("Hello Memer!!!....")

// craeting required variables 
const API_URL = 'http://localhost:8081/memes';
const form = document.getElementById('memeform');
const getform = document.getElementById('getform');
const editform = document.getElementById('editform');
const memeCollection = document.getElementById("meme-collection");

// calling function to fetch and display all memes in starting webpage
getAllXMemes();

// event listener for the meme creating form
// also uses fetch POST req at /memes to server which in ret. add meme content in the database
form.addEventListener('submit' , (event) => {
    event.preventDefault();
    const formData = new FormData(form);
    const name = formData.get('name');
    const caption = formData.get('caption');
    const url = formData.get('url');
    const xmeme = {
        name,
        url,
        caption
    };

    fetch(API_URL, {
        method: 'POST',
        body: JSON.stringify(xmeme) ,
        headers: {
            'Content-Type': 'application/json'
        }
    } )
        .then(res => {
            if(res.status == 200) getAllXMemes();
            res.json();
        })
        .then(res => {
            console.log(res);
            form.reset();
        })
        .catch(err => console.log(err))
})

// event listener for getting existing meme by id form
getform.addEventListener('submit' , (event) => {
    event.preventDefault();
    const getFormData = new FormData(getform);
    const userid = getFormData.get('userid');
    getMemeByID(userid);
    getform.reset();
})

//  event listener for updating meme by provided id from 'getform' form
editform.addEventListener('submit' , (event) => {
    event.preventDefault();
    const getFormData = new FormData(getform);
    const userid = getFormData.get('userid');
    if(userid.toString().trim() === ''){
        editform.reset();
        return console.log({
            "message":"User ID required!"
        }) 
    } 
    const editFormData = new FormData(editform);
    const newurl = editFormData.get('newurl');
    const newcaption = editFormData.get('newcaption');
    const changeinData = {
        url: newurl,
        caption: newcaption
    }
    changeMemeData(changeinData,userid);
    editform.reset();
    memeCollection.innerHTML = '';
    createOutputDiv("Updated!");
})

//  function to create child div elements for the main container to display all received memes in a formated way
function createMemeDiv(single_meme){
    var memei = document.createElement("div");
    memei.className = "memei";

    var header = document.createElement("h4");
    header.innerHTML = single_meme.name;
    memei.appendChild(header);

    var para = document.createElement("p");
    para.innerHTML = single_meme.caption;
    memei.appendChild(para);

    var image = document.createElement("img");
    image.src = single_meme.url;
    memei.appendChild(image);

    memei.appendChild(document.createElement("hr"))

    memeCollection.appendChild(memei);   
}

// function to create different div elemetns other then memes for showing Undefiend and Udpated messages
function createOutputDiv(output){
    var memei = document.createElement("div");
    var header = document.createElement("h4");
    header.innerHTML = output;
    memei.appendChild(header);
    memeCollection.appendChild(memei);
}

//  function uses fetch GET req at /memes function to receive all memes from the server (limit 100 set at server end!)
function getAllXMemes(){
    memeCollection.innerHTML = '';
    fetch(API_URL)
        .then(res => res.json())
        .then(memes => {
            console.log(memes);
            memes.map( (meme) => {
                createMemeDiv(meme);
            } )
        })
        .catch(err => console.log(err))
}

// function uses fetch GET req at /memes/:id for fetching especific meme content with provided ID
function getMemeByID(id){
    memeCollection.innerHTML = '';
    fetch(API_URL+"/"+id)
        .then(res => res.json())
        .then(ret_meme => {
            console.log(ret_meme);
            if(Object.keys(ret_meme).length)
                createMemeDiv(ret_meme);
            else
                createOutputDiv("Undefined!");
        })
        .catch(err => console.log(err));
}

// function uses fetch PATCH req at /memes/:id to update caption/url of provided user ID 
function changeMemeData(changedData,id){
    fetch(API_URL+"/"+id,{
        method: 'PATCH',
        body: JSON.stringify(changedData),
        headers:{"Content-type":"application/json"}
    })
        .then(
            res => res.json()
            )
        .then(res => {console.log(res)})
        .catch(err => console.log(err));
}