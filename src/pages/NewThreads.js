import React, { useState } from 'react';
import NavBar from '../components/NavBar';
import { Link } from 'react-router-dom';

function NewThreads(){
    const [newThread, setNewThread] = useState([]);

    const postThread = async (url, data) => {
        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                }, 
                body: JSON.stringify(data)
            });
            if(!response.ok){
                throw new Error(`HTTP error ${response.status}`);
            }

            return await response.json();
        } catch(error){
            console.log('Error:', error);
        }

    }
    const addThread = async (event) => {
        event.preventDefault();
        const url = "https://2y6i6tqn41.execute-api.ap-northeast-1.amazonaws.com/threads"
        setNewThread(event.target.value)

        const result = await postThread(url, newThread);
        console.log(result);
    }

    return(
        <div>
            <NavBar/>
            <div className='new-threads'>
            <header>
                <h1>スレッド新規作成</h1>
            </header>
            <main>
                <form onSubmit={addThread}>
                    <input type="text" placeholder='スレッドタイトル' name="title"></input>
                    <Link to="/">Topに戻る</Link>
                    <button type='submit'>作成</button>
                </form>
            </main>
        </div>
        </div>
    )
}

export default NewThreads;