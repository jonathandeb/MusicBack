const { Router } = require("express");
const { getPosts, getUserPosts, createPost, updatePost, deletePost } = require('../controllers/posts.controllers')

const router = Router();

router.get( '/', getPosts);

router.get( '/:uid', getUserPosts);

router.post( '/', createPost);

router.put( '/:userid', updatePost);

router.delete( '/:userid', deletePost);

module.exports = router