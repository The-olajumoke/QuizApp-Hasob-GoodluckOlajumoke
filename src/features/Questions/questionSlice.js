import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios"
import history from "../../util/history";
import logout from "../user/userSlice"


const baseURL = "https://hasquiz-api.herokuapp.com/api";

// QET ALL QUIZ WITH ASYNC
export const getQuizArray =createAsyncThunk("question/getQuizList",async(_, {dispatch})=>{
  try {
    const response = await axios.get(`${baseURL}/quiz`);
    console.log(response);
    console.log(response.data.data[0]);
    console.log(response.status);

      if (
        response.status === "Token is Expired" ||
        response.status === "401" ||
        response.statusCode === "401"
      ) {
        console.log("token expired");
        dispatch(logout())}
      else {
        console.log("token working fine");
        const resArr = response.data.data[0];
        console.log(resArr);
        console.log(resArr.questions);
        dispatch(
          getAllQuestions({
            title: resArr.title,
            description: resArr.description,
            totalTime: resArr.totalTime,
            totalQuestions: resArr.questions,
          })
        );
        history.push("/");
      }
      }

   catch (error) {
    console.log({error})
    console.log(error.response)
    localStorage.clear();
    history.push("/login");
    // if( error.response.data.status === "Token is Expired" ||
        // error.response.status === "401"){
          // console.log("token expired");
      // delete axios.defaults.headers.common["Authorization"];
      // localStorage.removeItem("jwtToken");
      // localStorage.clear();
      // history.push("/login");
      // }
  }
} )

// POST QUESTION BY ADMIN WITH ASYNC

export const sendQuestion =createAsyncThunk("question/postQuestion",async(data,{dispatch})=>{
  console.log(data)
  try {
    const response = await axios.post(`${baseURL}/questions`,data);
    console.log(response)
  } catch (error) {
    console.log({error})
  }
} )

// SUBMIT WITH ASYNC

export const getResult =createAsyncThunk("question/getResult",async(data,{dispatch})=>{
   dispatch(
     getAllQuestions({
       totalQuestions: "",
     })
   );
  try {
    const response = await axios.post(`${baseURL}/submit`,data);
    console.log(response)
    console.log(response.data.message)
    console.log(response.data.meta.correctCount)
    console.log(response.data.meta.totalQuestions)
    if (response.data.message =="Test submitted successfully.") {
      console.log("successful")
      const numberOfQuestion=response.data.meta.totalQuestions;
      const score=response.data.meta.correctCount;
      dispatch(getScore({
        score,
        numberOfQuestion,}))
        history.push("/completeMsg")
    } else {
      console.log("unsuccessful")
    }
  } catch (error) {
    console.log({error})
  }
} )


export const questionSlice = createSlice({
  name: "question",
  initialState: {
    loading: true,
    title: "",
    description: "",
    totalTime:0,
    totalQuestions: [],
    score:0,
    numberOfQuestion:0,
  },
  reducers: {
    getAllQuestions: (state, action) => {
      console.log(action.payload);
      state.loading = !state.loading;
      state.title = action.payload.title;
      state.description = action.payload.description;
     state.totalTime = action.payload.totalTime;
      state.totalQuestions = action.payload.totalQuestions;
      
    },
    getScore:(state,action)=>{
        console.log(action.payload);
        state.score= action.payload.score;
        state.numberOfQuestion= action.payload.numberOfQuestion;
    }
  },
});

export const {getAllQuestions, getScore} = questionSlice.actions;

export default questionSlice.reducer;