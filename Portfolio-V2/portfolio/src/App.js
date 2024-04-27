import './styles/App.css';
import Navbar from './components/common/navbar';
import Home from './pages/Home';
import BusinessCard from './pages/BusinessCard';
import { Route, Routes } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route exact path="/" element={<BusinessCard/>} />
        <Route path="/home" element={<Home/>} />
      </Routes>
    </div>
  );
}

export default App;