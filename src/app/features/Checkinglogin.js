import { createSlice } from "@reduxjs/toolkit";

export const Checkinglogin = createSlice({
  name: "checks",
  initialState: {
    value: false,
    backend_data_fetch_array: [],
    loginvalue: false,
    signupvalue: false,
    productvalue: false,
  },
  reducers: {
    setfalse: (state) => {
      state.value = false;
    },
    settrue: (state) => {
      state.value = true;
    },

    setsignup: (state) => {
      state.loginvalue = false;
      state.productvalue = false;
      state.signupvalue = true;
    },
    setlogin: (state) => {
      state.loginvalue = true;
      state.productvalue = false;
      state.signupvalue = false;
    },

    setproduct: (state) => {
      state.loginvalue = false;
      state.productvalue = true;
      state.signupvalue = false;
    },

    setvaluefalse: (state) => {
      state.loginvalue = false;
      state.productvalue = false;
      state.signupvalue = false;
    },

    alldata_fetch_from_backend: (state, action) => {
      state.backend_data_fetch_array = action.payload;
    },
  },
});
export const {
  settrue,
  setfalse,
  alldata_fetch_from_backend,
  setsignup,
  setlogin,
  setproduct,
  setvaluefalse,
} = Checkinglogin.actions;

export default Checkinglogin.reducer;
