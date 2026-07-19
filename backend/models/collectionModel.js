import mongoose from "mongoose";

const collectionSchema = new mongoose.Schema({
    name: { type: String, required: true },
    subtitle: { type: String, required: true },
    image: { type: String, required: true },
    date: { type: Number, required: true }
})

const collectionModel = mongoose.models.collection || mongoose.model("collection", collectionSchema);

export default collectionModel;
