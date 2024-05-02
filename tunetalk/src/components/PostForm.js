//import { set } from "mongoose"
import { useState } from "react"

//username,email,title,artist,rating,caption

const PostForm = () =>{
    const [postusername, setPostUsername] = useState('')
    const [email, setEmail] = useState('')
    const [title, setTitle] = useState('')
    const [artist, setArtist] = useState('')
    const [rating, setRating] = useState('')
    const [caption, setCaption] = useState('')
    const [error, setError] = useState(null)


    const handleSubmit = async (e) =>{
        //e.preventDefault()
        
        const post = {postusername,email,title,artist,rating,caption}

        const response = await fetch('/api/posts', {
            method: 'POST', 
            body: JSON.stringify(post),
            headers: {
                'Content-Type': 'application/json'
            }

        })

        const json = await response.json()
        if (!response.ok) {
            setError(json.error)
        }

        if (response.ok) {
            setPostUsername('')
            setEmail('')
            setTitle('')
            setArtist('')
            setRating('')
            setCaption('')

            setError(null)
            console.log('post added')
        }

    }

    return (
        <form className="create" onSubmit={handleSubmit}>
            <h3>Add Post</h3>

            <label>Username</label>
            <input type="text" onChange={(e) => setPostUsername(e.target.value)} value={postusername} />

            <label>Email</label>
            <input type="text" onChange={(e) => setEmail(e.target.value)} value={email} />

            <label>Song Title</label>
            <input type="text" onChange={(e) => setTitle(e.target.value)} value={title} />

            <label>Song Artist</label>
            <input type="text" onChange={(e) => setArtist(e.target.value)} value={artist} />

            <label>Song Rating</label>
            <input type="number" onChange={(e) => setRating(e.target.value)} value={rating} />

            <label>Caption</label>
            <input type="text" onChange={(e) => setCaption(e.target.value)} value={caption} />
            
        <button>Post</button>

        {error &&  <div className="error">{error}</div>}
        </form>

    )
}


export default PostForm