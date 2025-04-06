import { useState, useEffect } from "react"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router"

export default function Protected({ children, authentication = true }) {
    const navigate = useNavigate();
    const [loader, setLoader] = useState(true);
    const authStatus = useSelector(state => state.auth.status);

    useEffect(() => {
        if (authentication && authStatus !== authentication) {
            navigate("/login");
        } else if (!authentication && authStatus !== authentication) {
            navigate("/");
        }
        setLoader(false);

    }, [authStatus, navigate, authentication]) //navigate keeps track if user is coming from diffrent route

    return loader ? <h1>Loading....</h1> : <>{children}</>
}

