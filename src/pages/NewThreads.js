import React, { useState } from 'react';
import NavBar from '../components/NavBar';
import { Link } from 'react-router-dom';
// import axios from 'axios';

function NewThreads(){
    const [newThread, setNewThread] = useState({
        id: '',
        title: ''
    });

    const handleInputChange = (event) => {
        setNewThread({...newThread,[event.target.name]: event.target.value});
    };
    
    const handleSubmit = (event) => {
    event.preventDefault();
    
    fetch('https://2y6i6tqn41.execute-api.ap-northeast-1.amazonaws.com/threads', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newThread)
        })
        .catch(error => console.error(error));
    };

    // TODO: ask about the axious and fetch api differences
    // const handleSubmit = (event) => {
    //     event.preventDefault();
    //     axios.post('https://2y6i6tqn41.execute-api.ap-northeast-1.amazonaws.com/threads', newThread)
    // }

    return(
        <div>
            <NavBar/>
            <div className='new-threads'>
            <header>
                <h1>スレッド新規作成</h1>
            </header>
            <main>
                <form>
                    <input name="title" type="text" placeholder='スレッドタイトル' value={newThread.title} onChange={handleInputChange}></input>
                    <Link to="/">Topに戻る</Link>
                    <button onClick={handleSubmit}>作成</button>
                </form>
            </main>
        </div>
        </div>
    )
}

export default NewThreads;