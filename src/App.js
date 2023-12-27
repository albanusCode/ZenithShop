import { Routes, Route } from 'react-router-dom';
import Home from './Routes/home/home';
import Shop from './Routes/shop/shop';
import Navigation from './Routes/navigation/navigation';
import Authentication from './Routes/Authentication/Authenication';
import Checkout from './Routes/checkout/checkout';

const App = () => {
  return (
    <Routes>
      <Route path='/' element={<Navigation />}>
        <Route index element={<Home />} />
        <Route path='shop' element={<Shop />} />
        <Route path='auth' element={<Authentication />} />
        <Route path='checkout' element={<Checkout />} />
      </Route>
    </Routes>
  );
};

export default App;
