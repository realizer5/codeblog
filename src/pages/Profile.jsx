import { useForm } from "react-hook-form"
import { Button, Container, Input } from "../components"
import service from "../appwrite/config";
import { useSelector } from "react-redux";
import { Pencil } from "lucide-react";
import { useState, useEffect } from "react";
import { dummyUser } from "../assets";

const Profile = () => {
    const [editable, setEditable] = useState(false);
    const userData = useSelector((state) => state.auth.userData);
    const { register, handleSubmit } = useForm({ defaultValues: { name: userData.name, email: userData.email } });
    const submit = async (data) => {
        await service.deletePfp(userData.$id);
        await service.uploadPfp(data.image[0], userData.$id);
        console.log("done");
        console.log(data.image[0]);
    };
    return (
        <Container className="my-10">
            <h1 className="text-center text-4xl font-semibold text-gray-light">Profile</h1>
            <form onSubmit={handleSubmit(submit)} className="mt-10 flex flex-col justify-center items-center gap-10">
                <input type="text" className={`text-base text-gray-light outline-none border ${!editable ? "border-slate-light pointer-events-none" : "border-gray-light focus:ring-gray-light focus:ring-2"} rounded-md px-4 py-2 duration-200`} {...register("name")} />
                <input type="text" className={`text-base text-gray-light outline-none border ${!editable ? "border-slate-light pointer-events-none" : "border-gray-light focus:ring-gray-light focus:ring-2"} rounded-md px-4 py-2 duration-200`} {...register("email")} />
                <div className="group relative w-fit m-auto flex justify-center items-center">
                    {editable &&
                        <>
                            <Input type="file" className="opacity-0 absolute inset-0 cursor-pointer z-30" accept="image/png, image/jpg, image/jpeg"
                                {...register("image")} />
                            <Pencil className="absolute group-hover:opacity-100 opacity-0 duration-200 z-20" />
                        </>
                    }
                    <img src={dummyUser} alt="profile picture" className="rounded-lg w-70" />
                    <img src={service.getProfilePreview(userData.$id)} className="rounded-lg w-70 z-10 absolute" />
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
