console.log("Hello Memer!!!....")

const form = document.querySelector('form');

form.addEventListener('submit' , (event) => {
    event.preventDefault();
    const formData = new FormData(form);
    const name = formData.get('name');
    const caption = formData.get('caption');
    const url = formData.get('memeurl');
    const xmeme = {
        name,
        url,
        caption
    };
    // console.log(xmeme);

    fetch('http://localhost:5000/memes', {
        method: 'POST',
        body: JSON.stringify(xmeme) ,
        headers: {
            'Content-Type': 'application/json'
        }
    } )
        .then(res => res.json())
        .then(res => console.log(res))
        .catch(err => console.log(err))

    //getAllXMemes();
} )

getAllXMemes();
function getAllXMemes(){
    fetch('http://localhost:5000/memes/1000')
        .then(res => res.json())
        .then(meme => console.log(meme))
        .catch(err => console.log(err))
}
