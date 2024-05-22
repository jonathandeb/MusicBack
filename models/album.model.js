const { Schema, model } = require ('mongoose')

const AlbumSchema = Schema({
    name:{
        type:String,
        required: true,
    },
    band:{
        type:String,
        required: true,
    },
    year:{
        type:Number,
        required: true,
    },
    img:{
        type:String,
    },
})

module.exports = model('Album', AlbumSchema)