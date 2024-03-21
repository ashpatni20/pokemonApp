let pokemoncardContainer = document.querySelector('#pokemoncardContainer');
let search = document.querySelector('#search');
let pokename = document.querySelector('name');  
let filterbtn = document.querySelector('#filter');
let type = document.querySelector('#type');
let heading = document.querySelector('.heading');
 

let color ={
    grass: 'linear-gradient(0deg, #63b170, #9bcc50)',
    fire: 'linear-gradient(0deg, #f5d86d, #fd7d24)',
    water: 'linear-gradient(0deg, #94d7f0, #4592c4)',
    bug: 'linear-gradient(0deg, #8dab7f, #729f3f)',
    normal: 'linear-gradient(0deg, #c8c6c6, #808080)',
    poison: 'linear-gradient(0deg, #cea2d9, #c03ee4)',
    electric: 'linear-gradient(0deg, #9fa64f, #eed535)',
    ground: 'linear-gradient(0deg, #e2e0a9, #edf73f)',
    fairy: 'linear-gradient(0deg, #e1d1e6, #fdb9e9 )',
    fighting: 'linear-gradient(0deg, #e2d67a, #d56723)',
    psychic: 'linear-gradient(0deg, #e0c1db, #f366b9)',
    rock: 'linear-gradient(0deg, #bddb7d, #a38c21)',
    ghost: 'linear-gradient(0deg, #cbaed1, #7b62a3)',
    ice: 'linear-gradient(0deg, #c6dded, #51c4e7)',
    dragon: 'linear-gradient(0deg, #e8f281, #daa520)',
}

search.addEventListener('input', () =>{
    let allCards = document.querySelectorAll('.card');
    // console.log(card);
    let pokArr = Array.from(allCards);
    pokArr.forEach((element)=>{
        let pokemonName = element.children[0].children[0].children[2].innerText;
        console.log(pokemonName);
        if(pokemonName.startsWith(search.value)){
            element.style.display = "flex";
        }else{
            element.style.display = "none";
        }
        
    })
})

filterbtn.addEventListener('click',  () =>  {
    let allCards = document.querySelectorAll('.card');
    // console.log(card);
    let pokArr = Array.from(allCards);
    pokArr.forEach((element)=>{
        let pokemonType = element.children[0].children[0].children[3].innerText;
        // console.log(pokemonType);
        if(pokemonType === type.value){
            element.style.display = "flex";
        }else{
            element.style.display ="none";
        }
       

    })
})


function createPokemonCard(details){
    let card = document.createElement("div");
    card.classList.add("card");
    card.innerHTML = `
    <div class='card-inner'>
        <div class='card-front'>
        <div class='id'>${details.id}</div>     
            <img src="${details.sprites.other.dream_world.front_default}">
            <div class='name'>${details.name}</div>
            <div class='type'>${details.types[0].type.name}</div>
        </div>

        

    </div>
    `
    
    let type = details.types[0].type.name;
    card.querySelector('.card-inner').style.background = color[type] || 'white';
    return card;
}

async function fetchPokemon(i){
    let response = await fetch(`https://pokeapi.co/api/v2/pokemon/${i}`);
    let result  = await response.json();

    if(i==25){
        let gif = document.createElement('img');
        gif.src = result.sprites.other.showdown.front_default;
        heading.appendChild(gif);
    }
    console.log(result);
    return result;
}

async function fetchmainpage(){
    for(let i=1;i<=151;i++){
        let pokemon = await fetchPokemon(i);
        // console.log(pokemon);
        let card = createPokemonCard(pokemon);
        pokemoncardContainer.appendChild(card);
        
    }
}
fetchmainpage();