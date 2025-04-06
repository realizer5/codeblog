import { useForm } from "react-hook-form"
import { Button, Container, Input, LoadingDots, } from "../components"
import service from "../appwrite/config";
import { useDispatch, useSelector } from "react-redux";
import { Pencil, X } from "lucide-react";
import { useState, useEffect } from "react";
import { dummyUser } from "../assets";
import { useNavigate } from "react-router";
import authService from "../appwrite/auth";
import { login, logout } from "../store/authSlice"

const Profile = () => {
    const [pfp, setPfp] = useState(false);
    const [editUsername, setEditUsername] = useState(false);
    const [loading, setLoading] = useState(true);
    const userData = useSelector((state) => state.auth.userData);
    const navigate = useNavigate();
    const { register, handleSubmit, formState: { isDirty }, resetField, reset, watch } = useForm({
        defaultValues: { name: userData.name, image: "" } // annoying bug with formState isDirty is you need to provide a defaultValue for everything i didn't for image and it had bugs when reseting
    });
    const dispatch = useDispatch();

    const submit = async (data) => {
        try {
            if (data.image[0]) {
                await service.deletePfp(userData.$id);
                await service.uploadPfp(data.image[0], userData.$id);
            }
        } catch (error) {
            console.warn("image not given");
        }
        if (data.name != userData.name) {
            try {
                await authService.updateName(data.name);
                const userData = await authService.getCurrentUser();
                if (userData) {
                    dispatch(login({ userData }))
                } else {
                    dispatch(logout());
                }
            } catch (error) {
                console.error("failed updating userData");
            }
        }
        if (data.image[0]) {
            window.location.reload(true);
        } else {
            navigate("/");
        }
    };

    const handleReset = () => {
        reset();
        setPfp(service.getProfilePreview(userData.$id));
        setEditUsername(false);
    };

    useEffect(() => {
        service.checkPfp(userData.$id).then(() => {
            setPfp(service.getProfilePreview(userData.$id));
        }
        ).catch(() => {
            setPfp(dummyUser);
        }
        ).finally(() => { setLoading(false) });
    }, [setPfp]);

    useEffect(() => {
        const subscription = watch((value, { name }) => {
            if (name === "image" && value.image) {
                const image = URL.createObjectURL(value.image[0]);
                setPfp(image);
            }
        });
        return () => {
            subscription.unsubscribe();
        }
    }, [watch, setPfp]);

    return (
        <Container className="my-10">
            <h1 className="text-center text-4xl font-semibold text-gray-light">Profile</h1>
            <form onSubmit={handleSubmit(submit)} className="mt-10 flex flex-col justify-center items-center gap-10">
                <div className="bg-blue-dark p-4 rounded-md space-y-4 overflow-x-hidden w-80 md:w-90">
                    <div className="inline-flex">
                        <div className="w-72 md:w-82 flex space-x-8 items-center justify-between">
                            <h2>{userData.name}</h2>
                            <Button onClick={() => setEditUsername(true)}><Pencil /></Button>
                        </div>
                        <div className={`flex space-x-4 w-72 md:w-82 duration-500 ${editUsername ? "-translate-x-full" : "translate-x-5"}`}>
                            <Input {...register("name")} />
                            <Button onClick={() => { setEditUsername(false); resetField('name'); }}><X /></Button>
                        </div>
                    </div>
                </div>
                <div className="group relative w-fit m-auto flex justify-center items-center">
                    {loading ? <LoadingDots className="h-70" /> :
                        (<>
                            <Input type="file" className="opacity-0 absolute inset-0 cursor-pointer z-30" accept="image/png, image/jpg, image/jpeg"
                                {...register("image")} />
                            <Pencil className="absolute group-hover:opacity-100 opacity-0 duration-200 z-20" />
                            <img src={pfp} className="rounded-lg h-70 z-10" />
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
