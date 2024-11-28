import { Box, Button, FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { addHabit } from '../store/habitSlice';
import { AppDispatch } from '../store/store';

const AddHabitForm: React.FC = () => {
    const [name, setName] = useState<string>("");
    const [frequency, setFrequency] = useState<"daily" | "weekly">("daily")
    const [goal, setGoal] = useState<number>(7)

    const dispatch = useDispatch<AppDispatch>();


    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (name.trim()) {
            dispatch(addHabit({ name, frequency, goal }));
            setName("");
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <Box sx={{
                display: "flex",
                flexDirection: "column",
                gap: 2,
            }}>
                <TextField
                    label="Habit Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder='Enter habit name'
                    fullWidth
                />
                <FormControl fullWidth>
                    <InputLabel id="frequency-select-label">Frequency</InputLabel>
                    <Select
                        labelId='frequency-select-label'
                        id="frequency-select"
                        label="Frequency"
                        value={frequency} onChange={(e) => setFrequency(e.target.value as "daily" | "weekly")}>
                        <MenuItem value="daily">Daily</MenuItem>
                        <MenuItem value="weekly">Weekly</MenuItem>
                    </Select>
                </FormControl>
                <TextField
                    label="Goal (set a Number of day to complete)"
                    type="number"
                    value={goal}
                    onChange={(e) => setGoal(Number(e.target.value))}
                    fullWidth
                />
                <Button type='submit' variant='contained' color='primary'>
                    Add Habit
                </Button>
            </Box>
        </form>
    )
}

export default AddHabitForm
