const POKE_API = {};

function convertPokemonModel(pokeApiPokemon) {
    const pokemon = new Pokemon();

    pokemon.id = pokeApiPokemon.id;
    pokemon.name = pokeApiPokemon.name;

    const types = pokeApiPokemon.types.map((typeSlot) => typeSlot.type.name);
    const [MAIN_TYPE] = types;

    pokemon.types = types;
    pokemon.mainType = MAIN_TYPE;
    pokemon.picture = pokeApiPokemon.sprites.other.dream_world.front_default;
    pokemon.abilities = pokeApiPokemon.abilities.map((abilitieSlot) => abilitieSlot.ability.name);
    pokemon.height = (pokeApiPokemon.height * 10) / 100;
    pokemon.weight = (pokeApiPokemon.weight * 100) / 1000;
    pokemon.stats['health'] = pokeApiPokemon.stats[0].base_stat;
    pokemon.stats['attack'] = pokeApiPokemon.stats[1].base_stat;
    pokemon.stats['defense'] = pokeApiPokemon.stats[2].base_stat;
    pokemon.stats['spAttack'] = pokeApiPokemon.stats[3].base_stat;
    pokemon.stats['spDefense'] = pokeApiPokemon.stats[4].base_stat;
    pokemon.stats['speed'] = pokeApiPokemon.stats[5].base_stat;
    pokemon.stats['total'] = pokemon.stats['health'] + pokemon.stats['attack'] +
        pokemon.stats['defense'] + pokemon.stats['spAttack'] +
        pokemon.stats['spDefense'] + pokemon.stats['speed']

    return pokemon;
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
        .catch((error) => console.error(error));
}

POKE_API.getPokemonDetails = (pokemonId) => {
    const URL = `https://pokeapi.co/api/v2/pokemon/${pokemonId}`;

    return fetch(URL)
        .then((response) => response.json())
        .then(convertPokemonModel)
        .catch((error) => console.error(error));
}