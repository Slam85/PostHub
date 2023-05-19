import { useReducer } from "react";
import Comment from "../Comment/AComment";
function Like() {

    function countReducer(state, like) {
        if (like === "Like") {
            return state + 1;
        }
        if (like === "disLiked") {
            return state - 1;
        }

        else {
            throw new Error();
        }

    }


    const [like, updateLike] = useReducer(countReducer, 0);
    localStorage.setItem("Like", `${like}`);


    return (
        <div>

            <button onClick={() => updateLike("Like")}>❤️</button>

            <button onClick={() => updateLike("disLiked")}>💔</button>

            <br />
            <span> {like}&nbsp;j'aime </span>

            <Comment />
        </div>
    );
}
export default Like;