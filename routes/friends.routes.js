const { Router } = require("express");
const { getFriends, addFriends, deleteFriend } = require("../controllers/friends.controllers");

const router = Router();

router.get( '/:uid', getFriends);

router.put( '/:uid', addFriends);

// router.put( '/:userid', updateBand);

router.delete( '/:uid', deleteFriend);

module.exports = router