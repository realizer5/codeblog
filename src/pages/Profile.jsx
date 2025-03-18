import { useForm } from "react-hook-form"
import { Button, Container, Input, LoadingDots } from "../components"
import service from "../appwrite/config";
import { useSelector } from "react-redux";
import { Pencil } from "lucide-react";
import { useState, useEffect } from "react";
import { dummyUser } from "../assets";
import { useNavigate } from "react-router-dom";
import authService from "../appwrite/auth";

const Profile = () => {
    const [editable, setEditable] = useState(false);
    const [pfp, setPfp] = useState(false);
    const [loading, setLoading] = useState(true);
    const userData = useSelector((state) => state.auth.userData);
    const navigate = useNavigate();
    const { register, handleSubmit } = useForm({ defaultValues: { name: userData.name, email: userData.email } });
    const submit = async (data) => {
        if (data.image[0]) {
            await service.deletePfp(userData.$id);
            await service.uploadPfp(data.image[0], userData.$id);
        }
    };
    useEffect(() => {
        service.checkPfp(userData.$id).then(() => {
            setPfp(true);
        }
        ).catch(() => {
            setPfp(false);
        }
        ).finally(() => { setLoading(false) });
    }, [setPfp])
    return (
        <Container className="my-10">
            <h1 className="text-center text-4xl font-semibold text-gray-light">Profile</h1>
            <form onSubmit={handleSubmit(submit)} className="mt-10 flex flex-col justify-center items-center gap-10">
                <input type="text" className={`text-base text-gray-light outline-none border ${!editable ? "border-slate-light pointer-events-none" : "border-gray-light focus:ring-gray-light focus:ring-2"} rounded-md px-4 py-2 duration-200`} {...register("name")} />
                <input type="text" className={`text-base text-gray-light outline-none border ${!editable ? "border-slate-light pointer-events-none" : "border-gray-light focus:ring-gray-light focus:ring-2"} rounded-md px-4 py-2 duration-200`} {...register("email")} />
                <div className="group relative w-fit m-auto flex justify-center items-center">
                    {loading ? <LoadingDots className="h-70" /> :
                        (<>
                            {editable &&
                                <>
                                    <Input type="file" className="opacity-0 absolute inset-0 cursor-pointer z-30" accept="image/png, image/jpg, image/jpeg"
                                        {...register("image")} />
                                    <Pencil className="absolute group-hover:opacity-100 opacity-0 duration-200 z-20" />
                                </>
                            }
                            <img src={pfp ? service.getProfilePreview(userData.$id) : dummyUser} className="rounded-lg h-70 z-10" />
                        </>
                        )}
                </div>
                <Button type="button" className={`w-fit col-span-2 justify-self-center ${editable && "hidden"}`}
                    onClick={() => setEditable(true)}>
                    Edit Profile
                </Button>
                <Button type="submit" className={`w-fit col-span-2 justify-self-center ${!editable && "hidden"}`}>
                    Update Profile
                </Button>
            </form>
        </Container >
    )
}

export default Profile
