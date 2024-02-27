import {
    createService , 
    findAllServices , 
    countNews , 
    topNewsService , 
    findByIdService , 
    searchByTitleService,
    byUserService,
    updateService,
    eraseService,
    likeNewsService,
    deletelikeNewsService,
    addCommentService,
    deleteCommentService
} from "../services/news.service.js"


const create = async (req,res) => {
    try{
        const { title , text , banner} = req.body

        if(!title || !banner || !text){
            res.status(400).send({
                message : "Submit all fields for registration"
            })
        }

        await createService({
            title,
            text,
            banner,
            user: req.userId
        })

    res.send(201)
    } catch (err) {
        res.status(500).send(err.message)
    }


   
} 
export const findAll = async (req , res) => {
    try{
    let {limit , offset} = req.query;

    limit = Number(limit);
    offset = Number(offset);

    if(!limit){
        limit = 5
    }
    if(!offset){
        offset = 0
    }

    //console.log(typeof limit ,limit , typeof offset , offset)

    const news = await findAllServices(offset , limit);

    const total = await countNews()

    const currentUrl = req.baseUrl

    const next = offset + limit
    const nextUrl = 
    next < total ? `${currentUrl}?limit=${limit}&offset=${next}` : null

    const previous = offset - limit < 0 ? null : offset - limit;
    const previusUrl =
     previous != null ? `${currentUrl}?limit=${limit}&ofsset=${previous}` : null

    /*
    if(news.length === 0){
        return res.status(400).send({
            message: "there are no registered news"
        })
    }
    */
    news.shift()

    res.send(
        {
        nextUrl ,
        previusUrl,
        limit,
        offset,
        total,

        results: news.map((item) => ({
            id: item._id,
            title: item.title,
            text: item.text,
            banner: item.banner,
            likes: item.likes,
            comments: item.comments,
            name: item.user.name,
            username: item.user.username,
            userName: item.user.name,
            useravatar:item.user.avatar,
        })),
    })

    }catch (err) {
        res.status(500).send(err.message)
    }
    
}
export const topNews = async (req,res) => {
try {

    const news = await topNewsService()

    if(!news){
        return res.status(400).send({message: "There is no registered post"})
    }
    res.send({
    news: {
        id: news._id,
        title: news.title,
        text: news.text,
        banner: news.banner,
        likes: news.likes,
        comments: news.comments,
        name: news.user.name,
        username: news.user.username,
        userName: news.user.name,
        useravatar:news.user.avatar,
        }
    })

    } catch (err) {
        res.status(500).send(err.message)
    }


 
}
export const findById = async(req,res) => {
    try{
        const { id } = req.params

        const news = await findByIdService(id)

        return res.send({
        news: {
            id: news._id,
            title: news.title,
            text: news.text,
            banner: news.banner,
            likes: news.likes,
            comments: news.comments,
            name: news.user.name,
            username: news.user.username,
            userName: news.user.name,
            useravatar:news.user.avatar,
            }
        })
    } catch (err) {
        res.status(500).send(err.message)
    }
}
export const searchByTitle = async(req,res) =>{
    try {
        const {title} = req.query

        const news = await searchByTitleService(title)

        if(news.length === 0 ){
            return res
            .status(400)
            .send({message: "There are no posts with this title"})

        }

        return res.send({
            results: news.map((item) => ({
                id: item._id,
                title: item.title,
                text: item.text,
                banner: item.banner,
                likes: item.likes,
                comments: item.comments,
                name: item.user.name,
                username: item.user.username,
                userName: item.user.name,
                useravatar:item.user.avatar,
            })),
        })

    } catch (err) {
        res.status(500).send(err.message)
    }
}
export const byUser = async (req,res) => {
    try {
        const id = req.userId
        const news = await byUserService(id)

        //return res.send("rota ok byUser")
        return res.send({
            results: news.map((item) => ({
                id: item._id,
                title: item.title,
                text: item.text,
                banner: item.banner,
                likes: item.likes,
                comments: item.comments,
                name: item.user.name,
                username: item.user.username,
                userName: item.user.name,
                useravatar:item.user.avatar,
            })),
        })

    } catch (err) {
        res.status(500).send(err.message)
    }
}
export const update = async ( req,res) => {
    try{
        const {title, text, banner} = req.body
        const { id } = req.params

        //validação com & pois pode mandar qualquer um ou mais dos campos 
        if(!title && !banner && !text){
            res.status(400).send({
                message : "Submit at least onde field to update the News"
            })
        }
        const news = await findByIdService(id)
        //news.user._id == Objeto ------ req.userId == String 
        // nao usar == pq verifica a tipagem do dado
        if(news.user._id != req.userId){
            res.status(400).send({
                message : "You didn't update this News"
            })
        }

        await updateService(id , title , text , banner) // mesma ordem do news.service na função updateService
        return res.send({message: "News successfully update!" })
    } catch (err) {
        res.status(500).send(err.message)
    }

}
export const erase = async (req,res) => {
    try {
        const { id } = req.params

        const news = await findByIdService(id)

        if(news.user._id != req.userId){
            res.status(400).send({
                message : "You didn't delete this News"
            })
        }
        await eraseService(id)

        return res.send({message: "News deleted successfully!" })
    } catch (err) {
        res.status(500).send(err.message)
    }
}
export const likeNews = async (req,res) =>{
    try{

    const {id} = req.params
    const userId = req.userId

    const newsLiked = await likeNewsService(id, userId)
    
    if(!newsLiked){
        await deletelikeNewsService (id,userId)
        return res.status(200).send({message: "like removido com sucesso!"})
    }

    res.send({message: "OK , voce deu like na postagem!"})

    } catch (err) {
        res.status(500).send(err.message)
    }


    
}
export const addComment = async (req,res) =>{
    try{
    const {id} = req.params
    const userId = req.userId
    const {comment} = req.body
    //comentario descontruido para ficar melhor de visualizar na resposta

    if(!comment) {
        return res.status(400).send({message: "Write a message to comment" })
    }

    await addCommentService(id , comment , userId)

    res.send({
        message: "Comment sucessfully completed!"
    })

    } catch (err) {
        res.status(500).send(err.message)
    }
    
}
export const deleteComment = async (req,res) =>{
    try{
        const {idNews, idComment} = req.params
        const userId = req.userId
    
        const commentDeleted = await deleteCommentService(idNews, idComment ,userId)

        const commentFinder = commentDeleted.comments.find(
        (comment) => comment.idComment === idComment
        )
            
        if(!commentFinder){
            return res.status(404).send({message: "Comment not found"})
        }

        if(commentFinder.userId !== userId){
            return res.status(400).send({message: "You can't delete this comment"})
        }

        res.send({
            message: "Comment sucessfully removed!"
        })
    
        } catch (err) {
            res.status(500).send(err.message)
        }
        
}


export { create }