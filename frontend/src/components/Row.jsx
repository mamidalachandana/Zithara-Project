import React from "react";
import "./Row.css";

const Row = (props) => {
    const { username, age, phoneNumber, location, created_at } = props.user;
    const createdAtDate = new Date(created_at);
    const date = createdAtDate.toISOString().split("T")[0];
    const time = createdAtDate.toISOString().split("T")[1].split(".")[0];

    return (
        <div className={`${props.index % 2 === 0 && "kg-row"} row`}>
            <div className="col-1">{props.index}</div>
            <div className="col-2">
                <p>{username}</p>
            </div>
            <div className="col-1">
                <p>{age}</p>
            </div>
            <div className="col-3">
                <p>{phoneNumber}</p>
            </div>
            <div className="col-2">
                <p>{location}</p>
            </div>
            <div className="col-2">
                <p>{date}</p>
            </div>
            <div className="col-1">
                <p>{time}</p>
            </div>
        </div>
    );
};

export default Row;
