import { useState, useEffect } from "react";
import service from "../appwrite/config"
import { Container, PostCard } from "../components"

export default function AllPosts() {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        service.getAllPosts([]).then((posts) => { if (posts) { setPosts(posts.documents) } });
    }, []);

    return (
        <div className="w-full py-8">
            <Container>
                <div className="flex flex-wrap">
                    {posts.map((post) => (
                        <div key={post.$id} className="p-2 w-1/4">
                            <PostCard {...post} />
                        </div>))}
                </div>
            </Container>
        </div>
    )
}

