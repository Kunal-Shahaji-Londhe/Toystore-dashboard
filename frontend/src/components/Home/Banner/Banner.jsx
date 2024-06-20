import "./Banner.scss";
import { Link } from "react-router-dom";
const Banner = () => {
    return (
        <div className="hero-banner">
            <div className="content">
                <div className="text-content">
                    <h1>Welcome!</h1>
                    <p><br/>where the joy of play takes center stage!
                     we present a delightful collection of toys
                     curated to spark endless smiles and imaginative adventures. From classic favorites to
                     the latest treasures, each toy at our store is chosen with care to bring joy to every child.</p>
                </div>
            </div>
        </div>
    );
};

export default Banner;
