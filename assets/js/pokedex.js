const POKEMON_LIST = document.getElementById('pokemonListHtml');

const LIMIT = 10;
let offset = 0;

function loadPokemonsList(offset, limit) {
    POKE_API.getPokemonsList(offset, limit).then((pokemonsList = []) => {
        POKEMON_LIST.innerHTML += pokemonsList.map((pokemon) => `
        <li class="pokemon ${pokemon.mainType}">
            <a href="./detail.html?id=${pokemon.id}">
                <span class="number">#${pokemon.id}</span>
                <span class="name">${pokemon.name}</span>

                <div class="detail">
                    <ol class="types">
                        ${pokemon.types.map((type) => `<li class="type">${type}</li>`).join('')}
                    </ol>

                    <img src="${pokemon.picture}" alt="${pokemon.name} picture">
                </div>
            </a>
        </li>
        `).join('');
    })
}

function main() {
    loadPokemonsList(offset, LIMIT);
}

main();