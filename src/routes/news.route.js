import {Router} from 'express'
const route = Router()

import { 
    create ,
    findAll ,
    topNews ,
    findById ,
    searchByTitle,
    byUser,
    update,
    erase,
    likeNews, 
    addComment,
    deleteComment
} from "../controllers/news.controller.js"

import {authMiddleware} from "../middlewares/auth.middleware.js"
route.get("/", findAll)
route.get("/top" , topNews)
route.get("/search" , searchByTitle)
route.post("/create", authMiddleware ,create)
route.get("/byIdPost/:id" , authMiddleware, findById)
route.get("/byUserId", authMiddleware , byUser)
route.patch("/update/:id" , authMiddleware , update)
route.delete("/delete/:id",authMiddleware , erase)
route.patch("/like/:id", authMiddleware, likeNews)
route.patch("/comment/:id", authMiddleware, addComment)
route.patch("/comment/:idNews/:idComment", authMiddleware, deleteComment)


export default route