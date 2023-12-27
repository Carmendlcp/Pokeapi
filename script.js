const pokedexLista = document.querySelector("#pokedex");
// Enlace al archivo (puede no ser necesario)

// Para almacenar la información de los Pokémon
const pokemones = [];

// Función para obtener la lista de Pokémon de la API
const pokeLista = async () => {
  const img$$ = document.createElement('img');
  img$$.src = 'https://cdn.dribbble.com/users/1407587/screenshots/3014076/media/ef5ebb3df0fc3474f1a9e4f49c32ddf8.gif';
  img$$.classList.add('imgCarga');
  pokedexLista.appendChild(img$$);

  for (let i = 1; i < 152; i++) {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${i}`);
    const result = await response.json();
    pokemones.push(result);
  }
  img$$.remove();
  return pokemones;
};

// Función para mapear la información de los Pokémon
const mapearPokemons = (pokemonsSinMapear) => {
  const pokemonsMapeados = pokemonsSinMapear.map((pokemon) => ({
    nombre: pokemon.name,
    foto: pokemon.sprites.front_default,
    id: pokemon.id,
    tipo: pokemon.types.map((type) => type.type.name),
  }));
  return pokemonsMapeados;
};

// Función para mostrar los Pokémon en la pantalla
const pintarPokemons = (lista) => {
  let crearPokemonOl$$ = document.querySelector("ol");

  for (let i = 0; i < lista.length; i++) {
    const pokemon = lista[i];
    const listaLi = document.createElement("li");
    const tiposBotones = pokemon.tipo.map((tipo) => `<button>${tipo}</button>`).join(' ');
    listaLi.innerHTML = `
      <span class="nombre">${pokemon.nombre}</span>
      <img src="${pokemon.foto}" alt="${pokemon.nombre}" class="img">
      <span class="tipos">${tiposBotones}</span>
      <span class="id" >${pokemon.id}</span>`;

    crearPokemonOl$$.appendChild(listaLi);
  }
};

// Función principal para obtener y mostrar la información de los Pokémon
const pokeApi = async () => {
  const lista = await pokeLista();
  const pokemonsMapeados = mapearPokemons(lista);
  pintarPokemons(pokemonsMapeados);
};

pokeApi();




