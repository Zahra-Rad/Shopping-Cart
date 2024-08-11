import React, { useRef, useEffect, useState } from "react";
import { IoIosCloseCircleOutline } from "react-icons/io";
import './cart.css'

export default function Cart({ cart, handleCloseCart, scale, updateCart }) {
    const inpRef = useRef(0)
    const handleCountChange = (product, value) => {
        const newCount = product.count + value;
        if (newCount > 0) {
            updateCart(product.id, newCount);
        } else {
            updateCart(product.id, 0); // This will remove the item from the cart
        }
    }
    
    return (
        <ul style={{ transform: `translate(-50%, -50%)scale(${scale})` }} className="cartUl">
            <IoIosCloseCircleOutline size={35} style={{ position: 'fixed', alignSelf: 'flex-end', margin: '10px', color: 'black', borderRadius: '50%', cursor: 'pointer' }} onClick={handleCloseCart} />
            {
                cart.length > 0 ?
                    cart.map((product) => (
                        <li key={product.id}>
                            <img src={product.image} alt={product.title} />
                            <h2>{product.title}</h2>
                            <div>
                                <div>
                                    <p>${product.price}</p>
                                    <span>&#215;</span>
                                    <div>
                                        <span className="minus" onClick={() => handleCountChange(product, -1)}>-</span>
                                        <input type="number" value={product.count} readOnly />
                                        <span className="plus" onClick={() => handleCountChange(product, 1)}>+</span>
                                    </div>
                                </div>
                                <strong>${product.price * product.count}</strong>
                            </div>
                        </li>
                    )) : <h1>No items in cart</h1>
            }
            {cart.length > 0 && <button>Buy for ${cart.reduce((acc, product) => acc + product.price * product.count, 0)}</button>}
        </ul>
    )
}