import { useEffect, useState } from "react"
import service from "../appwrite/config"
import { Container, PostCard } from "../components"
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

export default function Home() {
    const [posts, setPosts] = useState([]);
    const authStatus = useSelector(state => state.auth.status);
    useEffect(() => {
        service.getAllPosts().then((posts) => {
            if (posts) {
                setPosts(posts.documents)
            }
        })
    }, [])
    if (!authStatus) {
        return (
            <Container className="w-full py-8 mt-4 text-center">
                <h1 className="text-2xl font-bold hover:text-gray-500">
                    <Link to="/login">Login To Read Blogs</Link>
                </h1>
            </Container>
        )
    } else if (posts.length > 0) {
        return (
            <Container className="py-8 flex flex-wrap">
                {posts.map((post) => (
                    <div key={post.$id} className='p-2 w-1/4'>
                        <PostCard {...post} />
                    </div>
                ))}
            </Container>
        )
    }
    return (
        <div className="w-full py-8 mt-4 text-center">
            <Container>
                <div className="flex flex-wrap">
                    <div className="p-2 w-full">
                        <h1 className="text-2xl font-bold hover:text-gray-500">
                            No Blogs To Read
                        </h1>
                    </div>
                </div>
            </Container>
        </div>
    )
}
