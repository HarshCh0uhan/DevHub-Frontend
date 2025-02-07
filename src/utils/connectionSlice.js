import { createSlice } from "@reduxjs/toolkit";


const connectionSlice = createSlice({
    name: "connection",
    initialState: null,
    reducers: {
        addConnection: (state, action) => action.payload,
        removeConnection: (state, action) => {
            console.log(state.fromUserId);
            console.log(action.payload)
            const newConnection = state.filter((r) => (r._id !== action.payload))
            return newConnection
        }
    }
})

export const {addConnection, removeConnection} = connectionSlice.actions;

export default connectionSlice.reducer;