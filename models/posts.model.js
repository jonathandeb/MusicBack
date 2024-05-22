const { Schema, model } = require ('mongoose')

const PostsSchema = Schema({
    description:{
        type:String,
    },
    date:{
        type:Number,
        required: true,
    },
    uid:{
        type:String,
        required: true,
    },
    moments:{
        type:String,
    },
    img:{
        type:String,
    },
})

module.exports = model('Posts', PostsSchema)