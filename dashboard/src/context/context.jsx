import { createContext,useContext, useState } from "react"; 

const AppContext = createContext();

export const AppContextProvider = ({children}) => {
    const [productName, setProductName] = useState()
    const [selectedProductId, setSelectedProductId] = useState(null);
    const [productImage, setProductImage] = useState([]);
    

    const storeProductId= (productId,productName,productImage) => {
        setSelectedProductId(productId);
        setProductName(productName);
        setProductImage(productImage);
    }

    return(
        <AppContext.Provider value={{
            productName,
            setProductName,
            selectedProductId,
            setSelectedProductId,
            productImage,
            storeProductId
            }}>
            {children}
        </AppContext.Provider>
    )    
}

export const useAppContext = () => {
    return useContext(AppContext);
}

