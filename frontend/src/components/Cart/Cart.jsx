import "./Cart.scss";
import { MdClose } from "react-icons/md";
import { BsCartX } from "react-icons/bs";
import CartItem from "./CartItem/CartItem";
import { useContext } from "react";
import { context } from "../../context/context";
import { useAuth } from '../../context/AuthContext';
import { useDiscount } from "../../context/DiscountContext";
import { initiatePayment } from "../../paymentService";
import axios from "axios";

const Cart = ({setShowCart}) => {
    const { cartItems, cartSubTotal, handleCartProductQuantity, handleRemoveFromCart } = useContext(context);
    const { user, isAuthenticated } = useAuth()
   // const cartSubTotalBeforeGst = cartSubTotal / (1 + 18/100);

    const { discounts } = useDiscount(); // Retrieve discounts from DiscountContext

    // Function to calculate discounted price for a product
    const calculateDiscountedPrice = (price, discountPercentage) => {
        return price * (1 - discountPercentage / 100);
    };

    // Calculate discounted price for each item in the cart
    const discountedCartItems = cartItems.map(item => {
        const discount = discounts.find(d => d.category === item.category._id);
        if (discount) {
            const discountedPrice = calculateDiscountedPrice(item.price, discount.discountPercentage);
            return {
                ...item,
                discountedPrice: discountedPrice,
            };
        } else {
            return {
                ...item,
                discountedPrice: item.price,
            };
        }
    });

    // Calculate subtotal and total based on discounted prices
    const cartSubTotalBeforeGst = discountedCartItems.reduce((total, item) => total + item.discountedPrice * item.quantity, 0);


    const handleCheckout = async () => {
        try {

            const orderPayload = {
                orderItems: cartItems.map((item) => ({
                quantity: item.quantity,
                product: item._id,
                })),
                shippingAddress1: user.user.street,
                shippingAddress2: user.user.apartment,
                city: user.user.city,
                zip: user.user.zip,
                country: user.user.country,
                phone: user.user.phone,
                status: "Pending",
                user: user.user._id,
            };

            const response = await axios.post(
                "https://ecommerceapi-2-6l87.onrender.com/api/v1/orders",
                orderPayload
            );

            console.log("Order created:", response.data);


            //handling payments

            const productNames = cartItems.map((item) => item.name);
    
            // Step 1: Get the order details directly from the initiatePayment response
            const data = await initiatePayment(cartSubTotal, productNames);
    
            // Step 2: Open the Razorpay checkout modal with the obtained order details
            const options = {
                key: 'rzp_test_gqIHaDQQDjWl67',
                amount: cartSubTotal * 100, 
                currency: 'INR',
                name: 'Dollys Toy Store',
                description: 'Toy purchase',
                order_id: data.order_id,
                handler: function (response) {
                    console.log('Payment successful:', response);
                },
                prefill: {
                    name: user.user.name,
                    email: user.user.email,
                    contact: user.user.phone,
                },
                notes: {
                    address: user.user.city,
                },
                theme: {
                    color: '#80bcbd',
                },
            };
    
            const razorpayInstance = new Razorpay(options);
            razorpayInstance.open();
        } catch (error) {
            console.error("Error initiating payment:", error);
        }
    };
    
    

    return (
        <div className="cart-panel">
            <div className="opac-layer"></div>
            <div className="cart-content">
                <div className="cart-header">
                    <span className="heading">Shopping Cart</span>
                    <span className="close-btn" onClick={() => setShowCart(false)}>
                        <MdClose />
                        <span className="text">close</span>
                    </span>
                </div>
                {discountedCartItems.map(item => (
                            <CartItem 
                                key={item._id}  
                                item={item}
                                discountedPrice={item.discountedPrice}
                                handleCartProductQuantity={handleCartProductQuantity}
                                handleRemoveFromCart={handleRemoveFromCart} 

                            />
                ))}

                {!!cartItems?.length && (
                    <>
                    <div className="cart-footer">
                            <div className="cart-item">
                                <div className="subtotal">
                                    <span className="text">Taxable Value:</span>
                                    <span className="text">&#8377;{cartSubTotalBeforeGst.toFixed(2)}</span>
                                </div>
                                <div className="subtotal">
                                    <span className="text">GST (18%):</span>
                                    <span className="text">&#8377;{(cartSubTotalBeforeGst * 0.18).toFixed(2)}</span>
                                </div>
                            </div>
                        <div className="cart-total">
                            <div className="subtotal">
                                <span className="text">Total (After GST):</span>
                                <span className="text total">&#8377;{cartSubTotal.toFixed(2)}</span>
                            </div>
                        </div>
                        <div className="button">
                            <button className="checkout-cta" onClick={handleCheckout}>
                                Checkout
                            </button>
                        </div>
                    </div>
                </>
            )}

               
        </div>
    </div>
    );
};

export default Cart;
