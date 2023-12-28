const pokedexLista = document.querySelector("#pokedex");
//enlazo el archivo, aunque no estoy segura de si esto es necesario

const h1$$ = document.querySelector('h1');
const nav$$ = document.createElement('nav');
nav$$.innerHTML = '<a href="https://www.pokemon.com/es">Inicio</a> | <a href="https://www.pokemon.com/es/pokedex">Pokedex</a> | <a href="https://www.pokemon.com/es/videojuegos-pokemon">Videojuegos</a> | <a href="https://www.pokemon.com/es/noticias-pokemon">Noticias</a>';
nav$$.classList.add('nav');
h1$$.appendChild(nav$$);
// con esto me creo el nav dentro del h1

const pokemones = [];

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
  //Con esto consigo coger los pokemons de la api y que se vea en consola los arrays
};

const mapearPokemons = (pokemonsSinMapear) => {
  //console.log("función mapear", pokemonsSinMapear);
  const pokemonsMapeados = pokemonsSinMapear.map((pokemon) => ({
    nombre: pokemon.name,
    foto: pokemon.sprites.front_default,
    id: pokemon.id,
    tipo: pokemon.types.map((type) => type.type.name),
  }));
  return pokemonsMapeados;
  //Con esto consigo coger las propiedades que quiero de cada pokemon. Se verán tmb en consola.
};

const pokemonCartas = (pokemon) => {
  console.log("Este es el pokemon", pokemon.nombre, ":", pokemon);
  //esto me imprime por consola la info de cada carta al hacer click. No se si realmente es innecesario para el usuario
};

const pintarPokemons = (lista) => {
  //console.log("pintar", lista);
  let crearPokemonOl$$ = document.querySelector("ol");
  crearPokemonOl$$.innerHTML = "";

  for (let i = 0; i < lista.length; i++) {
    const pokemon = lista[i];
    const listaLi = document.createElement("li");
    const tiposBotones = pokemon.tipo.map((tipo) => `<button>${tipo}</button>`).join(' ');
    listaLi.innerHTML = `
      <span class="nombre">${pokemon.nombre}</span>
      <img src="${pokemon.foto}" alt="${pokemon.nombre}" class="img">
      <span class="tipos">${tiposBotones}</span>
      <span class="id" >${pokemon.id}</span>
      `;
//esto hace que al fin se vea todo en la pantalla. He añadido lo de botones al tipo.

    listaLi.addEventListener("click", () => {
      pokemonCartas(pokemon);
    });
    //Esto es lo de la info de cada carta al hacer click. Pero solo se ve en consola

    crearPokemonOl$$.appendChild(listaLi);
  }
};
//quiero crear un buscador de pokemons que filtre.
const cogerInput = (pokemons) => {
const input$$ = document.querySelector("#inputBusqueda")
input$$.addEventListener("input", () => filtrarPokemons (pokemons, input$$.value));
};
const filtrarPokemons = (arrayParaFiltrar, filtro) => {
  let pokemonsFiltrados = arrayParaFiltrar.filter((pokemons) => pokemons.nombre.toLowerCase().includes(filtro.toLowerCase()))
  pintarPokemons(pokemonsFiltrados)
};
/////////////////////////////////////////////////////////////////
const pokeApi = async () => {
  const lista = await pokeLista();
  const pokemonsMapeados = mapearPokemons(lista);
  pintarPokemons(pokemonsMapeados);
  cogerInput(pokemonsMapeados);
};

pokeApi();

