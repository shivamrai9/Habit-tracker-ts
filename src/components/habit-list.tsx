import { motion } from "framer-motion";
import { Box, Button, Grid, LinearProgress, Paper, Typography } from '@mui/material';
import DeleteIcon from "@mui/icons-material/Delete";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Habit, removeHabit, toggleHabit } from '../store/habitSlice';
import { RootState, AppDispatch } from '../store/store';

const HabitList: React.FC = () => {
    const habits = useSelector((state: RootState) => state.habits.habits);

    const dispatch = useDispatch<AppDispatch>();

    const today = new Date().toISOString().split("T")[0];

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

    return (
        <Box sx={{
            display: "flex", flexDirection: "column", gap: 2,overflow:"auto",p:1
        }}>
            {
                habits.map((habit: Habit) => (
                    <motion.div
                        key={habit.id}
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 50 }}
                        transition={{ duration: 0.5 }}
                    >
                        <Paper key={habit.id} elevation={2} sx={{ p: 2 }}>
                            <Grid container alignItems="center">
                                <Grid item xs={12} sm={6} >
                                    <Typography variant="h6">{habit.name}</Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        {habit.frequency.charAt(0).toUpperCase() +
                                            habit.frequency.slice(1)}
                                    </Typography>
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <Box sx={{ display: "flex",flexDirection:"column", justifyContent: "flex-end", gap: 1 }}>
                                        <Button
                                            variant="outlined"
                                            color={
                                                habit.completedDates.includes(today) ? "success" : "primary"
                                            }
                                            onClick={() =>
                                                dispatch(toggleHabit({ id: habit.id, date: today }))
                                            }
                                            startIcon={<CheckCircleIcon />}
                                        >
                                            {habit.completedDates.includes(today)
                                                ? "Completed"
                                                : "Mark Complete"}
                                        </Button>
                                        <Button
                                            variant="outlined"
                                            color="error"
                                            onClick={() => dispatch(removeHabit(habit.id))}
                                            startIcon={<DeleteIcon />}
                                        >
                                            Remove
                                        </Button>
                                    </Box>
                                </Grid>
                            </Grid>
                            <Box sx={{ mt: 2 }}>
                                <Typography variant="body2">
                                    Current Streak: {getStreak(habit)} days
                                </Typography>
                                <LinearProgress
                                    variant="determinate"
                                    value={(getStreak(habit) / 30) * 100}
                                    sx={{ mt: 1 }}
                                />
                                {habit.completedDates.length === habit.goal && (
                                <motion.div
                                    animate={{ scale: [1, 1.2, 1], rotate: [0, 10, -10, 0] }}
                                    transition={{ duration: 0.5 }}
                                >
                                    <Typography variant="h6" color="success.main">
                                        Goal Achieved! 🎉
                                    </Typography>
                                </motion.div>
                            )}
                            </Box>
                        </Paper>
                    </motion.div>

                ))
            }
        </Box>
    )
}

export default HabitList