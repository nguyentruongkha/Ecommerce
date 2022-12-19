import mongoose from "mongoose";

const OderS = new mongoose.Schema({
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
status: {type: String, default: 'pending'}
},
 {timestamps: true}
)

const Order = mongoose.model('Order', OderS)

export default Order