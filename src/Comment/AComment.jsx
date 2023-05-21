import { useState } from "react";
import Task from "./Task";

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
            <button type="submit" onClick={addComment} >✍</button>
            <input type="text" placeholder="faite votre commentaire" onChange={handleInput} />


            <p>{renderMycomment()} </p>

        </div>
    );
}
export default Comment;