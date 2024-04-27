import { motion } from "framer-motion";
import SplashPage from "./views/SplashPage";
import Homepage from './views/Homepage';
import './styles/App.scss';
import { useTheme } from './context/theme/ThemeContext';
import { Route, Routes, useLocation } from 'react-router-dom';

function App() {
  const { theme } = useTheme();
  const location = useLocation();

  return (
    <motion.div 
      className="App"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      exit={{ opacity: 0 }}
      style={{
        backgroundColor: theme.backgroundColor,
        color: theme.textColor,
      }}
    >
        <Routes>
          <Route path="/" element={<SplashPage />} />
          <Route path="/home" element={<Homepage />} />
        </Routes>
    </motion.div>
  );
}

export default App;
