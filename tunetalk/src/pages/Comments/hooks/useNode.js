// Function for handling the tree data structure that the comment classes will utilize 
// as we wnat there to be the main (parent) comment and then the replies (children) undeneath it
export const useNode = () => {

    // Function to insert a new node (comment) into the tree
    const insertNode = function (tree, commentId, item) {
        if (tree.id === commentId) {
            tree.items.push({
                id: new Date().getTime(), // using the time as an id for the comment
                name: item,
                items: [], // Array for nested comments later 
            });
        return tree;
      }
  
    // Using recursion, if the target node is not found, go to the children
    let latestNode = [];
    latestNode = tree.items.map((ob) => {
        // Attempt to insert the node into each child, which recursively checks their children, and so on.
        return insertNode(ob, commentId, item);
    });
        // Return a new object with the same properties as tree, but replace items with the updated list.
        return { ...tree, items: latestNode };
    };
  
    // Function that edits the existing node (comment)
    const editNode = (tree, commentId, value) => {
        // If the current node's ID matches the target, update its name and return the tree.
        if (tree.id === commentId) {
            tree.name = value; // Update the node's name to the new value.
            return tree;
        }
        // If the target node is not found, search and edit the correct node in the tree.
        tree.items.map((ob) => {
            return editNode(ob, commentId, value);
        });
        // Return the tree with the edited node. Note: This does not create a new object if no edit occurred.
        return { ...tree };
    };
  
    // Function that deletes a node from teh tree
    const deleteNode = (tree, id) => {
        for (let i = 0; i < tree.items.length; i++) {
            const currentItem = tree.items[i];
            // If the current item matches the ID, remove it from the array and return the updated tree.
            if (currentItem.id === id) {
                tree.items.splice(i, 1);
                return tree;
            } else {
                deleteNode(currentItem, id);
            }
        }
        return tree;
    };
    // Return the tree functions
    return { insertNode, editNode, deleteNode };
  };