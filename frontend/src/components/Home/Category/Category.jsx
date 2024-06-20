import "./Category.scss";
//import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Category = ({category}) => {

    const navigate = useNavigate()

    return (
        <div className="shop-by-category">
            <div className="sec-heading">Categories</div>
            <div className="categories">
                {category?.map(cat => (
                    <div key={cat._id} 
                         className="category rounded-xl border-2 border-gray-700" 
                        onClick={() => navigate(`/category/${cat._id}`)}>
                        <img 
                            src={cat.icon} 
                            alt={cat.name}
                        /> 
                    </div>
                
                ))}
            </div>
        </div>
    );
};

export default Category;
