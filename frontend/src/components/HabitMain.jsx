import React from 'react';
import Grid from '@mui/material/Grid';
import { styled } from '@mui/material/styles';
import Habit from './Habit';

function HabitMain() {    

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

    const StyledGrid = styled(Grid)(({ theme }) => ({
        margin: theme.spacing(2),
        padding: theme.spacing(2),
        boxShadow: theme.shadows[3],
      }));

    return (
        <div>
            <Grid container justifyContent="center" alignItems="center">
                <StyledGrid item xs={10} sm={10} md={10} lg={10}>
                    <Grid container justifyContent="center" >
                        {data.map((element, index) => (
                        <Grid item xs={12} sm={10} md={6} lg={3.7} key={index} p={2}>
                            <Habit
                                name={element.name}
                                attributes={element.attributes}
                            />
                        </Grid>
                        ))}
                    </Grid>
                </StyledGrid>
            </Grid>
        </div>
    )
}

export default HabitMain