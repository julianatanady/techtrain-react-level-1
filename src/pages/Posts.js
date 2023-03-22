import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import NavBar from '../components/NavBar';

function Posts (){
    const {threadId, threadTitle} = useParams();
    const [posts, setPosts] = useState([]);
    
    const fetchPosts = async () => {
        const response = await fetch(`https://2y6i6tqn41.execute-api.ap-northeast-1.amazonaws.com/threads/${threadId}/posts`)
        const jsonResponse = await response.json()
        setPosts(jsonResponse.posts)};

    useEffect(()=> {
        fetchPosts();
    }, []);
    
    const [newPost, setNewPost] = useState({
        id: '',
        threadId: threadId,
        post: ''
    });

    const handleInputChange = (event) => {
        setNewPost({...newPost,[event.target.name]: event.target.value});
    };
    
    const handleSubmit = (event) => {
    event.preventDefault();
    
    fetch(`https://2y6i6tqn41.execute-api.ap-northeast-1.amazonaws.com/threads/${threadId}/posts`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newPost)
        })
        .then(setPosts(prev => [newPost, ...prev]))
        .catch(error => console.error(error));
    };

    return(
        <div>
        <NavBar/>
        <h1 className='post-title'>{threadTitle}</h1>
        <section className='posts'>
            <div className='posts-container'>
                    <ul className="posts-list">
                        {posts.map(post=> <li className='post' key={post.id}>{post.post}</li>)}
                    </ul>
            </div>
            <div className='post-form'>
                <form>
                    <textarea name="post" type="text" placeholder='投稿しよう！' value={newPost.post} onChange={handleInputChange}/>
                    <button onClick={handleSubmit}>投稿</button>
                </form>
            </div>
        </section>
        <footer className='post-footer'>
            <Link className="back-to-top-link" to="/">Topに戻る</Link>
        </footer>
        </div>
    )
}

export default Posts;