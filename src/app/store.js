import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import userReducer from"../features/user/userSlice"
import questionReducer from "../features/Questions/questionSlice"
export default configureStore({
  reducer: {
    counter: counterReducer,
    user: userReducer,
    question:questionReducer,
  },
});


//DESIGN THE STORE