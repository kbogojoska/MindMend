import React from 'react'
import {Route, Routes, Navigate} from 'react-router-dom';

import SleepTracker from './SleepTracker-b/SleepTracker';
import SleepTrackerForUser from './SleepTracker-b/PerUser/SleepTrackerForUser';
import AddSleepTracker from './SleepTracker-b/AddSleepTracker';
import EditSleepTracker from './SleepTracker-b/EditSleepTracker';

import SocialSphere from './SocialSphere-b/SocialSphere';
import SocialSphereForUser from './SocialSphere-b/PerUser/SocialSphereForUser';
import AddSocialSphere from './SocialSphere-b/AddSocialSphere';
// import EditSocialSphere from './SocialSphere-b/EditSocialSphere';

import MindfulMoment from './MindfulMoment-b/MindfulMoment';
import MindfulMomentForUser from './MindfulMoment-b/PerUser/MindfulMomentForUser';
import AddMindfulMoment from './MindfulMoment-b/AddMindfulMoment';
import EditMindfulMoment from './MindfulMoment-b/EditMindfulMoment';

import HydroTracker from './HydroTracker-b/HydroTracker';
import HydroTrackerForUser from './HydroTracker-b/PerUser/HydroTrackerForUser';
import AddHydroTracker from './HydroTracker-b/AddHydroTracker';
import EditHydroTracker from './HydroTracker-b/EditHydroTracker';

import SmokingTracker from './SmokingTracker-p/SmokingTracker';
import SmokingTrackerForUser from './SmokingTracker-p/PerUser/SmokingTrackerForUser';
import AddSmokingTracker from './SmokingTracker-p/AddSmokingTracker';
import EditSmokingTracker from './SmokingTracker-p/EditSmokingTracker';

import DrinkingTracker from './DrinkingTracker-p/DrinkingTracker';
import DrinkingTrackerForUser from './DrinkingTracker-p/PerUser/DrinkingTrackerForUser';
import AddDrinkingTracker from './DrinkingTracker-p/AddDrinkingTracker';
import EditDrinkingTracker from './DrinkingTracker-p/EditDrinkingTracker';

import ScreenTimeTracker from './ScreenTimeTracker-p/ScreenTimeTracker';
import ScreenTimeTrackerForUser from './ScreenTimeTracker-p/PerUser/ScreenTimeTrackerForUser';
import AddScreenTimeTracker  from './ScreenTimeTracker-p/AddScreenTimeTracker';
import EditScreenTimeTracker from  './ScreenTimeTracker-p/EditScreenTimeTracker';

import ActiveMoveTracker from './ActiveMoveTracker-p/ActiveMoveTracker';
import ActiveMoveTrackerForUser from './ActiveMoveTracker-p/PerUser/ActiveMoveTrackerForUser';
import AddActiveMoveTracker from './ActiveMoveTracker-p/AddActiveMoveTarcker';
import EditActiveMoveTracker from './ActiveMoveTracker-p/EditActiveMoveTracker';

import MealPlanner from './MealPlanner-p/MealPlanner';
import MealPlannerForUser from './MealPlanner-p/PerUser/MealPlannerForUser';
import AddMealPlanner from './MealPlanner-p/AddMealPlanner';
// import EditMealPlanner from './MealPlanner-p/EditMealPlanner';

import LogIn from "./Authentication/LogIn";
import LogOut from "./Authentication/LogOut";
import SignUp from "./Authentication/SignUp";
import NotFound from './NotFound'
import Home from './Home'
import '../css/Body.css'

function Body({ isLogged, setIsLogged, isAdmin, setIsAdmin, user, setUser }) {
  return (
    <div className="container d-flex justify-content-center align-items-center mt-6">        
        <Routes>
          <Route path="/" element={<Home isLogged={isLogged} setIsLogged={setIsLogged} isAdmin={isAdmin} setIsAdmin={setIsAdmin} user={user} setUser={setUser} />} />
          {isLogged ?  (
            <>
              {isAdmin ? 
                (<>
                  <Route exact path="/sleep-tracker" element={<SleepTracker />} />
                  <Route path="/sleep-tracker/add" element={<AddSleepTracker />} />
                  <Route exact path="/mindful-moment" element={<MindfulMoment />} />
                  <Route path="/mindful-moment/add" element={<AddMindfulMoment />} />
                  <Route exact path="/hydro-track" element={<HydroTracker />} />
                  <Route path="/hydro-track/add" element={<AddHydroTracker />} />
                  <Route exact path="/social-sphere" element={<SocialSphere />} />
                  <Route path="/social-sphere/add" element={<AddSocialSphere />} />
                  {/* <Route path="/social-sphere/edit/:id" element={<EditSocialSphere />} /> */}
                  <Route exact path="/smoking-tracker" element={<SmokingTracker />} />
                  <Route path="/smoking-tracker/add" element={<AddSmokingTracker />}/>
                  <Route exact path="/drinking-tracker" element={<DrinkingTracker />} /> 
                  <Route path="/drinking-tracker/add" element={<AddDrinkingTracker />} /> 
                  <Route path="/drinking-tracker/edit/:id" element={<EditDrinkingTracker />} />
                  <Route exact path="/screentime-tracker" element={<ScreenTimeTracker />} /> 
                  <Route path="/screentime-tracker/add" element={<AddScreenTimeTracker />} /> 
                  <Route exact path="/activemove-tracker" element={<ActiveMoveTracker />} />
                  <Route path="/activemove-tracker/add" element={<AddActiveMoveTracker />} />
                  <Route path="/activemove-tracker/edit/:id" element={<EditActiveMoveTracker />} />
                  <Route exact path="/meal-planner" element={<MealPlanner />} /> 
                  <Route path="/meal-planner/add" element={<AddMealPlanner />} /> 
                  {/* <Route path="/meal-planner/edit/:id" element={<EditMealPlanner />} /> */}
                </>) : (<>
                  <Route exact path="/hydro-track" element={<HydroTrackerForUser user={user} setUser={setUser}/>} />
                  <Route exact path="/activemove-tracker" element={<ActiveMoveTrackerForUser user={user} setUser={setUser}/>} />
                  <Route exact path="/drinking-tracker" element={<DrinkingTrackerForUser user={user} setUser={setUser}/>} />
                  <Route exact path="/mindful-moment" element={<MindfulMomentForUser user={user} setUser={setUser}/>} />
                  <Route exact path="/sleep-tracker" element={<SleepTrackerForUser user={user} setUser={setUser}/>} /> 
                  <Route exact path="/smoking-tracker" element={<SmokingTrackerForUser user={user} setUser={setUser}/>} />
                  <Route exact path="/screentime-tracker" element={<ScreenTimeTrackerForUser user={user} setUser={setUser}/>} /> 
                  <Route exact path="/meal-planner" element={<MealPlannerForUser user={user} setUser={setUser}/>} /> 
                  <Route exact path="/social-sphere" element={<SocialSphereForUser user={user} setUser={setUser}/>} /> 
                </>)
              }
              <Route path="/hydro-track/edit/:id" element={<EditHydroTracker isAdmin={isAdmin} user={user} setUser={setUser}/>} />
              <Route path="/activemove-tracker/edit/:id" element={<EditActiveMoveTracker isAdmin={isAdmin} user={user} setUser={setUser}/>} />
              <Route path="/drinking-tracker/edit/:id" element={<EditDrinkingTracker isAdmin={isAdmin} user={user} setUser={setUser}/>} />
              <Route path="/mindful-moment/edit/:id" element={<EditMindfulMoment isAdmin={isAdmin} user={user} setUser={setUser}/>} />
              <Route path="/sleep-tracker/edit/:id" element={<EditSleepTracker isAdmin={isAdmin} user={user} setUser={setUser}/>} />
              <Route path="/smoking-tracker/edit/:id" element={<EditSmokingTracker isAdmin={isAdmin} user={user} setUser={setUser}/>}/>
              <Route path="/screentime-tracker/edit/:id" element={<EditScreenTimeTracker isAdmin={isAdmin} user={user} setUser={setUser}/>} />
              
              <Route path="/logout" element={<LogOut isLogged={isLogged} setLogged={setIsLogged} user={user} setUser={setUser}/>} />
            </> ) : (
            <>
              <Route path="/login" element={<LogIn setLogged={setIsLogged}  isAdmin={isAdmin} setIsAdmin={setIsAdmin} user={user} setUser={setUser}/>} />
              <Route path="/signup" element={<SignUp />} />  
              <Route path="*" element={<Navigate to="/" replace />} />
            </>
          )
          } 
          <Route path="*" element={<NotFound />} />
        </Routes>
    </div>
  )
}

export default Body


