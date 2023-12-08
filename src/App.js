import React, { useState, useEffect, useRef } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { Monheader } from "./Monheader.js";
import CountdownTimer from './CountdownTimer';
import UpdateProfileForm from './UpdateProfileForm';
import "./main.css";
import "./index.css";
import "./App.css";

import Logo from "./images/logo.svg";
import Macdo from "./images/images.jpg";
import Kebab from "./images/kebab.jpg";
import KFC from "./images/kfc.jpeg";
import Sandwich from "./images/sandwich.jpg";

import * as utilities from './utilities.js';
import { BurgerBlock } from './burger.js';

function App() {
  const [cart, setCart] = useState(0);

  const addToCart = (quantity) => {
    setCart(cart + quantity);
  };

  const removeFromCart = (quantity) => {
    setCart(cart - quantity);
  };

  const restaurantsRef = useRef([
    { name: "Menu MacDo", isOpen: true, image: Macdo },
    { name: "Kebab", isOpen: false, image: Kebab },
    { name: "KFC", isOpen: true, image: KFC },
    { name: "Sandwich", isOpen: false, image: Sandwich }
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      const updatedRestaurants = restaurantsRef.current.map(restaurant => {
        return { ...restaurant, isOpen: Math.random() < 0.5 };
      });
      restaurantsRef.current = updatedRestaurants;
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <Router>
      <Monheader />
      <nav>
        
      </nav>
      <div className='App'>
        <header>
          <div className='container'>
            <div className='header'>
              <div className='headerlogo'>
                <img className='logo' src={Logo} alt='Logo'  />
                <Link to="/">Home</Link><Link to="/update-profile">Information</Link>
              </div>
              <div className='header--address'>
                <input type='text' placeholder='Enter delivery address' />
                <p>to</p>
                <input type='text' placeholder='Enter destination' />
              </div>
              <div className='header--buttons'>
                <a href='#'>Sign In</a>
                <a href='#'>Register</a>
                <div className='cart-icon'>
                  <iconify-icon icon='ion:cart' width='30' height='30'></iconify-icon>
                  <div id='cart' className='bubble'>
                    {cart}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </header>
        
        <Routes>
          <Route path="/update-profile" element={<UpdateProfileForm />} />
          <Route path="/" element={
            <>
              <div className="countdown">
                <h2>Compte à Rebours Jusqu'à la Nouvelle Année</h2>
                <CountdownTimer targetDate="2024-01-01T00:00:00" />
              </div>
              <section className='shops'>
                <div className='container'>
                  <div className='shops--title'>
                    <h1>Offres du jour</h1>
                  </div>
                  <div className='shopsblocks'>
                    <BurgerBlock
                      imagePath={Macdo}
                      burgerName='Menu MacDo™'
                      price='12,50 €'
                      addToCart={addToCart}
                      removeFromCart={removeFromCart}
                    />
                    <BurgerBlock
                      imagePath={Kebab}
                      burgerName='Kebab™'
                      price='8,50 €'
                      addToCart={addToCart}
                      removeFromCart={removeFromCart}
                    />
                    <BurgerBlock
                      imagePath={KFC}
                      burgerName='KFC™'
                      price='10,00 €'
                      addToCart={addToCart}
                      removeFromCart={removeFromCart}
                    />
                    <BurgerBlock
                      imagePath={Sandwich}
                      burgerName='Sandwich™'
                      price='3,50 €'
                      addToCart={addToCart}
                      removeFromCart={removeFromCart}
                    />
                  </div>
                </div>
              </section>
              <section className='restaurants'>
                <div className='container'>
                  <div className='restaurants--title'>
                    <h1>État des Restaurants</h1>
                  </div>
                  <div className='restaurants--list'>
                    {restaurantsRef.current.map((restaurant, index) => (
                      <div key={index} className="restaurant-item">
                        <img src={restaurant.image} alt={restaurant.name} />
                        <p>{restaurant.name} - {restaurant.isOpen ? "Ouvert" : "Fermé"}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </section>
            </>
          } />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
