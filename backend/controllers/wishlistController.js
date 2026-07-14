import userModel from "../models/userModel.js";

// Update user wishlist
const updateWishlist = async (req, res) => {
    try {
        const { userId, wishlist } = req.body;

        await userModel.findByIdAndUpdate(userId, { wishlist });

        res.json({ success: true, message: "Wishlist Updated" });

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
}

// Get user wishlist
const getWishlist = async (req, res) => {
    try {
        const { userId } = req.body;

        const userData = await userModel.findById(userId);
        let wishlistData = userData.wishlist || [];

        res.json({ success: true, wishlistData });

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
}

export { updateWishlist, getWishlist }
