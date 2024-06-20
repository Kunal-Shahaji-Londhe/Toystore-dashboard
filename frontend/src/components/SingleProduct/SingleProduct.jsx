import "./SingleProduct.scss";
import RelatedProducts from "./RelatedProducts/RelatedProducts";
import {
    FaFacebookF,
    FaTwitter,
    FaInstagram,
    FaLinkedinIn,
    FaPinterest,
    FaCartPlus,
    FaHeart
} from "react-icons/fa";
import { useEffect,useState, useContext } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import  { context }  from "../../context/context.jsx";
import Review from "../Review/Review.jsx";
import { useAuth } from "../../context/AuthContext.jsx";
import { useDiscount } from "../../context/DiscountContext.jsx";
import Login from "../Login/Login.jsx";
import { toast } from 'react-toastify';

const SingleProduct = () => {
    const [quantity, setQuantity] = useState(1);
    const [product, setProduct] = useState([]);
    const {id} = useParams();
    const { handleAddToCart, handleAddToWishlist } = useContext(context)
    const { isAuthenticated } = useAuth();
    const { discounts } = useDiscount();
    const navigate = useNavigate();
    const location = useLocation();

    console.log(discounts)


    const increment = () => {
        setQuantity((prevState) => prevState + 1)
    }

    const decrement = () => {
        setQuantity((prevState) => {
            if(prevState === 1){
                return 1;
            }
            else{
                return prevState - 1
            }
        })
    }

    useEffect(() => {
        //make a request to your api
        fetch(`http://localhost:3000/api/v1/products/${id}`)
        .then(response => response.json())
        .then(data => setProduct(data))
        .catch(error => console.error('Error fetching data:', error))
    },[id]);

    console.log(product)

    const handleWishlistClick = () => {
        if (isAuthenticated) {
            handleAddToWishlist(product, quantity);
            toast.success('Product Added to Wishlist!');
            setQuantity(1);
        } else {
            navigate('/login',  { state: { from: location } });
        }

    }

    const handleCartClick = () => {
        if (isAuthenticated) {
            handleAddToCart(product,quantity)
            toast.success('Product Added to Cart!');
            setQuantity(1);
        } else {
            navigate('/login',  { state: { from: location } });
        }

    }

     // Function to calculate discounted price
  const calculateDiscountedPrice = () => {
    
    const discount = discounts.find(d => d.category === product.category?._id);
    if (discount) {
      
      const discountedPrice = product.price * (1 - discount.discountPercentage / 100);
      return discountedPrice.toFixed(2);
    }
    return product.price;
  };

  const getDiscountPercentage = () => {
    const discount = discounts.find(d => d.category === product.category?._id);
    return discount ? discount.discountPercentage : 0;
};

    return(
        <div className="single-product-main-content">
            <div className="layout">
                <div className="single-product-page">
                    <div className="left border-2 border-gray-200 rounded-xl">
                        <img src={product.image} alt={product.name}/>
                    </div>
                    <div className="right">
                        <span className="name">{product.name}</span>
                        {getDiscountPercentage() > 0 && (
                        <div className="flex items-center">
                            <span className="text-gray-500 line-through mr-2 text-xl">&#8377;{product.price}</span>
                            <span className="text-green-600 font-semibold text-xl">&#8377;{calculateDiscountedPrice()}</span>
                            <span className="ml-2 text-green-600 text-xl">{getDiscountPercentage()}% OFF</span>
                        </div>
                            )}
                            {getDiscountPercentage() === 0 && (
                                <span className="price">&#8377;{product.price}</span>
                            )}
                        <span className="desc">{product.description}</span>
                    
                        <div className="cart-buttons">
                            <div className="quantity-buttons">
                                <span className="" onClick={decrement}>-</span>
                                <span className="">{quantity}</span>
                                <span className="" onClick={increment}>+</span>
                            </div>
                            <button className="add-to-cart-button" 
                            onClick={handleCartClick}
                            >
                                <FaCartPlus size={20}/>
                                Add To Cart
                            </button>

                            <button className="add-to-wishlist-button ml-3" 
                            onClick={handleWishlistClick}
                            >
                                <FaHeart size={20}/>
                                Add To Wishlist
                            </button>
                        </div>

                        <span className="divider"/>

                        <div className="info-item">
                            <span className="text-bold">
                                Category: 
                                <span className=""> {product && product.category && product.category.name ? product.category.name : 'DefaultCategoryName'}
                                </span>
                            </span>
                            
                            <span className=""> 
                                <span className="social-icons flex gap-5 justify-start items-center cursor-pointer">
                                    <span className="font-semibold text-[18px]">Share:</span>
                                    <FaFacebookF size={16} />
                                    <FaTwitter size={16} />
                                    <FaInstagram size={16} />
                                    <FaLinkedinIn size={16} />
                                    <FaPinterest size={16} />
                                </span>
                            </span>
                        </div>

                    </div>
                </div>

                <Review/> 

                <RelatedProducts productId={product._id} categoryId={product?.category?._id}/>
            </div>
        </div>
    );
};

export default SingleProduct;
