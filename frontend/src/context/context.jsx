import { createContext , useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

export  const context = createContext()

const AppContext = ({children}) => {
    const [categories, setCategories] = useState([])
    const [products, setProducts] = useState([])
    const [cartCount, setCartCount] = useState(0)
    const [cartItems, setCartItems] = useState([])
    const [cartSubTotal, setCartSubTotal] = useState(0)


    //wishlist functionality
    const [wishlistCount, setWishlistCount] = useState(0)
    const [wishlistItems, setWishlistItems] = useState([])
    const [wishlistSubTotal, setWishlistSubTotal] = useState(0)

    const location = useLocation();

    useEffect(() => {
        window.scrollTo(0,0)
    },[location])

    useEffect(() => {
        let count = 0;
        cartItems.map(item => count += item.quantity)
        setCartCount(count);

        let subTotal = 0;
        cartItems.map(item =>  subTotal += (item.price + (item.price * 0.18)) * item.quantity);
        setCartSubTotal(subTotal);
    },[cartItems]);

    const handleAddToCart = (product, quantity) => {
        let items = [...cartItems]
        let index = items.findIndex(p => p._id === product._id)
        if(index !== -1){
            items[index].quantity += quantity
        }   else{
                product.quantity = quantity
                items = [...items, product]
        }
        setCartItems(items)
    }

    const handleRemoveFromCart = (product) => {
        let items = [...cartItems];
        items = items.filter((p) => p._id !== product._id);
        setCartItems(items)
    }

    const handleCartProductQuantity = (type, product) => {
        let items = [...cartItems]
        let index = items.findIndex(p => p._id === product._id) 
        
        if(type === 'inc') {
            items[index].quantity += 1
        }
        else if(type === 'dec') {
            if(items[index].quantity === 1) {
                return;
            }
            items[index].quantity -= 1;
        }
        setCartItems(items);
    }


    //wishlist functionality

    useEffect(() => {
        let count = 0;
        wishlistItems.map(item => count += item.quantity)
        setWishlistCount(count);

        let subTotal = 0;
        wishlistItems.map(item => subTotal += item.price * item.quantity);
        setWishlistSubTotal(subTotal);
    },[wishlistItems])

    const handleAddToWishlist = (product, quantity) => {
        let items = [...wishlistItems]
        let index = items.findIndex(p => p._id === product._id)
        if(index !== -1){
            items[index].quantity += quantity
        }   else{
                product.quantity = quantity
                items = [...items, product]
        }
        setWishlistItems(items)
    }

    const handleRemoveFromWishlist = (product) => {
        let items = [...wishlistItems];
        items = items.filter((p) => p._id !== product._id);
        setWishlistItems(items)
    }

    const handleWishlistProductQuantity = (type, product) => {
        let items = [...wishlistItems]
        let index = items.findIndex(p => p._id === product._id) 
        
        if(type === 'inc') {
            items[index].quantity += 1
        }
        else if(type === 'dec') {
            if(items[index].quantity === 1) {
                return;
            }
            items[index].quantity -= 1;
        }
        setWishlistItems(items);
    }

    return (
        <context.Provider
            value={{
                categories,
                setCategories,
                products,
                setProducts,
                cartCount,
                setCartCount,
                cartItems,
                setCartItems,
                cartSubTotal,
                setCartSubTotal,
                handleCartProductQuantity,
                handleRemoveFromCart,
                handleAddToCart,
                wishlistCount,
                setWishlistCount,
                wishlistItems,
                setWishlistItems,
                wishlistSubTotal,
                setWishlistSubTotal,
                handleAddToWishlist,
                handleRemoveFromWishlist,
                handleWishlistProductQuantity
            }}
        >
            {children}
        </context.Provider>
    )
}

export default AppContext;