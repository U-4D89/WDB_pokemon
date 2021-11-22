//https://youtu.be/1iysNUrI3lw


//by default dont show the field for pokemon 

document.getElementById('info').style.display = 'none';

const search = document.getElementById('pokeName');
const matchList = document.getElementById('match-list');

const searchPokemon = async searchText => {

    const response = await fetch('../data/pokemon.json');
    const pokemons = await response.json();

    let matches = pokemons.filter(pokemon => {
        const regex = new RegExp(`^${searchText}`, 'gi');
        return pokemon.name.match(regex) || pokemon.name.match(regex);
    })

    if (searchText.length === 0) { matches = [] };
    
    outputHtml(matches);
}

function clearMatchList() {
    
    while(matchList.firstChild) {
        matchList.removeChild(matchList.firstChild)
    }
    

}


const outputHtml = matches => {
    //console.log(matches)
    if( matches.length >= 0 ) {

        matchList.textContent = '';
        const html =  matches.forEach( match=> {
            let newOption = document.createElement("P");
            newOption.classList.add("option");
            newOption.textContent = match.name;
            matchList.appendChild(newOption);


            newOption.addEventListener('click', (event) => {

                const pokemon = newOption.innerText;
                search.value = pokemon;
              
                //when click delete all other options
                clearMatchList()
                
            })
            
        });
    }
}


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

    //clean pics and search bar and the match list
    document.querySelector('#pic').innerHTML = '';
    search.value='';
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
    

    let uniqueType =   document.querySelector('#Type');
    let uniqueContent = document.querySelector('#type');

    let multiTypes = document.querySelector('#Pokemon-Types');
    let multiContents =  document.querySelector('#pokemon-types');


    if ( types.length === 1 ) {

        //do not show multi types field
        multiContents.style.display = 'none';
        multiTypes.style.display = 'none';

        uniqueType.style.display = 'inline';
        uniqueContent.style.display = 'inline'
       
        uniqueContent.textContent = capitalize(pokeInfo.data.types[0].type.name);

    
    } else if (types.length > 1) {
        
        //show multi types field
        multiTypes.style.display = 'inline';
        multiContents.style.display = 'inline';

        uniqueType.style.display = 'none';
        uniqueContent.style.display = 'none';

        while(multiContents.firstChild) {
            multiContents.removeChild(multiContents.firstChild)
        }
       
        types.forEach( type => {

            let typeField =  document.createElement("SPAN");
            let typeContent = `${type.type.name} `;
            typeField.textContent = capitalize(typeContent);
            //console.log(typeField)

            multiContents.appendChild(typeField);
            // console.log(type)

        })

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

search.addEventListener('input', () => searchPokemon(search.value))
