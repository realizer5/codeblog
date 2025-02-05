import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import authService from "./appwrite/auth";
import { Header, Footer } from "./components/";
import { login, logout } from "./store/authSlice"
import { Outlet } from "react-router-dom";

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
        <div className="flex flex-wrap min-h-screen content-between bg-gray-600 text-white">
            <div className="w-full block">
            <Header />
            <main>
                <Outlet />
            </main>
            <Footer />
            </div>
        </div>
    ) : null
}

export default App
