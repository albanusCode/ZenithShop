import './ProductsCard.scss';
import { useSelector } from 'react-redux';
import { selectCartItems } from '../../store/cart/cartSelector';
import Button from '../Button/Button';
import { useDispatch } from 'react-redux';
import { AddItemToCart } from '../../store/cart/cartActions';
// import { CartContext } from '../Context/CartContext';

const ProductCard = ({product}) => {
    const cartItems = useSelector(selectCartItems);
    const {name, price, imageUrl} = product;
    const dispatch = useDispatch();
    
    const AddProductToCart = () => dispatch(AddItemToCart(cartItems, product))
    return (
        <div className='product-card-container'>
            <img src={imageUrl} alt="product name" />
            <div className="footer">
                <span className="name">{name}</span>
                <span className="price">{price}</span>
            </div>
            <Button buttonType='shop' onClick={AddProductToCart}>Add to cart</Button>
        </div>
    )

}

export default ProductCard;