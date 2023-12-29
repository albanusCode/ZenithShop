import {createContext, useState, useEffect} from 'react';
// import SHOP_DATA from '../../shop-data';
import { getCategoriesAndDocuments } from '../../utils/firebase/utilis';

export const CategoriesContext = createContext({
    catgoriesMap: {},
});

export const CategoriesProvider = ({children}) => {
    const [categoriesMap, setCatgoriesMap] = useState({});
    useEffect(() => {
        const getCategoriesMap = async () => {
            const categoryMap = await getCategoriesAndDocuments();
            setCatgoriesMap(categoryMap)
        }
        getCategoriesMap();
    },[])
    const value = {categoriesMap}
    return(
        <CategoriesContext.Provider value={value}>
            {children}
        </CategoriesContext.Provider>
    )
};