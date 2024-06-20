import React from "react";
import "./Footer.scss";
import { FaLocationArrow, FaMobileAlt, FaEnvelope } from "react-icons/fa";
import Payment from "../../assets/payments.png";

const Footer = () => {
    return (
        <div className="footer">
            <div className="footer-content">
                <div className="col">
                    <div className="title">About Us</div>
                    <div className="text">
                    At Dollys, we don't just sell toys, we ignite imaginations! We're a haven for playful spirits and big dreamers, where every aisle is an adventure and every shelf whispers stories. We believe childhood is a kaleidoscope of laughter, wonder, and endless possibilities, and our curated collection of toys reflects that. Step into our world and discover cuddly companions, daring heroes, and magical friends waiting to join your little one's grandest escapades.
                    </div>
                </div>
                <div className="col">
                    <div className="title">Contact</div>
                    <div className="c-item">
                        <FaLocationArrow/>
                        <div className="text">
                            1276, Agra Road Near Gandhi Statue, Dhule 424001
                        </div>
                    </div>
                    <div className="c-item">
                        <FaMobileAlt/>
                        <div className="text">
                            Phone: 0471 272 0261
                        </div>
                    </div>
                    <div className="c-item">
                        <FaEnvelope/>
                        <div className="text">
                            Email: store@dollys.com
                        </div>
                    </div>
                </div>
                <div className="col">
                    <div className="title">Categories</div>
                    <span className="text">Action Figures</span>
                    <span className="text">Dolls</span>
                    <span className="text">Board Games</span>
                    <span className="text">Educational Toys</span>
                    <span className="text">Building Blocks</span>
                    <span className="text">Books</span>
                </div>
                <div className="col">
                    <div className="title">Pages</div>
                    <span className="text">Home</span>
                    <span className="text">About</span>
                    <span className="text">Privacy Policy</span>
                    <span className="text">Returns</span>
                    <span className="text">Terms & Conditions</span>
                    <span className="text">Contact Us</span>
                </div>
            </div>
                <div className="bottom-bar">
                    <div className="bottom-bar-content">
                        <span className="text">
                            Dolly's Toy Store 2024 Made by Pratik & Kunal.
                        </span>
                        <img src={Payment} />
                    </div>
                </div>
        </div>
    );
};

export default Footer;
