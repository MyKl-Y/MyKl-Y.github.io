import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Navbar from './components/navbar';
import TaskList from './components/taskList';
import Edit from './components/edit';
import Create from './components/create';

function App() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route exact path="/" element={<TaskList />} />
        <Route path="/edit/:id" element={<Edit />} />
        <Route path="/create" element={<Create />} />
      </Routes>
    </div>
  );
}

export default App;