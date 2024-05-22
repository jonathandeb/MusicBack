// api/uploads

const {Router} = require('express');
const expressFileUpload = require('express-fileupload');
const { fileUpload, filePostUpload, retornaImagen } = require('../controllers/uploads.controllers');

const router = Router();

//Rutas
router.use( expressFileUpload() )
router.put('/:tipo/:param/:id', fileUpload)
router.post('/:tipo/:id', filePostUpload)
router.get('/:tipo/:foto', retornaImagen)


module.exports = router; 