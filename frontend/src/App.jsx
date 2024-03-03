import React, { useState, useEffect } from "react";
import Row from "./components/Row";
import "./App.css";
import axios from "axios";

const App = () => {
    const [users, setUsers] = useState([]);
    const [loc, setLoc] = useState("");
    const [name, setName] = useState("");

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const usersData = await axios.get(
                    "http://localhost:8080/api/users/"
                );
                console.log(usersData.data);

                setUsers(usersData.data.users);
            } catch (err) {
                console.log(err);
            }
        };
        fetchUsers();
    }, []);

    const handleLocSearch = async (e) => {
        e.preventDefault();
        const res = await axios.get(
            `http://localhost:8080/api/users/search/loc?q=${loc}`
        );
        setUsers(res.data.users);
    };

    const handleNameSearch = async (e) => {
        e.preventDefault();
        const res = await axios.get(
            `http://localhost:8080/api/users/search/name?q=${name}`
        );
        setUsers(res.data.users);
    };

    return (
        <div>
            <h2 className="kg-h1 text-center ">List Of Users</h2>
            <div className="container text-center">
                <div className="kg-r row">
                    <div className="col-6">
                        <input
                            type="text"
                            placeholder="Search by Location"
                            value={loc}
                            onChange={(e) => {
                                setLoc(e.target.value);
                                if (e.target.value === "") {
                                    window.location.reload("/");
                                }
                            }}
                        />
                        <button
                            className="btn btn-success btn-sm kg-b"
                            onClick={handleLocSearch}
                        >
                            Search
                        </button>
                    </div>
                    <div className="col-6">
                        <input
                            type="text"
                            placeholder="Search by Name"
                            value={name}
                            onChange={(e) => {
                                setName(e.target.value);
                                if (e.target.value === "") {
                                    window.location.reload("/");
                                }
                            }}
                        />
                        <button
                            className="btn btn-success btn-sm kg-b"
                            onClick={handleNameSearch}
                        >
                            Search
                        </button>
                    </div>
                </div>
                <div className="row">
                    <div className="col-1">
                        <h2>Sno</h2>
                    </div>
                    <div className="col-2">
                        <h3>Name</h3>
                    </div>
                    <div className="col-1">
                        <h3>Age</h3>
                    </div>
                    <div className="col-3">
                        <h3>Phone</h3>
                    </div>
                    <div className="col-2">
                        <h3>Location</h3>
                    </div>
                    <div className="col-2">
                        <h3>Date</h3>
                    </div>
                    <div className="col-1">
                        <h3>Time</h3>
                    </div>
                </div>
                <hr></hr>
                {users.map((user, index) => (
                    <>
                        <Row key={index} user={user} index={index + 1} />
                    </>
                ))}
            </div>
        </div>
    );
};

export default App;
