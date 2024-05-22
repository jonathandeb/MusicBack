const { Schema, model } = require ('mongoose')

const BandSchema = Schema({
    genre:{
        type:String,
        required: true,
        unique: false

    },
    name:{
        type:String,
        required: true,
        unique: true
    },
    year:{
        type:Number,
        required: true,
    },
    regisDate:{
        type:Number,
        required: true,
    },
    img:{
        type:String,
    },
    bgimg:{
        type:String,
    },
})

module.exports = model('Band', BandSchema)