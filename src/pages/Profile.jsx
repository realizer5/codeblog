import { useForm } from "react-hook-form"
import { Button, Container, Input, LoadingDots, } from "../components"
import service from "../appwrite/config";
import { useSelector } from "react-redux";
import { Pencil } from "lucide-react";
import { useState, useEffect } from "react";
import { dummyUser } from "../assets";
import { useNavigate } from "react-router-dom";
import authService from "../appwrite/auth";

const Profile = () => {
    const [pfp, setPfp] = useState(false);
    const [editUsername, setEditUsername] = useState(false);
    const [editEmail, setEditEmail] = useState(false);
    const [loading, setLoading] = useState(true);
    const userData = useSelector((state) => state.auth.userData);
    const navigate = useNavigate();
    const { register, handleSubmit, formState: { isDirty }, resetField } = useForm({
        defaultValues: { name: userData.name, email: userData.email }
    });
    const submit = async (data) => {
        if (data.image[0]) {
            await service.deletePfp(userData.$id);
            await service.uploadPfp(data.image[0], userData.$id);
        }
    };
    const handleReset = () => {
        resetField('email');
        resetField('name');
        resetField('image');
    };
    useEffect(() => {
        service.checkPfp(userData.$id).then(() => {
            setPfp(true);
        }
        ).catch(() => {
            setPfp(false);
        }
        ).finally(() => { setLoading(false) });
    }, [setPfp]);

    return (
        <Container className="my-10">
            <h1 className="text-center text-4xl font-semibold text-gray-light">Profile</h1>
            <form onSubmit={handleSubmit(submit)} className="mt-10 flex flex-col justify-center items-center gap-10">
                <div className="bg-blue-dark p-4 rounded-md space-y-4 overflow-x-hidden w-90">
                    <div className="inline-flex">
                        <div className="w-82 flex space-x-8 items-center justify-between">
                            <h2>{userData.name}</h2>
                            <Button onClick={() => setEditUsername(true)}>Edit</Button>
                        </div>
                        <div className={`flex space-x-4 w-82 duration-500 ${editUsername ? "-translate-x-full" : "translate-x-5"}`}>
                            <Input {...register("name")} />
                            <Button onClick={() => { setEditUsername(false); resetField('name'); }}>Cancel</Button>
                        </div>
                    </div>
                    <div>
                        <div className="inline-flex">
                            <div className="w-82 flex space-x-8 items-center justify-between">
                                <h2>{userData.email}</h2>
                                <Button onClick={() => setEditEmail(true)}>Edit</Button>
                            </div>
                            <div className={`flex space-x-4 w-82 duration-500 ${editEmail ? "-translate-x-full" : "translate-x-5"}`}>
                                <Input {...register("email")} />
                                <Button onClick={() => { setEditEmail(false); resetField('email'); }}>Cancel</Button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="group relative w-fit m-auto flex justify-center items-center">
                    {loading ? <LoadingDots className="h-70" /> :
                        (<>
                            <Input type="file" className="opacity-0 absolute inset-0 cursor-pointer z-30" accept="image/png, image/jpg, image/jpeg"
                                {...register("image")} />
                            <Pencil className="absolute group-hover:opacity-100 opacity-0 duration-200 z-20" />
                            <img src={pfp ? service.getProfilePreview(userData.$id) : dummyUser} className="rounded-lg h-70 z-10" />
                        </>
                        )}
                </div>
                <div className={`w-fit col-span-2 justify-self-center space-x-4 ${!isDirty && "hidden"}`}>
                    <Button type="button" bgColor="bg-blue-light" textColor="text-gray-light"
                        onClick={handleReset}>
                        Reset
                    </Button>
                    <Button type="submit">
                        Save Changes
                    </Button>
                </div>
            </form>
        </Container >
    )
}

export default Profile
