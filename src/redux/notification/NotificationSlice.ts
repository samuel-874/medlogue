import { createSlice } from "@reduxjs/toolkit";


const NotificationSlice = createSlice({
    name: "notificationSlice",
    initialState: {
        show: false,
        error: false,
        message: ""
    },
    reducers: {
        notify: (state, action) => {
            state.show = action.payload?.show
            state.error = action.payload?.error
            state.message = action.payload?.message
        },
        closeNotification: (state) => {
            state.show = false
            state.error = false
            state.message = ""

        }
    }
})

export const { notify, closeNotification } = NotificationSlice.actions;
export default NotificationSlice.reducer