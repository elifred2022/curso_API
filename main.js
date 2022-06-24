
const API_URL_RANDOM = 'https://api.thecatapi.com/v1/images/search?limit=2&api_key=75598d5f-19d1-4c23-b064-b76ce65b39b5';  //aca usamos querys "?limit=3 q significa maximo de imagenes 3
const API_URL_FAVORITES = 'https://api.thecatapi.com/v1/favourites?limit=2&api_key=75598d5f-19d1-4c23-b064-b76ce65b39b5';

const spanError = document.getElementById('error')

async function loadRandomMichis() {
  const res = await fetch(API_URL_RANDOM);
  const data = await res.json();
  console.log('Random')
  console.log(data)

  if (res.status !== 200) {
    spanError.innerHTML = "Hubo un error: " + res.status;
  } else {
    const img1 = document.getElementById('img1');
    const img2 = document.getElementById('img2');
      
    img1.src = data[0].url;
    img2.src = data[1].url;
  }
  
  
}


async function loadFavoritesMichis() {
    const res = await fetch(API_URL_FAVORITES);
    const data = await res.json();
    console.log('Favoritos')
    console.log(data)
    
    if (res.status !== 200) {
        spanError.innerHTML = "Hubo un error: " + res.status + data.message;
      } 
    
  }

loadRandomMichis();
loadFavoritesMichis();

