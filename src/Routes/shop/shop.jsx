import './shop.scss';
import { Routes, Route } from 'react-router-dom';
import Category from '../category/Category';
import CategoriesPreview from '../CategoriesPreview/CategoriesPreview';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setCategories } from '../../store/category/categoryAction';
import { getCategoriesAndDocuments } from '../../utils/firebase/utilis';



const Shop = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    const getCategoriesMap = async () => {
      try {
        const categoriesArray = await getCategoriesAndDocuments();
        dispatch(setCategories(categoriesArray));
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };
    getCategoriesMap();
  }, [dispatch]);  
  return (
    <Routes>
      <Route index element={<CategoriesPreview />} />
      <Route path=':category' element={<Category />} />
    </Routes>
  );
};

export default Shop;