// const { text } = require("express")
const mongoose = require("mongoose")

mongoose.connect("mongodb://0.0.0.0:27017/LoginSignUpproject")


    .then(() => {
        console.log("Mongodb Connected")
    })

    .catch(() => {
        console.log('error')
    })


    const LogInSchema = mongoose.Schema({
        name:{
            type:String,
            required:true
        },

        password:{
            type:String,
            required:true
        }
    })

    const Collection1=new mongoose.model("Loginproject",LogInSchema)

    module.exports=Collection1

