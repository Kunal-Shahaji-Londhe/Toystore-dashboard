import "./Product.scss";
import { useNavigate } from "react-router-dom";
import { useDiscount } from "../../../context/DiscountContext";
import { AiOutlineHeart } from 'react-icons/ai'
const Product = ({ id , product }) => {

    const navigate = useNavigate();
    const { discounts } = useDiscount();
    
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


    return (
       <>
           <div className="product-card" onClick={() => {navigate('/product/'+ id)}}>
                
                <div className="thumbnail rounded-xl border-2 border-gray-200">
                    <img src={product.image} alt={product.name} /> 
                </div>
                <div className="prod-details">
                    <span className="name">{product.name} </span>
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
                </div>
           </div>
       </>
    );
};

export default Product;
