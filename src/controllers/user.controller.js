import userService from '../services/user.service.js'

const create = async (req , res) => {
  try 
{
  const {name , usuario , senha  , email , avatar , background} = req.body

  if(!name || !usuario || !senha  || !email ) {
    res.status(400).send({message : "Submit all fields for registration (avatar and backgroud not need"})
  }

  const user = await userService.createService(req.body)

  if(!user){
    return res.status(400).send({ message: "error creating User"})
    
  }

  //testar para ver se remover o senha daqui para nao mostrar para o usuario a senha mas se ela aparece no banco de dados ainda cryptografada
  res.status(201).send({ 
    message: "User created successfully",
    user: {
      id : user._id,
      name, 
      usuario,
      email,
      avatar,
      background
    }
  })
} catch(err) {
  res.status(500).send({message:err.message})
}} // Cria o usario e o insere no banco de dados  

const findAll = async (req , res) => {
  try
{
  const users = await userService.findAllService(); 

  if(users.length === 0) {
    return res.status(400).send({message: "Nao tem usuarios cadastrados"})
  }

  res.send(users)
}catch(err) {
  res.status(500).send({message:err.message})
}}// findAll busca todos os usuarios cadastrados 

const findById = async (req , res) => {
  const user = req.user

  res.send(user)
}// FindById busca 1 usuario pelo seu Id

const update = async (req,res) => {
  try
{
    const {name , usuario , senha   ,email , avatar , background} = req.body

  if(!name && !usuario && !senha && !email && !avatar && !background) {
    res.status(400).send({message : "Digite ao menos 1 campo para atualização do usuario"}) // if para checar todos os campos para poder atualizar 1 campo, precisa de 1 campo no minimo mas pode ter varios
  }
  const id = req.id;   // const {id , user} = req (possivel mudança)

  await userService.updateService(
    id,
    name,
    usuario,
    senha,
    email,
    avatar ,        //|| null,
    background      //|| null
  )
  res.send({message:"Usuario atualizado com sucesso"})
}
catch(err) {
  res.status(500).send({message:err.message})
}
  
}// Atualiza o dado ou os dados de 1 usuario 

export default { create , findAll , findById , update};

// atualizado para email avatar background
//possivel erro escrever background errado u.u  (bankgroud)