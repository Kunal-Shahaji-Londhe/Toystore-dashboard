import { MdClose } from "react-icons/md";
import { context } from "../../../context/context";
import './ListItem.scss'
import { useContext } from "react";

const ListItem = () => {
    
    const { wishlistItems, handleWishlistProductQuantity, handleRemoveFromWishlist, handleAddToWishlist } = useContext(context);

    return (
            <div className="cart-products">
            {wishlistItems.map(item =>(
                <div key={item._id} className="search-result-item">
                    <div className="image-container">
                            <img src={item.image} alt={item.name}/>
                    </div>
                        <div className="prod-details">
                            <span className="name">{item.name}</span>
                            <MdClose className="close-btn" 
                                onClick={() => {handleRemoveFromWishlist(item)}}
                            />
                            <div className="quantity-buttons">
                                <span className="" onClick={() => {handleWishlistProductQuantity('dec', item)}}>-</span>
                                <span className="">{item.quantity}</span>
                                <span className="" onClick={() => {handleWishlistProductQuantity('inc', item)}}>+</span>
                            </div>
                            <div className="text">
                                <span>{item.quantity}</span>
                                <span>x</span>
                                <span className="highlight">&#8377;{item.price * item.quantity}</span>
                            </div>
                        </div>
                </div>
            ))}      
        </div>
    );
};

export default ListItem;
