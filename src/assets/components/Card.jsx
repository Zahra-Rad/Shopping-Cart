import React, { useState } from "react";
import './../../App.css'

export default function Card({ product ,addToCart }) {

    return (
        <li key={product.id}>
            <img src={product.image} alt={product.title} />
            <span>{product.category}</span>
            <h2>{product.title}</h2>
            <h4>{product.description}</h4>
            <div>
                <span>Price: <strong>${product.price}</strong></span>
                <button onClick={() => addToCart(product)}>Add to Cart</button>
            </div>
        </li>
    )
}