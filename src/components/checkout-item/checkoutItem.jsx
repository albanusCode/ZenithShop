import './checkoutItem.scss';
import { useSelector, useDispatch } from 'react-redux';
import { selectCartItems } from '../../store/cart/cartSelector';
import { AddItemToCart, clearItemFromCart, removeItemFromCart } from '../../store/cart/cartActions';
// import { CartContext } from '../../components/Context/CartContext';



const CheckoutItem = ({cartItem}) => {
    const {name, imageUrl, price, quantity} = cartItem;
  const dispatch = useDispatch();
  const cartItems = useSelector(selectCartItems);
    const clearItemHandler = () => dispatch(clearItemFromCart(cartItems, cartItem));
    const addItemHandler = () => dispatch(AddItemToCart(cartItems, cartItem));
    const removeItemHandler = () => dispatch(removeItemFromCart(cartItems, cartItem));



  return (
    <div className='checkout-item-container'>
        <div className='image-container'>
            <img src={imageUrl} alt={`${name}`} />
        </div>
        <span className='name'>{name}</span>
        <span className='quantity'>
            <div className="arrow" onClick={removeItemHandler}>&#8722;</div>
            <span className='value'>{quantity}</span>
            <div className="arrow" onClick={addItemHandler}>&#43;</div>
        </span>
        <span className='price'>{price}</span>
        <div className='remove-button' onClick={clearItemHandler}>&#10007;</div>
    </div>
  )
}

export default CheckoutItem;