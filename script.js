const pokedexLista = document.querySelector("#pokedex");

const h1$$ = document.querySelector("h1");
const nav$$ = document.createElement("nav");
nav$$.innerHTML =
  '<a href="https://www.pokemon.com/es">Inicio</a> | <a href="https://www.pokemon.com/es/pokedex">Pokedex</a> | <a href="https://www.pokemon.com/es/videojuegos-pokemon">Videojuegos</a> | <a href="https://www.pokemon.com/es/noticias-pokemon">Noticias</a>';
nav$$.classList.add("nav");
h1$$.appendChild(nav$$);
// con esto me creo el nav dentro del h1

const pokemones = [];
let currentPage = 1; // Página actual
const itemsPerPage = 20; // Pokémon por página

const pokeLista = async (currentPage) => {
  const img$$ = document.createElement("img");
  img$$.src =
    "https://cdn.dribbble.com/users/1407587/screenshots/3014076/media/ef5ebb3df0fc3474f1a9e4f49c32ddf8.gif";
  img$$.classList.add("imgCarga");
  pokedexLista.appendChild(img$$);

  const offset = (currentPage - 1) * itemsPerPage;
  const response = await fetch(
    `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${itemsPerPage}`
  );

  // Verifica si la respuesta es correcta
  if (!response.ok) {
    throw new Error(`Error al hacer fetch de la API: ${response.statusText}`);
  }
  const data = await response.json();
  console.log("Datos de la API:", data);

  const pokemons = await Promise.all(
    data.results.map(async (pokemon) => {
      const pokeResponse = await fetch(pokemon.url);
      if (!pokeResponse.ok) {
        throw new Error(
          `Error al hacer fetch del pokemon: ${pokeResponse.statusText}`
        );
      }
      return await pokeResponse.json();
    })
  );

  // for (let i = 1; i < 500; i++) {
  //   const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${i}`);
  //   const result = await response.json();
  //   pokemones.push(result);
  // }
  console.log("Pokémons obtenidos:", pokemons);
  img$$.remove();
  return pokemons;

  //Con esto consigo coger los pokemons de la api y que se vea en consola los arrays
};

const mapearPokemons = (pokemonsSinMapear) => {
  const pokemonsMapeados = pokemonsSinMapear.map((pokemon) => ({
    nombre: pokemon.name,
    foto: pokemon.sprites.front_default,
    id: pokemon.id,
    tipo: pokemon.types.map((type) => type.type.name),
  }));
  return pokemonsMapeados;
  //Con esto consigo coger las propiedades que quiero de cada pokemon. Se verán tmb en consola.
};

const pintarPokemons = (lista) => {
  console.log("Lista de Pokémon a pintar:", lista);
  let crearPokemonOl$$ = document.querySelector("ol");
  crearPokemonOl$$.innerHTML = "";

  for (let i = 0; i < lista.length; i++) {
    const pokemon = lista[i];
    const listaLi = document.createElement("li");
    const tiposBotones = pokemon.tipo
      .map((tipo) => `<button>${tipo}</button>`)
      .join(" ");
    listaLi.innerHTML = `
      <span class="nombre">${pokemon.nombre}</span>
      <img src="${pokemon.foto}" alt="${pokemon.nombre}" class="img">
      <span class="tipos">${tiposBotones}</span>
      <span class="id" >${pokemon.id}</span>
      `;
    //esto hace que al fin se vea todo en la pantalla. He añadido lo de botones al tipo.

    crearPokemonOl$$.appendChild(listaLi);
  }
};

//quiero crear un buscador de pokemons que filtre.
const cogerInput = (pokemons) => {
  const input$$ = document.querySelector("#inputBusqueda");
  input$$.addEventListener("input", () =>
    filtrarPokemons(pokemons, input$$.value)
  );
};
const filtrarPokemons = (arrayParaFiltrar, filtro) => {
  let pokemonsFiltrados = arrayParaFiltrar.filter((pokemons) =>
    pokemons.nombre.toLowerCase().includes(filtro.toLowerCase())
  );
  pintarPokemons(pokemonsFiltrados);
};

// Crear botones de paginación
const createPaginationButtons = () => {
  const paginationContainer = document.createElement("div");
  paginationContainer.id = "pagination";
  document.body.appendChild(paginationContainer);

  const prevButton = document.createElement("button");
  prevButton.innerText = "Anterior";
  prevButton.disabled = currentPage === 1;
  prevButton.addEventListener("click", () => changePage(currentPage - 1));

  const nextButton = document.createElement("button");
  nextButton.innerText = "Siguiente";
  nextButton.addEventListener("click", () => changePage(currentPage + 1));

  paginationContainer.appendChild(prevButton);
  paginationContainer.appendChild(nextButton);
};

const changePage = async (page) => {
  currentPage = page;
  const lista = await pokeLista(currentPage);
  const pokemonsMapeados = mapearPokemons(lista);
  pintarPokemons(pokemonsMapeados);

  // Actualizar botones
  const prevButton = document.querySelector("#pagination button:nth-child(1)");
  const nextButton = document.querySelector("#pagination button:nth-child(2)");
  prevButton.disabled = currentPage === 1;
  nextButton.disabled = currentPage * itemsPerPage >= 500;
};
/////////////////////////////////////////////////////////////////
const pokeApi = async () => {
  const lista = await pokeLista(currentPage);
  const pokemonsMapeados = mapearPokemons(lista);
  pintarPokemons(pokemonsMapeados);
  createPaginationButtons();
  cogerInput(pokemonsMapeados);
};

pokeApi();
