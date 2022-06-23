const API_URL_random = 'https://api.thecatapi.com/v1/images/search?limit=2&api_key=75598d5f-19d1-4c23-b064-b76ce65b39b5'; 
const API_URL_favorites = 'https://api.thecatapi.com/v1/images/search?limit=2&api_key=75598d5f-19d1-4c23-b064-b76ce65b39b5';

const spanError = document.getElementById("error");


    async function loadRandomMichis() { // funcion del boton onclick
        const res = await fetch(API_URL_random);
        const data = await res.json();
            console.log("random")
            console.log(data)
            
            if (res.status !== 200){
                spanError.innerHTML = "Hubo un error: " + res.status;
            } else {
                const img1 = document.getElementById("img1");
                const img2 = document.getElementById("img2");
                
                img1.src = data[0].url;
                img2.src = data[1].url;
            }

            
            

        }

        async function loadFavoriteMichis() { // funcion del boton onclick
            const res = await fetch(API_URL_favorites);
            const data = await res.json();

                console.log("favoritos")
                console.log(data)
                /*const img1 = document.getElementById("img1");
                const img2 = document.getElementById("img2"); 
                
                
                img1.src = data[0].url;
                img2.src = data[1].url; */
            if (res.status !== 200) {
                spanError.innerHTML = "Hubo un error: " + res.status + data.
                Message;
            }
    
            }

        async function saveFavoriteMichis() {
            const res = await fetch(API_URL_favorites, { //metodo POST
                method: 'POST',
                headers:{
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify ({
                    image_id: 'MTUzNjQwNw'
                }),
            });

            const data = await res.json();

            console.log('save')
            console.log(res)

            if (res.status !== 200) {
                spanError.innerHTML = "Hubo un error: " + res.status + data.
                Message;
            }
        }

        loadRandomMichis(); //para q se cargue la imagen de una vez al abrir
        loadFavoriteMichis();