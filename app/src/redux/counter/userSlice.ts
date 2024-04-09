import { createSlice } from "@reduxjs/toolkit";

interface UserState  {
    username: string;
    fullName: string;
    email: string;
    mobile: string;
}

const initialState: UserState = {
    username: '',
    fullName: '',
    email: '',
    mobile: ''
}

const userSlice = createSlice({
    name: 'User',
    initialState,
    reducers: {
        setUser: (state, action) => {
            state = action.payload;
        }
    }
})

export const { setUser } = userSlice.actions

export default userSlice.reducer;
