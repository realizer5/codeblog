import { useDispatch } from 'react-redux';
import authService from '../../appwrite/auth';
import { logout } from '../../store/authSlice';

export default function LogoutBtn() {
    const dispatch = useDispatch();
    const logoutHandler = () => {
        authService.logout().then(() => {
            dispatch(logout);
            window.location.reload();
        })
    }

    return (
        <button type="button" className='font-semibold border border-slate-light inline-block px-4 py-2 duration-200 hover:bg-blue-light rounded-md active:bg-blude-dark'
            onClick={logoutHandler}>
            Log out</button>
    )
}

