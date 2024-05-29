const {response} = require("express")
const path = require('path')
const fs = require('fs')
const { v4: uuidv4 } = require('uuid');
const { actualizarImagen } = require("../helpers/actualizar-imagen");
const multer = require('multer');
const { getStorage, ref, getDownloadURL, uploadBytesResumable } = require('firebase/storage');




const storage = getStorage();
const upload = multer({storage: multer.memoryStorage()});

const fileUpload = async(req, res = response)=>{

    const tipo = req.params.tipo;
    const id = req.params.id;
    const param = req.params.param;

    //Validar tipo
    const tiposValidos = ['usuarios','bands','albums'];
    if(!tiposValidos.includes(tipo)){
        return res.status(400).json({
            ok: false,
            smg: 'No es un tipo valido'
        })
    }
    //Validar que existe el archivo
    if(!req.files || Object.keys(req.files).length===0){
        return res.status(400).json({
            ok: false,
            msg: 'No hay ningun archivo'
        })
    }
    //Procesar la imagen
    const file = req.files.imagen;
    const metadata={
        contentType: file.mimetype,
    }
    const nombreCortado = file.name.split('.');
    const extensionArchivo = nombreCortado [ nombreCortado.length -1 ];
    
    //Validar extension
    const extensionesValidas = ['png', 'jpg', 'jpeg','gif']
    if(!extensionesValidas.includes(extensionArchivo)){
        return res.status(400).json({
            ok: false,
            msg: 'No es una imagen permitida'
        })
    }

    //Generar el nombre del archivo
    const nombreArchivo = `${ uuidv4() }.${extensionArchivo}`

    //Path para guardar la imagen
    // const path = `./uploads/${tipo}/${nombreArchivo}`;
    // const path = `./archivos/${tipo}/${nombreArchivo}`;
    const storageRef = ref(storage, `archivos/${tipo}/${nombreArchivo}`)
    ///////
    //Path para guardar la imagen
    const snapshot = await uploadBytesResumable(storageRef, file.data, metadata)
    const downloadURL = await getDownloadURL(snapshot.ref)
    actualizarImagen( tipo, param, id, downloadURL );
    res.json({
        ok: true,
        msg: 'Archivo subido',
        nombreArchivo,
        downloadURL
    })
     // Mover la imagen
    // file.mv(path, (err) => {
    //     if (err)
    //     {
    //         console.log(err)
    //         return res.status(500).json({
    //             ok: false,
    //             msg: 'Error al mover el archivo'
    //         })

    //     }
    //     // Actualizar base de datos
    //     actualizarImagen( tipo, param, id, nombreArchivo );

    //     res.json({
    //         ok: true,
    //         msg: 'Archivo subido',
    //         nombreArchivo
    //     })
    // });

}

// const filePostUpload = async (req, res = response)=>{
const filePostUpload = async (req, res = response)=>{
    try{        
        const tipo = req.params.tipo;
        const id = req.params.id; 
        
        // Validar tipo
        const tiposValidos = ['posts'];
        if(!tiposValidos.includes(tipo)){
            return res.status(400).json({
                ok: false,
                smg: 'No es un tipo valido'
            })
        }
        //Validar que existe el archivo
        if(!req.files || Object.keys(req.files).length===0){
            return res.status(400).json({
                ok: false,
                msg: 'No hay ningun archivo'
            })
        }
        //Procesar la imagen
        const file = req.files.imagen;
        const metadata={
            contentType: file.mimetype,
        }
        const nombreCortado = file.name.split('.');
        const extensionArchivo = nombreCortado [ nombreCortado.length -1 ];
        
        //Validar extension
        const extensionesValidas = ['png', 'jpg', 'jpeg','gif']
        if(!extensionesValidas.includes(extensionArchivo)){
            return res.status(400).json({
                ok: false,
                msg: 'No es una imagen permitida'
            })
        }
        
        //Generar el nombre del archivo
        const nombreArchivo = `${ uuidv4() }.${extensionArchivo}`
        ///////
        const storageRef = ref(storage, `archivos/${tipo}/${nombreArchivo}`)
        ///////
        //Path para guardar la imagen
        const path = `./archivos/${tipo}/${nombreArchivo}`;
        const snapshot = await uploadBytesResumable(storageRef, file.data, metadata)
        const downloadURL = await getDownloadURL(snapshot.ref)
        // return res.send({
        //     message: 'file uploaded',
        //     name: nombreArchivo,
        //     type: file.memetype,
        //     downloadURL: downloadURL
        // })
        
        // Mover la imagen
        res.json({
            ok: true,
            msg: 'Archivo subido',
            nombreArchivo,
            downloadURL
        })
        // file.mv(downloadURL, (err) => {
        //     if (err)
        //         {
        //         console.log(err)
        //         return res.status(500).json({
        //             ok: false,
        //             msg: 'Error al mover el archivo'
        //         })            
        //     }
        //     // Actualizar base de datos         
            
        // });
    }catch(error){
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: error
        })

    }

}

const retornaImagen = (req,res=response) =>{
    const tipo = req.params.tipo;
    const foto = req.params.foto;
    const param = req.params.param;

    const pathImg = path.join( __dirname, `../uploads/${tipo}/${foto}` )
    if( fs.existsSync( pathImg ) ){
        res.sendFile( pathImg ) 
    }else{
        const pathImg = path.join( __dirname, `../uploads/no-img.jpeg` )
        res.sendFile( pathImg ) 
    }
}

module.exports = {
    fileUpload,
    retornaImagen,
    filePostUpload
}


