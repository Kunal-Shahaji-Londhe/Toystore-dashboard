import "./Wishlist.scss";
import { MdClose } from "react-icons/md";
import { BsCartX } from "react-icons/bs";
import ListItem from "./ListItem/ListItem";
import { useContext } from "react";
import { context } from "../../context/context";

const Wishlist = ({setShowWishlist}) => {
    const { wishlistItems, wishlistSubTotal } = useContext(context);
    return (
        <div className="cart-panel">
            <div className="opac-layer"></div>
            <div className="cart-content">
                <div className="cart-header">
                    <span className="heading">Wishlist</span>
                    <span className="close-btn" onClick={() => setShowWishlist(false)}>
                        <MdClose />
                        <span className="text">close</span>
                    </span>
                </div>

                {!wishlistItems?.length && <div className="empty-cart">
                    <BsCartX/>
                    <span className="">No products in the wishlist</span>
                    <button className="return-cta" onClick={() => setShowWishlist(false)}>Return To Shop</button>
                </div>}

                
                {!!wishlistItems?.length &&  <>
                    <ListItem />
                    <div className="cart-footer">
                        <div className="subtotal">
                            <span className="text">Subtotal:</span>
                            <span className="text total">&#8377;{wishlistSubTotal}</span>
                        </div>
                    </div>
                </>} 
               
            </div>
        </div>
    );
};

export default Wishlist;
