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
import SmokingTracker from './SmokingTracker-p/SmokingTracker';
import AddSmokingTracker from './SmokingTracker-p/AddSmookingTracker';
import EditSmokingTracker from './SmokingTracker-p/EditSmokingTracker';
import DrinkingTracker from './DrinkingTracker-p/DrinkingTracker';
import AddDrinkingTracker from './DrinkingTracker-p/AddDrinkingTracker';
import EditDrinkingTracker from './DrinkingTracker-p/EditDrinkingTracker';
import ScreenTimeTracker from './ScreenTimeTracker-p/ScreenTimeTracker';
import AddScreenTimeTracker  from './ScreenTimeTracker-p/AddScreenTimeTracker';
import EditScreenTimeTracker from  './ScreenTimeTracker-p/EditScreenTimeTracker';
import ActiveMoveTracker from './ActiveMoveTracker-p/ActiveMoveTracker';
import AddActiveMoveTracker from './ActiveMoveTracker-p/AddActiveMoveTarcker';
import EditActiveMoveTracker from './ActiveMoveTracker-p/EditActiveMoveTracker';
import MealPlanner from './MealPlanner-p/MealPlanner';
import AddMealPlanner from './MealPlanner-p/AddMealPlanner';
import EditMealPlanner from './MealPlanner-p/EditMealPlanner';

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
          <Route path="/smoking-tracker" element={<SmokingTracker />} />
          <Route path="/smoking-tracker/add" element={<AddSmokingTracker />}/>
          <Route path="/smoking-tracker/edit/:id" element={<EditSmokingTracker />}/>
          <Route path="/drinking-tracker" element={<DrinkingTracker />} /> 
          <Route path="/drinking-tracker/add" element={<AddDrinkingTracker />} /> 
          <Route path="/drinking-tracker/edit/:id" element={<EditDrinkingTracker />} />
          <Route path="/screen-tracker" element={<ScreenTimeTracker />} /> 
          <Route path="/screen-tracker/add" element={<AddScreenTimeTracker />} /> 
          <Route path="/screen-tracker/edit/:id" element={<EditScreenTimeTracker />} />
          <Route path="/activemove-tracker" element={<ActiveMoveTracker />} />
          <Route path="/activemove-tracker/add" element={<AddActiveMoveTracker />} />
          <Route path="/activemove-tracker/edit/:id" element={<EditActiveMoveTracker />} />
          <Route path="/meal-planner" element={<MealPlanner />} /> 
          <Route path="/meal-planner/add" element={<AddMealPlanner />} /> 
          <Route path="/meal-planner/edit/:id" element={<EditMealPlanner />} /> 
        </Routes>
    </div>
  )
}

export default Body


