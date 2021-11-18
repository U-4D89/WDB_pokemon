//https://youtu.be/1iysNUrI3lw


//by default dont show the field for pokemon 

document.getElementById('info').style.display = 'none';

const search = document.getElementById('pokeName');
const matchList = document.getElementById('match-list');

const searchPokemon = async searchText => {

    const response = await fetch('../data/pokemon.json');
    const pokemons = await response.json();

    //console.log(pokemons);

    let matches = pokemons.filter(pokemon => {
        const regex = new RegExp(`^${searchText}`, 'gi');
        return pokemon.name.match(regex) || pokemon.name.match(regex);
    })

    if (searchText.length === 0) { matches = [] };
    //console.log(matches)
    outputHtml(matches);
}

const outputHtml = matches => {
    //console.log(matches)
    if( matches.length >= 0 ) {

        matchList.textContent = '';
        const html =  matches.forEach( match=> {
            let newOption = document.createElement("P");
            newOption.classList.add("option");
            newOption.textContent = match.name;
            //console.log(newOption)
            matchList.appendChild(newOption);

            newOption.addEventListener('click', (event) => {
                const pokemon = newOption.innerText;
                search.value = pokemon;
            } )
            
        });
       
    }
}

search.addEventListener('input', () => searchPokemon(search.value))


function capitalize(str) {
    const str2 = str.charAt(0).toUpperCase() + str.slice(1);
    return str2
};

function callAPI(pokemon) {

    axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemon}`)
        .then(response => {
            try{
                //console.log(response)
                organiseData(response)
            } catch (e) {
              
                console.log("Error,", e)
            }
         
        })
};



function organiseData(pokeInfo) {

    document.querySelector('#pic').innerHTML = '';
    matchList.style.display = 'none';
    document.querySelector('#info').style.display = 'flex';
    
   
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
    let weight = pokeInfo.data.weight / 10;
    let weightField = document.querySelector('#weight');
    weightField.textContent = `${weight} kg`;


    //height
    let height = pokeInfo.data.height * 10;
    let heightField = document.querySelector('#height');
    heightField.textContent = `${height} cm`;



    //type
    let types = pokeInfo.data.types;
    if (types.length > 1) {
        
        //block single type field
        document.querySelector('#type').style.display = 'none';
        document.querySelector('#Type').style.display = 'none';
        //document.querySelector('#pokemon-types').style.display = 'block';
        //document.querySelector('#Pokemon-Types').style.display = 'block';

        let pokemonTypes = document.querySelector('#pokemon-types');

        let firstTypeField = document.createElement("SPAN");
        let firstTypeContent = (`${types[0].type.name}`);
        firstTypeField.textContent= capitalize(`${firstTypeContent}, `);
        pokemonTypes.appendChild(firstTypeField);

        let secondTypeField = document.createElement("SPAN");
        let secondTypeContent = (`${types[1].type.name}`);
        secondTypeField.textContent = capitalize(secondTypeContent);
        pokemonTypes.appendChild(secondTypeField);

      


    } else if ( types.length === 1 ) {

        //block multi types field
        document.querySelector('#pokemon-types').style.display = 'none';
        document.querySelector('#Pokemon-Types').style.display = 'none';
        // document.querySelector('#type').style.display = 'block';
        // document.querySelector('#Type').style.display = 'block';

        let typeField = document.querySelector('#type');
        typeField.textContent = capitalize(pokeInfo.data.types[0].type.name);


    } else {

        document.querySelector('#pokemon-types').style.display = 'none';
        document.querySelector('#Pokemon-Types').style.display = 'none';
        let typeField = document.querySelector('#type');
        typeField.textContent = 'Normal'

    }
    
};



const form = document.querySelector('#form');
form.addEventListener('submit', function(event) {
 
    let pokeName = document.querySelector('#pokeName').value;
    if (pokeName.length === 0 || pokeName === undefined || pokeName === null){
        alert('no pokemon to search')
    }else{
        let pokeNameLower = pokeName.toLowerCase();
        callAPI(pokeNameLower);
    }

    event.preventDefault()
});


