import { useForm } from "react-hook-form"
import { Button, Container, Input } from "../components"
import service from "../appwrite/config";
import { useSelector } from "react-redux";

const Profile = () => {
    const userData = useSelector((state) => state.auth.userData);
    const { register, handleSubmit } = useForm({ defaultValues: { name: userData.name, email: userData.email } });
    const submit = async (data) => {
        await service.uploadPfp(data.image[0], userData.$id);
    };
    return (
        <Container className="mt-10">
            <h1 className="text-center text-4xl font-semibold text-gray-light">Profile</h1>
            <form onSubmit={handleSubmit(submit)} className="grid gap-10 mt-10 grid-cols-2">
                <div className="space-y-4">
                    <Input  {...register("name")} divClass="flex items-center" />
                    <Input  {...register("email")} divClass="flex items-center" />
                </div>
                <div className="space-y-4">
                    <Input type="file" label="Profile Picture :" className="ml-4" accept="image/png, image/jpg, image/jpeg " divClass="flex items-center"
                        {...register("image")} />
                    <img src={service.getProfilePreview(userData.$id)} alt="profile picture" className="rounded-lg w-30 m-auto" />
                </div>
                <Button type="submit" className="w-fit mt-4 col-span-2 justify-self-center">
                    Update Profile
                </Button>
            </form>
        </Container >
    )
}

export default Profile
