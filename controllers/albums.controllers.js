const { default: mongoose } = require('mongoose');
const Album = require('../models/album.model')
const User = require('../models/usuario.model')

const getAlbums = async( req, res )=>{

    const desde = Number(req.query.desde) || 0;
    const id = req.params.id;
    
    try {
        const usuario = await User.findById(id)
        const albums = usuario.albums
        console.log(albums)
        
        const albumsArr = [];
        // const total = usuario.friends.lenght 
        if(!usuario){
            res.status(400).json({
                ok:false,
                msg:'Error al cargar usuario'
            })
            return
        }
        
        if(!albums){
            res.status(400).json({
                ok:false,
                msg:'No sigues ninguna album'
            })
            return
        }
        
        
        return Promise.all(albums.map((album)=>{
            
            console.log(album)
            if(mongoose.Types.ObjectId.isValid(album)){
            return Album.findById(album).then((a)=>{
                    albumsArr.push(a)
                })
            }
        })).then(()=>{res.json(
            {
                ok: true,
                albumsArr
                
                
            }
        )})
        
    } catch (error) {
        
        res.status(400).json({
            ok:false,
            error
        })
    }

}



const createAlbum = async( req, res )=>{
    try{   
        console.log(req.body)

        const {year, band, name} = req.body;

        const album = new Album(req.body)

        await album.save();


        res.json({
            ok:true,
            album
        })
    } catch (error) {
        res.status(400).json({
            ok:false,
            error
        })
        
    }

}

const updateAlbum = async( req, res )=>{
    const uid = req.params.userid;
    try {
    
        const albumDB = await Album.findById(uid);

        if(!albumDB){
            return res.status(404).json({
                ok: false,
                msg: 'No existe un album por ese ID'
            }); 
        }
        
        //Actualizaciones
        const { password, google, email, ...campos} = req.body;

        if( albumDB.email !== email){
            const existeEmail = await Album.findOne({ email });
            if(existeEmail){
                return res.status(400).json({
                    ok: false,
                    msg: ' Ya existe un album con ese email'
                })
            }
        }
        if(!albumDB.google){
            campos.email = email
        }
        else if( albumDB.email !== email ){
            return res.status(400).json({
                ok: false,
                msg: 'album de google no pueden cambiar su correo'
            })
        }
        
        const albumActualizado = await Album.findByIdAndUpdate( uid, campos, { new: true } )

        res.json({
            ok:true,
            albumActualizado
        })
    } catch (error) {
        res.status(400).json({
            ok:false,
            error
        })
        
    }



} 

const deleteAlbum = ( req, res )=>{
    try {
        if(true){

            
            res.json({
                ok:true,
                albums: []
            })
        }
    } catch (error) {
        
        res.json({
            ok:false,
            albums: []
        })
    }


}

module.exports = {
    getAlbums,
    createAlbum,
    updateAlbum,
    deleteAlbum
}