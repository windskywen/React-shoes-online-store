import React, { useState, useEffect, useMemo } from 'react';
import Layout from 'Layout';
import CartItem from 'components/CartItem';
import axios from 'commons/axios';
import {formatPrice} from 'commons/helper';
import { TransitionGroup, CSSTransition } from 'react-transition-group';

const Cart = () => {
    
    const [carts, setCarts] = useState([]);
    
    useEffect(() => {
        axios.get('/carts').then(response => {
            setCarts(response.data)
        })
    }, [])
    
    const totalPrice = useMemo(() => {
        const totalPrice = carts
            .map(cart => cart.mount * parseInt(cart.price))
            .reduce((a, value) => a + value, 0)
        return formatPrice(totalPrice);
    }, [carts])

    const updateCart = cart => {
        const newCarts = [...carts];
        const _index = newCarts.findIndex( c => c.id === cart.id)
        newCarts.splice(_index, 1, cart);
        setCarts(newCarts);
    }

    const deleteCart = cart => {
        const _carts = carts.filter(c => c.id !== cart.id)
        setCarts(_carts)
    }

    return(
        <Layout>
            <div className="cart-page">
                <div className="cart-title">Shopping Cart</div>
                <div className="cart-list">
                    <TransitionGroup component={null}>
                        {carts.map(cart => 
                            <CSSTransition className="cart-item" timeout={300} key={cart.id}>
                                <CartItem 
                                    key={cart.id} 
                                    cart={cart} 
                                    updateCart={updateCart} 
                                    deleteCart={deleteCart}
                                />
                            </CSSTransition>
                        )}
                    </TransitionGroup>
                </div>
                { carts.length === 0 ? <p className="no-cart">No Goods</p> : ''}
                <div className="cart-total">
                    Total:
                    <span className="total-price">{totalPrice}</span>
                </div>
            </div>
        </Layout>
    )
}

export default Cart;