import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    type: {
        type: String,
        enum: ['sale', 'rent'],
        default: 'sale',
        required: true
    },
    phone: {
        type: String,
        required: true
    }
}, {
    timestamps: true // createdAt,updatedAt
}
);

const Product = mongoose.model('Product',productSchema);

export default Product;