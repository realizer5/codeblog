import { useSelector } from "react-redux";
import { Container, Logo, LogoutBtn } from "../";
import { Link, NavLink } from "react-router-dom";

export default function Header() {
    const authStatus = useSelector((state) => state.auth.status);
    const navItems = [
        { name: 'Home', slug: "/", active: authStatus },
        { name: "All Posts", slug: "/all-posts", active: authStatus, },
        { name: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" ><path d="m18 5-2.414-2.414A2 2 0 0 0 14.172 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2"/><path d="M21.378 12.626a1 1 0 0 0-3.004-3.004l-4.01 4.012a2 2 0 0 0-.506.854l-.837 2.87a.5.5 0 0 0 .62.62l2.87-.837a2 2 0 0 0 .854-.506z"/><path d="M8 18h1"/></svg>,slug: "/add-post", active: authStatus, },
    ]

    return (
        <header className="py-2 sticky top-0 z-10">
            <Container>
                <nav className="flex py-2 shadow bg-blue-dark rounded-md items-center px-4">
                    <div className="mr-4">
                        <Link to="/" className="flex items-center space-x-2">
                            <Logo className="w-9" />
                            <h1 className="text-xl font-bold">Codeblog</h1>
                        </Link>
                    </div>
                    <ul className="flex ml-auto items-center space-x-2">
                        {navItems.map((item) => item.active ? (
                            <li key={item.name} className="flex items-center">
                                <NavLink className={({ isActive }) => `${isActive ? "text-blue-400" : "text-gray-light"} font-semibold inline-block px-4 py-2 duration-200 hover:bg-blue-light rounded-md active:bg-blue-dark`}
                                    to={item.slug} >
                                    {item.name}
                                </NavLink>
                            </li>
                        ) : null)}
                        {authStatus ? <li><LogoutBtn /></li> : <li><Link to="/login" className="font-semibold border border-slate-light inline-block px-4 py-2 duration-200 hover:bg-blue-light rounded-md active:bg-blue-dark">Login</Link></li>}
                    </ul>
                </nav>
            </Container>
        </header>
    )
}

