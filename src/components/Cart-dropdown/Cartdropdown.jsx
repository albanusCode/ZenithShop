import './Cartdropdown.scss';
import { useContext } from 'react';
import { CartContext } from '../Context/CartContext';
import CartItem from '../CartItem/CartItem';
import Button from '../Button/Button';

const Cartdropdown = () => {
  const {cartItems} = useContext(CartContext);
  return (
    <div className='cart-dropdown-container'>
        <div className='cart-items'>
          {cartItems.map(item => <CartItem key={item.id} cartItem={item}/>)}
        </div>
        <Button>Go to checkout</Button>
    </div>
  )
}

export default Cartdropdown;