import React, { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import Navbar from './components/navbar';
import TaskList from './components/taskList';
import EditTask from './components/editTask';
import CreateTask from './components/createTask';
import LandingPage from './components/landingPage';
import Dashboard from './components/dashboard';
import Sidebar from './components/sidebar';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'

function App() {
  return (
    <div className='App'>
        <Sidebar />
        {/*<Navbar />*/}
        <div className="content">
          <Routes>
            <Route exact path="/" element={<LandingPage />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/tasks" element={<TaskList />} />
            <Route path="/edit-task/:id" element={<EditTask />} />
            <Route path="/create-task" element={<CreateTask />} />
          </Routes>
        </div>
    </div>
  );
}

export default App;