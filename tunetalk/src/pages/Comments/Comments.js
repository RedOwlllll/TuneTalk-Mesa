import { useState, useRef, useEffect } from "react";
import { Action } from "./Action";
import "../../css/App.css";
import "../../css/Comments.css";
import { ReactComponent as DownArrow } from "../../assets/down-arrow.svg";
import { ReactComponent as UpArrow } from "../../assets/up-arrow.svg";

const Comments = ({
  handleInsertComment,
  handleEditComment,
  handleDeleteComment,
  comment,
}) => {
    const [input, setInput] = useState("");  // State variable that handles the user input
    const [editMode, setEditMode] = useState(false); // State variable that handles the editing
    const [showInput, setShowInput] = useState(false); // State variable that displays or hides the comments under the main (parent) comment
    const [expand, setExpand] = useState(false); // State variable that allows comments below the main (parent) comment to be hidden or displayed
    const inputRef = useRef(null); // useRef hook for the input variable

    // useEffect hook, which focuses when the input variable is being entered/edited.
    useEffect(() => {
        inputRef?.current?.focus();
    }, [editMode]);

    // Function that toggles the display of the input variable when adding a new comment below (child comment)
    const handleNewComment = () => {
        setExpand(!expand);
        setShowInput(true);
    };

    // Function that addes a new cooment as well as when saving a comment that is edited.
    const onAddComment = () => {
        if (editMode) {
            // If in edit mode, call handleEditComment to update the comment to the new comment
            handleEditComment(comment.id, inputRef?.current?.innerText);
        } else {
            // Other add a new comment and reset the input value.
            setExpand(true);
            handleInsertComment(comment.id, input);
            setShowInput(false);
            setInput("");
        }
        if (editMode) setEditMode(false); // Exit once the comment is updated
    };

    // Function that deletes the current comment
    const handleDelete = () => {
        handleDeleteComment(comment.id);
    };

    // Component returns how the comments will be displayed
    return (
        <div className="comment-container">
        <div className={comment.id === 1 ? "inputContainer" : "commentContainer"}>
            {comment.id === 1 ? (
            <>
                <input
                type="text"
                className="inputContainer__input first_input"
                autoFocus
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="type..."
                />

                <Action
                className="reply comment"
                type="COMMENT"
                handleClick={onAddComment}
                />
            </>
            ) : (
            <>
                <span
                contentEditable={editMode}
                suppressContentEditableWarning={editMode}
                ref={inputRef}
                style={{ wordWrap: "break-word" }}
                >
                {comment.name}
                </span>

                <div style={{ display: "flex", marginTop: "5px" }}>
                {editMode ? (
                    <>
                    <Action
                        className="reply"
                        type="SAVE"
                        handleClick={onAddComment}
                    />
                    <Action
                        className="reply"
                        type="CANCEL"
                        handleClick={() => {
                        if (inputRef.current)
                            inputRef.current.innerText = comment.name;
                        setEditMode(false);
                        }}
                    />
                    </>
                ) : (
                    <>
                    <Action
                        className="reply"
                        type={
                        <>
                            {expand ? (
                            <UpArrow width="10px" height="10px" />
                            ) : (
                            <DownArrow width="10px" height="10px" />
                            )}{" "}
                            REPLY
                        </>
                        }
                        handleClick={handleNewComment}
                    />
                    <Action className="reply" type="EDIT" handleClick={() => {
                            setEditMode(true);
                        }}
                    />
                    <Action className="reply" type="DELETE" handleClick={handleDelete} />
                    </>
                )}
                </div>
            </>
            )}
        </div>

        <div style={{ display: expand ? "block" : "none", paddingLeft: 25 }}>
            {showInput && (
                <div className="inputContainer">
                    <input type="text" className="inputContainer__input" autoFocus onChange={(e) => setInput(e.target.value)} />
                    <Action className="reply" type="REPLY" handleClick={onAddComment} />
                    <Action className="reply" type="CANCEL"
                        handleClick={() => {
                            setShowInput(false);
                            if (!comment?.items?.length) setExpand(false);
                        }}
                    />
                </div>
            )}

            {comment?.items?.map((cmnt) => {
            return (
                <Comments
                    key={cmnt.id}
                    handleInsertComment={handleInsertComment}
                    handleEditComment={handleEditComment}
                    handleDeleteComment={handleDeleteComment}
                    comment={cmnt}
                />
            );
            })}
        </div>
        </div>
    );
};

export default Comments;