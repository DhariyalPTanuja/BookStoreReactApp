
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Register from './components/UserRegistration/RegistrationForm'
import Customer from './components/UserRegistration/CustomerDetails'
import Login from './components/Login/Login'
import Home from './components/Home/Home'
import Cart from './components/Cart/Cart'
import Carts from './components/Cart/Carts'
import Order from './components/Order/order'
import OrderSuccess from './components/Order/OrderSuccessPage'
import MyOrders from './components/Order/MyOrder'
import WishList from './components/WishList/WishList'
import Navbar from './components/Header/Navbar';

function App() {
  return (
    <div className="App">
       <BrowserRouter>
       {/* <Navbar /> */}
        <Routes>
          <Route path="/register" element= {<Register />}/>
          <Route path="/login" element = {<Login />}/>
          <Route path="/" element = {<Home />}/>
          <Route path="/carts" element = {<Carts />}/>
          <Route path="/cart" element = {<Cart />}/>
          <Route path="/customer" element = {<Customer />}/>
          <Route exact path="/Order/:id" element = {<Order />}/>
          <Route path="/order"  element = {<Order />}/>
          <Route path="/ordersuccess" element = {<OrderSuccess />}/>
          <Route path="/myorders" element = {<MyOrders />}/>
          <Route path="/wishlist" element = {<WishList />}/>
        </Routes>
     </BrowserRouter>
    </div>
  );
}

export default App;

