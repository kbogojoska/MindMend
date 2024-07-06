import React from 'react'
import {Route, Routes } from 'react-router-dom';
import SleepTracker from './SleepTracker-b/SleepTracker';
import AddSleepTracker from './SleepTracker-b/AddSleepTracker';
import EditSleepTracker from './SleepTracker-b/EditSleepTracker';
import SocialSphere from './SocialSphere-b/SocialSphere';
import AddSocialSphere from './SocialSphere-b/AddSocialSphere';
import EditSocialSphere from './SocialSphere-b/EditSocialSphere';
import Home from './Home'
import '../css/Body.css'
import MindfulMoment from './MindfulMoment-b/MindfulMoment';
import AddMindfulMoment from './MindfulMoment-b/AddMindfulMoment';
import EditMindfulMoment from './MindfulMoment-b/EditMindfulMoment';
import HydroTracker from './HydroTracker-b/HydroTracker';
import AddHydroTracker from './HydroTracker-b/AddHydroTracker';
import EditHydroTracker from './HydroTracker-b/EditHydroTracker';

function Body() {
  return (
    <div className="container d-flex justify-content-center align-items-center mt-6">        
        <Routes>
          <Route index element={<Home />} />
          <Route path="/sleep-tracker" element={<SleepTracker />} />
          <Route path="/sleep-tracker/add" element={<AddSleepTracker />} />
          <Route path="/sleep-tracker/edit/:id" element={<EditSleepTracker />} />
          <Route path="/mindful-moment" element={<MindfulMoment />} />
          <Route path="/mindful-moment/add" element={<AddMindfulMoment />} />
          <Route path="/mindful-moment/edit/:id" element={<EditMindfulMoment />} />
          <Route path="/hydro-track" element={<HydroTracker />} />
          <Route path="/hydro-track/add" element={<AddHydroTracker />} />
          <Route path="/hydro-track/edit/:id" element={<EditHydroTracker />} />
          <Route exact path="/social-sphere" element={<SocialSphere />} />
          <Route path="/social-sphere/add" element={<AddSocialSphere />} />
          <Route path="/social-sphere/edit/:id" element={<EditSocialSphere />} />
          {/* <Route path="/drinking-tracker" element={<DrinkingTracker />} /> */}
          {/* <Route path="/smoking-tracker" element={<SmokingTracker />} /> */}
          {/* <Route path="/meal-planner" element={<MealPlanner />} /> */}
          {/* <Route path="/activemove-tracker" element={<ActiveMoveTracker />} /> */}
          {/* <Route path="/screentime-tracker" element={<ScreenTimeTracker />}/> */}
        </Routes>
    </div>
  )
}

export default Body


