const API_URL_RANDOM = 'https://api.thecatapi.com/v1/images/search?limit=2';
const API_URL_FAVOTITES = 'https://api.thecatapi.com/v1/favourites';
const API_URL_FAVOTITES_DELETE = (id) => `https://api.thecatapi.com/v1/favourites/${id}?api_key=75598d5f-19d1-4c23-b064-b76ce65b39b5`;
const API_URL_UPLOAD = 'https://api.thecatapi.com/v1/images/upload'; 



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
    const btn1 = document.getElementById('btn1');
    const btn2 = document.getElementById('btn2');

    img1.src = data[0].url;
    img2.src = data[1].url;

    btn1.onclick = () => saveFavouriteMichi(data[0].id);
    btn2.onclick = () => saveFavouriteMichi(data[1].id);
  }
}

async function loadFavouriteMichis() {
  const res = await fetch(API_URL_FAVOTITES, {
    method: 'GET',
    headers: {
      'X-API-KEY': '75598d5f-19d1-4c23-b064-b76ce65b39b5',
    }
  });
  const data = await res.json();
  console.log('Favoritos')
  console.log(data)

  if (res.status !== 200) {
    spanError.innerHTML = "Hubo un error: " + res.status + data.message;
  } else {
    const section = document.getElementById('favoriteMichis')
    section.innerHTML = "";
    
    const h2 = document.createElement('h2');
    const h2Text = document.createTextNode('Michis favoritos');
    h2.appendChild(h2Text);
    section.appendChild(h2);

    data.forEach(michi => {
      
      const article = document.createElement('article');
      const img = document.createElement('img');
      const btn = document.createElement('button');
      const btnText = document.createTextNode('Sacar al michi de favoritos');

      img.src = michi.image.url;
      img.width = 150;
      btn.appendChild(btnText);
      btn.onclick = () => deleteFavouriteMichi(michi.id);
      article.appendChild(img);
      article.appendChild(btn);
      section.appendChild(article);
    });
  }
}

async function saveFavouriteMichi(id) {
  const res = await fetch(API_URL_FAVOTITES, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-API-KEY': '75598d5f-19d1-4c23-b064-b76ce65b39b5',
    },
    body: JSON.stringify({
      
      image_id: id
    }),
  });
  const data = await res.json();
  console.log('Save')
  console.log(res)
  if (res.status !== 200) {
    spanError.innerHTML = "Hubo un error: " + res.status + data.message;
  } else {
    console.log('Michi guadado en favoitos')
    loadFavouriteMichis();
  }
}

async function deleteFavouriteMichi(id) {
  const res = await fetch(API_URL_FAVOTITES_DELETE(id), {
    method: 'DELETE',
    headers: {
      'X-API-KEY': '75598d5f-19d1-4c23-b064-b76ce65b39b5',
    }
  });
  const data = await res.json();
  
  if (res.status !== 200) {
    spanError.innerHTML = "Hubo un error: " + res.status + data.message;
  } else {
    console.log('michi eliminado de favoritos')
    loadFavouriteMichis();
  }
}

async function uploadMichiPhoto() { /* pari no me funcionaba el boton de subir michi poe q no coloque los () */
  const form = document.getElementById('uploadingForm')
  const formData = new FormData(form);

  console.log(formData.get('file')) 
  
  const res = await fetch(API_URL_UPLOAD, {
    method: 'POST',
    headers:{
      /*'Content-Type': 'Multipart/form-data',*/
      'X-API-KEY': '75598d5f-19d1-4c23-b064-b76ce65b39b5',
    },
    body: formData,
  })

}


loadRandomMichis();
loadFavouriteMichis();