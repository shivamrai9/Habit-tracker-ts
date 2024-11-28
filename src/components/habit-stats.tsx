import { motion } from "framer-motion";
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../store/store';
import { Box, Paper, Typography, LinearProgress } from '@mui/material';
import { fetchHabits, Habit } from '../store/habitSlice';

const HabitStats: React.FC = () => {
    const { habits, isLoading, error } = useSelector((state: RootState) => state.habits)
    const totalHabits = habits.length;
    const completedGoals = habits.filter(habit => habit.completedDates.length >= habit.goal).length;

    const dispatch = useDispatch<AppDispatch>();

    useEffect(() => {
        dispatch(fetchHabits());
    }, [dispatch]);

    const getTotalHabits = () => habits.length;

    const getCompletedToday = () => {
        const today = new Date().toISOString().split("T")[0];
        return habits.filter((habit) => habit.completedDates.includes(today))
            .length;
    };


    const getLongestStreak = () => {
        const getStreak = (habit: Habit) => {
            let streak = 0;
            const currentDate = new Date();

            while (true) {
                const dateString = currentDate.toISOString().split("T")[0];
                if (habit.completedDates.includes(dateString)) {
                    streak++;
                    currentDate.setDate(currentDate.getDate() - 1);
                } else {
                    break;
                }
            }

            return streak;
        };

        return Math.max(...habits.map(getStreak), 0);
    };

    if (isLoading) {
        return <LinearProgress />;
    }

    if (error) {
        return <Typography color="error">{error}</Typography>;
    }



    return (
        <Paper elevation={2} sx={{ p: 2, mt: 4 }}>
            <Typography variant="h6" component="h3" align="center" gutterBottom>
                Habit Statistics
            </Typography>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
            >
                <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
                    <Typography variant="body1">
                        Total Habits: {getTotalHabits()}
                    </Typography>
                    <Typography variant="body1">
                        Completed Today: {getCompletedToday()}
                    </Typography>
                    <Typography variant="body1">
                        Longest Streak: {getLongestStreak()} days
                    </Typography>
                    <Typography variant="h5" align="center">
                        Habit Stats
                    </Typography>
                    <Typography variant="body1">
                        Total Habits: {totalHabits}
                    </Typography>
                    <Typography variant="body1" color="success.main">
                        Goals Achieved: {completedGoals}
                    </Typography>
                </Box>
            </motion.div>
        </Paper>
    )
}

export default HabitStats
