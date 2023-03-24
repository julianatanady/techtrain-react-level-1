import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import NavBar from '../components/NavBar';

function Posts (){
    const {thread_id} = useParams();
    const [posts, setPosts] = useState([]);
    const [newPost, setNewPost] = useState({
        id: '',
        thread_id: thread_id,
        post: ''
    });

    const fetchPosts = async () => {
        const response = await fetch(`https://2y6i6tqn41.execute-api.ap-northeast-1.amazonaws.com/threads/${thread_id}/posts`)
        const jsonResponse = await response.json()
        setPosts(jsonResponse.posts)};

    useEffect(()=> {
        fetchPosts();
    }, []);
    
    const handleInputChange = (event) => {
        setNewPost({...newPost,[event.target.name]: event.target.value});
    };
    
    const handleSubmit = (event) => {
    event.preventDefault();
    
    fetch(`https://2y6i6tqn41.execute-api.ap-northeast-1.amazonaws.com/threads/${thread_id}/posts`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newPost)
        })
        .then(response => {
            if (response.ok) {
                fetchPosts();
            } else {
                throw new Error('エラーです');
            }
        })
    };

    return(
        <div>
        <NavBar/>
        <h1 className='post-title'></h1>
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