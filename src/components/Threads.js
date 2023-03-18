import React, { useState, useEffect } from 'react';

function Threads(){
    const [threads, setThreads] = useState([]);
    
    const fetchThreads = () => {
        fetch(`https://2y6i6tqn41.execute-api.ap-northeast-1.amazonaws.com/threads?offset=10`)
        .then(response => response.json())
        .then(jsonArray => jsonArray.map(jsonObject => setThreads(prev => [...prev, jsonObject.title])))
    }

    useEffect(()=>{
        fetchThreads();
    }, [])

    return(
        <div className='threads'>
            <header>
                <h1>新着スレッド</h1>
            </header>
            <main>
                <ul className='threads-list'>
                    {threads.map(thread => <div className='thread'>{thread}</div>)}
                </ul>         
            </main>
        </div>
    )
}

export default Threads;