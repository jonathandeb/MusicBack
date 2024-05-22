const { Router } = require("express");
const { followBand, followAlbum, followUser } = require("../controllers/follow.controllers");

const router = Router();

router.put( '/band/:uid', followBand);

router.put( '/album/:uid', followAlbum);

router.put( '/user/:uid', followUser);

module.exports = router