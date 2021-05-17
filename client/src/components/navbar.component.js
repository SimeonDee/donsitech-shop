import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

import { Link } from 'react-router-dom';

export default class Navbar extends Component{
    render(){
        return(
            <nav className='navbar navbar-dark bg-dark navbar-expand-lg'>
                <Link to='/' className='navbar-brand'> Donsitech Shop</Link>

                <ul className='navbar-nav mr-auto'>
                    <li className='navbar-item'>
                        <Link to='/user/' className='navbar-link'> View Users </Link>
                    </li>
                    <li className='navbar-item'>
                        <Link to='/user/create' className='navbar-link'> New User </Link>
                    </li>
                    <li className='navbar-item'>
                        <Link to='/product/' className='navbar-link'> Our Products </Link>
                    </li>
                    <li className='navbar-item'>
                        <Link to='/product/create' className='navbar-link'> Add Product </Link>
                    </li>
                    <li className='navbar-item'>
                        <Link to='/order/' className='navbar-link'> View Orders </Link>
                    </li>
                    <li className='navbar-item'>
                        <Link to='/order/create' className='navbar-link'> Place Order </Link>
                    </li>
                    <li className='navbar-item'>
                        <Link to='/cart' className='navbar-link'> View Cart </Link>
                    </li>

                </ul>
            </nav>
        );
    }
}