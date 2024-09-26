import React from 'react'
import {Route, Routes, Navigate} from 'react-router-dom';

import SleepTracker from './SleepTracker/SleepTracker';
import SleepTrackerForUser from './SleepTracker/PerUser/SleepTrackerForUser';
import AddSleepTracker from './SleepTracker/AddSleepTracker';
import EditSleepTracker from './SleepTracker/EditSleepTracker';

import SocialSphere from './SocialSphere/SocialSphere';
import SocialSphereForUser from './SocialSphere/PerUser/SocialSphereForUser';
import AddSocialSphere from './SocialSphere/AddSocialSphere';
// import EditSocialSphere from './SocialSphere/EditSocialSphere';

import MindfulMoment from './MindfulMoment/MindfulMoment';
import MindfulMomentForUser from './MindfulMoment/PerUser/MindfulMomentForUser';
import AddMindfulMoment from './MindfulMoment/AddMindfulMoment';
import EditMindfulMoment from './MindfulMoment/EditMindfulMoment';

import HydroTracker from './HydroTracker/HydroTracker';
import HydroTrackerForUser from './HydroTracker/PerUser/HydroTrackerForUser';
import AddHydroTracker from './HydroTracker/AddHydroTracker';
import EditHydroTracker from './HydroTracker/EditHydroTracker';

import SmokingTracker from './SmokingTracker/SmokingTracker';
import SmokingTrackerForUser from './SmokingTracker/PerUser/SmokingTrackerForUser';
import AddSmokingTracker from './SmokingTracker/AddSmokingTracker';
import EditSmokingTracker from './SmokingTracker/EditSmokingTracker';

import DrinkingTracker from './DrinkingTracker/DrinkingTracker';
import DrinkingTrackerForUser from './DrinkingTracker/PerUser/DrinkingTrackerForUser';
import AddDrinkingTracker from './DrinkingTracker/AddDrinkingTracker';
import EditDrinkingTracker from './DrinkingTracker/EditDrinkingTracker';

import ScreenTimeTracker from './ScreenTimeTracker/ScreenTimeTracker';
import ScreenTimeTrackerForUser from './ScreenTimeTracker/PerUser/ScreenTimeTrackerForUser';
import AddScreenTimeTracker  from './ScreenTimeTracker/AddScreenTimeTracker';
import EditScreenTimeTracker from  './ScreenTimeTracker/EditScreenTimeTracker';

import ActiveMoveTracker from './ActiveMoveTracker/ActiveMoveTracker';
import ActiveMoveTrackerForUser from './ActiveMoveTracker/PerUser/ActiveMoveTrackerForUser';
import AddActiveMoveTracker from './ActiveMoveTracker/AddActiveMoveTarcker';
import EditActiveMoveTracker from './ActiveMoveTracker/EditActiveMoveTracker';

import MealPlanner from './MealPlanner/MealPlanner';
import MealPlannerForUser from './MealPlanner/PerUser/MealPlannerForUser';
import AddMealPlanner from './MealPlanner/AddMealPlanner';
// import EditMealPlanner from './MealPlanner/EditMealPlanner';

import WorkoutTracker from './WorkoutTracker/WorkoutTracker';
import WorkoutTrackerForUser from './WorkoutTracker/PerUser/WorkoutTrackerForUser';
import AddWorkoutTracker from './WorkoutTracker/AddWorkoutTracker';
import EditWorkoutTracker from './WorkoutTracker/EditWorkoutTracker';

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
                  <Route exact path="/screen-tracker" element={<ScreenTimeTracker />} /> 
                  <Route path="/screen-tracker/add" element={<AddScreenTimeTracker />} /> 
                  <Route exact path="/activemove-tracker" element={<ActiveMoveTracker />} />
                  <Route path="/activemove-tracker/add" element={<AddActiveMoveTracker />} />
                  <Route path="/activemove-tracker/edit/:id" element={<EditActiveMoveTracker />} />
                  <Route exact path="/meal-planner" element={<MealPlanner />} /> 
                  <Route path="/meal-planner/add" element={<AddMealPlanner />} /> 
                  {/* <Route path="/meal-planner/edit/:id" element={<EditMealPlanner />} /> */}
                  <Route exact path="/workout-tracker" element={<WorkoutTracker />} /> 
                  <Route path="/workout-tracker/add" element={<AddWorkoutTracker />} /> 
                  <Route path="/workout-tracker/edit/:id" element={<EditWorkoutTracker />} />
                </>) : (<>
                  <Route exact path="/hydro-track" element={<HydroTrackerForUser user={user} setUser={setUser}/>} />
                  <Route exact path="/activemove-tracker" element={<ActiveMoveTrackerForUser user={user} setUser={setUser}/>} />
                  <Route exact path="/drinking-tracker" element={<DrinkingTrackerForUser user={user} setUser={setUser}/>} />
                  <Route exact path="/mindful-moment" element={<MindfulMomentForUser user={user} setUser={setUser}/>} />
                  <Route exact path="/sleep-tracker" element={<SleepTrackerForUser user={user} setUser={setUser}/>} /> 
                  <Route exact path="/smoking-tracker" element={<SmokingTrackerForUser user={user} setUser={setUser}/>} />
                  <Route exact path="/screen-tracker" element={<ScreenTimeTrackerForUser user={user} setUser={setUser}/>} /> 
                  <Route exact path="/meal-planner" element={<MealPlannerForUser user={user} setUser={setUser}/>} /> 
                  <Route exact path="/social-sphere" element={<SocialSphereForUser user={user} setUser={setUser}/>} /> 
                  <Route exact path="/workout-tracker" element={<WorkoutTrackerForUser user={user} setUser={setUser}/>} />
                </>)
              }
              <Route path="/hydro-track/edit/:id" element={<EditHydroTracker isAdmin={isAdmin} user={user} setUser={setUser}/>} />
              <Route path="/activemove-tracker/edit/:id" element={<EditActiveMoveTracker isAdmin={isAdmin} user={user} setUser={setUser}/>} />
              <Route path="/drinking-tracker/edit/:id" element={<EditDrinkingTracker isAdmin={isAdmin} user={user} setUser={setUser}/>} />
              <Route path="/mindful-moment/edit/:id" element={<EditMindfulMoment isAdmin={isAdmin} user={user} setUser={setUser}/>} />
              <Route path="/sleep-tracker/edit/:id" element={<EditSleepTracker isAdmin={isAdmin} user={user} setUser={setUser}/>} />
              <Route path="/smoking-tracker/edit/:id" element={<EditSmokingTracker isAdmin={isAdmin} user={user} setUser={setUser}/>}/>
              <Route path="/screen-tracker/edit/:id" element={<EditScreenTimeTracker isAdmin={isAdmin} user={user} setUser={setUser}/>} />
              <Route path="/workout-tracker/edit/:id" element={<EditWorkoutTracker isAdmin={isAdmin} user={user} setUser={setUser}/>}/>
              
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


