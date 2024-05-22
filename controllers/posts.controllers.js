const Posts = require("../models/posts.model");

const getUserPosts = async( req, res )=>{

    const desde = Number(req.query.desde) || 0;
    const uid = req.params.uid;
    console.log('uid posts',uid)
    try {
        
        // const posts = await Posts.filter(post => post.img)
        const [posts, total] = await Promise.all([
            Posts
                .find({uid}, 'description img date uid moments' )
                .skip( 0 ),
            Posts.countDocuments()
        ])
        console.log("posts")

        // (post) => post.date === "15/09/23"
        
        // console.log('aqui',friends)
        // const postsArr = [];
        // // const total = usuario.friends.lenght 
        
        if(!posts){
            res.status(400).json({
                ok:false,
                msg:'No tienes posts'
            })
            return
        }

        return res.json(
            {
                ok: true,
                posts
                
                
            }
        )

        
    } catch (error) {
        
        res.status(400).json({
            ok:false,
            error
        })
    }
}

const getPosts = async( req, res )=>{

    const desde = Number(req.query.desde) || 0;
    const uid = req.params.uid;
    try {
        const [posts, total] = await Promise.all([
            Posts
                .find({}, 'description date uid img moments' )
                .skip( desde )
                .limit( 50 ),
            Posts.countDocuments()
        ])
        res.json(
            {
                ok: true,
                posts,
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



const createPost = async( req, res )=>{
    try{   
        console.log('post',req.body)

        const {description, date, uid, img, moment} = req.body;

        const post = new Posts(req.body)

        await post.save();


        res.json({
            ok:true,
            post
        })
    } catch (error) {
        res.status(400).json({
            ok:false,
            error
        })
        
    }

}

const updatePost = async( req, res )=>{
    const uid = req.params.postid;
    try {
    
        const postDB = await Post.findById(uid);

        if(!postDB){
            return res.status(404).json({
                ok: false,
                msg: 'No existe un post por ese ID'
            }); 
        }
        
        const postActualizado = await Post.findByIdAndUpdate( uid, campos, { new: true } )

        res.json({
            ok:true,
            postActualizado
        })
    } catch (error) {
        res.status(400).json({
            ok:false,
            error
        })
        
    }



} 

const deletePost = ( req, res )=>{
    try {
        if(true){

            
            res.json({
                ok:true,
                post: []
            })
        }
    } catch (error) {
        
        res.json({
            ok:false,
            post: []
        })
    }


}

module.exports = {
    getPosts,
    createPost,
    updatePost,
    deletePost,
    getUserPosts
}