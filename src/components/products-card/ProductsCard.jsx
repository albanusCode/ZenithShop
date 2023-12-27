import './ProductsCard.scss';
import Button from '../Button/Button';
import { useContext } from 'react';
import { CartContext } from '../Context/CartContext';

const ProductCard = ({product}) => {

    const {AddItemToCart} = useContext(CartContext);
    const {name, price, imageUrl} = product;
    const AddProductToCart = () => AddItemToCart(product)
    return (
        <div className='product-card-container'>
            <img src={imageUrl} alt="product name" />
            <div className="footer">
                <span className="name">{name}</span>
                <span className="price">{price}</span>
            </div>
            <Button buttonType='inverted' onClick={AddProductToCart}>Add to cart</Button>
        </div>
    )

}

export default ProductCard;