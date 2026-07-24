import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import axios from 'axios'

export const ShopContext = createContext();

const ShopContextProvider = (props) => {

    const currency = '₹';
    const backendUrl = import.meta.env.VITE_BACKEND_URL
    const [search, setSearch] = useState('');
    const [showSearch, setShowSearch] = useState(false);
    const [cartItems, setCartItems] = useState(() => {
        const localData = localStorage.getItem('cartItems');
        return localData ? JSON.parse(localData) : {};
    });
    const [products, setProducts] = useState([]);
    const [collections, setCollections] = useState([]);
    const [token, setToken] = useState('')
    const navigate = useNavigate();

    // Favourites State
    const [favourites, setFavourites] = useState(() => {
        const localData = localStorage.getItem('favourites');
        return localData ? JSON.parse(localData) : [];
    });

    const toggleFavourite = async (itemId) => {
        let updatedFavourites;
        if (favourites.includes(itemId)) {
            updatedFavourites = favourites.filter(id => id !== itemId);
            toast.info("Removed from Favourites", { autoClose: 1500 });
        } else {
            updatedFavourites = [...favourites, itemId];
            toast.success("Added to Favourites", { autoClose: 1500 });
        }
        setFavourites(updatedFavourites);
        
        if (!token) {
            localStorage.setItem('favourites', JSON.stringify(updatedFavourites));
        }

        if (token) {
            try {
                await axios.post(backendUrl + '/api/wishlist/update', { wishlist: updatedFavourites }, { headers: { token } });
            } catch (error) {
                console.log(error);
            }
        }
    };


    const addToCart = async (itemId, size) => {

        if (!size) {
            toast.error('Select Product Size');
            return;
        }

        let cartData = structuredClone(cartItems);

        if (cartData[itemId]) {
            if (cartData[itemId][size]) {
                cartData[itemId][size] += 1;
            }
            else {
                cartData[itemId][size] = 1;
            }
        }
        else {
            cartData[itemId] = {};
            cartData[itemId][size] = 1;
        }
        setCartItems(cartData);

        if (!token) {
            localStorage.setItem('cartItems', JSON.stringify(cartData));
        }

        if (token) {
            try {

                await axios.post(backendUrl + '/api/cart/add', { itemId, size }, { headers: { token } })

            } catch (error) {
                console.log(error)
                toast.error(error.message)
            }
        }

    }

    const getCartCount = () => {
        let totalCount = 0;
        for (const items in cartItems) {
            for (const item in cartItems[items]) {
                try {
                    if (cartItems[items][item] > 0) {
                        totalCount += cartItems[items][item];
                    }
                } catch (error) {

                }
            }
        }
        return totalCount;
    }

    const updateQuantity = async (itemId, size, quantity) => {

        let cartData = structuredClone(cartItems);

        cartData[itemId][size] = quantity;

        setCartItems(cartData)

        if (!token) {
            localStorage.setItem('cartItems', JSON.stringify(cartData));
        }

        if (token) {
            try {

                await axios.post(backendUrl + '/api/cart/update', { itemId, size, quantity }, { headers: { token } })

            } catch (error) {
                console.log(error)
                toast.error(error.message)
            }
        }

    }

    const getCartAmount = () => {
        let totalAmount = 0;
        for (const items in cartItems) {
            const baseId = items.split('_')[0];
            let itemInfo = products.find((product) => product._id === baseId);
            if (!itemInfo) continue;
            for (const item in cartItems[items]) {
                try {
                    if (cartItems[items][item] > 0) {
                        totalAmount += itemInfo.price * cartItems[items][item];
                    }
                } catch (error) {

                }
            }
        }
        return totalAmount;
    }

    const delivery_fee = (getCartAmount() === 0) ? 0 : (getCartAmount() > 1499 ? 0 : 60);

    const getProductsData = async () => {
        try {
            const response = await axios.get(backendUrl + '/api/product/list')
            if (response.data.success) {
                setProducts(response.data.products.reverse())
            } else {
                toast.error(response.data.message)
            }

            const colResponse = await axios.get(backendUrl + '/api/collection/list')
            if (colResponse.data.success) {
                setCollections(colResponse.data.collections.reverse())
            }

        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }
    }

    const getUserCart = async ( tokenParam ) => {
        try {
            const localCart = JSON.parse(localStorage.getItem('cartItems')) || {};
            
            if (Object.keys(localCart).length > 0) {
                const response = await axios.post(backendUrl + '/api/cart/merge', { localCart }, { headers: { token: tokenParam } });
                if (response.data.success) {
                    setCartItems(response.data.cartData);
                    localStorage.removeItem('cartItems');
                }
            } else {
                const response = await axios.post(backendUrl + '/api/cart/get',{},{headers:{token: tokenParam}})
                if (response.data.success) {
                    setCartItems(response.data.cartData)
                }
            }
        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }
    }

    const getUserWishlist = async (tokenParam) => {
        try {
            const response = await axios.post(backendUrl + '/api/wishlist/get', {}, { headers: { token: tokenParam } });
            if (response.data.success) {
                const dbWishlist = response.data.wishlistData;
                const localWishlist = JSON.parse(localStorage.getItem('favourites')) || [];
                
                // Merge without duplicates
                const mergedWishlist = [...new Set([...dbWishlist, ...localWishlist])];
                
                setFavourites(mergedWishlist);
                
                // If there were local items, push the merged list to backend
                if (localWishlist.length > 0) {
                    await axios.post(backendUrl + '/api/wishlist/update', { wishlist: mergedWishlist }, { headers: { token: tokenParam } });
                }

                // Use DB as single source of truth
                localStorage.removeItem('favourites');
            }
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getProductsData()
    }, [])

    useEffect(() => {
        if (!token && localStorage.getItem('token')) {
            const storedToken = localStorage.getItem('token');
            setToken(storedToken);
            getUserCart(storedToken);
            getUserWishlist(storedToken);
        } else if (token) {
            getUserCart(token);
            getUserWishlist(token);
        }
    }, [token])

    const value = {
        products, currency, delivery_fee,
        search, setSearch, showSearch, setShowSearch,
        cartItems, addToCart,setCartItems,
        getCartCount, updateQuantity,
        getCartAmount, navigate, backendUrl,
        setToken, token,
        favourites, toggleFavourite,
        collections
    }

    return (
        <ShopContext.Provider value={value}>
            {props.children}
        </ShopContext.Provider>
    )

}

export default ShopContextProvider;