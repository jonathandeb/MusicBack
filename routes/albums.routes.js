const { Router } = require("express");
const { getAlbums, createAlbum, updateAlbum, deleteAlbum } = require('../controllers/albums.controllers')

const router = Router();

router.get( '/:id', getAlbums);

router.post( '/', createAlbum);

router.put( '/:userid', updateAlbum);

router.delete( '/:userid', deleteAlbum);

module.exports = router