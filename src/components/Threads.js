import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

// import axios from 'axios'

function Threads(){
    const [threads, setThreads] = useState([]);
    const [currentThreads, setCurrentThreads] = useState(0);

    const num = 10

    const handleNextThreads = () => {
        setCurrentThreads(currentThreads + num);
    }

    const [hasMoreThreads, setHasMoreThreads] = useState(true);

    const handlePrevThreads = () => {
        setCurrentThreads(currentThreads - num);
    }

    // TODO: ask about the axios and fetch api differences
    // const fetchThreads = async () => {
    //     const response = await axios.get("https://2y6i6tqn41.execute-api.ap-northeast-1.amazonaws.com/offset=${currentThreads}")
    //     setThreads(response.data);
    // }

    const fetchThreads = () => {
        fetch(`https://2y6i6tqn41.execute-api.ap-northeast-1.amazonaws.com/threads?offset=${currentThreads}`)
        .then(response => response.json())
        .then((jsonResponse) => {
            if(jsonResponse.length < num){
                setHasMoreThreads(false)
            };
            setThreads(jsonResponse);
        })
    }

    useEffect(()=>{
        fetchThreads();
    }, [currentThreads])

    return(
        <div className='threads'>
            <header>
                <h1>新着スレッド</h1>
            </header>
            <main>
                <ul className='threads-list'>
                    {threads.map(thread => <li className='thread' key={thread.id}><Link className="thread-link" to={`/thread/${thread.id}`}>{thread.title}</Link></li>)}
                </ul>
                <div className='threads-button'>
                    {currentThreads >= num && <button onClick={handlePrevThreads} className="button">前のスレッド</button>}
                    {hasMoreThreads && <button onClick={handleNextThreads} className="button">次のスレッド</button>}
                </div>         
            </main>
        </div>
    )
}

export default Threads;

