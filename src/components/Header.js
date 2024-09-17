import React from 'react';
import './Header.css'

const Header = ({ black }) => {
    return (
        <header className={black ? 'black' : ' '}>
            <div className='header--logo'>
                <a href="/">
                    <img src='./tmdb.png' alt='logo' /></a>
            </div>
        </header>
    )
}

export default Header