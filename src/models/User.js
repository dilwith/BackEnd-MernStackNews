import mongoose from 'mongoose'

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required : true,
    }, 
    usuario: {
        type: String,
        required : true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
     senha: {
        type: String,
        required : true,
        select : false
    },
    avatar: {
      type: String,
      required: false,
    },
    background: {
      type: String,
      required: false,
    }
})
/*
 name: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
    select: true,
  },
  avatar: {
    type: String,
    required: true,
  },
  background: {
    type: String,
    required: true,
  },

----------------------------------------------------------
Para usar junto do Bcrypt -- atualmente desinstalado, se clocado precisa de verificaçoes no auth.controller

UserSchema.pre("save", async function (next) {
    this.senha = await bcrypt.hash(this.senha , 6)
    next()
})
*/

const User = mongoose.model("User", UserSchema)

export default User;