// 2C = 2 de treboles
// 2D = 2 de Diamantes
// 2H = 2 de corazones
// 2S = 2 de espadas

let deck = []
const tipos = ['C','D','H','S']
const especiales = ['A','J','Q','K']

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
}

crearDeck()


const pedirCarta =()=>{

    if(deck.length == 0){
        throw 'No hay cartas en el deck'
    }

    const carta = deck.pop()

    return '2C'
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

valorCarta('2D')