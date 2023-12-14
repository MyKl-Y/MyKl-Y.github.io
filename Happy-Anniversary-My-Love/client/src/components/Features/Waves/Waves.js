import React from 'react';
import { useTheme } from '../../../context/theme/ThemeContext';
import '../../../styles/Waves.scss';

function WaveAnimation() {
    const { theme } = useTheme();

    return (
        <div
            className='waves__container'
        >
            <svg 
                className="waves" 
                xmlns="http://www.w3.org/2000/svg" 
                xmlnsXlink="http://www.w3.org/1999/xlink" 
                viewBox="0 24 150 28" 
                preserveAspectRatio="none" 
                shapeRendering="auto"
            >
                <defs>
                    <path id="gentle-wave" d="M-160 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z" />
                </defs>
                <g className="parallax">
                    <use 
                        xlinkHref="#gentle-wave" 
                        x="48" 
                        y="0" 
                        className="wave1"
                        style={
                            {
                                fill: theme.buttonColor,
                            }
                        }
                    />
                    <use 
                        xlinkHref="#gentle-wave" 
                        x="48" 
                        y="3" 
                        className="wave2"
                        style={
                            {
                                fill: theme.buttonColor,
                            }
                        }
                    />
                    <use 
                        xlinkHref="#gentle-wave" 
                        x="48" 
                        y="5" 
                        className="wave3"
                        style={
                            {
                                fill: theme.buttonColor,
                            }
                        }
                    />
                    <use 
                        xlinkHref="#gentle-wave" 
                        x="48" 
                        y="7" 
                        className="wave4"
                        style={
                            {
                                fill: theme.buttonColor,
                            }
                        }
                    />
                </g>
            </svg>
        </div>
    );
}

export default WaveAnimation;