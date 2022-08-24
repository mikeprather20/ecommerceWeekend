import React, { useState, useEffect } from 'react'
import Product from '../components/Product'

export default function Shop({addToCart, user}) {
  const [products, setProducts] = useState([])

  const getProducts = async () => {
    const res = await fetch('http://127.0.0.1:5000/api/products');
    const data = await res.json();
    setProducts(data.products)
  };

  useEffect(() => {
    getProducts()
  }, [])

  const showProducts = () => {
    return products.map(p=><Product key={p.id} addToCart={addToCart} product={p} user={user}/>)
  };


  return (
    <div>
      <div>
        <h1>My Shop</h1>
      </div>
      <div className='row'>
        {showProducts()}
      </div>
    </div>
  )
};
