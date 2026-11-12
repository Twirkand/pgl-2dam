const formulario = document.querySelector("#formulario-busqueda");
const inputBusqueda = document.querySelector("#busqueda");
const mensaje = document.querySelector("#mensaje");
const resultado = document.querySelector("#resultado");

const filtroTipo = document.querySelector("#filtro-tipo");
const buscar = formulario.querySelector("buscar");
const cargar = document.querySelector("#cargar");
const cuadricula = document.querySelector("#cuadricula");
const detalles = document.querySelector("#detalles");
const detallesContenido = document.querySelector("#detalles-contenido");
const cerrar = document.querySelector("#cerrar");
let pokemons = [];
let pokemonBuscado = null;

const nombresEstadisticas = {
  "hp": "Salud",
  "attack": "Ataque",
  "defense": "Defensa",
  "special-attack": "Ataque Especial",
  "special-defense": "Defensa Especial",
  "speed": "Velocidad"
};

const obtenerPokemon = async (busqueda) => {
  const url = `https://pokeapi.co/api/v2/pokemon/${busqueda}`;
  const respuesta = await fetch(url);

  if (!respuesta.ok) {
    throw new Error("Pokémon no encontrado.");
  }

  const datos = await respuesta.json();

  return new Pokemon(datos);
};

const formatearId = (id) => {
  return String(id).padStart(3, "0");
};

function crearTipos(tipos) {
  return tipos
      .map((tipo) => `<span class="pokemon_tipo--${tipo}">${tipo}</span>`)
      .join("");
}

const mostrarPokemon = (pokemon) => {
  pokemonBuscado = pokemon;
  resultado.innerHTML = crearTarjeta(pokemon);
};

function crearTarjeta(pokemon) {

  const tiposHTML = crearTipos(pokemon.tipos);

  const stringHtml = `
    <article class="pokemon">
      <p class="pokemon__numero">N.º ${formatearId(pokemon.id)}</p>

      <img
        class="pokemon__imagen"
        src="${pokemon.imagenBack}"
        alt="Imagen de ${pokemon.nombre}"
        onmouseover="this.src='${pokemon.imagenFront}'"
        onmouseout="this.src='${pokemon.imagenBack}'"
      >

      <h2 class="pokemon__nombre">${pokemon.nombre}</h2>

      <div class="pokemon__datos">
        <p><strong>Altura</strong><br>${pokemon.alturaEnMetros()} m</p>
        <p><strong>Peso</strong><br>${pokemon.pesoEnKilos()} kg</p>
      </div>

      <div class="pokemon__tipos">
        ${tiposHTML}
      </div>

      <button class="boton pokemon__boton" type="button" data-id="${pokemon.id}">Ver detalles</button>
    </article>
  `;

  return stringHtml;
}

function abrirDetalles(pokemon) {
  const estadisticasHTML = pokemon.estadisticas
      .map((estadistica) => `
        <li class="detalles__estadistica">
          <span>${nombresEstadisticas[estadistica.nombre]}</span>
          <strong>${estadistica.valor}</strong>
        </li>
      `)
      .join("");

  detallesContenido.innerHTML = `
    <p class="pokemon__numero">N.º ${formatearId(pokemon.id)}</p>

    <img
      class="pokemon__imagen detalles__imagen"
      src="${pokemon.imagen}"
      alt="Imagen de ${pokemon.nombre} de frente"
    >

    <h2 class="pokemon__nombre">${pokemon.nombre}</h2>

    <div class="pokemon__tipos">
      ${crearTipos(pokemon.tipos)}
    </div>

    <div class="pokemon__datos">
      <p><strong>Altura</strong><br>${pokemon.alturaEnMetros()} m</p>
      <p><strong>Peso</strong><br>${pokemon.pesoEnKilos()} kg</p>
      <p><strong>Exp. base</strong><br>${pokemon.experiencia}</p>
    </div>

    <h3 class="detalles__titulo">Habilidades</h3>
    <p class="detalles__habilidades">${pokemon.habilidades.join(", ")}</p>

    <h3 class="detalles__titulo">Estadísticas base</h3>
    <ul class="detalles__estadisticas">
      ${estadisticasHTML}
    </ul>
  `;

  detalles.showModal();
}

cuadricula.addEventListener("click", (evento) => {
  if (evento.target.classList.contains("pokemon__boton")) {
    const id = Number(evento.target.dataset.id);
    const pokemon = pokemons.find((pokemon) => pokemon.id === id);

    abrirDetalles(pokemon);
  }
});

formulario.addEventListener("submit", async (evento) => {
  evento.preventDefault();

  const busqueda = inputBusqueda.value.trim().toLowerCase();

  if (!busqueda) {
    mensaje.textContent = "Introduce un nombre o número.";
    resultado.innerHTML = "";
    return;
  }

  mensaje.textContent = "Cargando...";
  resultado.innerHTML = "";

  try {
    const pokemon = await obtenerPokemon(busqueda);

    mostrarPokemon(pokemon);
    mensaje.textContent = "";
  } catch (error) {
    mensaje.textContent = error.message;
  }
});


const cargarPokemons = async () => {
  const todos = [];

  for (let i = 1; i <= 151; i++) {
    todos.push(obtenerPokemon(i));
  }

  pokemons = await Promise.all(promesas);
}

function mostrarCuadricula(lista) {
  const pokemonHTML = lista
      .map((pokemon) => crearTarjeta(pokemon))
      .join("");

  cuadricula.innerHTML = pokemonHTML;
}


function filtrarPokemons(texto, tipo) {
  return pokemons.filter((pokemon) => {
    const coincideTexto = texto === "" || pokemon.nombre.includes(texto) || pokemon.id === Number(texto);
    const coincideTipo = tipo === "" || pokemon.tipos.includes(tipo);

    return coincideTexto && coincideTipo;
  });
}


function rellenarTipos() {
  const tipos = [];

  pokemons.forEach((pokemon) => {
    pokemon.tipos.forEach((tipo) => {
      if (!tipos.includes(tipo)) {
        tipos.push(tipo);
      }
    });
  });

  tipos.sort();

  const opcionesHTML = tipos
      .map((tipo) => `<option value="${tipo}">${tipo}</option>`)
      .join("");

  filtroTipo.innerHTML = `<option value="">Todos</option>` + opcionesHTML;
  filtroTipo.disabled = false;
}