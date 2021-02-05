console.log("Hello Memer!!!....")
const API_URL = 'http://localhost:5000/memes';
const form = document.querySelector('form');
const memeCollection = document.getElementById("meme-collection");

document.getElementById("get-memes").addEventListener("click",function(){
    getAllXMemes();
})

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


function getAllXMemes(){
    memeCollection.innerHTML = '';
    fetch(API_URL)
        .then(res => res.json())
        .then(memes => {
            // console.log(memes);
            memes.map( (meme) => {
                var memei = document.createElement("div");
                memei.className = "memei";

                var header = document.createElement("h4");
                header.innerHTML = meme.name;
                memei.appendChild(header);

                var para = document.createElement("p");
                para.innerHTML = meme.caption;
                memei.appendChild(para);

                var image = document.createElement("img");
                image.src ="https://i.pinimg.com/564x/b6/c0/2a/b6c02a4ad5b3538c4efb6aa194b432a8.jpg";
                memei.appendChild(image);

                memei.appendChild(document.createElement("hr"))

                memeCollection.appendChild(memei);

            } )
        })
        .catch(err => console.log(err))
}
