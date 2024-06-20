import "./Category.scss";
import Products from "../Products/Products";
import { useParams } from "react-router-dom"; 
import { useState, useEffect } from "react";
import { MdKeyboardDoubleArrowRight } from "react-icons/md";
import { MdOutlineHorizontalRule } from "react-icons/md";
const Category = () => {

    const { id } = useParams();
    const [products, setProducts] = useState([])

    useEffect(() => {
        //make a request to your api
        fetch(`https://ecommerceapi-2-6l87.onrender.com/api/v1/products//byCategory/${id}`)
        .then(response => response.json())
        .then(data => setProducts(data))
        .catch(error => console.error('Error fetching data:', error))
        
      },[]);
      
    return (
       <div className="category-main-content">
        <div className="layout">
            <div className="category-title  text-primaryColor">
                {products?.products?.[0]?.category?.name}
                <MdOutlineHorizontalRule/>
            </div>
            <Products innerPage={true} products={products.products} />
        </div>
       </div> 
    );
};

export default Category;
