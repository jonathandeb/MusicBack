const { response } = require("express");
var bcrypt = require('bcryptjs');

const Usuario = require('../models/usuario.model');
const { generarJWT } = require("../helpers/jwt");
const { googleVerify } = require("../helpers/google-verify");

const login = async ( req, res = response) =>{

    const { email, password } = req.body;

    try {

        //Poner un delay de 1 segundo para los bombardeos al login

        //Verificar email
        const usuarioDB = await Usuario.findOne({email});
        console.log(usuarioDB)
        if(!usuarioDB){
            return res.status(404).json({
                ok: false,
                msg: 'Email no valido'
            })
        }

        //Verificar contrasena
        let validPassword=false
        if(password===usuarioDB.password){ validPassword = true } else validPassword=false
        if( !validPassword ){
            return res.status(400).json({
                ok: false,
                msg: 'Contrasena no valida'
            })
        }

        //Generar el TOKEN
        const token = await generarJWT(usuarioDB._id)


        res.json({
            ok: true,
            token
            // menu: getMenuFrontEnd(usuarioDB.role)
        })
        
    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })
    }
}

const googleSignIn = async ( req, res = response) =>{

    try {
        // console.log(req.body.token)
        const { email, name, picture } = await googleVerify( req.body.token ) 

        const usuarioDB = await Usuario.findOne({ email })
        let usuario;

        if( !usuarioDB ){
            usuario = new Usuario({
                nombre: name,
                email,
                password:'@@@',
                img: picture,
                google: true
            })
        }
        else{
            usuario = usuarioDB;
            usuario.google = true;
            // usuario.password = '@@'

        }

        await usuario.save();

        //Generar el TOKEN
        const token = await generarJWT(usuario._id)

        res.json({ 
            ok: true,
            email, name, picture,
            token
        })
    } catch (error) {
        console.log(error)
        res.status(400).json({ 
            ok: false,
            msg: 'Token de Google no es correcto'
        })
        
    }


}

const renewToken = async (req, res = response)=>{
    try{
        const uid = req.uid;
    //Gnerar token - jwt
        const token = await generarJWT( uid );

    //Obtener el usuario por uid
        const usuario = await Usuario.findById(uid)

        console.log(usuario.uid)
        res.json({
            ok:true,
            token,
            usuario,
            uid
            // menu: getMenuFrontEnd(usuario.role)
        })
    } catch (error) {
        res.status(400).json({
            ok:false,
            error
        })
        
    }

}

module.exports = {
    login,
    googleSignIn,
    renewToken
} 