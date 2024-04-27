import {motion} from 'framer-motion';
import '../../styles/navbar.css';

const Navbar = () => {
    return (
        <motion.nav
            initial={{y: -250}}
            animate={{y: 0}}
            transition={{delay: 0.2, type: 'spring', stiffness: 120}}
        >
            <ul>
                <motion.li
                    initial={{x: -350}}
                    animate={{x: 0}}
                    transition={{delay: 1.3, type: 'spring', stiffness: 120}}
                ><a href="/">Business Card</a></motion.li>
                <motion.li
                    initial={{x: -600}}
                    animate={{x: 0}}
                    transition={{delay: 1.1, type: 'spring', stiffness: 120}}
                ><a href="/home">Home</a></motion.li>
                <motion.li
                    initial={{x: -850}}
                    animate={{x: 0}}
                    transition={{delay: 0.9, type: 'spring', stiffness: 120}}
                ><a href="/about">About</a></motion.li>
                <motion.li
                    initial={{x: -1100}}
                    animate={{x: 0}}
                    transition={{delay: 0.7, type: 'spring', stiffness: 120}}
                ><a href="/projects">Projects</a></motion.li>
                <motion.li
                    initial={{x: -1350}}
                    animate={{x: 0}}
                    transition={{delay: 0.5, type: 'spring', stiffness: 120}}
                ><a href="/contact">Contact</a></motion.li>
            </ul>
        </motion.nav>
    );
}

export default Navbar;