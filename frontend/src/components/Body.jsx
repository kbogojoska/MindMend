import React from 'react'
import {Route, Routes } from 'react-router-dom';

import SleepTracker from './SleepTracker-b/SleepTracker';
import AddSleepTracker from './SleepTracker-b/AddSleepTracker';
import EditSleepTracker from './SleepTracker-b/EditSleepTracker';

import SocialSphere from './SocialSphere-b/SocialSphere';
import AddSocialSphere from './SocialSphere-b/AddSocialSphere';
import EditSocialSphere from './SocialSphere-b/EditSocialSphere';

import MindfulMoment from './MindfulMoment-b/MindfulMoment';
import AddMindfulMoment from './MindfulMoment-b/AddMindfulMoment';
import EditMindfulMoment from './MindfulMoment-b/EditMindfulMoment';

import HydroTracker from './HydroTracker-b/HydroTracker';
import AddHydroTracker from './HydroTracker-b/AddHydroTracker';
import EditHydroTracker from './HydroTracker-b/EditHydroTracker';

import SmokingTracker from './SmokingTracker-p/SmokingTracker';
import AddSmokingTracker from './SmokingTracker-p/AddSmokingTracker';
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

import LogIn from "./Authentication/LogIn";
import LogOut from "./Authentication/LogOut";
import SignIn from "./Authentication/SignIn";
import NotFound from './NotFound'
import Home from './Home'
import '../css/Body.css'

function Body() {
  return (
    <div className="container d-flex justify-content-center align-items-center mt-6">        
        <Routes>
          <Route path="/" element={<Home />} />
          <Route exact path="/sleep-tracker" element={<SleepTracker />} />
          <Route path="/sleep-tracker/add" element={<AddSleepTracker />} />
          <Route path="/sleep-tracker/edit/:id" element={<EditSleepTracker />} />
          <Route exact path="/mindful-moment" element={<MindfulMoment />} />
          <Route path="/mindful-moment/add" element={<AddMindfulMoment />} />
          <Route path="/mindful-moment/edit/:id" element={<EditMindfulMoment />} />
          <Route exact path="/hydro-track" element={<HydroTracker />} />
          <Route path="/hydro-track/add" element={<AddHydroTracker />} />
          <Route path="/hydro-track/edit/:id" element={<EditHydroTracker />} />
          <Route exact path="/social-sphere" element={<SocialSphere />} />
          <Route path="/social-sphere/add" element={<AddSocialSphere />} />
          <Route path="/social-sphere/edit/:id" element={<EditSocialSphere />} />
          <Route exact path="/smoking-tracker" element={<SmokingTracker />} />
          <Route path="/smoking-tracker/add" element={<AddSmokingTracker />}/>
          <Route path="/smoking-tracker/edit/:id" element={<EditSmokingTracker />}/>
          <Route exact path="/drinking-tracker" element={<DrinkingTracker />} /> 
          <Route path="/drinking-tracker/add" element={<AddDrinkingTracker />} /> 
          <Route path="/drinking-tracker/edit/:id" element={<EditDrinkingTracker />} />
          <Route exact path="/screentime-tracker" element={<ScreenTimeTracker />} /> 
          <Route path="/screentime-tracker/add" element={<AddScreenTimeTracker />} /> 
          <Route path="/screentime-tracker/edit/:id" element={<EditScreenTimeTracker />} />
          <Route exact path="/activemove-tracker" element={<ActiveMoveTracker />} />
          <Route path="/activemove-tracker/add" element={<AddActiveMoveTracker />} />
          <Route path="/activemove-tracker/edit/:id" element={<EditActiveMoveTracker />} />
          <Route exact path="/meal-planner" element={<MealPlanner />} /> 
          <Route path="/meal-planner/add" element={<AddMealPlanner />} /> 
          <Route path="/meal-planner/edit/:id" element={<EditMealPlanner />} />
          
          <Route path="/login" element={<LogIn />} />
          <Route path="/logout" element={<LogOut />} />
          <Route path="/signin" element={<SignIn />} />   
          <Route path="*" element={<NotFound />} />
        </Routes>
    </div>
  )
}

export default Body


