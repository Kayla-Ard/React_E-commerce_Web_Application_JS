import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import NavBar from './components/Layout/NavBar'; 
import Header from './components/Layout/Header'; 
import Footer from './components/Layout/Footer'; 
import HomePage from './components/HomePage/HomePage'; 
import DisplayProducts from './components/Products/DisplayProducts'; 

const App = () => {
  return (
    <Router>
      <NavBar />
      <Header />
      <Switch>
        <Route path="/" exact component={HomePage} /> {/* Route to HomePage */}
        <Route path="/products" exact component={DisplayProducts} /> {/* Route to DisplayProducts */}
      </Switch>
      <Footer />
    </Router>
  );
};

export default App;


