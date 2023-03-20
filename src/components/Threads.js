import React, { useState, useEffect } from 'react';
// import axios from 'axios'

function Threads(){
    const [threads, setThreads] = useState([]);
    const [currentThreads, setCurrentThreads] = useState(0);
    const handleNextThreads = () => {
        setCurrentThreads(currentThreads + 10);
    }

    const [hasMoreThreads, setHasMoreThreads] = useState(true);

    const handlePrevThreads = () => {
        setCurrentThreads(currentThreads - 10);
    }

    // TODO: ask about the axious and fetch api differences
    // const fetchThreads = async () => {
    //     const response = await axios.get("https://2y6i6tqn41.execute-api.ap-northeast-1.amazonaws.com/threads")
    //     setThreads(response.data);
    // }

    const fetchThreads = () => {
        fetch(`https://2y6i6tqn41.execute-api.ap-northeast-1.amazonaws.com/threads?offset=${currentThreads}`)
        .then(response => response.json())
        .then((jsonResponse) => {
            if(jsonResponse.length < 10){
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
                    {threads.map(thread => <div className='thread'>{thread.title}</div>)}
                </ul>
                <div className='threads-button'>
                    {currentThreads >= 10 && <button onClick={handlePrevThreads} className="button">前のスレッド</button>}
                    {hasMoreThreads && <button onClick={handleNextThreads} className="button">次のスレッド</button>}
                </div>         
            </main>
        </div>
    )
}

export default Threads;
