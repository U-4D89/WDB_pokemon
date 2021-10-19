// evento del boton [✓]
// al dar click al boton 'set display to flex or block' by default None [✓]
// traer el nombre del pokemon [✓]
// establecer conexion con el api de pokemon [✓]
// traer imagen del pokemon [✓]
// peso y altura [✓]
// abilities


//by default dont show the field for pokemon 
document.getElementById('info').style.display = 'none';
const searchBtn = document.querySelector('#search');

function capitalize(str) {
    const str2 = str.charAt(0).toUpperCase() + str.slice(1);
    return str2
}

function callAPI(pokemon) {
    axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemon}`)
     .then(response => {
         console.log(response);
         organiseData(response);
     })
}


function organiseData(pokeInfo) {
    document.getElementById('info').style.display = 'flex';

    //name 
    let name = pokeInfo.data.name;
    let nameField = document.querySelector('#name');
    let nameCapitalized = capitalize(name);
    nameField.textContent = nameCapitalized;
  

    //pic 
    let pic = document.querySelector('#pic');
    let img = document.createElement('IMG');
    img.src = pokeInfo.data.sprites.front_default;
    pic.appendChild(img);


    //weight 
    let weight = pokeInfo.data.weight;
    let weightField = document.querySelector('#weight');
    weightField.textContent = weight;


    //height
    let height = pokeInfo.data.height;
    let heightField = document.querySelector('#height');
    heightField.textContent = height;



    //abilities
}



searchBtn.addEventListener('click', function() {
    // document.body.innerHTML = ""; 
    //alert('Diste click!');
    let pokeName = document.querySelector('#pokeName').value;
    //alert(`Buscando a  ${pokeName}`);
    if (pokeName.length === 0 || pokeName === undefined || pokeName === null){
        alert('no pokemon to search')
    }else{
        callAPI(pokeName);
    }
})