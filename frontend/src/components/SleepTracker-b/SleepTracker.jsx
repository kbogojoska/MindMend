import React, { useState, useEffect } from 'react';
import Grid from '@mui/material/Grid';
import { styled } from '@mui/material/styles';
import axios from 'axios';
import SleepTrackerItem from './SleepTrackerItem';
import '../../css/BodyElementsFade.css'

function SleepTracker() {
    const [axiosData, setAxiosData] = useState([]);

    useEffect(() => {
        loadSleepHabits();
    }, []);

    const loadSleepHabits = async () => {
        try {
            const result = await axios.get("http://localhost:8080/api/sleep-tracker")
            console.log(result.data);
            setAxiosData(result.data);
        } catch (error) {
            console.error("There was an error making the request:", error);
        }
    }  

    const StyledGrid = styled(Grid)(({ theme }) => ({
        margin: theme.spacing(2),
        padding: theme.spacing(2),
        boxShadow: theme.shadows[3],
    }));

    return (
        <div>
            <div className='fade-in-title'>
                <h1 className='text-center'>Sleep Tracker</h1>
                <p className='text-center'>Track your sleep habits here.</p>
            </div>
            <Grid container justifyContent="center" alignItems="center" mt={2} className="fade-in-content">
                <StyledGrid item xs={10} sm={10} md={10} lg={10}>
                    <Grid container justifyContent="center" >
                        {axiosData.map((element, index) => (
                            <Grid item xs={12} sm={10} md={6} lg={3.7} key={index} p={2}>
                                <SleepTrackerItem
                                    user={element.applicationUser}
                                    bedTime={element.bedTime}
                                    recommendedSleepTime={element.recommendedSleepTime}
                                    wakeUpTime={element.wakeUpTime}
                                />
                            </Grid>
                        ))}
                    </Grid>
                </StyledGrid>
            </Grid>
        </div>
    );
}

export default SleepTracker;
