import Products from '../../Products/Products'
import { useState, useEffect } from "react";

const RelatedProducts = ({ productId , categoryId }) => {

      const [products, setProducts] = useState([])
      //console.log(categoryId)
    useEffect(() => {
        //make a request to your api
        fetch(`http://localhost:3000/api/v1/products//byCategory/${categoryId}`)
        .then(response => response.json())
        .then(data => setProducts(data))
        .catch(error => console.error('Error fetching data:', error))
        
      },[categoryId]);
      //console.log(products)

      const data = products.products;
    return (
        <div className='related-products'>
            <Products headingText = 'Related Products' products={data}/>
        </div>
        
    );
};

export default RelatedProducts;
