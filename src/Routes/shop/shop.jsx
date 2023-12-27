import {React, useContext} from 'react';
import './shop.scss'
import ProductCard from '../../components/products-card/ProductsCard';
import { productsContext } from '../../components/Context/producContext';
const Shop = () => {
  const {products} = useContext(productsContext)
  return (
    <div className='products-container'>
        {products.map((product) => (
            <ProductCard key={product.id} product={product}/>
        ))}
    </div>
  )
}

export default Shop;