import News from "../models/News.js";

const createService = (body) => News.create(body)

const findAllServices = (offset , limit) =>News.find().sort({_id : -1}).skip(offset).limit(limit).populate("user")

const countNews = () => News.countDocuments()

const topNewsService = () => News.findOne().sort({_id : -1}).populate("user")

const findByIdService = (id) => News.findById(id).populate("user")

export const searchByTitleService = (title) => News.find({title: {$regex: `${title || ""}` , $options: "i"}}).sort({_id : -1}).populate("user")

export const byUserService = (id) => News.find({user: id}).sort({_id : -1}).populate("user")

export const updateService = (id , title , text , banner) => News.findOneAndUpdate({_id: id}, {title , text , banner},{rawResult: true})// findOneAndUpdate função do proprio mongoose
//pode ter erro em updateService                             aqui ^
export const eraseService = (id) => News.findByIdAndDelete({_id: id})

export const likeNewsService = (idNews, userId) =>News.findOneAndUpdate(
    { _id: idNews, "likes.userId": { $nin: [userId] } }, 
    //filtro para nao deixar uma mesma pessoa dar like 2 vezes, o $nin é not in verificando o mesmo Id do usuario
    { $push: {likes: {userId, created: new Date() } } }
    //push para adicionar o like á postagem
)
export const deletelikeNewsService = (idNews, userId) =>News.findOneAndUpdate(
    { _id: idNews }, 
    { $pull: {likes: {userId} } }
)
export const addCommentService = (idNews, comment , userId) => {
    const idComment = Math.floor(Date.now() * Math.random()).toString(36)

        return News.findOneAndUpdate(
            {_id: idNews },
            {
                $push: {
                comments: {idComment, userId, comment,
                createdAt: new Date() }
            }
        }
    )
}//idNews, idComment ,userId
export const deleteCommentService = (idNews , idComment , userId) =>
News.findOneAndUpdate(
    { _id: idNews} , 
    { $pull: { comments: { idComment, userId } } } 
    )  

export {
    createService,
    findAllServices,
    countNews,
    topNewsService,
    findByIdService
}