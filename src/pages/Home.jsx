import { useEffect, useState } from "react"
import service from "../appwrite/config"
import { Container, PostCard } from "../components"
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import PublicHomepage from "../components/PublicHomepage";

export default function Home() {
    const navigate = useNavigate();
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
            <PublicHomepage />
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
}
