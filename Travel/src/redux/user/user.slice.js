import { createSlice } from '@reduxjs/toolkit'
import { Slice } from 'lucide-react'

const initialState = {
  isLoggedIn : false,
  user: {},
  isAdminLoggedIn : false,
  adminuser: {},
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser:(state,action)=>{
        const payload = action.payload
        state.isLoggedIn =true
        state.user = payload
    },
    removeUser: (state, action)=>{
        state.isLoggedIn = false,
        state.user = {}
    },
    setAdminUser:(state,action)=>{
      const payload = action.payload
      state.isAdminLoggedIn =true
      state.adminuser = payload
    },
    removeAdminUser: (state, action)=>{
      state.isAdminLoggedIn = false,
      state.adminuser = {}
    }
  },
})


export const {setUser,removeUser,setAdminUser,removeAdminUser} = userSlice.actions
export default userSlice.reducer
