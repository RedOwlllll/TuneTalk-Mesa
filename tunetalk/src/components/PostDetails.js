const PostDetails = ({post}) => {
    return (
        <div className="post-details">
            <h4>Username: {post.username}</h4>
            <h4>Title: {post.title}</h4>
            <h4>Artist: {post.artist}</h4>
            <h4>Rating: {post.rating}</h4>
            <h4>Timestamp: {post.createdAt}</h4>
        </div>
    )
}

export default PostDetails