import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {createBrowserRouter, RouterProvider,} from "react-router-dom";
import NewThreads from './pages/NewThreads';
import Posts from './pages/Posts';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App/>,
  },
  {
    path: "thread/new",
    element: <NewThreads/>
  },
  {
    path: "thread/:thread_id",
    element: <Posts />
  }
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
