// Función para buscar un Pokémon por su nombre
function buscarPokemon(nombrePokemon) {
  const searchTerm = nombrePokemon.toLowerCase();

  // Agregar un console log para verificar el término de búsqueda
  console.log('Término de búsqueda enviado al servidor:', searchTerm);

  fetch(`http://localhost:3000/api/pokemons/${searchTerm}`)
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
      // Agregar un console log para mostrar toda la respuesta del servidor
      console.log('Respuesta del servidor:', data);

      const pokemonDetails = document.getElementById('pokemonDetails');
      const pokemonName = document.getElementById('pokemonName');
      const pokemonImage = document.getElementById('pokemonImage');
      const pokemonAbilities = document.getElementById('pokemonAbilities');
      const pokemonType = document.getElementById('pokemonType');

      if (data.name && data.ThumbnailImage && data.abilities && data.type) {
        pokemonName.textContent = data.name;
        pokemonImage.src = data.ThumbnailImage;
        pokemonImage.alt = data.name;

        pokemonAbilities.innerHTML = '';
        data.abilities.forEach(ability => {
          const li = document.createElement('li');
          li.textContent = ability;
          pokemonAbilities.appendChild(li);
        });

        pokemonType.textContent = data.type.join(', ');

        pokemonDetails.style.display = 'block'; // Mostrar los detalles
      } else {
        pokemonDetails.innerHTML = '<p>Pokémon no encontrado</p>';
        pokemonDetails.style.display = 'block';
      }
      pokemonDetails.style.display = 'block'; // Mostrar los detalles

      // Agregar una clase para activar la animación
      setTimeout(() => {
        pokemonDetails.classList.add('slide-in');
      }, 100); // Puedes ajustar este retraso para controlar la aparición suave
    })
    .catch(error => {
      console.error('Error:', error);
      // Manejo de errores, por ejemplo, mostrar un mensaje de error en la interfaz
      const pokemonDetails = document.getElementById('pokemonDetails');
      pokemonDetails.innerHTML = '<p>Ocurrió un error al obtener los datos del Pokémon</p>';
      pokemonDetails.style.display = 'block';
    });
}

// Obtener el elemento select
const pokemonSelect = document.getElementById('pokemonList');
const pokemonMap = new Map(); // Utilizaremos un Map para evitar duplicados

// Realizar una solicitud para obtener los nombres de los Pokémon
fetch('http://localhost:3000/api/pokemons')
  .then(response => response.json())
  .then(data => {
    // Iterar sobre los datos y crear opciones para cada Pokémon
    data.forEach(pokemon => {
      // Verificar si el nombre del Pokémon ya está en el Map
      if (!pokemonMap.has(pokemon.name)) {
        const option = document.createElement('option');
        option.value = pokemon.name;
        option.textContent = pokemon.name;
        pokemonMap.set(pokemon.name, true); // Almacenar el nombre del Pokémon en el Map para evitar duplicados
        pokemonSelect.appendChild(option);
      }
    });
  })
  .catch(error => {
    console.error('Error al obtener los Pokémon:', error);
  });

// Resto del código para buscar y mostrar detalles
// ...

// Evento change para el menú desplegable
pokemonSelect.addEventListener('change', (event) => {
  const selectedPokemon = event.target.value;
  buscarPokemon(selectedPokemon);
});
