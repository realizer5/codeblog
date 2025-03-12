import service from "../appwrite/config"
import { Link } from "react-router-dom"
import parse from "html-react-parser"

//$id cuz of appwrite uses $ for this
const PostCard = ({ $id, title, featuredImage, content }) => {
    return (
        <Link to={`/post/${$id}`} >
            <div className="flex gap-2 bg-blue-dark shadow-md shadow-blue-dark rounded-md p-2">
                <div className="w-30 md:w-40">
                    <img src={service.getFilePreview(featuredImage)} alt={title} className="rounded-md aspect-square object-cover object-center w-full" />
                </div>
                <div className="flex-1 overflow-hidden break-words max-h-[7rem] md:max-h-[10rem]">
                    <h2 className="text-xl font-bold text-gray-light mb-2">{title}</h2>
                    {parse(content)}
                </div>
            </div>
        </Link>
    )
}

export default PostCard
