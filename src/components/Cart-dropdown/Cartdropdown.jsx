import './Cartdropdown.scss';
// import { CartContext } from '../Context/CartContext';
import CartItem from '../CartItem/CartItem';
import { useSelector } from 'react-redux';
import { selectCartItems } from '../../store/cart/cartSelector';
import Button from '../Button/Button';
import { useNavigate } from 'react-router-dom';

const Cartdropdown = () => {
  const cartItems = useSelector(selectCartItems);
  const navigate = useNavigate();
  const goToCheckoutHandler = () => {
    navigate('/checkout')
  }
  return (
    <div className='cart-dropdown-container'>
        <div className='cart-items'>
          {
            cartItems.length ? (cartItems.map(item => (
            <CartItem key={item.id} cartItem={item}/>
            ))) : (
              <span className='empty-message'>Your cart is empty</span>
            )
          }
        </div>
        <Button onClick={goToCheckoutHandler}>Go to checkout</Button>
    </div>
  )
}

export default Cartdropdown;