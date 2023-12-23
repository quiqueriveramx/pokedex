function buscarPokemon() {
  const searchInput = document.getElementById('searchInput');
  const searchTerm = searchInput.value.toLowerCase();

  // Agregamos un console log para verificar el término de búsqueda
  console.log('Término de búsqueda enviado al servidor:', searchTerm);

  fetch(`http://localhost:3000/api/pokemons/${searchTerm}`)
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
      // Agregar console.log para mostrar toda la respuesta del servidor
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

