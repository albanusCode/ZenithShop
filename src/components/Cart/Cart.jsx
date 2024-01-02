import './Cart-styles.scss';
import { setIsCartOpen } from '../../store/cart/cartActions';
import { useDispatch, useSelector } from 'react-redux';
import { selectIsCartOpen, selectCartCount } from '../../store/cart/cartSelector';
// import { CartContext } from '../Context/CartContext';
import { ReactComponent as ShoppingIcon } from '../../assets/shopping-bag.svg';

const Cart = () => {
  // const {isCartOpen, setCartOpen, totalCount } = useContext(CartContext);
  const dispatch = useDispatch();
  const isCartOpen = useSelector(selectIsCartOpen);
  const cartCount = useSelector(selectCartCount);

  const toggleIsCartOpen = () => dispatch(setIsCartOpen(!isCartOpen));

  return (
    <div className='cart-icon-container' onClick={toggleIsCartOpen}>
      <ShoppingIcon className='shopping-icon' />
      <span className='item-count'>{cartCount}</span>
    </div>
  );
};

export default Cart;