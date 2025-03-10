import service from "../appwrite/config"
import { Link } from "react-router-dom"
import parse from "html-react-parser"

//$id cuz of appwrite uses $ for this
const PostCard = ({ $id, title, featuredImage, content }) => {
    return (
        <Link to={`/post/${$id}`} >
            <div className="flex w-full gap-2 bg-slate-light rounded-md p-4 shadow-md shadow-blue-dark">
                <div className="">
                    <img src={service.getFilePreview(featuredImage)} alt={title} className="rounded-md h-40 w-40 aspect-square object-cover object-center" />
                </div>
                <div className="flex-1 w-1/2 break-words">
                    <h2 className="text-xl font-bold text-gray-light mb-2">{title}</h2>
                    <div className="h-30 overflow-hidden">
                        {parse(content)}
                    </div>
                </div>
            </div>
        </Link>
    )
}

export default PostCard
