const POKEMON_LIST = document.getElementById('pokemonListHtml');
const LOAD_MORE_BUTTON = document.getElementById('loadMoreBtn');
const TOP_BUTTON = document.getElementById('topBtn');

const MAX_POKEMONS_SHOWN = 151;
const LIMIT = 10;
let offset = 0;

function scrollFunction() {
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
        TOP_BUTTON.style.display = 'block';
    } else {
        TOP_BUTTON.style.display = 'none';
    }
}

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

    window.onscroll = () => scrollFunction();

    LOAD_MORE_BUTTON.addEventListener('click', () => {
        offset += LIMIT;
        const POKEMONS_NEXT_PAGE = offset + LIMIT;

        if (POKEMONS_NEXT_PAGE >= MAX_POKEMONS_SHOWN) {
            const NEW_POKEMONS_SHOWN = MAX_POKEMONS_SHOWN - offset;

            loadPokemonsList(offset, NEW_POKEMONS_SHOWN);

            LOAD_MORE_BUTTON.parentElement.removeChild(LOAD_MORE_BUTTON);
        } else {
            loadPokemonsList(offset, LIMIT);
        }
    })

    TOP_BUTTON.addEventListener('click', () => {
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;
    })
}

main();