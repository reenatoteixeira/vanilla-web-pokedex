const SELECTED_POKEMON_ID = new URLSearchParams(location.search).get('id');
const POKEMON_DETAIL_SECTION = document.getElementById('pokemonDetailSection');
const POKEMON_ID = document.getElementById('pokemonId');
const POKEMON_NAME = document.getElementById('pokemonName');
const POKEMON_TYPES = document.getElementById('pokemonTypes');
const POKEMON_PICTURE = document.getElementById('pokemonPicture');
const POKEMON_STATS_SECTION = document.getElementById('pokemonStatsSection');
const POKEMON_HEIGHT = document.getElementById('pokemonHeight');
const POKEMON_WEIGHT = document.getElementById('pokemonWeight');
const POKEMON_ABILITIES = document.getElementById('pokemonAbilities');
const POKEMON_HEALTH = document.getElementById('pokemonHealth')
const POKEMON_ATTACK = document.getElementById('pokemonAttack')
const POKEMON_DEFENSE = document.getElementById('pokemonDefense')
const POKEMON_SP_ATTACK = document.getElementById('pokemonSpAttack')
const POKEMON_SP_DEFENSE = document.getElementById('pokemonSpDefense')
const POKEMON_SPEED = document.getElementById('pokemonSpeed')
const POKEMON_TOTAL_STATS = document.getElementById('pokemonTotalStats')

function loadPokemonDetailPage(pokemonId) {
    POKE_API.getPokemonDetails(pokemonId).then((pokemon) => {
        POKEMON_DETAIL_SECTION.className = `content mod-background ${pokemon.mainType}`;
        POKEMON_ID.innerText = `#${pokemon.id}`;
        POKEMON_NAME.innerText = pokemon.name;
        POKEMON_TYPES.innerHTML = `${pokemon.types.map((type) => `<li class="type">${type}</li>`).join('')}`;
        POKEMON_PICTURE.src = pokemon.picture;
        POKEMON_PICTURE.alt = `${pokemon.name} picture`;
        POKEMON_STATS_SECTION.className = `mod-pokemon-detail ${pokemon.mainType}`;
        POKEMON_HEIGHT.innerText = `${pokemon.height} m`;
        POKEMON_WEIGHT.innerText = `${pokemon.weight} kg`
        POKEMON_ABILITIES.innerText = `${pokemon.abilities.map((abilitie) => abilitie).join(', ')}`;
        POKEMON_HEALTH.innerText = pokemon.stats['health'];
        POKEMON_ATTACK.innerText = pokemon.stats['attack'];
        POKEMON_DEFENSE.innerText = pokemon.stats['defense'];
        POKEMON_SP_ATTACK.innerText = pokemon.stats['spAttack'];
        POKEMON_SP_DEFENSE.innerText = pokemon.stats['spDefense'];
        POKEMON_SPEED.innerText = pokemon.stats['speed'];
        POKEMON_TOTAL_STATS.innerText = pokemon.stats['total'];

        let pokemonBaseName = pokemon.name;
        let pokemonName = pokemonBaseName.charAt(0).toUpperCase() + pokemonBaseName.slice(1);
        document.title = `Pokédex - ${pokemonName}`
    })
}

loadPokemonDetailPage(SELECTED_POKEMON_ID);