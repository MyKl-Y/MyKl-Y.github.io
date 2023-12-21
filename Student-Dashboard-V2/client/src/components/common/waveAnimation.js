import React from 'react';
import '../../styles/waveAnimation.css';
import { useTheme } from '../../context/theme/ThemeContext';

function WaveAnimation() {
    const { mode } = useTheme();

    const componentStyle = {
        '--wave1': 
            mode==='dark' ? 'rgba(12,15,19,0.7)' : 'rgba(236,240,243, 0.7)',
        '--wave2': 
            mode==='dark' ? 'rgba(12,15,19,0.5)' : 'rgba(236,240,243, 0.5)',
        '--wave3': 
            mode==='dark' ? 'rgba(12,15,19,0.3)' : 'rgba(236,240,243, 0.3)',
        '--wave4': 
            mode==='dark' ? 'rgba(12,15,19,1)' : 'rgba(236,240,243, 1)',
    };

    return (
        <div>
            <svg className="waves" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" viewBox="0 24 150 28" preserveAspectRatio="none" shapeRendering="auto">
                <defs>
                    <path id="gentle-wave" d="M-160 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z" />
                </defs>
                <g className="parallax">
                    <use xlinkHref="#gentle-wave" x="48" y="0" className="wave1" style={componentStyle} />
                    <use xlinkHref="#gentle-wave" x="48" y="3" className="wave2" style={componentStyle} />
                    <use xlinkHref="#gentle-wave" x="48" y="5" className="wave3" style={componentStyle} />
                    <use xlinkHref="#gentle-wave" x="48" y="7" className="wave4" style={componentStyle} />
                </g>
            </svg>
        </div>
    );
}

export default WaveAnimation;