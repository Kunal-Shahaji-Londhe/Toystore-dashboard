import "./Header.scss";

import { useEffect, useContext, useState } from "react"; 
import { Link, useNavigate } from "react-router-dom";

import { TbSearch } from 'react-icons/tb'
import { CgShoppingCart } from 'react-icons/cg'
import { AiOutlineHeart } from 'react-icons/ai'
import { VscAccount } from "react-icons/vsc";

import  Search  from "./Search/Search";
import  Cart  from '../Cart/Cart'
import { context } from "../../context/context";
import Wishlist from "../Wishlist/Wishlist";

const Header = () => {

    const [scrolled , setScrolled] = useState(false);
    const [showCart , setShowCart] = useState(false);
    const [showSearch , setShowSearch] = useState(false)
    const [ShowWishlist,setShowWishlist] = useState(false);
    
    const navigate = useNavigate();
    const {cartCount, wishlistCount} = useContext(context);

    const handleScroll = () => {
        const offset = window.scrollY;
        console.log(offset)
        if(offset > 200){
            setScrolled(true)
        }
        else{
            setScrolled(false)
        }
    }

    useEffect( () => {
        window.addEventListener("scroll",handleScroll)
    },[])

    return (
        <>
        <header className={`main-header ${scrolled ? "sticky-header" : ""}`}>
            <div className="header-content">
               <div className="left"><Link to='/'>Dolly's ToyStore</Link></div>
               <div className="right">
                    <TbSearch onClick={() => setShowSearch(true)}/>
                    <span className="cart-icon" onClick={() => setShowWishlist(true)}>
                        <AiOutlineHeart/>
                       {!!wishlistCount &&  <span>{wishlistCount}</span>}
                    </span>
                    <VscAccount 
                        onClick={() => {navigate('/profile')}}
                     />
                    <span className="cart-icon" onClick={() => setShowCart(true)}>
                        <CgShoppingCart/>
                       {!!cartCount &&  <span>{cartCount}</span>}
                    </span>
               </div>
            </div>
        </header>

        {showCart && <Cart setShowCart={setShowCart} />}
        {showSearch && <Search setShowSearch={setShowSearch}/>}
        {ShowWishlist && <Wishlist setShowWishlist={setShowWishlist} />}
        </> 
    )
};

export default Header;
