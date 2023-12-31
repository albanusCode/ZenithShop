import { Routes, Route } from 'react-router-dom';
import Home from './Routes/home/home';
import Shop from './Routes/shop/shop';
import Navigation from './Routes/navigation/navigation';
import Authentication from './Routes/Authentication/Authenication';
import Checkout from './Routes/checkout/checkout';
import { setCurrentUser } from './store/user/user-action';

import {useEffect} from 'react'
import { useDispatch } from 'react-redux';
import { onAuthStateChangedListener, createUserDocumentFromAuth } from './utils/firebase/utilis';

const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    const unSubscribe = onAuthStateChangedListener((user) =>{
        if(user) {
            createUserDocumentFromAuth(user);
        }
        dispatch(setCurrentUser(user));
    });
    return unSubscribe;
  }, [])

  return (
    <Routes>
      <Route path='/' element={<Navigation />}>
        <Route index element={<Home />} />
        <Route path='shop/*' element={<Shop />} />
        <Route path='auth' element={<Authentication />} />
        <Route path='checkout' element={<Checkout />} />
      </Route>
    </Routes>
  );
};

export default App;
