import { useState, useEffect } from "react";
import service from "../appwrite/config"
import { Container, PostCard, LoadingDots } from "../components"

export default function AllPosts() {
    const [loading, setLoading] = useState(true);
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        service.getAllPosts([]).then((posts) => { if (posts) { setPosts(posts.documents) } })
            .finally(() => { setLoading(false) });
    }, []);

    if (!loading) {
        return (
            <Container>
                <div className="py-8 self-stretch grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3" >
                    {
                        posts.map((post) => (
                            <div key={post.$id} >
                                <PostCard {...post} />
                            </div>))
                    }
                </div>
            </Container >
        )
    } else if (loading) {
        return (<LoadingDots className="min-h-screen" />)
    }
}

