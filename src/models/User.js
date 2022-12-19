import mongoose from "mongoose";
import validator from "validator";


const Schema = new mongoose.Schema(
    {
        name:{
            type:String,
            require: true,
            trim: true,
        },
        email: {
            type: String,
            unique: true,
            require: true,
            trim: true,
            lowercase: true,
            validate(value) {
                if(!validator.isEmail(value)) {
                    throw new Error('Email is invalid')
                }
            },
        },
        age: {
            type: Number,
            default: 0,
            validate(value) {
                if(value < 0){
                    throw new Error("Age must be a postive number")
                }
            },
        },
        password: {
            type: String,
            require: true,
            trim: true,
            minlenght:7,
        },
        isAdmin :{
            type: Boolean,
            default: false
        },
    },
    {
    timestamps: true,
    }
)

const User = mongoose.model('User', Schema)

export default User