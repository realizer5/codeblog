import { useEffect, useState } from "react"
import service from "../appwrite/config"
import { Button, Container, PostCard, Logo } from "../components"
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

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
            <Container className="w-full py-8 mt-4">
                <div className="flex lg:flex-row flex-col relative">
                    <div className="sm:p-10 p-4 bg-cover rounded-xl space-y-5 text-gray-light sm:text-black lg:text-gray-light sm:absolute lg:static static">
                        <h1 className="sm:text-5xl text-3xl font-bold tracking-wide">Start sharing your thoughts in seconds</h1>
                        <p className="sm:text-lg text-base">fast and easy blogging platform lets you focus on what matters most - <strong className="text-red-100 sm:text-red-900 lg:text-red-100"><i>your words</i></strong></p>
                        <Button onClick={() => navigate("/signup")}>Sign up</Button>
                    </div>
                    <img src="https://images.pexels.com/photos/414548/pexels-photo-414548.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="blog image"
                        className="rounded-xl object-cover lg:max-h-100 md:max-h-140 shadow" />
                </div>
                <div className="mt-16 p-4 bg-blue-dark rounded-xl">
                    <div className="flex items-center">
                        <Logo className="w-8" />
                        <h2 className="text-lg font-bold ml-2 pl-2 border-l-2 border-slate-light text-gray-light">About</h2>
                    </div>
                    <div className="mt-4 px-1 flex flex-wrap lg:flex-nowrap gap-4 text-gray-light">
                        <img src="https://images.pexels.com/photos/4240505/pexels-photo-4240505.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="girl with laptop"
                            className="rounded-xl object-cover lg:max-h-100 md:max-h-100 shadow mx-auto" />
                        <div>
                            <h3 className="text-2xl sm:text-3xl font-semibold mt-2 lg:mt-10">Create, Share, and Inspire – The Easiest Way to Build and Publish Your Blog in Minutes</h3>
                            <p className="mt-2">Welcome to <strong>Codeblog</strong>, the ultimate platform for creating and sharing your blog in just a few clicks. Whether you're a beginner or an experienced writer, our easy-to-use tools allow you to build a stunning blog in no time. With simple customization options and fast publishing, you can focus on what truly matters—sharing your ideas with the world!</p>
                        </div>
                    </div>
                </div>
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
