import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios"
import history from "../../util/history";
import logout from "../user/userSlice"
import swal from "sweetalert";



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
        history.push("/quiz");
      }
      }

   catch (error) {
    console.log({error})
    console.log(error.response)
    localStorage.clear();
    history.push("/");
    
  }
} )

// POST QUESTION BY ADMIN WITH ASYNC

export const sendQuestion =createAsyncThunk("question/postQuestion",async(data,{dispatch})=>{
  console.log(data);
  // const answerArr=[];
  const answerArr = data.answers.map((answer) => {
    if (answer.correct) {
      console.log("yes");
      return answer.correct;
    } else {
      console.log("no");
      return answer.correct;
    }
  });
  console.log(answerArr);
  const found = answerArr.filter((ans) => ans === true);
  console.log(found);
  if (found === []) {
    console.log("notfound");
  } else {
    console.log("found");
  }
  //Create a landing page that welcomes you and tells you to log in or signup
  // notification for question sent
  // question data validation
  //notification for submit authentication
  //spinner for login and sign up
  //button for add question

  // try {
  //   const response = await axios.post(`${baseURL}/questions`, data);
  //   console.log(response);
  // } catch (error) {
  //   console.log({ error });
  // }

} )

// SUBMIT WITH ASYNC

export const getResult =createAsyncThunk("question/getResult",async(data,{dispatch})=>{
  swal("Are you sure you want to do this?", {
    buttons: ["Oh noez!", true],
  });
  
  //  dispatch(
  //    getAllQuestions({
  //      totalQuestions: "",
  //    })
  //  );

  // try {
  //   const response = await axios.post(`${baseURL}/submit`,data);
  //   console.log(response)
  //   console.log(response.data.message)
  //   console.log(response.data.meta.correctCount)
  //   console.log(response.data.meta.totalQuestions)
  //   if (response.data.message =="Test submitted successfully.") {
  //     console.log("successful")
  //     const numberOfQuestion=response.data.meta.totalQuestions;
  //     const score=response.data.meta.correctCount;
  //     dispatch(getScore({
  //       score,
  //       numberOfQuestion,}))
  //       history.push("/completeMsg")
  //   } else {
  //     console.log("unsuccessful")
  //   }
  // } catch (error) {
  //   console.log({error})
  // }
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
