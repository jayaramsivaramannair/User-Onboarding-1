import React from 'react';

export default function NewUsers(props) {
    const {users} = props;

    return (
        <div className="newUsers">
            <h5>Details of Users Who Already Signed Up</h5>
            {users.map((user) => {
                return <pre key={user.id}>{JSON.stringify(user, null, 2)}</pre>
            })}
        </div>
    )
}