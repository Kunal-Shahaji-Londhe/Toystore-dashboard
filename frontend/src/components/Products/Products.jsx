import Product from "./Product/Product";
import "./Products.scss";

const Products = ({products, innerPage, headingText }) => {
    return (
        <div className="products-container">
            {!innerPage && <div className="sec-heading">{headingText}</div>}
            <div className="products">
                {products?.slice(0,8).map(item => (
                    <Product 
                        key={item._id}
                        id={item._id} 
                        product={item}

                    />
                ))}
            </div>
        </div>
    );
};

export default Products;
