import React, { useEffect } from 'react'
import { useState } from 'react'
import axios from 'axios';
import './App.css'
import Card from './assets/components/Card'
import Cart from './assets/components/Cart'
import Footer from './assets/components/footer'
import { CiShoppingCart } from "react-icons/ci";
export default function App() {
    const [products, setProducts] = useState([])
    const [cart, setCart] = useState(() => {
        const savedCart = localStorage.getItem('prevCart');
        return savedCart ? JSON.parse(savedCart) : [];
    })
    const [scale, setScale] = useState(0)
    useEffect(() => {
        axios.get('https://fakestoreapi.com/products')
            .then(res => {
                console.log(res.data)
                setProducts(res.data)
            })
            .catch(err => console.log(err))
    }, [])

    useEffect(() => {
        localStorage.setItem('prevCart', JSON.stringify(cart));
    }, [cart]);
    // useEffect(() => {
    //     const prevCart = JSON.parse(localStorage.getItem('prevCart'));
    //     if (prevCart != null) {
    //         setCart(prevCart);
    //     }
    // }, []);
    const addToCart = (product) => {
        setCart(prevCart => {
            const existingItem = prevCart.find(item => item.id === product.id);
            if (existingItem) {
                return prevCart.map(item =>
                    item.id === product.id ? { ...item, count: item.count + 1 } : item
                );
            } else {
                return [...prevCart, { ...product, count: 1 }];
            }
        });
        // if (cart.find(item => item.id == product.id)) {
        //     product.count += 1
        // }
        // else {
        //     product.count = 1
        //     cart.push(product)
        // }
        // console.log(product);
        // console.log(cart);
    }
    const handleCloseCart = () => {
        setScale(0)
    }
    const updateCart = (productId, newCount) => {
        setCart(prevCart => {
            if (newCount === 0) {
                return prevCart.filter(item => item.id !== productId);
            }
            return prevCart.map(item =>
                item.id === productId ? { ...item, count: newCount } : item
            );
        });
    };
    return (
        <div className="App">
            <Footer />
            <h1>Jewellery Store</h1>
            <CiShoppingCart size={40} style={{ position: 'absolute', top: '30px', right: '70px', color: '', borderRadius: '50%', border: '1px solid black', padding: '3px', cursor: 'pointer' }} onClick={() => setScale(1)} />
            <ul>
                {products.map((product) => {
                    return (
                        <Card key={product.id} product={{ ...product, count: 0 }} addToCart={addToCart} />
                    )
                })}
            </ul>
            <Cart handleCloseCart={handleCloseCart} scale={scale} cart={cart} updateCart={updateCart} />
        </div>
    )
}