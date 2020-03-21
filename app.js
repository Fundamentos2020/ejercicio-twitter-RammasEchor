//Varaibles
const lista_tweets = document.getElementById('lista_tweets');

//Funciones
eventListeners();

function eventListeners()   {
    document.querySelector('#boton_agregar').addEventListener('click', agregarTweet );
    lista_tweets.addEventListener('click', borrarTweet );
    document.addEventListener('DOMContentLoaded', localStorageListo );
}

//Agrega un tweet a la lista
function agregarTweet( e )  {
    e.preventDefault();
    //Valor del texto.
    const caja_texto = document.querySelector('#tweet');
    const tweet = caja_texto.value ;
    caja_texto.value = '';

    //Tarjeta de tweet
    const div = document.createElement('div');
    div.className = 'flex-row bt p-3' ;

    //Elementos dentro del div
    const div_img = document.createElement('div');
    div_img.className = 'col-2' ;
    const img = document.createElement('img');
    img.src = 'https://picsum.photos/200' ;
    img.className = 'img-fluid' ;

    div_img.appendChild( img );

    const div_texto = document.createElement('div');
    div_texto.className = 'p-1 col-9 word-break' ;
    div_texto.id = 'div_texto' ;
    div_texto.innerText = tweet ;

    const div_boton = document.createElement('div');
    div_boton.className = 'align-right' ;
    const boton_eliminar = document.createElement('button');
    boton_eliminar.className = 'boton-eliminar flex-all-center' ;
    boton_eliminar.innerText = 'X' ;
    boton_eliminar.id = 'boton_eliminar' ,

    div_boton.appendChild( boton_eliminar );

    div.appendChild( div_img );
    div.appendChild( div_texto );
    div.appendChild( div_boton );

    lista_tweets.appendChild( div );

    agregarTweetLocalStorage( tweet );
}

//Elimina un tweet de la lista
function borrarTweet( e )  {
    e.preventDefault();

    if( e.target.id == 'boton_eliminar' )   {
        borrarTweetLocalStorage( e.target.parentElement.parentElement.children[1].innerText );
        e.target.parentElement.parentElement.remove();
    }
}

//Agregar a local storage
function agregarTweetLocalStorage( tweet )  {
    let tweets ;
    tweets = obtenerTweetsLocalStorage();
    tweets.push( tweet );
    localStorage.setItem( 'tweets', JSON.stringify( tweets ) );
}

//Obtener tweets disponibles
function obtenerTweetsLocalStorage()    {
    let tweets ;
    if( localStorage.getItem( 'tweets' ) === null )   {
        tweets = [];
    }
    else    {
        tweets = JSON.parse( localStorage.getItem( 'tweets' ) );
    }

    return( tweets );
}

function localStorageListo()    {
    let tweets ;
    tweets = obtenerTweetsLocalStorage();

    tweets.forEach( function( tweet )   {
        //Tarjeta de tweet
        const div = document.createElement('div');
        div.className = 'flex-row bt p-3' ;

        //Elementos dentro del div
        const div_img = document.createElement('div');
        div_img.className = 'col-2' ;
        const img = document.createElement('img');
        img.src = 'https://picsum.photos/200' ;
        img.className = 'img-fluid' ;

        div_img.appendChild( img );

        const div_texto = document.createElement('div');
        div_texto.className = 'p-1 col-9 word-break' ;
        div_texto.innerText = tweet ;

        const div_boton = document.createElement('div');
        div_boton.className = 'align-right' ;
        const boton_eliminar = document.createElement('button');
        boton_eliminar.className = 'boton-eliminar flex-all-center' ;
        boton_eliminar.innerText = 'X' ;
        boton_eliminar.id = 'boton_eliminar' ,

        div_boton.appendChild( boton_eliminar );

        div.appendChild( div_img );
        div.appendChild( div_texto );
        div.appendChild( div_boton );

        lista_tweets.appendChild( div );
    } );
}

function borrarTweetLocalStorage( tweet )   {
    let tweets ; 
    tweets = obtenerTweetsLocalStorage();
    tweets.forEach( function( tweetArr, index )    {
        if( tweetArr === tweet )    {
            tweets.splice( index, 1 );
        }
    } );

    localStorage.setItem( 'tweets', JSON.stringify( tweets ) );
}