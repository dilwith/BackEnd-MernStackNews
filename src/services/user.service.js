import User from "../models/User.js"

const createService = (body) => User.create(body) //JSON "nome" : "gabriel"

const findAllService = () => User.find();

const findByIdService = (id) => User.findById(id)

const updateService = (id ,name , usuario , senha , cpf , email , avatar , background) =>
User.findOneAndUpdate(
    {_id:id} , 
    {name , usuario , senha , cpf , email , avatar , background}
    )
    //quebrado por causa da identação

export default {
    createService,
    findAllService,
    findByIdService,
    updateService,
}