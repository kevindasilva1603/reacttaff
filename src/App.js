import React, { useState, useEffect, useRef } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import CountdownTimer from "./CountdownTimer";
import UpdateProfileForm from "./UpdateProfileForm";
import "./main.css";
import "./index.css";
import "./App.css";

import Logo from "./images/logo.svg";
import Macdo from "./images/images.jpg";
import Kebab from "./images/kebab.jpg";
import KFC from "./images/kfc.jpeg";
import Sandwich from "./images/sandwich.jpg";
import { BurgerBlock } from "./burger.js";

function App() {
    const [cart, setCart] = useState(0);

    const addToCart = (quantity) => {
        setCart(cart + quantity);
    };

    const removeFromCart = (quantity) => {
        setCart(cart - quantity);
    };

    const restaurantsRef = useRef([
        { name: "Menu MacDo", isOpen: false, image: Macdo, timer: 10 },
        { name: "Kebab", isOpen: false, image: Kebab, timer: 120 },
        { name: "KFC", isOpen: false, image: KFC, timer: 120 },
        { name: "Sandwich", isOpen: false, image: Sandwich, timer: 90 },
    ]);

    const handleTimeout = (index) => {
        const updatedRestaurants = [...restaurantsRef.current];
        updatedRestaurants[index].isOpen = true;
        restaurantsRef.current = updatedRestaurants;
    };

    return (
        <Router>
            <div className='App'>
                <header>
                    <div className='container'>
                        <div className='header'>
                            <div className='headerlogo'>
                                <Link to='/'>
                                    <img
                                        className='logo'
                                        src={Logo}
                                        alt='Logo'
                                    />
                                </Link>
                            </div>
                            <div className='header--address'>
                                <input
                                    type='text'
                                    placeholder='Enter delivery address'
                                />
                                <p>to</p>
                                <input
                                    type='text'
                                    placeholder='Enter destination'
                                />
                            </div>
                            <div className='header--buttons'>
                                <a href='#'>Sign In</a>
                                <a href='#'>Register</a>
                                <div className='cart-icon'>
                                    <iconify-icon
                                        icon='ion:cart'
                                        width='30'
                                        height='30'></iconify-icon>
                                    <div id='cart' className='bubble'>
                                        {cart}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </header>

                <Routes>
                    <Route
                        path='/update-profile'
                        element={<UpdateProfileForm />}
                    />
                    <Route
                        path='/'
                        element={
                            <>
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
                                            {restaurantsRef.current.map(
                                                (restaurant, index) => (
                                                    <div
                                                        key={index}
                                                        className='restaurant-item'>
                                                        <img
                                                            src={
                                                                restaurant.image
                                                            }
                                                            alt={
                                                                restaurant.name
                                                            }
                                                        />
                                                        <p>
                                                            {restaurant.name} -{" "}
                                                            {restaurant.isOpen
                                                                ? "Ouvert"
                                                                : "Fermé"}
                                                        </p>
                                                        {!restaurant.isOpen && (
                                                            <CountdownTimer
                                                                duration={
                                                                    restaurant.timer
                                                                }
                                                                onTimeout={() =>
                                                                    handleTimeout(
                                                                        index
                                                                    )
                                                                }
                                                            />
                                                        )}
                                                    </div>
                                                )
                                            )}
                                        </div>
                                    </div>
                                </section>
                            </>
                        }
                    />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
