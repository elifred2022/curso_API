
const API_URL_RANDOM = 'https://api.thecatapi.com/v1/images/search?limit=2&api_key=75598d5f-19d1-4c23-b064-b76ce65b39b5';  //aca usamos querys "?limit=3 q significa maximo de imagenes 3
const API_URL_FAVORITES = 'https://api.thecatapi.com/v1/favourites?limit=2&api_key=75598d5f-19d1-4c23-b064-b76ce65b39b5';

const spanError = document.getElementById('error')

async function loadRandomMichis() {
  const res = await fetch(API_URL_RANDOM); /* NO ES NECESARIOS METODOS POR QUE fetch es un GET POR DEFECTO*/
  const data = await res.json();
  console.log('Random')
  console.log(data)

  if (res.status !== 200) {
    spanError.innerHTML = "Hubo un error: " + res.status;
  } else {

    const img1 = document.getElementById('img1');
    const img2 = document.getElementById('img2');
    const btn1 = document.getElementById('btn1');
    const btn2 = document.getElementById('btn2');
      
    img1.src = data[0].url;
    img2.src = data[1].url;

    btn1.onclick = () => saveFavouriteMichis(data[0].id); //arrow function => sirve para q se ejecute cuando se de clik o se ejecute cuando uno le de
    btn2.onclick = () => saveFavouriteMichis(data[1].id);
  }
  
  
}


async function loadFavoritesMichis() {
    const res = await fetch(API_URL_FAVORITES);
    const data = await res.json();
    console.log('Favoritos')
    console.log(data)
    
    if (res.status !== 200) {
        spanError.innerHTML = "Hubo un error: " + res.status + data.message;
      } else {
        data.forEach(michi => {
          const section = document.getElementById('favoritesMichis');
          const article = document.createElement('article');
          const img = document.createElement('img');
          const btn = document.createElement('button');
          const btnText = document.createTextNode('Sacar al michi de favoritos');

          
          img.src = michi.image.url;
          img.width = 150;
          btn.appendChild(btnText);
          article.appendChild(img);
          article.appendChild(btn);
          section.appendChild(article);


        });
      }
    
  }

  async function saveFavouriteMichis(id) {
    const res = await fetch(API_URL_FAVORITES, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        image_id: id
      }), 
    });
    const data = await res.json();

    console.log('save')
    console.log(res)

    if (res.status !== 200){
      spanError.innerHTML = "Hubo un error: " + res.status + data.message;
    }
  }

loadRandomMichis();
loadFavoritesMichis();

