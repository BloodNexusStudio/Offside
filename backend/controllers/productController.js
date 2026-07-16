import { v2 as cloudinary } from "cloudinary"
import productModel from "../models/productModel.js"
import userModel from "../models/userModel.js"

// function for add product
const addProduct = async (req, res) => {
    try {

        const { name, description, price, mainPrice, category, subCategory, productCollection, sizes, bestseller, newDrop, colorsData, fit } = req.body

        let parsedColorsData = [];
        if (colorsData) {
            parsedColorsData = JSON.parse(colorsData);
        }

        let globalImagesUrl = [];
        let finalColors = [];

        if (parsedColorsData.length > 0) {
            for (let i = 0; i < parsedColorsData.length; i++) {
                const colorName = parsedColorsData[i];
                // Find all files matching this color: image_{colorName}_{index}
                const colorFiles = req.files.filter(file => file.fieldname.startsWith(`image_${colorName}_`));
                
                let colorImagesUrl = await Promise.all(
                    colorFiles.map(async (item) => {
                        let result = await cloudinary.uploader.upload(item.path, { resource_type: 'image' });
                        return result.secure_url;
                    })
                );

                finalColors.push({
                    colorName,
                    images: colorImagesUrl
                });

                if (i === 0) {
                    globalImagesUrl = colorImagesUrl; // First color acts as the global image
                }
            }
        } else {
            // Backward compatibility for forms without colors
            const image1 = req.files.find(f => f.fieldname === 'image1');
            const image2 = req.files.find(f => f.fieldname === 'image2');
            const image3 = req.files.find(f => f.fieldname === 'image3');
            const image4 = req.files.find(f => f.fieldname === 'image4');
            const image5 = req.files.find(f => f.fieldname === 'image5');
            const image6 = req.files.find(f => f.fieldname === 'image6');

            const images = [image1, image2, image3, image4, image5, image6].filter((item) => item !== undefined)

            globalImagesUrl = await Promise.all(
                images.map(async (item) => {
                    let result = await cloudinary.uploader.upload(item.path, { resource_type: 'image' });
                    return result.secure_url
                })
            )
        }

        const productData = {
            name,
            description,
            category,
            price: Number(price),
            mainPrice: mainPrice ? Number(mainPrice) : 0,
            subCategory,
            productCollection: productCollection || "None",
            bestseller: bestseller === "true" ? true : false,
            newDrop: newDrop === "true" ? true : false,
            fit: fit || "Regular Fit",
            sizes: JSON.parse(sizes),
            image: globalImagesUrl,
            colors: finalColors,
            date: Date.now()
        }

        console.log("Saving product data:", productData);

        const product = new productModel(productData);
        await product.save()

        res.json({ success: true, message: "Product Added" })

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

// function for update product
const updateProduct = async (req, res) => {
    try {
        const { id, name, description, price, mainPrice, category, subCategory, productCollection, sizes, bestseller, newDrop, existingColors, fit } = req.body;

        const product = await productModel.findById(id);
        if (!product) {
            return res.json({ success: false, message: "Product not found" })
        }

        let parsedExistingColors = [];
        if (existingColors) {
            parsedExistingColors = JSON.parse(existingColors);
        }

        let finalColors = [];
        let globalImagesUrl = product.image;

        if (parsedExistingColors.length > 0) {
            for (let i = 0; i < parsedExistingColors.length; i++) {
                const colorData = parsedExistingColors[i];
                const colorName = colorData.colorName;
                let newColorImagesUrl = [...colorData.images];

                for (let j = 0; j < 6; j++) {
                    const file = req.files.find(f => f.fieldname === `image_${colorName}_${j}`);
                    if (file) {
                        let result = await cloudinary.uploader.upload(file.path, { resource_type: 'image' });
                        newColorImagesUrl[j] = result.secure_url;
                    }
                }
                
                newColorImagesUrl = newColorImagesUrl.filter(url => url !== null);

                finalColors.push({
                    colorName,
                    images: newColorImagesUrl
                });

                if (i === 0) {
                    globalImagesUrl = newColorImagesUrl;
                }
            }
        }

        const updateData = {
            name,
            description,
            category,
            price: Number(price),
            mainPrice: mainPrice ? Number(mainPrice) : 0,
            subCategory,
            productCollection: productCollection || "None",
            bestseller: bestseller === "true" ? true : false,
            newDrop: newDrop === "true" ? true : false,
            fit: fit || "Regular Fit",
            sizes: JSON.parse(sizes),
            image: globalImagesUrl,
            colors: finalColors
        }

        await productModel.findByIdAndUpdate(id, updateData);
        res.json({ success: true, message: "Product Updated" });

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

// function for list product
const listProducts = async (req, res) => {
    try {
        
        const products = await productModel.find({});
        res.json({success:true,products})

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

// function for getting best sellers
const getBestSellers = async (req, res) => {
    try {
        const limit = req.query.limit ? parseInt(req.query.limit) : 0;
        
        let query = productModel.find({ bestseller: true });
        if (limit > 0) {
            query = query.limit(limit);
        }
        
        const products = await query;
        res.json({ success: true, products });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
}

// function for updating just bestseller status
const updateBestSellerStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { bestseller } = req.body;

        await productModel.findByIdAndUpdate(id, { bestseller });
        res.json({ success: true, message: "Best Seller status updated" });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
}

// function for removing product
const removeProduct = async (req, res) => {
    try {
        
        await productModel.findByIdAndDelete(req.body.id)
        res.json({success:true,message:"Product Removed"})

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

// function for single product info
const singleProduct = async (req, res) => {
    try {
        
        const { productId } = req.body
        const product = await productModel.findById(productId)
        res.json({success:true,product})

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

// function for adding a product review
const addProductReview = async (req, res) => {
    try {
        const { productId, rating, text, userId } = req.body;
        
        const product = await productModel.findById(productId);
        if (!product) {
            return res.json({ success: false, message: "Product not found" });
        }

        const user = await userModel.findById(userId);
        if (!user) {
            return res.json({ success: false, message: "User not found" });
        }

        const review = {
            userId: userId,
            name: user.name,
            rating: Number(rating),
            text: text,
            date: Date.now()
        };

        product.reviews.push(review);
        await product.save();

        res.json({ success: true, message: "Review added successfully" });

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
}

// function to delete product review (admin)
const deleteProductReview = async (req, res) => {
    try {
        const { productId, reviewId } = req.body;
        const product = await productModel.findById(productId);

        if (!product) {
            return res.json({ success: false, message: "Product not found" });
        }

        product.reviews = product.reviews.filter(
            (rev) => rev._id.toString() !== reviewId
        );

        await product.save();
        res.json({ success: true, message: "Review deleted successfully" });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
}

export { listProducts, addProduct, removeProduct, singleProduct, addProductReview, updateProduct, getBestSellers, updateBestSellerStatus, deleteProductReview }