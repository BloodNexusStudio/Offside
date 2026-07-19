import { v2 as cloudinary } from "cloudinary"
import collectionModel from "../models/collectionModel.js"

// function for add collection
const addCollection = async (req, res) => {
    try {
        const { name, subtitle } = req.body
        const image = req.files.image && req.files.image[0]

        if (!name || !subtitle || !image) {
            return res.json({ success: false, message: "Missing required fields" })
        }

        let imageUrl = ""
        if (image) {
            let result = await cloudinary.uploader.upload(image.path, { resource_type: 'image' })
            imageUrl = result.secure_url
        }

        const collectionData = {
            name,
            subtitle,
            image: imageUrl,
            date: Date.now()
        }

        const collection = new collectionModel(collectionData);
        await collection.save()

        res.json({ success: true, message: "Collection Added" })

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

// function for list collections
const listCollections = async (req, res) => {
    try {
        const collections = await collectionModel.find({})
        res.json({ success: true, collections })
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

// function for removing collection
const removeCollection = async (req, res) => {
    try {
        await collectionModel.findByIdAndDelete(req.body.id)
        res.json({ success: true, message: "Collection Removed" })
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

export { addCollection, listCollections, removeCollection }
