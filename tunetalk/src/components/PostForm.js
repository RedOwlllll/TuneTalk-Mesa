// //import { set } from "mongoose"
// import { useState } from "react"

// //username,email,title,artist,rating,caption

// const PostForm = () =>{
//     const [postusername, setPostUsername] = useState('')    //Username state
//     const [email, setEmail] = useState('')      //Email state
//     const [title, setTitle] = useState('')      //Title state
//     const [artist, setArtist] = useState('')    //Artist state
//     const [rating, setRating] = useState('')    //Rating state
//     const [caption, setCaption] = useState('')  //Caption state
//     const [error, setError] = useState(null)    //Error state


//     const handleSubmit = async (e) =>{  //Submit post button
//         //e.preventDefault() //This line of code prevents automatic refresh
        
//         const post = {postusername,email,title,artist,rating,caption} //Store state values in post object

//         const response = await fetch('/api/posts', {    //send a POST request to the '/api/posts' endpoint
//             method: 'POST', 
//             body: JSON.stringify(post), //convert post object to JSON string as the payload
//             headers: {
//                 'Content-Type': 'application/json'
//             }

//         })

//         const json = await response.json()  //error handling
//         if (!response.ok) {
//             setError(json.error)
//         }


        

//         if (response.ok) {  //If the given json is valid, reset states 
//             setPostUsername('')
//             setEmail('')
//             setTitle('')
//             setArtist('')
//             setRating('')
//             setCaption('')

//             setError(null)
//             console.log('post added')
//         }

//     }

//     return (
//         <form className="create" onSubmit={handleSubmit}>
//             <h3>Add Post</h3>

//             <label>Username</label>
//             <input type="text" onChange={(e) => setPostUsername(e.target.value)} value={postusername} />

//             <label>Email</label>
//             <input type="text" onChange={(e) => setEmail(e.target.value)} value={email} />

//             <label>Song Title</label>
//             <input type="text" onChange={(e) => setTitle(e.target.value)} value={title} />

//             <label>Song Artist</label>
//             <input type="text" onChange={(e) => setArtist(e.target.value)} value={artist} />

//             <label>Song Rating</label>
//             <input type="number" onChange={(e) => setRating(e.target.value)} value={rating} />

//             <label>Caption</label>
//             <input type="text" onChange={(e) => setCaption(e.target.value)} value={caption} />
            
//         <button>Post</button>

//         {error &&  <div className="error">{error}</div>}
//         </form>

//     )
// }


// export default PostForm