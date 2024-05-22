const { default: mongoose } = require('mongoose');
const User = require('../models/usuario.model')

const followBand = async( req, res )=>{

    const userId = req.params.uid;
    
    try {
        const usuario = await User.findById(userId)
        const bands = usuario.bands
        const { fid, follow} = req.body;
        console.log(fid)
        let bandsUpd = ''
        if(!usuario){
            return res.status(404).json({
                ok: false,
                msg: 'No estas loggeado'
            }); 
        }
        
        //Actualizaciones

        if(follow==='follow'){
            bands.push(fid) 
            bandsUpd = bands
        }
        else if(follow==='unfollow'){
            bandsUpd = bands.filter(band => band != fid) 
        }
        
        const usuarioActualizado = await User.findByIdAndUpdate( userId, {$set:{bands: bandsUpd}})
        console.log(usuarioActualizado)

        res.json({
            ok:true,
            usuarioActualizado
        })
    } catch (error) {
        res.status(400).json({
            ok:false,
            error
        })
        
    }

}


const followAlbum = ( req, res )=>{

}
const followUser = async ( req, res )=>{
    const userId = req.params.uid;
    
    try {
        const usuario = await User.findById(userId)
        const friends = usuario.friends
        const { fid, follow} = req.body;
        console.log(fid)
        let friendsUpd = ''
        if(!usuario){
            return res.status(404).json({
                ok: false,
                msg: 'No estas loggeado'
            }); 
        }
        
        //Actualizaciones

        if(follow==='follow'){
            friends.push(fid) 
            friendsUpd = friends
        }
        else if(follow==='unfollow'){
            friendsUpd = friends.filter(friend => friend != fid) 
        }
        
        const usuarioActualizado = await User.findByIdAndUpdate( userId, {$set:{friends: friendsUpd}})
        console.log(usuarioActualizado)

        res.json({
            ok:true,
            usuarioActualizado
        })
    } catch (error) {
        res.status(400).json({
            ok:false,
            error
        })
        
    }

}

module.exports = {
    followBand,
    followAlbum,
    followUser,
}