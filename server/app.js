const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const port = 3000;

app.use(cors());
app.use(express.static(path.join(__dirname, '../public')));

// Lee el archivo JSON de los Pokémon
const pokemonData = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'pokemons.json'), 'utf8'));

// Ruta para obtener los datos de todos los Pokémon
app.get('/api/pokemons', (req, res) => {
  res.json(pokemonData);
});

// Ruta para obtener información de un Pokémon específico por su ID o nombre
app.get('/api/pokemons/:query', (req, res) => {
  const searchTerm = req.params.query;
  console.log('Término de búsqueda recibido:', searchTerm);

  let foundPokemon;

  if (!isNaN(searchTerm)) {
    foundPokemon = pokemonData.find(pokemon => pokemon.id === parseInt(searchTerm));
  } else {
    foundPokemon = pokemonData.find(pokemon => pokemon.name.toLowerCase() === searchTerm.toLowerCase());
  }

  if (foundPokemon) {
    res.json(foundPokemon);
  } else {
    res.status(404).send('Pokémon no encontrado');
  }
});

// Ruta para obtener la página HTML con la lista desplegable de nombres de Pokémon
app.get('/pokemonlist', (req, res) => {
  const filePath = path.resolve(__dirname, 'pokemonlist.html');

  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      console.error('Error al leer el archivo HTML:', err);
      res.status(500).send('Error interno del servidor');
      return;
    }

    res.send(data);
  });
});

app.listen(port, () => {
  console.log(`Servidor escuchando en el puerto ${port}`);
});
