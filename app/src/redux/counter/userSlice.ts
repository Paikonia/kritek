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
        
    }
})


export default userSlice.reducer;
