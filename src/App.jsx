import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import authService from "./appwrite/auth";
import { Header, Footer, LoadingDots } from "./components/";
import { login, logout } from "./store/authSlice"
import { Outlet } from "react-router";

function App() {
    const [loading, setLoading] = useState(true);
    const dispatch = useDispatch();

    useEffect(() => {
        authService.getCurrentUser().then((userData) => {
            if (userData) {
                dispatch(login({ userData }))
            } else {
                dispatch(logout());
            }
        }).finally(() => setLoading(false));
    }, []);

    return !loading ? (
        <div className="flex flex-wrap flex-col min-h-screen bg-blue-light text-gray-light">
            <Header />
            <main className="flex-1 grid">
                <Outlet />
            </main>
            <Footer/>
        </div>
    ) : (
        <LoadingDots className="h-screen bg-blue-light" />
    );
}

export default App
