const { default: mongoose } = require('mongoose');
const Band = require('../models/band.model');
const User = require('../models/usuario.model');

const getBand = async( req, res )=>{
    try{
        const id = req.params.id;

        const band = await Band.findById(id)

        res.json(
            {
                ok: true,
                band
                
            }
        )
    } catch (error) {
        res.status(400).json({
            ok:false,
            error
        })
        
    }

}
const getBands = async( req, res )=>{
    try{
        const desde = Number(req.query.desde) || 0;
        const id = String(req.query.id) || '';

        
        const [bands, total] = await Promise.all([
            Band
                .find({}, 'name genre year regisDate img bgimg' )
                .skip( 0 ),

            Band.countDocuments()
        ])

        // const bands = await band
        //                                 .find({}, 'nombre email role google' )
        //                                 .skip( desde )
        //                                 .limit( 5 )

        // const total = await band.count();

        res.json(
            {
                ok: true,
                bands,
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


const getUserBands = async( req, res )=>{
    const desde = Number(req.query.desde) || 0;
    const id = req.params.id;
    
    try {
        const usuario = await User.findById(id)
        const bands = usuario.bands
        
        const bandsArr = [];
        // const total = usuario.friends.lenght 
        if(!usuario){
            res.status(400).json({
                ok:false,
                msg:'Error al cargar usuario'
            })
            return
        }
        
        if(!bands){
            res.status(400).json({
                ok:false,
                msg:'No sigues ninguna banda'
            })
            return
        }
        
        
        return Promise.all(bands.map((band)=>{
            
            
            if(mongoose.Types.ObjectId.isValid(band)){
                return Band.findById(band).then((b)=>{
                    if(b){

                        bandsArr.push(b)
                    }
                })
                
            }
        })).then(()=>{res.json(
            {
                
                ok: true,
                bandsArr               
                
            }
        )})
        
    } catch (error) {
        
        res.status(400).json({
            ok:false,
            error
        })
    }
}



const createBand = async( req, res )=>{
    
    console.log(req.body)

    const {year, genre, name, img, bgimg} = req.body;

    const band = new Band(req.body)

    try{
        await band.save();
        res.json({
            ok:true,
            band
        })

    }
    catch(error){       
        
        res.status(400).json({
            ok:false,
            error
        })
    }

}

const updateBand = async( req, res )=>{
    const uid = req.params.id;
    try {
    
        console.log(uid)
        const bandDB = await Band.findById(uid);
        if(!bandDB){
            return res.status(404).json({
                ok: false,
                msg: 'No existe un band por ese ID'
            }); 
        }
        
        const { name, img, year, genre } = req.body;
        const campos = { name, img, year, genre } 
        console.log(campos)
        
        const bandActualizado = await Band.findByIdAndUpdate( uid, campos, { new: true } )

        res.json({
            ok:true,
            bandActualizado
        })
    } catch (error) {
        res.status(400).json({
            ok:false,
            error
        })
        
    }



} 

const deleteBand = ( req, res )=>{
    try {
        if(true){

            
            res.json({
                ok:true,
                bands: []
            })
        }
    } catch (error) {
        
        res.json({
            ok:false,
            bands: []
        })
    }


}

module.exports = {
    getBand,
    getBands,
    getUserBands,
    createBand,
    updateBand,
    deleteBand
}