const pokedexLista = document.querySelector("#pokedex");
//enlazo el archivo

const h1$$ = document.querySelector('h1');
const nav$$ = document.createElement('nav');
nav$$.innerHTML = '<a href="https://www.pokemon.com/es">Inicio</a> | <a href="https://www.pokemon.com/es/pokedex">Pokedex</a> | <a href="https://www.pokemon.com/es/videojuegos-pokemon">Videojuegos</a> | <a href="https://www.pokemon.com/es/dibujos-animados">Dibujos Animados</a> | <a href="https://www.pokemon.com/es/noticias-pokemon">Noticias</a>';
nav$$.classList.add('nav');
h1$$.appendChild(nav$$);

const pokemones = [];

const pokeLista = async () => {
  for (let i = 1; i < 152; i++) {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${i}`);
    const result = await response.json();
    pokemones.push(result);
  }
  return pokemones;
  //Con esto consigo coger los pokemons
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
  //Con esto consigo coger las propiedades que quiero de cada pokemon
};

const pokemonCartas = (pokemon) => {
  console.log("Este es el pokemon", pokemon.nombre, ":", pokemon);
  //esto me imprime por consola la info de cada carta al hacer click
};

const pintarPokemons = (lista) => {
  //console.log("pintar", lista);
  let crearPokemonOl$$ = document.querySelector("ol");

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
//esto hace que al fin se vea todo en la pantalla
    listaLi.addEventListener("click", () => {
      pokemonCartas(pokemon);
    });

    crearPokemonOl$$.appendChild(listaLi);
  }
};
const pokeApi = async () => {
  const lista = await pokeLista();
  //console.log(lista);
  const pokemonsMapeados = mapearPokemons(lista);
  pintarPokemons(pokemonsMapeados);
};

pokeApi();
