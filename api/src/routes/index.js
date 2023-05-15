const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const getAllPokemons = require("../controllers/GET/getAllPokemons");
const getPokemonById = require('../controllers/GET/getPokemonById');


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.get("/pokemons", getAllPokemons);

router.get("/pokemons/:idPokemon", getPokemonById);

module.exports = router;
