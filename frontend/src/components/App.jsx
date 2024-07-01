import '../css/App.css';
import React, {useEffect} from 'react';
import Habit from './Habit';
import Header from './Header';
import Footer from './Footer';
import Grid from '@mui/material/Grid';
import { styled } from '@mui/material/styles';
import axios from 'axios';

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

  // useEffect(() => {
  //   loadSleepHabits();
  //   console.log(habitNames);
  // }, []);

  // const loadSleepHabits = async () => {
  //   const result = await axios.get("http://localhost:8080/api/mindful-moment")
  //   console.log(result);
  // }

  const StyledGrid = styled(Grid)(({ theme }) => ({
    margin: theme.spacing(2),
    padding: theme.spacing(2),
    boxShadow: theme.shadows[3],
  }));

  return (
    <div>
      <Header habits={habitNames}/>
      <Grid container justifyContent="center" alignItems="center" mt={10}>
        <StyledGrid item xs={10} sm={8} md={10} lg={10}>
          <Grid container justifyContent="center" >
            {data.map((element, index) => (
              <Grid item xs={12} sm={10} md={5} lg={3.7} key={index} p={2}>
                <Habit
                  name={element.name}
                  attributes={element.attributes}
                />
              </Grid>
            ))}
          </Grid>
        </StyledGrid>
      </Grid>
      <Footer/>
    </div>
  );
}

export default App;
