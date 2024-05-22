const { default: mongoose } = require("mongoose");
const User = require("../models/usuario.model");


const getFriends = async( req, res )=>{

    const desde = Number(req.query.desde) || 0;
    const uid = req.params.uid;
    
    try {
        const usuario = await User.findById(uid)
        const friends = usuario.friends
        
        console.log('load friends',friends)
        const friendsArr = [];
        // const total = usuario.friends.lenght 
        if(!usuario){
            res.status(400).json({
                ok:false,
                msg:'No estas loggeado'
            })
            return
        }
        
        if(!friends){
            res.status(400).json({
                ok:false,
                msg:'No tienes amigos'
            })
            return
        }
        
        
        // const [usuarios, total] = await Promise.all([
        //     User
        //         .find({}, 'nombre email role google img friends' )
        //         .skip( 0 )
        //         .limit( 3 ),
    
        //     User.countDocuments()
        // ])
        return Promise.all(friends.map((friend)=>{
            
            if(mongoose.Types.ObjectId.isValid(friend)){
            return User.findById(friend).then((f)=>{
                    friendsArr.push(f)
                })
            }
        })).then(()=>{res.json(
            {
                ok: true,
                friendsArr
                
                
            }
        )})
        
    } catch (error) {
        
        res.status(400).json({
            ok:false,
            error
        })
    }
}



const addFriends = async( req, res )=>{
 
    try{
        console.log(req.body)

        const {description, img, date, uid} = req.body;

        const friends = new friendss(req.body)

        await friends.save();


        res.json({
            ok:true,
            friends
        })
    } catch (error) {
        res.status(400).json({
            ok:false,
            error
        })
        
    }

}

const deleteFriend = ( req, res )=>{
    try {
        if(true){

            
            res.json({
                ok:true,
                friends: []
            })
        }
    } catch (error) {
        
        res.json({
            ok:false,
            friends: []
        })
    }
}

module.exports = {
    getFriends,
    addFriends,
    deleteFriend
}