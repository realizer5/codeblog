import service from "../appwrite/config"
import { Link } from "react-router-dom"

//$id cuz of appwrite uses $ for this
const PostCard = ({ $id, title, featuredImage }) => {
    return (
        <Link to={`/post/${$id}`}>
            <div className="w-full bg-slate-light rounded-md p-4 shadow-md shadow-blue-dark">
                <div className="justify-center mb-4 w-full">
                    <img src={service.getFilePreview(featuredImage)} alt={title} className="rounded-md m-auto object-center object-cover" />
                </div>
                <h2 className="text-xl font-bold text-gray-light">{title}</h2>
            </div>
        </Link>
    )
}

export default PostCard
