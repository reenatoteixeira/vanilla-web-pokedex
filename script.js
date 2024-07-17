const POKEMON_LIST = document.getElementById("pokemon-list"),
  LOAD_MORE_BTN = document.getElementById("load-more-btn"),
  MAX_POKEMONS_SHOWN = 10,
  LIMIT = 4;

let offset = 0;

function loadPokemons(limit, offset) {
  POKE_API.getPokemonsList(limit, offset).then((pokemonsList = []) => {
    POKEMON_LIST.innerHTML += pokemonsList
      .map((pokemon) => `
      <li class="pokemon-card ${pokemon.mainType}">
        <img class="pokemon-picture" src="${pokemon.picture}"
          alt="Bulbasaur">
        <h2>${pokemon.name} - ID ${pokemon.id}</h2>
        <span>${pokemon.mainType}</span>
      </li>
      `)
      .join("");
  });
}

loadPokemons(LIMIT, offset)

LOAD_MORE_BTN.addEventListener("click", () => {
  offset += LIMIT;
  const POKEMONS_SHOWN = offset + LIMIT;
  
  if (POKEMONS_SHOWN >= MAX_POKEMONS_SHOWN) {
    const NEW_POKEMONS_SHOWN = MAX_POKEMONS_SHOWN - offset;
    loadPokemons(NEW_POKEMONS_SHOWN, offset);
    LOAD_MORE_BTN.style.display = "none";
  } else {
    loadPokemons(LIMIT, offset);
  }
})
