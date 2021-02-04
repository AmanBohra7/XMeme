console.log("Hello Memer!!!....")

const form = document.querySelector('form');

form.addEventListener('submit' , (event) => {
    event.preventDefault();
    const formData = new FormData(form);
    const name = formData.get('name');
    const caption = formData.get('caption');
    const memeurl = formData.get('memeurl');
    const xmeme = {
        name,
        caption,
        memeurl
    };
    console.log(xmeme);

    fetch('http://localhost:5000/xmeme', {
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


function getAllXMemes(){
    fetch('http://localhost:5000')
        .then(res => res.json())
        .then(meme => console.log(meme))
        .catch(err => console.log(err))
}
