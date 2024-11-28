import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";


export interface Habit {
    id: string;
    name: string;
    frequency: "daily" | "weekly";
    completedDates: string[];
    goal: number;
    createdAt: string;
}

interface habitState {
    habits: Habit[];
    isLoading: boolean;
    error: string | null;
}



const initialState: habitState = {
    habits: [],
    isLoading: false,
    error: null,
}

export const fetchHabits = createAsyncThunk("habits/fetchHabits", async () => {
    await new Promise((resolve) => setTimeout(resolve, 1000))
    const mockHabits: Habit[] = [
        {
            id: "1",
            name: "Read",
            frequency: "daily",
            completedDates: [],
            goal: 4,
            createdAt: new Date().toISOString(),
        },
        {
            id: "2",
            name: "Exercise",
            frequency: "daily",
            completedDates: [],
            goal: 1,
            createdAt: new Date().toISOString(),
        },
    ];
    return mockHabits;
})

const habitSlice = createSlice({
    name: "habits",
    initialState,
    reducers: {
        addHabit: (
            state,
            action: PayloadAction<{ name: string; frequency: "daily" | "weekly" ; goal: number}>
        ) => {
            const newHabit: Habit = {
                id: Date.now().toString(),
                name: action.payload.name,
                frequency: action.payload.frequency,
                goal: action.payload.goal,
                completedDates: [],
                createdAt: new Date().toISOString(),
            };
            state.habits.push(newHabit);
        },
        removeHabit: (state, action: PayloadAction<string>) => {
            state.habits = state.habits.filter(
                (habit) => habit.id !== action.payload
            );
        },
        toggleHabit: (
            state,
            action: PayloadAction<{ id: string; date: string }>
        ) => {
            console.log(action);

            const habit = state.habits.find((h) => h.id === action.payload.id);
            if (habit) {
                const index = habit.completedDates.indexOf(action.payload.date);
                if (index > -1) {
                    habit.completedDates.splice(index, 1);
                } else {
                    habit.completedDates.push(action.payload.date);
                }
            }
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchHabits.pending, (state) => {
            state.isLoading = true;
        })
            .addCase(fetchHabits.fulfilled, (state, action) => {
                state.isLoading = false;
                state.habits = action.payload;
            })
            .addCase(fetchHabits.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message || "Failed to fetch habits";
            });
    }
})

export const { addHabit, removeHabit, toggleHabit } = habitSlice.actions;
export default habitSlice.reducer;