// 2C = 2 de treboles
// 2D = 2 de Diamantes
// 2H = 2 de corazones
// 2S = 2 de espadas

let deck = []
const tipos = ['C','D','H','S']
const especiales = ['A','J','Q','K']
let puntosJugador=0
let puntosPC=0
//referencias HTML
const btnPedir =document.querySelector('#btnPedir')
const btnDetener =document.querySelector('#btnDetener')
const btnNuevo =document.querySelector('#btnNuevo')
const puntosHTML =  document.querySelectorAll('small')
const divCartasJugador = document.querySelector('#jugador-cartas')
const divCartasPC = document.querySelector('#computadora-cartas')

const crearDeck =()=>{

    for (let i = 2; i < 10; i++) {

        for (const tipo of tipos) {
            deck.push(i + tipo)
        }    
    }

    for (const tipo of tipos) {
        for (const esp of especiales) {
            deck.push(esp + tipo)
        }
    }

  
    deck = _.shuffle(deck)
    console.log(deck);
    return deck;
}

crearDeck()


const pedirCarta =()=>{

    if(deck.length == 0){
        throw 'No hay cartas en el deck'
    }

    const carta = deck.pop()

    return carta
}

// pedirCarta()
const valorCarta=(carta)=>{

    const valor = carta.substring(0 , carta.length - 1)

    return (isNaN(valor))?
            (valor === 'A')?11:10
            : valor * 1;
    // let puntos = 0
    // if(isNaN(valor)){

    //     puntos = (valor === 'A')?11:10
    // }else{
    //     puntos = Number(valor)
    // }


}

//turno PC
const turnoPC =(puntosMinimos)=>{

    do {
        const carta= pedirCarta()
   
        puntosPC = puntosPC + valorCarta(carta)
        puntosHTML[1].innerHTML=puntosPC

        const imgCarta = document.createElement('img')
        imgCarta.src = `assets/cartas/${carta}.png`
        imgCarta.classList.add('cartas')
        divCartasPC.append(imgCarta)

        if(puntosMinimos > 21){
            break;
        }

    } while ((puntosPC < puntosMinimos)&& (puntosMinimos <=21));

    setTimeout(() => {
        if(puntosPC == puntosMinimos){
            alert('Nadie gana')
    
        }else if(puntosMinimos>21){
            alert('Computadora gana')
        }else if(puntosPC>21){
            alert('Jugador gana')
        }else{
            alert('Computadora gana')
        }
    
    }, 100);


   
}


// valorCarta('2D')

// Eventos
btnPedir.addEventListener('click',()=> {
    const carta= pedirCarta()
   
    puntosJugador = puntosJugador + valorCarta(carta)
    puntosHTML[0].innerHTML=puntosJugador

    const imgCarta = document.createElement('img')
    imgCarta.src = `assets/cartas/${carta}.png`
    imgCarta.classList.add('cartas')
    divCartasJugador.append(imgCarta)


    if(puntosJugador>21){
        console.warn('Perdiste');
        btnPedir.disabled= true
        btnDetener.disabled= true
        turnoPC(puntosJugador)
    }else if(puntosJugador === 21){
        console.warn('21, puntaje perfecto');
        btnPedir.disabled= true
        btnDetener.disabled= true
        turnoPC(puntosJugador)

    }
})

btnDetener.addEventListener('click',()=> {

    btnDetener.disabled= true
    btnPedir.disabled= true
    turnoPC(puntosJugador)
})

btnNuevo.addEventListener('click',()=> {
    deck=[]
    deck=crearDeck()
    puntosJugador=0
    puntosPC=0
    puntosHTML[0].innerText=0
    puntosHTML[1].innerText=0
    divCartasJugador.innerHTML=''
    divCartasPC.innerHTML=''
    btnDetener.disabled= false
    btnPedir.disabled= false
    console.clear()
   
})