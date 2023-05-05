const selectedPokemonId = new URLSearchParams(location.search).get('id');
const pokemonDetailSection = document.getElementById('pokemonDetailSection');
const pokemonIdElement = document.getElementById('pokemonId');
const pokemonNameElement = document.getElementById('pokemonName');
const pokemonTypesElement = document.getElementById('pokemonTypes');
const pokemonPictureElement = document.getElementById('pokemonPicture');
const pokemonStatsSection = document.getElementById('pokemonStatsSection');
const pokemonHeightElement = document.getElementById('pokemonHeight');
const pokemonWeightElement = document.getElementById('pokemonWeight');
const pokemonAbilitiesElement = document.getElementById('pokemonAbilities');
const pokemonHealthElement = document.getElementById('pokemonHealth')
const pokemonAttackElement = document.getElementById('pokemonAttack')
const pokemonDefenseElement = document.getElementById('pokemonDefense')
const pokemonSpAttackElement = document.getElementById('pokemonSpAttack')
const pokemonSpDefenseElement = document.getElementById('pokemonSpDefense')
const pokemonSpeedElement = document.getElementById('pokemonSpeed')
const pokemonTotalStatsElement = document.getElementById('pokemonTotalStats')

function loadPokemonDetailPage(pokemonId) {
    POKE_API.getPokemonDetails(pokemonId).then((pokemon) => {
        pokemonDetailSection.className = `content mod-background ${pokemon.mainType}`;
        pokemonIdElement.innerText = `#${pokemon.id}`;
        pokemonNameElement.innerText = pokemon.name;
        pokemonTypesElement.innerHTML = `${pokemon.types.map((type) => `<li class="type">${type}</li>`).join('')}`;
        pokemonPictureElement.src = pokemon.picture;
        pokemonPictureElement.alt = `${pokemon.name} picture`;
        pokemonStatsSection.className = `mod-pokemon-detail ${pokemon.mainType}`;
        pokemonHeightElement.innerText = `${pokemon.height} m`;
        pokemonWeightElement.innerText = `${pokemon.weight} kg`
        pokemonAbilitiesElement.innerText = `${pokemon.abilities.map((abilitie) => abilitie).join(', ')}`;
        pokemonHealthElement.innerText = pokemon.stats['health'];
        pokemonAttackElement.innerText = pokemon.stats['attack'];
        pokemonDefenseElement.innerText = pokemon.stats['defense'];
        pokemonSpAttackElement.innerText = pokemon.stats['spAttack'];
        pokemonSpDefenseElement.innerText = pokemon.stats['spDefense'];
        pokemonSpeedElement.innerText = pokemon.stats['speed'];
        pokemonTotalStatsElement.innerText = pokemon.stats['total'];

        let pokemonBaseName = pokemon.name;
        let pokemonName = pokemonBaseName.charAt(0).toUpperCase() + pokemonBaseName.slice(1);
        document.title = `Pokédex - ${pokemonName}`
    })
}

loadPokemonDetailPage(selectedPokemonId);