const POKEMON_LIST = document.getElementById("pokemon-list"),
  LOAD_MORE_BTN = document.getElementById("load-more-btn"),
  LIMIT = 10;

let offset = 0;

POKE_API.getPokemonsList(LIMIT, offset).then((pokemonsList = []) => {
  POKEMON_LIST.innerHTML += pokemonsList
    .map((pokemon) => `<li>${pokemon.name}</li>`)
    .join("");
});
