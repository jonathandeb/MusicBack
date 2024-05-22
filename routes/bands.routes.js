const { Router } = require("express");
const { getBands, createBand, updateBand, getBand, deleteBand, getUserBands } = require('../controllers/bands.controllers')

const router = Router();

router.get( '/', getBands);

router.get( '/band/:id', getBand);

router.get( '/:id', getUserBands);

router.post( '/', createBand);

router.put( '/:id', updateBand);

router.delete( '/:id', deleteBand);

module.exports = router