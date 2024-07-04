import React from 'react'
import {Route, Routes } from 'react-router-dom';
import SleepTracker from './SleepTracker-b/SleepTracker';
import SocialSphere from './SocialSphere-b/SocialSphere';
import HabitMain from './HabitMain'
import Home from './Home'
import '../css/Body.css'
import MindfulMoment from './MindfulMoment-b/MindfulMoment';
import HydroTracker from './HydroTracker-b/HydroTracker';

function Body() {
  return (
    <div className="container d-flex justify-content-center align-items-center mt-6">        
        <Routes>
          <Route index element={<Home />} />
          <Route path="/sleeptracker" element={<SleepTracker />} />
          <Route path="/mindful_moment" element={<MindfulMoment />} />
          <Route path="/hydro_track" element={<HydroTracker />} />
          <Route path="/social_sphere" element={<SocialSphere />} />
          <Route path="/habit" element={<HabitMain />} />
        </Routes>
    </div>
  )
}

export default Body


