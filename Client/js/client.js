console.log("Hello Memer!!!....")
const API_URL = 'http://localhost:5000/memes';
const form = document.getElementById('memeform');
const getform = document.getElementById('getform');
const editform = document.getElementById('editform');
const memeCollection = document.getElementById("meme-collection");

getAllXMemes();


let memesRecieved = new Array();

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
        .then(res => res.json())
        .then(res => {
            console.log(res);
            form.reset();
            getAllXMemes();
        })
        .catch(err => console.log(err))
})

getform.addEventListener('submit' , (event) => {
    event.preventDefault();
    const getFormData = new FormData(getform);
    const userid = getFormData.get('userid');
    getMemeByID(userid);
    getform.reset();
})


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
    const newname = editFormData.get('newname');
    const newcaption = editFormData.get('newcaption');
    const changeinData = {
        name: newname,
        caption: newcaption
    }
    changeMemeData(changeinData,userid);
    editform.reset();
    memeCollection.innerHTML = '';
    createOutputDiv("Updated!");
})

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
    image.src ="https://i.pinimg.com/564x/b6/c0/2a/b6c02a4ad5b3538c4efb6aa194b432a8.jpg";
    memei.appendChild(image);

    memei.appendChild(document.createElement("hr"))

    memeCollection.appendChild(memei);   
}

function createOutputDiv(output){
    var memei = document.createElement("div");
    var header = document.createElement("h4");
    header.innerHTML = output;
    memei.appendChild(header);
    memeCollection.appendChild(memei);
}

function getAllXMemes(){
    memeCollection.innerHTML = '';
    fetch(API_URL)
        .then(res => res.json())
        .then(memes => {
            // console.log(memes);
            memes.map( (meme) => {
                createMemeDiv(meme);
            } )
        })
        .catch(err => console.log(err))
}

function getMemeByID(id){
    memeCollection.innerHTML = '';
    fetch(API_URL+"/"+id)
        .then(res => res.json())
        .then(ret_meme => {
            if(Object.keys(ret_meme).length)
                createMemeDiv(ret_meme);
            else
                createOutputDiv("Undefined!");
        })
        .catch(err => console.log(err));
}


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