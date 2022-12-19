import mongoose, { Schema } from "mongoose";


const ProductS = new mongoose.Schema({
    name:{
        type: String,
    },
    id: {
        type: Number,
        default: 1
    },
    stock:{type: Number},
    category:{type: String,require:true},
    price: {
        type: Number,
        require: true,
    },
    img: {
        type: Buffer,
    },
 },
 {timestamps: true}
)

const Product = mongoose.model('Product', ProductS)

export default Product