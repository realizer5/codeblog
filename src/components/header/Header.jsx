import { useSelector } from "react-redux";
import { Container, Logo, ProfileBtn } from "../";
import { Link, NavLink } from "react-router-dom";
import { FilePenLine } from "lucide-react";

export default function Header() {
    const authStatus = useSelector((state) => state.auth.status);
    const navItems = [
        { name: 'Home', slug: "/", active: authStatus },
        { name: "All Posts", slug: "/all-posts", active: authStatus, },
    ]

    return (
        <header className="py-2 px-2 sticky top-0 z-30">
            <Container className="bg-blue-dark shadow-md shadow-blue-dark rounded-md">
                <nav className="flex py-2 items-center px-4">
                    <div className="mr-4">
                        <Link to="/" className="flex items-center space-x-2">
                            <Logo className="w-9" />
                            <h1 className="text-xl font-bold">Codeblog</h1>
                        </Link>
                    </div>
                    <ul className="hidden md:flex items-center space-x-2 mx-auto">
                        {navItems.map((item) => item.active ? (
                            <li key={item.name} className="flex items-center">
                                <NavLink className={({ isActive }) => `${isActive ? "text-blue-400" : "text-gray-light"} font-semibold inline-block px-4 py-2 duration-200 hover:bg-blue-light rounded-md active:bg-blue-dark`}
                                    to={item.slug} >
                                    {item.name}
                                </NavLink>
                            </li>
                        ) : null)}
                    </ul>
                    <ul className="ml-auto md:ml-0 flex items-center space-x-2">
                        {authStatus ? (
                            <>
                                <li className="flex items-center">
                                    <NavLink className={({ isActive }) => `${isActive ? "text-blue-400" : "text-gray-light"} font-semibold inline-block px-4 py-2 duration-200 hover:bg-blue-light rounded-md active:bg-blue-dark`}
                                        to={"/add-post"} >
                                        <FilePenLine />
                                    </NavLink>
                                </li>
                                <li ><ProfileBtn /></li>
                            </>) : <li><Link to="/login" className="font-semibold border border-slate-light inline-block px-4 py-2 duration-200 hover:bg-blue-light rounded-md active:bg-blue-dark">Login</Link></li>}
                    </ul>
                </nav>
            </Container>
        </header>
    )
}

