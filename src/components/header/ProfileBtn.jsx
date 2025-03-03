import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../store/authSlice';
import service from "../../appwrite/config";
import authService from "../../appwrite/auth";

export default function ProfileBtn() {
    const [showOption, setShowOption] = useState(false);
    const userData = useSelector(state => state.auth.userData);
    const dispatch = useDispatch();
    const logoutHandler = () => {
        authService.logout().then(() => {
            dispatch(logout);
            window.location.reload();
        })
    }
    const popoverRef = useRef(null);
    const profileButtonRef = useRef(null);

    const handleClickOutside = (event) => {
        if (popoverRef.current && !popoverRef.current.contains(event.target) &&
            !profileButtonRef.current.contains(event.target)) {
            setShowOption(false);
        }
    };

    useEffect(() => {
        if (showOption) {
            document.body.addEventListener("click", handleClickOutside);
        } else {
            document.body.removeEventListener("click", handleClickOutside);
        }

        return () => {
            document.body.removeEventListener("click", handleClickOutside);
        };
    }, [showOption]);

    return (
        <div className="relative">
            <button onClick={() => setShowOption(!showOption)} ref={profileButtonRef}
                className={`rounded-full border-2 ${showOption ? "border-gray-light" : "border-gray-dark"} p-1 duration-200 cursor-pointer aspect-square w-10 `}>
                <img src={userData && service.getProfilePreview(userData.$id)} alt="profile picture" className="rounded-full" />
            </button >
            {showOption &&
                <ul ref={popoverRef} className="mt-3 bg-blue-dark absolute right-0 text-center p-4 rounded-lg text-nowrap shadow-md shadow-blue-dark ">
                    <li>
                        <Link to={`/profile`} onClick={() => setShowOption(false)}
                            className="grid hover:bg-blue-light px-4 py-2 rounded-md duration-200 cursor-pointer w-full">
                            <span className="text-base">{userData?.name}</span><span className="text-gray-dark text-sm">{userData?.email}</span>
                        </Link>
                    </li>
                    <li><button onClick={logoutHandler} className="w-full hover:bg-blue-light px-4 py-2 rounded-md duration-200 cursor-pointer">Log Out</button></li>
                </ul>
            }
        </div>
    )
}
