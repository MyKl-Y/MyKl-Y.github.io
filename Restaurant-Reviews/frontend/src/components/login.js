import React, { useState } from "react";

//Update if you want more authentication

const Login = ({ login }) => {
    const initialUserState = {
        name: "",
        id: "",
    };

    const [user, setUser] = useState(initialUserState);

    const handleInputChange = event => {
        const { name, value } = event.target;
        setUser({ ...user, [name]: value });
    };

    const handleLogin = () => {
        //Update if you want more authentication
        login(user)
    };

    return (
        <div className="submit-form">
            <div>
                <div className="form-group">
                    <label htmlFor="name">Username</label>
                    <input
                        type="text"
                        className="form-control"
                        id="name"
                        required
                        value={user.name}
                        onChange={handleInputChange}
                        name="name"
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="id">ID</label>
                    <input
                        type="text"
                        className="form-control"
                        id="id"
                        required
                        value={user.id}
                        onChange={handleInputChange}
                        name="id"
                    />
                </div>

                <button onClick={handleLogin} className="btn btn-success">
                    Login
                </button>
            </div>
        </div>
    );
};

export default Login;
