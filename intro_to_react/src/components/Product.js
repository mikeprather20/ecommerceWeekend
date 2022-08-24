import React from 'react'
import { Link } from 'react-router-dom'

export default function Product({ product, addToCart, user }) {

    const addToCartAPI = async (product) =>{
        const res = await fetch('http://localhost:5000/api/cart/add', {
            method: "POST",
            headers: {
                "content-Type": "application/json",
                Authorization: `Bearer ${user.token}`
            },
            body: JSON.stringify({productId: product.id})
        });
        const data = await res.json();
        console.log(data)
    };

    const handleClick = (product) =>{
        addToCart(product)
        if (user.token){
            addToCartAPI(product)
        }
    };


    return(

        <div className="card" style={{width: "18rem"}}>
           <Link to={`/shop/${product.id}`}><img src={product.img_url} className="card-img-top" alt="..."/></Link>
                <div className="card-body">
                    <h5 className="card-title">{product.product_name}</h5>
                    <p className="card-text">{product.price}</p>
                    <p className="card-text">{product.description}</p>
                    <button onClick={()=>{handleClick(product)}} className="btn btn-primary">Add to Cart</button>
                </div>
        </div>
    )
};
