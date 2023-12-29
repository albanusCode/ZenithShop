import './CategoryPreview.scss';
import { Link } from 'react-router-dom';
import ProductsCard from '../products-card/ProductsCard'


const CategoryPreview = ({title, products}) => {
  return (
    <div className='category-preview-container'>
        <h2>
            <Link className='title' to={title}>{title.toUpperCase()}</Link>
            <div className='preview'>
                {
                    products
                    .filter((_, idx) => idx < 4)
                    .map((product) => <ProductsCard key={products.id} product={product}/>)
                }
            </div>
        </h2>
    </div>
  )
}

export default CategoryPreview