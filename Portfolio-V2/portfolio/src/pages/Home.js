import { motion } from 'framer-motion';
import { useLocation } from 'react-router-dom';
import Navbar from '../components/common/navbar';

const Home = () => {
    const location = useLocation();
    return (
        <div>
            <Navbar />
        </div>
    );
}

export default Home;