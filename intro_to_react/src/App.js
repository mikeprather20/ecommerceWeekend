import React, { useEffect, useState } from 'react'
import Signup from './views/Signup'
import Login from './views/Login'
import ToDoList from './views/ToDoList'
import Home from './views/Home'
import Nav from './components/Nav'
import Shop from './views/Shop'
import SingleProduct from './views/SingleProduct'
import Cart from './views/Cart'
import './App.css'
import { Routes, Route, BrowserRouter } from 'react-router-dom'

export default function App() {

  const getUserFromLocalStorage = () => {
    const foundUser = localStorage.getItem('user')
    if (foundUser) {
      return JSON.parse(foundUser)
    }
    return {}
  };

  const [user, setUser] = useState(getUserFromLocalStorage())
  const [cart, setCart] = useState([])

  const logMeIn = (user) => {
    setUser(user)
    localStorage.setItem('user', JSON.stringify(user))
  };

  const logMeOut = () => {
    setUser({})
    localStorage.removeItem('user')
  };

  const addToCart = (product) => {
    setCart([...cart, product])
  };

  const removeFromCart = (product) => {
    const newCart = [...cart]
    for (let i = cart.length - 1; i >= 0; i--) {
      if (product.id === cart[i].id) {
        newCart.splice(i, 1)
        break
      }
    }
    setCart(newCart)
  };

  const getCart = async (user) => {
    if (user.token) {
      const res = await fetch('http://127.0.0.1:5000/api/cart', {
        method: "GET",
        headers: { Authorization: `Bearer ${user.token}` }
      });
      const data = await res.json();
      if (data.status === 'ok') {
        setCart(data.cart)
      }
    }
    else {
      setCart([])
    }
  };

  useEffect(()=>{
    getCart(user)
  }, [user])

  return (

    <BrowserRouter>

      <div className='main'>

        <Nav user={user} cart={cart} logMeOut={logMeOut} />

        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/todolist' element={<ToDoList />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/login' element={<Login logMeIn={logMeIn} />} />
          <Route path='/shop' element={<Shop addToCart={addToCart} user={user} />} />
          <Route path='/shop/:productId' element={<SingleProduct addToCart={addToCart} user={user} />} />
          <Route path='/cart' element={<Cart cart={cart} removeFromCart={removeFromCart} user={user} />} />
        </Routes>

      </div>

    </BrowserRouter>

  )
};
