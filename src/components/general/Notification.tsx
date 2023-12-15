import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/hooks/hooks"
import * as S from "./general.styles"
import { closeNotification } from "../../redux/notification/NotificationSlice";


export const Notification = () => {
    const notification = useAppSelector( state => state.notification );
    const dispatch = useAppDispatch();


    useEffect(() => {
        setTimeout(() => {
            dispatch(closeNotification())        
        }, 10000);
    },[notification])

    return (
        <S.Notification state={notification.show ? "visible" : "hidden"}  style={{}}>
            {notification.message}
        </S.Notification>
    )
}