import './checkoutItem.scss';
import { useContext } from 'react';
import { CartContext } from '../../components/Context/CartContext';



const CheckoutItem = ({cartItem}) => {
    const {name, imageUrl, price, quantity} = cartItem;
    const {clearItemFromCart, AddItemToCart, removeItemToCart} = useContext(CartContext);

    const clearItemHandler = () => clearItemFromCart(cartItem);
    const addItemHandler = () => AddItemToCart(cartItem);
    const removeItemHandler = () => removeItemToCart(cartItem);



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