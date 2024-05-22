const { Schema, model, isObjectIdOrHexString, isValidObjectId } = require ('mongoose')

const ObjectId = Schema.Types.ObjectId;

const UsuarioSchema = Schema({
    nombre:{
        type:String,
        required: true,
    },
    email:{
        type:String,
        required: true,
        unique: true,
    },
    password:{
        type:String,
        required: true,
    },
    friends:{
        type:Array,
        required: true,
    },
    bands:{
        type:Array,
        required: true,
    },
    albums:{
        type:Array,
        required: true,
    },
    posts:{
        type:Array,
        required: true,
    },
    profileImg:{
        type:String
    },
    bgimg:{
        type:String
    },
    img:{
        type:String,
    },
    role:{
        type:String,
        required: true,
        default: 'USER_ROLE',
    },
    google:{
        type:Boolean,
        default:false
    },
})

module.exports = model('Usuario', UsuarioSchema)