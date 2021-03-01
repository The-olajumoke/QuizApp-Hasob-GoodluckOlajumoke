import {createSlice, createAsyncThunk} from "@reduxjs/toolkit"
import axios from "axios"
import history from "../../util/history"
import setAuthorizationToken from "../../util/setAuthorizationToken";

const baseURL = "https://hasquiz-api.herokuapp.com/api";


// POST NEW USER DETAILS WITH ASYNC
export const registerNewUser = createAsyncThunk(
  "user/postNewUser",
  async (data, { dispatch }) => {
    console.log(data);
    try {
      const response = await axios.post(`${baseURL}/auth/register`, data);
      console.log(response);
      if (response) {
        history.push("/")
      }
    } catch (error) {
      console.log({ error });
    }
  }
);

// POST EXISTING USER DETAILS WITH ASYNC
export const loginExistingUser =createAsyncThunk("user/postExistingUser",async(data)=>{

  try {
    const res = await axios.post(`${baseURL}/auth/login`,data);
    console.log(res);
    const token = res.data.data.accessToken;
    const role = res.data.data.user.role;
    localStorage.setItem("jwtToken", token);
    localStorage.setItem("role", role);
    setAuthorizationToken(token);
    if (role === "User") {
      console.log("in")
      history.push("/userLanding");
    } else {
      history.push("/setQuiz");
    }
      
  } catch (error) {
    console.log({error})
    if(error.response.data.error==="Unauthorized"){
      alert("information Provided not valid");
    }
  }
} )



export const userSlice = createSlice({
  name: "user",
  initialState:  {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  },
  reducers: {
    getLoggedUserInfo: (state,action) => {
    console.log(action.payload)

      state.firstName =action.payload.firstName;
      state.lastName=action.payload.lastName;
      state.email=action.payload.email;
      state.password=action.payload.password;
      state.confirmPassword=action.payload.confirmPassword;
    },
    

    logout:(state,action) => {
      console.log(action);

      delete axios.defaults.headers.common["Authorization"];
      localStorage.removeItem("jwtToken");
      localStorage.clear();
        history.push("/");
        
    },
    // return state;
  },
});
export const { getLoggedUserInfo, logout } = userSlice.actions; 
// export const selectUser= state.user

export default userSlice.reducer;

//  pending / fulfilled / rejected;