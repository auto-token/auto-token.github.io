import {configureStore, createSlice} from '@reduxjs/toolkit'

let user = createSlice({
    name: 'user',
    initialState : {uuid:'', name: '', isLogin: false},

    reducers : {
        changeUserInfo : (state, action) => {
            state.name = action.name;
            state.uuid = action.uuid;
            state.isLogin = action.isLogin;
        }
  
    }
})

export let { changeUserInfo } = user.actions

export default configureStore({
    reducer:{
        user: user.reducer
    }
})