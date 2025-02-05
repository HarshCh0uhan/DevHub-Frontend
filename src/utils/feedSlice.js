import { createSlice } from "@reduxjs/toolkit";


const feedSlice = createSlice({
    name: "feed",
    initialState: null,
    reducers: {
        addFeed: (state, action) => action.payload,
        removeUserFeed: (state, action) => {
            const newFeed = state.filter((r) => r._id !== action.payload)
            return newFeed
        }
    }
})

export const {addFeed, removeUserFeed} = feedSlice.actions;

export default feedSlice.reducer;