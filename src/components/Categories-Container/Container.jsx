import React from 'react';
import './Container.scss'
import DirectoryItem from '../directory-item/directory-item.component';

const Container = ({categories}) => {
  
  return (
    <div className="categories-container">
      {categories.map((category) => (
        <DirectoryItem key={category.id} category={category} />
      ))}
      
    </div>
  );
}

export default Container;