const express = require('express');
const cors = require('cors');
const app = express();
const port = 3000;
const fs = require('fs'); // Importa el módulo fs
const path = require('path'); // Importa el módulo path

app.use(cors()); // Habilita CORS para todas las rutas

// Lee el archivo JSON de los Pokémon
const pokemonData = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'pokemons.json'), 'utf8'));

// Ruta para servir archivos estáticos (HTML, CSS, JavaScript)
app.use(express.static(path.join(__dirname, '../public')));

// Ruta para obtener los datos de todos los Pokémon
app.get('/api/pokemons', (req, res) => {
  res.json(pokemonData); // Retorna los datos de los Pokémon
});

// Ruta para obtener información de un Pokémon específico por su ID o nombre
app.get('/api/pokemons/:query', (req, res) => {
  const searchTerm = req.params.query;
  console.log('Término de búsqueda recibido:', searchTerm); // Nuevo console log agregado

  let foundPokemon;

  // Verificar si el término de búsqueda es un número (ID) o un string (nombre)
  if (!isNaN(searchTerm)) {
    // Búsqueda por ID
    foundPokemon = pokemonData.find(pokemon => pokemon.id === parseInt(searchTerm));
  } else {
    // Búsqueda por nombre (en minúsculas para comparar)
    foundPokemon = pokemonData.find(pokemon => pokemon.name.toLowerCase() === searchTerm.toLowerCase());
  }

  if (foundPokemon) {
    res.json(foundPokemon);
  } else {
    res.status(404).send('Pokémon no encontrado');
  }
});

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor escuchando en el puerto ${port}`);
});
