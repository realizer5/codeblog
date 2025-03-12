import { useEffect, useState } from "react"
import service from "../appwrite/config"
import { Container, LoadingDots, PostCard } from "../components"
import { useSelector } from "react-redux";
import PublicHomepage from "../components/PublicHomepage";

export default function Home() {
    const [loading, setLoading] = useState(true);
    const [posts, setPosts] = useState([]);
    const authStatus = useSelector(state => state.auth.status);
    useEffect(() => {
        service.getAllPosts().then((posts) => {
            if (posts) {
                setPosts(posts.documents);
            }
        }).finally(() => (setLoading(false)));
    }, [])
    if (!authStatus) {
        return (
            <PublicHomepage />
        )
    } else if (posts.length > 0) {
        return (
            <Container className="py-8 self-stretch grid gap-4 grid-cols-1 md:grid-cols-2">
                {posts.map((post) => (
                    <div key={post.$id}>
                        <PostCard {...post} />
                    </div>
                ))}
            </Container>
        )
    } else if (loading) {
        return (<LoadingDots className="min-h-screen"/>)
    }
}
