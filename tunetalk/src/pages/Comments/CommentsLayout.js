import { useState } from "react";
import  CommentLayout from "./Comments";
import { useNode } from "./hooks/useNode";
import "../../css/App.css";
import "../../css/Comments.css";

// Comments array variable that sets the id of the comment to 1 and have an arry of items.
const comments = {
    id: 1,
    items: [], // list of all nested comments or replies
};

// Comments function
export const CommentsLayout = () => {
    const [commentsData, setCommentsData] = useState(comments); // Variable that gets all the comments and sets "comments" as the inital state/data

    const { insertNode, editNode, deleteNode } = useNode(); // Getting the functions in the useNode class.

    // Function that inserts a new comment into the comment structure
    const handleCommentInsertion = (folderId, item) => {
        const finalStructure = insertNode(commentsData, folderId, item);
        setCommentsData(finalStructure);
    };

    // Function that allows a comment in the comment structure to be edited
    const handleCommentEdit = (folderId, value) => {
        const finalStructure = editNode(commentsData, folderId, value);
        setCommentsData(finalStructure);
    };

    // Function that allows a comment in the comment structure to be edited
    const handleCommentDeletion = (folderId) => {
        const finalStructure = deleteNode(commentsData, folderId);
        const temp = { ...finalStructure };
        setCommentsData(temp);
    };

    // Returning the CommentLayout and passing the handler functions and data. 
    return (
        <div className="Comments">
        <CommentLayout
            handleInsertComment={handleCommentInsertion}
            handleEditComment={handleCommentEdit}
            handleDeleteComment={handleCommentDeletion}
            comment={commentsData}
        />
        </div>
    );
};