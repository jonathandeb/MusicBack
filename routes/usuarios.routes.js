const { Router } = require("express");
const { getUsuarios, crearUsuarios, getUsuario, actualizarUsuarios, borrarUsuarios } = require('../controllers/usuarios.controllers')

const router = Router();

router.get( '/', getUsuarios);

router.get( '/:email', getUsuario);

router.post( '/', crearUsuarios);

router.put( '/:userid', actualizarUsuarios);

router.delete( '/:userid', borrarUsuarios);

module.exports = router