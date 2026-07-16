import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    mainPrice: { type: Number },
    image: { type: Array, required: true },
    category: { type: String, required: true },
    subCategory: { type: String, required: true },
    productCollection: { type: String, default: "None" },
    sizes: { type: Array, required: true },
    bestseller: { type: Boolean },
    newDrop: { type: Boolean, default: false },
    fit: { type: String, default: "Regular Fit" },
    colors: { type: Array, default: [] },
    date: { type: Number, required: true },
    reviews: [{
        userId: { type: String, required: true },
        name: { type: String, required: true },
        rating: { type: Number, required: true },
        text: { type: String, required: true },
        date: { type: Number, required: true },
        replies: [{
            userId: { type: String, required: true },
            name: { type: String, required: true },
            text: { type: String, required: true },
            date: { type: Number, required: true },
            isAdmin: { type: Boolean, default: false }
        }]
    }]
})

const productModel  = mongoose.models.product || mongoose.model("product",productSchema);

export default productModel