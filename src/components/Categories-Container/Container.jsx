import React from 'react';
import './Container.scss'
import CategoryItem from '../category-item/category-item.component';

const Container = ({categories}) => {
  
  return (
    <div className="categories-container">
      {categories.map((category) => (
        <CategoryItem key={category.id} category={category} />
      ))}
      
    </div>
  );
}

export default Container;