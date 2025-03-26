import React from "react";
import { useDispatch } from "react-redux";
import service from "../../appwrite/auth";
import { logout } from "../../store/authslice";


function LogoutButton() {

    const dispatch = useDispatch()
    const logoutHandler = () => {
        service.logout().then(() => {
                dispatch(logout())
            })
    }
    return (
        <button
            className="inline-bock px-6 py-2 duration-200 rounded-full"
            onClick={logoutHandler}
        >LogOut</button>
    )
}

export default LogoutButton