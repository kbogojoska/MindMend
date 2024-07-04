import '../css/App.css';
import React from 'react';
import { BrowserRouter as Router} from 'react-router-dom';
import Header from './HeaderFooter/Header';
import Footer from './HeaderFooter/Footer';
import Body from './Body';

function App() {

  const data = [
        {
          "name": "sleeptracker",
          "attributes": [
            "recommended_sleep_time",
            "wake_up_time",
            "bed_time",
            "application_user_id"
          ]
        },
        {
          "name": "mindful_moment",
          "attributes": [
            "start_of_work_shift",
            "end_of_work_shift",
            "stress_level",
            "application_user_id"
          ]
        },
        {
          "name": "hydro_track",
          "attributes": [
            "num_Glasses_Of_Water",
            "personal_Goal",
            "application_User_Id"
          ]
        },
        {
          "name": "social_activity",
          "attributes": [
            "name",
            "description"
          ]
        },
        {
          "name": "social_sphere",
          "attributes": [
            "application_User_Id"
          ]
        },
        {
          "name": "meal_planner",
          "attributes": [
            "user_id"
          ]
        },
        {
          "name": "active_move_tracker",
          "attributes": [
            "user_id",
            "daily_Steps_Goal"
          ]
        },
        {
          "name": "screen_time_tracker",
          "attributes": [
            "NEXT_BREAK_TIME",
            "END_OF_BREAK_TIME",
            "WORK_TIME_START",
            "WORK_TIME_END",
            "application_user_id"
          ]
        }
  ]

  const habitNames = data.map(habit => habit.name);

  return (
    <Router>
      <div>
        <Header habits={habitNames} />
        {/* <Grid container justifyContent="center" alignItems="center" mt={10}> */}
          <Body/>
        {/* </Grid> */}
        <Footer />
      </div>
    </Router>
  );
}

export default App;
