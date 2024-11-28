import { Provider } from 'react-redux'
import './App.css'
import { Container, Grid, Paper, Typography } from '@mui/material'
import store from './store/store'
import AddHabitForm from './components/add-habit-form'
import HabitList from './components/habit-list'
import HabitStats from './components/habit-stats'

function App() {

  return (
    <>
      <Provider store={store}>
        <Container maxWidth="xl" he>
          <Typography component="h1" variant='h2' align='center'>Habit Tracker</Typography>
          <Grid container alignItems="start" spacing={2}>
            <Grid item xs={12} sm={8}>
              <Paper elevation={2} sx={{ p: 2 }}>
              <AddHabitForm />
              </Paper>
            </Grid>
            <Grid item xs={12} sm={4}>
              <HabitList />
            </Grid>
            <Grid item xs={12}>
          <HabitStats />
            </Grid>
          </Grid>
        </Container>
      </Provider>
    </>
  )
}

export default App
