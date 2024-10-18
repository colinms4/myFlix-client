import React from "react";

export const UserInfo = ({ user }) => {
    return (
        <div>
            <p>Your username is: {user.Username}</p>
            <p>Your email is: {user.Email}</p>
        </div>
    )
}
