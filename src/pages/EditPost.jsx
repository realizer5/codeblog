import { useState, useEffect } from "react"
import { Container, PostForm } from "../components"
import service from "../appwrite/config"
import { useNavigate, useParams } from "react-router";

export default function EditPost() {
    const [post, setPost] = useState(null);
    const { slug } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        if (slug) {
            service.getPost(slug).then((post) => {
                if (post) {
                    setPost(post);
                }
            })
        } else {
            navigate("/");
        }
    }, [slug, navigate]);

    return post && <div className="py-8"><Container><PostForm post={post} /></Container></div>
}

