const fs = require('fs');
const User = require('../models/usuario.model')
const Band = require('../models/band.model')
const Album = require('../models/album.model')

const actualizarImagen = async ( tipo, param, id, nombreArchivo )=>{
    let elemento = [];
    
    console.log(`actualizarImagen ${id}, ${tipo}, ${nombreArchivo}`); 
    switch (tipo) {
        case 'usuarios':
            elemento = await User.findById(id)
            break;
        case 'bands':
            elemento = await Band.findById(id)         
            break;
        case 'albums':
            elemento = await Album.findById(id)
            break;    
        default:
            break;
    }
    
    if( !elemento ){ 
        console.log(`id no es un ${tipo}`); 
        return false; 
    }
    let pathViejo=`./uploads/no-img.jpeg` 
    if(param==='img'){
        pathViejo=`./uploads/${tipo}/${elemento.img}` 
    }else{
        pathViejo=`./uploads/${tipo}/${elemento.bgimg}` 
    }

    if(fs.existsSync( pathViejo ) ){
        fs.unlinkSync( pathViejo )
    }       

    if(param==='img'){
        elemento.img = nombreArchivo;
    }else{
        elemento.bgimg = nombreArchivo;
    }
    await elemento.save();
    return true
    

}
module.exports={
    actualizarImagen
}