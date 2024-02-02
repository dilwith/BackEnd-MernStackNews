import mongoose from 'mongoose'

const connetcDatabase = () => {
    console.log("esperando a coneção com o banco de dados")

    mongoose.connect( process.env.MONGO_URI
    )
    .then(() =>console.log("MongoDB Atlas Connected"))
    .catch((error) => console.log(error))
}

export default connetcDatabase