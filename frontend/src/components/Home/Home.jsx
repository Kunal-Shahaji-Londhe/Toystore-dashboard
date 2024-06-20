import Banner from "./Banner/Banner";
import Category from "./Category/Category";
import Products from "../Products/Products";
import "./Home.scss";
import {context} from '../../context/context.jsx'
import { useContext,useEffect } from "react";

const Home = () => {

    const {categories, setCategories, products, setProducts} = useContext(context)

    useEffect(() => {
      getCategories();
      getProducts();
    },[])

    const getCategories = () => {
          //make a request to api
          fetch('https://ecommerceapi-2-6l87.onrender.com/api/v1/categories')
          .then(response => response.json())
          .then(data => setCategories(data))
          .catch(error => console.log('Error fetching category data:', error))
    }

    const getProducts = () => {
         //make a request to your api
         fetch('https://ecommerceapi-2-6l87.onrender.com/api/v1/products')
         .then(response => response.json())
         .then(data => setProducts(data))
         .catch(error => console.error('Error fetching data:', error))
    }

    return (
        <div>
        <Banner/>
        <div className="main-content">
            <div className="layout">
                <Category category={categories}/>
                <Products headingText = 'Popular Products' products={products} />
            </div>
        </div>
    </div>
    );
    }
export default Home;
