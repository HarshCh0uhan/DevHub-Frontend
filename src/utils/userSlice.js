import { createSlice } from "@reduxjs/toolkit";


const userSlice  = createSlice({
    name: "user",
    initialState: null,
    reducers: {
        addUser: (state, action) => action.payload,
        removerUser: (state, action) => null
    }
})

export const {addUser, removerUser} = userSlice.actions;

export default userSlice.reducer;