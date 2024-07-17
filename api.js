const POKE_API = {};

function convertPokemon(pokeApiPokemon) {
  const POKEMON = new Pokemon();
  POKEMON.id = pokeApiPokemon.id;
  POKEMON.name = pokeApiPokemon.name;
  POKEMON.types = pokeApiPokemon.types.map((type) => type.type.name);
  POKEMON.mainType = POKEMON.types[0];
  POKEMON.picture = pokeApiPokemon.sprites.other.dream_world.front_default;
  POKEMON.abilities = pokeApiPokemon.abilities.map((ability) => ability.ability.name);
  POKEMON.height = pokeApiPokemon.height;
  POKEMON.weight = pokeApiPokemon.weight;
  POKEMON.stats.health = pokeApiPokemon.stats[0].base_stat;
  POKEMON.stats.attack = pokeApiPokemon.stats[1].base_stat;
  POKEMON.stats.defense = pokeApiPokemon.stats[2].base_stat;
  POKEMON.stats.specialAttack = pokeApiPokemon.stats[3].base_stat;
  POKEMON.stats.specialDefense = pokeApiPokemon.stats[4].base_stat;
  POKEMON.stats.speed = pokeApiPokemon.stats[5].base_stat;
  POKEMON.stats.total = pokeApiPokemon.stats.reduce((total, stat) => total + stat.base_stat, 0);
  
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
