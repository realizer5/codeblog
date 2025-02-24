import { Container, Button, HomeCard, Logo } from '.'
import { FileCode, ImageUp, FilePenLine, BookText, GlobeLock } from 'lucide-react';

export default function PublicHomepage() {
    const items = [
        { text: "Easy To Use and Navigate Layout", icon: <FileCode /> },
        { text: "Integrate Images & gifs in your blogs", icon: <ImageUp /> },
        { text: "Built-in Text Editor to write Beautifull blog", icon: <FilePenLine /> },
        { text: "Write Documentation of Your Code with Ease", icon: <BookText /> },
        { text: "Write your Private blogs that only you can Read", icon: <GlobeLock /> }
    ];
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
            <div className="mt-16 p-4 text-gray-light space-y-5" >
                <div className="text-center">
                    <h2 className="text-3xl md:text-5xl font-semibold">Codeblog has easy and effective Layout</h2>
                    <p className="mt-6 md:text-lg ml-2">CodeBlog is your go-to platform for effortlessly creating and managing blogs. Designed with simplicity in mind, our website offers a user-friendly interface that makes blog creation a breeze. Whether you're a seasoned developer or a beginner, CodeBlog provides the tools you need to quickly publish your thoughts, share your code snippets, and connect with a like-minded community. Start your blogging journey today with CodeBlog – where simplicity meets functionality!</p>
                </div>
                <div className="rounded-xl flex gap-6 p-4 md:flex-row flex-col">
                    <div className='grid grid-cols-1 md:grid-cols-2 flex-1 gap-2'>
                        <HomeCard items={items} />
                    </div>
                    <div className="flex-1 my-auto">
                        <img src="https://images.pexels.com/photos/1049764/pexels-photo-1049764.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="cat-laptop"
                            className="rounded-xl object-cover shadow w-full" loading='lazy' />
                    </div>
                </div>
            </div>
            <div className="mt-16 p-4 bg-blue-dark rounded-md">
                <div className="flex items-center">
                    <Logo className="w-8" />
                    <h2 className="text-lg font-bold ml-2 pl-2 border-l-2 border-slate-light text-gray-light">About</h2>
                </div>
                <div className="mt-4 px-1 flex flex-wrap lg:flex-nowrap gap-4 text-gray-light">
                    <img src="https://images.pexels.com/photos/4240505/pexels-photo-4240505.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="girl with laptop"
                        className="rounded-xl object-cover lg:max-h-100 md:max-h-100 shadow mx-auto" loading='lazy' />
                    <div>
                        <h3 className="text-2xl sm:text-3xl font-semibold mt-2 lg:mt-10">Create, Share, and Inspire – The Easiest Way to Build and Publish Your Blog in Minutes</h3>
                        <p className="mt-2">Welcome to <strong>Codeblog</strong>, the ultimate platform for creating and sharing your blog in just a few clicks. Whether you're a beginner or an experienced writer, our easy-to-use tools allow you to build a stunning blog in no time. With simple customization options and fast publishing, you can focus on what truly matters—sharing your ideas with the world!</p>
                    </div>
                </div>
            </div>
        </Container>
    )
}

