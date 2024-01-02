import { Fragment } from 'react';
import { useSelector } from 'react-redux';
import { selectCategoriesMap } from '../../store/category/categorySelector';
import CategoryPreview from '../../components/CategortPreview/CategoryPreview';

const CategoriesPreview = () => {
  const categories = useSelector(selectCategoriesMap);
  
    return (
      <Fragment>
        {Object.keys(categories).map(title => {
          const products = categories[title];
          return (
            <CategoryPreview key={title} title={title} products={products} />
          );
        })}
      </Fragment>
    );
  };
  
  export default CategoriesPreview;