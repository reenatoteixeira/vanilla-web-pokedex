const POKE_API = {};

function convertPokemon(pokeApiPokemon) {
  const POKEMON = new Pokemon();
  POKEMON.name = pokeApiPokemon.name;

  return POKEMON;
}

POKE_API.getPokemonInfo = (pokemon) => {
  return fetch(pokemon.url)
    .then((response) => response.json())
    .then(convertPokemon);
};

POKE_API.getPokemonsList = (limit = 10, offset = 0) => {
  const URL = `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`;

  return fetch(URL)
    .then((response) => response.json())
    .then((json) => json.results)
    .then((pokemonsArray) => pokemonsArray.map(POKE_API.getPokemonInfo))
    .then((pokemonDetailsArray) => Promise.all(pokemonDetailsArray))
    .catch((error) => console.error(error));
};
