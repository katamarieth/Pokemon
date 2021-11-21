//1-chamar o metodo fetch(), com a função que vai chamar o pokemos
const fetchPokemon = () => {
  //esta função recebe o id como paramentro para conseguir chamar diferentes pokemon
  const getPokemonUrl= id => `https://pokeapi.co/api/v2/pokemon/${id}`//vamos usar uma interpolação para chamar o ID de forma dinamica
  
  //fectch() metodo que serve para fazer request com o metodo ajax e serve para fazer uma request HTTP e traz dados da URL que são especificados por argumentos
  //(ajax serve para fazer requisicões assinconas para que datos sejam obtidos para que a pagina não precisa ser recarregada)
  
  const pokemonPromises = []
  //entre cada iteração executa o fetch, obtenha a resposta e retorne uma promise com um JSON dessa resposta
  for (let i = 1; i <= 150; i++){
    //o push serve para que a cada chamado de pokemon, este seja enviado no final do array
    pokemonPromises.push(fetch(getPokemonUrl(i)).then(response => response.json())) //
  }
    //chamamos o fetch(url),con u encadeiamento do then que esta retornando uma promise com json do pokemon
    //e depois substituimos o argumento do fetch (url) pela getPokemonUrl que recebe (i) como argumento
    //fetch(getPokemonUrl(i)).then(response => response.json())

    //.all é um metodo estatico que não me obriga a usar new como prefixo à invocação dele
    Promise.all(pokemonPromises)
      .then(pokemons => {
        
        //queremos reducir o array de 150 pokemons numa string
        const liPokemons = pokemons.reduce((accumulator, pokemon) => {
          const types = pokemon.types.map(typeInfo => typeInfo.type.name)
          
          accumulator += `
          <li class="card" ${types[0]}">
          <img class="card-image" alt="${pokemon.name}" src="https://raw.githubusercontent.com/pokeapi/sprites/master/sprites/pokemon/${pokemon.id}.png"/>
          <h2 class= "card-title">${pokemon.id}. ${pokemon.name}</h2>
          <p class="card-subtitle">${types.join(' | ')}</p>
          </li>
          `
          return accumulator
  
        }, '')

        const ul = document.querySelector('[data-js="pokedex"]')
        ul.innerHTML = liPokemons
      })
  //fetch(url)
    //a response retorna uma resposta da promise em formato json, para obter o body da resposta
    //.then(response => response.json())//then retorna uma promise
   
  }
//2-chamar a função fetchpokemon
fetchPokemon()