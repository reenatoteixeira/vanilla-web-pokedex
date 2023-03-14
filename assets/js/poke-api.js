const POKE_API = {};

function convertPokemonModel(pokeApiPokemon) {
    const POKEMON = new Pokemon();

    POKEMON.id = pokeApiPokemon.id;
    POKEMON.name = pokeApiPokemon.name;

    const TYPES = pokeApiPokemon.types.map((typeSlot) => typeSlot.type.name);
    const [MAIN_TYPE] = TYPES;

    POKEMON.types = TYPES;
    POKEMON.mainType = MAIN_TYPE;
    POKEMON.picture = pokeApiPokemon.sprites.other.dream_world.front_default;

    return POKEMON;
}

POKE_API.getPokemonInfos = (pokemon) => {
    return fetch(pokemon.url)
        .then((response) => response.json())
        .then(convertPokemonModel);
}

POKE_API.getPokemonsList = (offset = 0, limit = 0) => {
    const URL = `https://pokeapi.co/api/v2/pokemon/?offset=${offset}&limit=${limit}`;

    return fetch(URL)
        .then((response) => response.json())
        .then((jsonBody) => jsonBody.results)
        .then((pokemonsList) => pokemonsList.map(POKE_API.getPokemonInfos))
        .then((pokemonDetailsListRequests) => Promise.all(pokemonDetailsListRequests))
        .then((pokemonDetailsList) => pokemonDetailsList)
        .catch((error) => console.error(error));
}