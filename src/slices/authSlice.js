import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    token :localStorage.getItem("token") ? JSON.parse(localStorage.getItem("token")) :null,
}
const authSlice = createSlice({
    name: "auth",
    initialState: initialState,
    reducers: {
        setToken(state, action) {
            state.token = action.payload;
        }
    }
});

// Action creators are generated for each case reducer function
export const { setToken } = authSlice.actions

export default authSlice.reducer;