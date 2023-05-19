import { useReducer } from "react";
import Comment from "../Comment/Comment";
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
        function Comment() {


            return (
                <div>
                    <button>✍</button>


                </div>
            );
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
            <div >
                <input type="text" placeholder="Ajoutez votre commentaire ..." />
                {Comment()}
            </div>

        </div>
    );
}
export default Like;