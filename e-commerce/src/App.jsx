
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import NavBar from './components/Layout/NavBar';
import Header from './components/Layout/Header';
import HomePage from './components/HomePage/HomePage';
import Products from './components/Products/Products';
import Customers from './components/Customers/Customers';
import Orders from './components/Orders/Orders';
import Footer from './components/Layout/Footer';
import './index.css';
import { CartProvider } from './components/Layout/Cart.jsx';

const App = () => {
  return (
      <CartProvider> 
          <Router>
              <div className="app-container">
                  <NavBar />
                  <Header />
                  <Switch>
                      <Route path="/" exact component={HomePage} />
                      <Route path="/products" exact component={Products} />
                      <Route path="/customers" exact component={Customers} />
                      <Route path="/orders" exact component={Orders} />
                  </Switch>
                  <Footer />
              </div>
          </Router>
      </CartProvider>
  );
};

export default App;



