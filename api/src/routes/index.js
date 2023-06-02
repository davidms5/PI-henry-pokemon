const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const getAllPokemons = require("../controllers/GET/getAllPokemons");
const getPokemonById = require('../controllers/GET/getPokemonById');
const getTypes = require('../controllers/GET/getTypes');
const CreatePokemon = require('../controllers/POST/createPokemon');
const multer = require('multer');

const storageCloud = require("../config/configs")
const upload = multer({ storage: storageCloud });


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.get("/pokemons", getAllPokemons);

router.get("/pokemons/:idPokemon", getPokemonById);

router.get("/types", getTypes);

router.post("/pokemons", upload.single('imagen'), CreatePokemon);
module.exports = router;
