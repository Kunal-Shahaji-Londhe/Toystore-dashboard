import "./Search.scss";
import { MdClose } from "react-icons/md";
//import { TbSearch } from 'react-icons/tb'
import prod from '../../../assets/products/af-3.png'
import { useState,useContext } from "react";
import { useNavigate } from "react-router-dom";
import { context } from "../../../context/context";

const Search = ({setShowSearch}) => {
    const [query, setQuery] = useState('');
    const navigate = useNavigate();
    const { products } = useContext(context);
    
    function filterProducts(searchQuery) {
        const filteredProducts = products.filter(product => {
          // You can customize the comparison based on your requirements
          return product.name.toLowerCase().includes(searchQuery.toLowerCase());
        });
      
        return filteredProducts;
      }

    let data = filterProducts(query);

    const onChange = (e) => {
        setQuery(e.target.value);
    }

    if(!query.length){
        data = null;
    }

    return (
        <div className="search-modal">
            <div className="form-field">
                <input 
                    type="text"
                    autoFocus
                    placeholder="Search"
                    value={query}
                    onChange={onChange}
                />
                <MdClose onClick={() => {setShowSearch(false)}}/>
            </div>
            <div className="search-result-content">
                <div className="search-results">
                    {data?.map(item => (
                        <div className="search-result-item" key={item._id} onClick={() => {
                            navigate('/product/' + item._id);
                            setShowSearch(false);
                        }}>
                        <div className="image-container">
                            <img src={item.image} alt={item.name}/>
                        </div>
                        <div className="prod-details">
                            <span className="name">{item.name}</span>
                            <span className="desc">{item.description}</span>
                        </div>
                    </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Search;
