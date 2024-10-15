import React from "react";

export const UserInfo = ({ user, email }) => {
    return (
        <div>
            <p>Your username is: {JSON.stringify(localStorage.getItem("user"))}</p>
            <p>Your email is: {localStorage.getItem("Email")}</p>
        </div>
    )
}
