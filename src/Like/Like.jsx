import { useReducer } from "react";
import Comment from "../Comment/AComment";

import 'react-tooltip/dist/react-tooltip.css'
import { Tooltip } from 'react-tooltip'

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
            <span> {like}&nbsp;j'aime </span>
            <a className="my-anchor-element" data-tooltip-content="Like">
                <button onClick={() => updateLike("Like")}>❤️</button>
            </a>
            <a className="my-anchor-element" data-tooltip-content="Disliked">
                <button onClick={() => updateLike("disLiked")}>💔</button>
            </a>






            <Tooltip anchorSelect=".my-anchor-element" />

            <Comment />
        </div>
    );
}
export default Like;