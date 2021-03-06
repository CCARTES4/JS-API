const divResultado = document.querySelector('#resultado');
const formulario = document.querySelector('#formulario');
const criptoMonedaInput = document.querySelector('#criptomonedas')
const moneda = document.querySelector('#moneda')

window.onload = () => {
    criptoMonedaPopular();
    formulario.addEventListener('submit', validacion);
} 

async function criptoMonedaPopular() {

    const appID = '67fde0671b17be1ac9f0f86c5b9dd7d9fab1cf81f0b13c2036a5cad982f9fdb2';
    
    const url = `https://min-api.cryptocompare.com/data/top/totalvolfull?limit=10&tsym=USD&api_key=${appID}`;

    try {
        const resultado = await fetch(url);
        const respuesta = await resultado.json();
        const criptomoneda = llenarCriptomoneda(respuesta.Data);
    } catch (error) {
        console.log(error);
    }
}

function llenarCriptomoneda(criptomoneda) {
    
    criptomoneda.forEach( cripto => {
        const {FullName, Name} = cripto.CoinInfo;
        let opcion = document.createElement('option');
        opcion.textContent = FullName;
        opcion.value = Name;

        criptoMonedaInput.appendChild(opcion)
    })
}

function mostrarAlerta(mensaje) {
    const divAlerta = document.createElement('div')
    divAlerta.innerText = mensaje
    divAlerta.classList.add();
    divResultado.appendChild(divAlerta);

    setTimeout(() => {
        divAlerta.remove();
    }, 5000);

}

function validacion(e) {
    e.preventDefault();
    
    if (moneda.value === '' || criptoMonedaInput.value === '') {
        mostrarAlerta('Ambos campos son obligatorios');
        return;
    }

    convertirCrypto(moneda.value, criptoMonedaInput.value);
}


async function convertirCrypto(moneda, criptomoneda) {

    const appID = '67fde0671b17be1ac9f0f86c5b9dd7d9fab1cf81f0b13c2036a5cad982f9fdb2'

    const url = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${criptomoneda}&tsyms=${moneda}&api_key=${appID}`


    try {
        const respuesta = await fetch(url);
        const resultado = await respuesta.json();
        const datos = mostrarDatos(resultado.DISPLAY[criptomoneda][moneda]);
    } catch (error) {
        console.log(error);
    }

}

function mostrarDatos(datos) {
    const { HIGH24HOUR, LOW24HOUR, PRICE, LASTUPDATE  } = datos;

    divResultado.innerHTML =
        `<div class="spinner">
            <div class="bounce1"></div>
            <div class="bounce2"></div>
            <div class="bounce3"></div>
        </div> `

    setTimeout(() => {
        
        divResultado.innerHTML = `
        <div> 
            <h4> Valor actual: <span class="strong">  ${PRICE} </span> </h4>
            <p> Precio m??s alto ??ltimas 24Hrs: <span class="strong">  ${HIGH24HOUR} </span> </p>
            <p> Precio m??s bajo ??ltimas 24Hrs: <span class="strong">  ${LOW24HOUR} </span> </p>
            <p> ??ltima actualizaci??n: <span class="strong">  ${LASTUPDATE} </span> </p>
        </div>
        `;

    }, 2000);

    
}