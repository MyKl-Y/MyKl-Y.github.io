import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import '../styles/BusinessCard.css';

const BusinessCard = () => {
    const [clickCount, setClickCount] = useState(0);
    const [isFocused, setIsFocused] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        // Reset click count when the card is not focused
        if (!isFocused) {
            setClickCount(0);
        }
    }, [isFocused]);

    const handleClick = () => {
        setClickCount(prevCount => prevCount + 1);

        if (clickCount === 1) {
            //rotate card
            document.querySelector('.card').style.transform = 'rotateY(180deg)';
            document.querySelector('.card').style.transition = 'transform 1s, background-color 2.5s';
            setTimeout(() => {
                document.querySelector('.card').style.transform = 'scale(7)';
                document.querySelector('.card').style.backgroundImage = 'none';
                document.querySelector('.card').style.backgroundColor = 'white';
            }, 500);
            /*
            setTimeout(() => {
                document.querySelector('.mLogo').style.transition = 'transform 2.5s, background-color 2.5s';
                document.querySelector('.mLogo').style.visibility = 'visible';
                document.querySelector('.mLogo').style.transform = 'scale(1)';
            }, 500);
            setTimeout(() => {
                document.querySelector('.mLogo').style.transition = 'transform 2s, background-color 2.5s';
                document.querySelector('.mLogo').style.transform = 'scale(0.1) translate(-450vw, -445vh)';
            }, 2500);
            */
            setTimeout(() => {
                navigate('/home');
            }, 5000);
        }
    };

    const handleFocus = () => {
        setIsFocused(true);
    };

    const handleBlur = () => {
        setIsFocused(false);
    };

    return (
        <div className="business-card" onClick={e => e.stopPropagation()} tabIndex={-1} onBlur={handleBlur}>
            {/*
            <svg className='mLogo' viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
                <path 
                    id="M" 
                    d="
                    M173.4,113.1c-5.3,8.3-10,14.6-14.3,18.9c-4.3,4.3-10.3,6.5-18,6.5c-5.3,0-9.2-1.7-11.9-5
                    c-2.7-3.3-4-7.3-4-11.8c0-3.3,0.4-6.2,1.2-8.6c0.8-2.4,1.9-5.1,3.3-8c1.4-2.9,4.2-8.6,8.6-17.1c4.3-8.5,6.5-14.1,6.5-16.6
                    c0-1.1-0.2-1.9-0.7-2.4c-0.5-0.5-1.2-0.8-2.2-0.8c-1.2,0-2.7,0.7-4.4,2.1c-1.7,1.4-3.8,3.8-6.4,7.2c-2.5,3.4-5,7.5-7.3,12.3
                    c-2.3,4.8-5.4,11.3-9.3,19.6c-3.8,8.3-6.7,14.4-8.5,18.3c-1.8,3.9-3.2,7-4.2,9.2H72.2c0.5-1.1,2.8-6.2,6.9-15.4
                    c4.1-9.1,8.1-18.1,12.1-27c4-8.8,6.2-13.8,6.8-14.9c0.5-1.1,1-2.5,1.6-4.1c0.6-1.6,0.8-3,0.8-4.2c0-1.1-0.2-1.9-0.7-2.5
                    c-0.5-0.6-1.1-0.8-2-0.8c-1.3,0-2.8,0.7-4.6,2.1c-1.7,1.4-3.5,3.3-5.2,5.6c-1.8,2.3-3.5,4.9-5.2,7.7c-1.7,2.8-3.1,5.5-4.2,7.9
                    L56.2,137H26.6l26.2-57.6c0.2-0.5,0.7-1.7,1.4-3.6c0.8-1.9,1.1-3.5,1.1-4.9c0-1-0.2-1.7-0.6-2.2c-0.4-0.5-1-0.7-1.8-0.7
                    c-1,0-2.5,0.7-4.3,2c-1.9,1.3-3.7,3-5.6,5.2c-1.9,2.1-3.7,4.5-5.5,7.3c-1.8,2.7-3.8,6-5.9,9.9l-1.8-0.9c5.4-10.7,10.5-18.1,15.4-22
                    c4.9-3.9,10-5.9,15.2-5.9c4.8,0,8.7,1.7,12,5c3.2,3.3,4.9,7.4,4.9,12.2c0,2.2-0.1,4.1-0.3,5.6c-0.2,1.5-0.5,3-0.9,4.4l0.5,0.2
                    c5.7-11.1,10.6-18.5,14.9-22c4.3-3.5,9-5.3,14.2-5.3c5.3,0,9.6,1.4,13,4.3c3.4,2.9,5.1,6.7,5.1,11.5c0,2.2-0.3,4.3-0.8,6.1
                    c-0.8,2.1-1.4,3.7-1.7,4.6c5.2-9.5,9.6-16.3,13.3-20.4c3.7-4.1,9.3-6.1,16.8-6.1c5,0,9.1,1.5,12.3,4.4c3.2,2.9,4.9,7.5,4.9,13.7
                    c0,3.4-0.5,6.5-1.6,9.1c-1.1,2.6-2.7,6.3-5,11.1c-2.3,4.8-5.2,10.5-8.8,17.3c-3.6,6.8-5.4,10.9-5.4,12.4c0,0.9,0.2,1.6,0.6,2.1
                    c0.4,0.5,1,0.8,1.7,0.8c2.9,0,6-1.8,9.3-5.4c3.2-3.6,5.7-6.6,7.4-9.2c1.7-2.5,3.4-5.1,5-7.7L173.4,113.1z
                    "
                />
            </svg>
            */}

            <motion.div 
                initial={{y: -250}}
                animate={{y: 0}}
                transition={{delay: 0.2, type: 'spring', stiffness: 120}}
            >
                {clickCount <= 1 ? (
                <button className="card" onClick={handleClick} onFocus={handleFocus} tabIndex={0}>
                    <div className="row clearfix">
                        <div className="left big">*** *** 9496</div>
                        <div className="right">
                            <p>
                                <span className="big">M.Y</span>. <span class="big">C</span>reations
                            </p>
                            <p>
                                <span className="med no-space">C</span><span className="small no-space">omputer </span><span className="med no-space">S</span><span className="small no-space">cience and </span><span className="med no-space">E</span><span className="small no-space">ngineering</span>
                            </p>
                        </div>
                    </div>
                    <div className="row">
                        <p><span className="big">M</span>ichael <span className="big">Yim</span></p>
                        <p><span className="big">U</span>ndergraduate <span className="big">S</span>tudent</p>
                    </div>
                    <div className="row">
                        <p><span className="med">358 E</span><span className="small">xchange </span><span className="med">P</span><span className="small">lace </span><span className="med">N</span><span className="small">ew </span><span className="med">Y</span><span className="small">ork</span><span className="med">, N. Y. 10099 F</span><span className="small">ax </span><span className="med">212 555 6390 T</span><span className="small">elex </span><span className="med">10 4534</span>
                        </p>
                    </div>
                </button>
                ) : (
                <button className="card" onClick={handleClick} onFocus={handleFocus} tabIndex={0}>
                    
                </button>
                )}
            </motion.div>
        </div>
    );
}

export default BusinessCard;