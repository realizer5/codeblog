import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Provider } from "react-redux";
import store from "./store/store.js";
import { createBrowserRouter } from 'react-router';
import { Protected } from './components';
import { Home, Login, Signup, AllPosts, AddPost, EditPost, Post, Profile } from "./pages";
import { RouterProvider } from 'react-router';

const router = createBrowserRouter([
    {
        path: "/", element: <App />, children: [
            { path: "/", element: <Home />, },
            { path: "/login", element: (<Protected authentication={false}> <Login /> </Protected>), },
            { path: "/signup", element: (<Protected authentication={false}> <Signup /> </Protected>), },
            { path: "/all-posts", element: (<Protected authentication> {" "} <AllPosts /> </Protected>), },
            { path: "/add-post", element: (<Protected authentication> {" "} <AddPost /> </Protected>), },
            { path: "/profile", element: (<Protected authentication> {" "} <Profile /> </Protected>), },
            { path: "/edit-post/:slug", element: (<Protected authentication> {" "} <EditPost /> </Protected>), },
            { path: "/post/:slug", element: <Post />, },
        ],
    },
])

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <Provider store={store} >
            <RouterProvider router={router} />
        </Provider>
    </StrictMode >,
)
