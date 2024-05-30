const usuarioModel = require('../models/usuario.model')
const Usuario = require('../models/usuario.model')

const getUsuarios = async( req, res )=>{
    try{
        const desde = Number(req.query.desde) || 0;
        const limit = Number(req.query.limit) || 0;

        const [usuarios, total] = await Promise.all([
            Usuario
                .find({}, 'nombre email role google img bgimg bands friends' )
                .skip( desde )
                .limit( limit ),

            Usuario.countDocuments()
        ])

        // const usuarios = await Usuario
        //                                 .find({}, 'nombre email role google' )
        //                                 .skip( desde )
        //                                 .limit( 5 )

        // const total = await Usuario.count();

        res.json(
            {
                ok: true,
                usuarios,
                total
                
            }
        )
    } catch (error) {
        res.status(400).json({
            ok:false,
            error
        })
        
    }

}

const getUsuario = async( req, res )=>{

    const email = String(req.params.email);
try {
    usuario = await Usuario.findOne({ email })

    res.json(
        {
            ok: true,
            usuario
            
        }
    )
    
} catch (error) {
    res.status(400).json({
        ok:false,
        error
    })
}

}



const crearUsuarios = async( req, res )=>{
    try{
        console.log(req.body)

        const {email, password, nombre} = req.body;

        const usuario = new Usuario(req.body)

        await usuario.save();


        res.json({
            ok:true,
            usuario
        })
    } catch (error) {
        res.status(400).json({
            ok:false,
            error
        })
        
    }

}



const actualizarUsuarios = async( req, res )=>{
    const uid = req.params.userid;
    try {
    
        const usuarioDB = await Usuario.findById(uid);

        if(!usuarioDB){
            return res.status(404).json({
                ok: false,
                msg: 'No existe un usuario por ese ID'
            }); 
        }
        
        //Actualizaciones
        const { password, google, email, ...campos} = req.body;

        if( usuarioDB.email !== email){
            const existeEmail = await Usuario.findOne({ email });
            if(existeEmail){
                return res.status(400).json({
                    ok: false,
                    msg: ' Ya existe un usuario con ese email'
                })
            }
        }
        if(!usuarioDB.google){
            campos.email = email
        }
        else if( usuarioDB.email !== email ){
            return res.status(400).json({
                ok: false,
                msg: 'Usuario de google no pueden cambiar su correo'
            })
        }
        
        const usuarioActualizado = await Usuario.findByIdAndUpdate( uid, campos, { new: true } )

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

const borrarUsuarios = ( req, res )=>{
    try {
        if(true){

            
            res.json({
                ok:true,
                usuarios: []
            })
        }
    } catch (error) {
        
        res.json({
            ok:false,
            usuarios: []
        })
    }


}

module.exports = {
    getUsuarios,
    getUsuario,
    crearUsuarios,
    actualizarUsuarios,
    borrarUsuarios
}