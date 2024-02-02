import News from "../models/News.js";
import news from "../models/News.js";

const createService = (body) => news.create(body)

const findAllServices = (offset , limit) =>news.find().sort({_id : -1}).skip(offset).limit(limit).populate("user")

const countNews = () => news.countDocuments()

const topNewsService = () => news.findOne().sort({_id : -1}).populate("user")

const findByIdService = (id) => news.findById(id).populate("user")

export const searchByTitleService = (title) => news.find({
    title: {$regex: `${title || ""}` , $options: "i"}}).sort({_id : -1}).populate("user")

export const byUserService = (id) => news.find({user: id})
.sort({_id : -1}).populate("user")

export const updateService = (id , title , text , banner) => newsews.findOneAndUpdate({_id: id}, {title , text , banner},{rawResult: true})// findOneAndUpdate função do proprio mongoose
//pode ter erro em updateService                             aqui ^
export const eraseService = (id) => news.findByIdAndDelete({_id: id})

export const likeNewsService = (idNews, userId) =>news.findOneAndUpdate(
    { _id: idNews, "likes.userId": { $nin: [userId] } }, 
    //filtro para nao deixar uma mesma pessoa dar like 2 vezes, o $nin é not in verificando o mesmo Id do usuario
    { $push: {likes: {userId, created: new Date() } } }
    //push para adicionar o like á postagem
)
export const deletelikeNewsService = (idNews, userId) =>news.findOneAndUpdate(
    { _id: idNews }, 
    { $pull: {likes: {userId} } }
)
export const addCommentService = (idNews, comment , userId) => {
    const idComment = Math.floor(Date.now() * Math.random()).toString(36)

        return news.findOneAndUpdate(
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
  news.findOneAndUpdate(
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