import { createSlice } from "@reduxjs/toolkit";


const UserSlice = createSlice({
    name:"userSlice",
    initialState:{
            id: 0,
            firstname: "",
            lastname: "",
            email: "",
            password: "",
            dateOfBirth: "",
            registeredOn: "",
            lastLogin: "",
            genotype: null,
            bloodGroup: null,
            height: null,
            weight: null,
            role: "",
            gender: "",
            provider: "",
            profileCompleted: false
    },reducers: {
            setUserInfo: (state,action) => {
                state.id = action?.payload?.id
                state.firstname = action?.payload?.firstname
                state.lastname = action?.payload?.lastname
                state.email = action?.payload?.email
                state.password = action?.payload?.password
                state.dateOfBirth = action?.payload?.dateOfBirth
                state.registeredOn = action?.payload?.registeredOn
                state.lastLogin = action?.payload?.lastLogin
                state.genotype = action?.payload?.genotype
                state.bloodGroup = action?.payload?.bloodGroup
                state.height = action?.payload?.height
                state.weight = action?.payload?.weight
                state.role = action?.payload?.role
                state.gender = action?.payload?.gender
                state.provider = action?.payload?.provider
                state.profileCompleted = action?.payload?.profileCompleted

            }
    }
})

export const { setUserInfo } = UserSlice.actions;
export default UserSlice.reducer