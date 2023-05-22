import { useEffect, useState } from "react";
import Task from "./Task";
import React, { useRef } from "react";

function Comment() {
    const [comment, setComment] = useState("");
    const [histcomment, setHistComment] = useState([]);

    const addComment = () => {
        setHistComment([...histcomment, comment]);
        console.log(histcomment);


    };
    const renderMycomment = () => {
        return histcomment.map((item) => {
            return (
                <div>

                    <p>
                        {item}
                    </p>
                </div>
            );
        });

    };

    function handleInput(e) {
        setComment(e.target.value);
        console.log("comment", comment);
    };

    return (
        <div>

            <input type="text" placeholder="faite votre commentaire" onChange={handleInput} />
            <button type="submit" onClick={addComment} >✍</button>

            <p>{renderMycomment()} </p>

        </div>
    );
}
export default Comment;