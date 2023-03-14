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
    POKEMON.abilities = pokeApiPokemon.abilities.map((abilitieSlot) => abilitieSlot.ability.name);
    POKEMON.height = (pokeApiPokemon.height * 10) / 100;
    POKEMON.weight = (pokeApiPokemon.weight * 100) / 1000;
    POKEMON.stats['health'] = pokeApiPokemon.stats[0].base_stat;
    POKEMON.stats['attack'] = pokeApiPokemon.stats[1].base_stat;
    POKEMON.stats['defense'] = pokeApiPokemon.stats[2].base_stat;
    POKEMON.stats['spAttack'] = pokeApiPokemon.stats[3].base_stat;
    POKEMON.stats['spDefense'] = pokeApiPokemon.stats[4].base_stat;
    POKEMON.stats['speed'] = pokeApiPokemon.stats[5].base_stat;
    POKEMON.stats['total'] = POKEMON.stats['health'] + POKEMON.stats['attack'] +
        POKEMON.stats['defense'] + POKEMON.stats['spAttack'] +
        POKEMON.stats['spDefense'] + POKEMON.stats['speed']

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

POKE_API.getPokemonDetails = (pokemonId) => {
    const URL = `https://pokeapi.co/api/v2/pokemon/${pokemonId}`;

    return fetch(URL)
        .then((response) => response.json())
        .then(convertPokemonModel)
        .then((pokemon) => pokemon)
        .catch((error) => console.error(error));
}