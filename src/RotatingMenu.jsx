import React, { useState, useEffect } from 'react';
import './RotatingMenu.css';
import menu1 from './menuImages/menu1.jpg';
import menu2 from './menuImages/menu2.jpg';
import menu3 from './menuImages/menu3.jpg';
import menu4 from './menuImages/menu4.jpg';
import menu5 from './menuImages/menu5.jpg';
import menu6 from './menuImages/menu6.jpg';

const RotatingMenu = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const images = [menu1, menu2, menu3, menu4, menu5, menu6];

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
        }, 3000);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="rotating-menu">
            <img src={images[currentIndex]} alt={`Menu ${currentIndex + 1}`} />
            <h2>Choose your favorite food{currentIndex + 1}</h2>
        </div>
    );
};

export default RotatingMenu;
