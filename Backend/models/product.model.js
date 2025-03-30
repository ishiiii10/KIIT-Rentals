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
    category: {
        type: String,
        enum: ['books', 'vehicles', 'snacks', 'clothing'],
        default: 'books',
        required: true
    },
    address: {
        type: String,
        required: false
    },
    deadline: {
        type: String,
        required: false
    },
    expiry: {
        type: String,
        required: false
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