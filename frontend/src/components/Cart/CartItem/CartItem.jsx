import { MdClose } from "react-icons/md";
import { context } from "../../../context/context";
import './CartItem.scss'
import { useContext } from "react";

const CartItem = ({item, discountedPrice, handleCartProductQuantity, handleRemoveFromCart }) => {
    
    //const { cartItems, handleCartProductQuantity, handleRemoveFromCart, handleAddToCart } = useContext(context);

    return (
            <>
            {/*cartItems.map(item =>(  ))*/}
                <div key={item._id} className="search-result-item">
                    <div className="image-container">
                            <img src={item.image} alt={item.name}/>
                    </div>
                        <div className="prod-details">
                            <span className="name">{item.name}</span>
                            <MdClose className="close-btn" 
                                onClick={() => {handleRemoveFromCart(item)}}
                            />
                            <div className="quantity-buttons">
                                <span className="" onClick={() => {handleCartProductQuantity('dec', item)}}>-</span>
                                <span className="">{item.quantity}</span>
                                <span className="" onClick={() => {handleCartProductQuantity('inc', item)}}>+</span>
                            </div>
                            <div className="text">
                                <span>{item.quantity}</span>
                                <span>x</span>
                                <span className="highlight">&#8377;{(discountedPrice * item.quantity).toFixed(2)}</span>
                            </div>
                        </div>
                </div>
                
        </>
    );
};

export default CartItem;
