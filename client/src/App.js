import { BrowserRouter as Router, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';


import Navbar from './components/navbar.component';
import CreateUser from './components/create-user.component';
import CreateProduct from './components/create-product.component';
import CreateOrder from './components/create-order.component';

import ListUsers from './components/list-users.component';
import ListProducts from './components/list-products.component';
import ListOrders from './components/list-orders.component';

import ViewCart from './components/cart.component';
import LandingPage from './components/landing.component';
import Footer from './components/footer.component';


function App() {
  return (
    <Router>
      <div className="container">
        <Navbar />
        <div className='container content'>
          <Route path='/' exact component={LandingPage} />
          <Route path='/user/'  exact component={ListUsers} />
          <Route path='/user/create' component={CreateUser} />
          <Route path='/order/' exact component={ListOrders} />
          <Route path='/order/create' component={CreateOrder} />
          <Route path='/product/' exact component={ListProducts} />
          <Route path='/product/create' component={CreateProduct} />
          <Route path='/cart' exact component={ViewCart} />
        </div>
        
        <Footer />
      </div>
    </Router>
  );
}

export default App;
