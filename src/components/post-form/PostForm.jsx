import { useCallback, useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import service from "../../appwrite/config";
import { useNavigate } from "react-router";
import { useSelector } from "react-redux";
import { Button, Input, Select, RTE } from "../";

export default function PostForm({ post }) {
    const [image, setImage] = useState(null);
    const { register, handleSubmit, watch, setValue, control, getValues } = useForm({
        defaultValues: {
            title: post?.title || "", slug: post?.slug || "", content: post?.content || "",
            status: post?.status || "active"
        }
    });

    const navigate = useNavigate();
    const userData = useSelector((state) => state.auth.userData);
    const submit = async (data) => {
        if (post) {
            const file = await service.uploadFile(data.image[0]);
            if (file) {
                service.deleteFile(post.featuredImage);
            }
            const dbPost = await service.updatePost(post.$id, { ...data, featuredImage: file ? file.$id : undefined })
            if (dbPost) {
                navigate(`/post/${dbPost}`);
            };
        } else {
            const file = await service.uploadFile(data.image[0]);
            if (file) {
                const fileId = file.$id;
                data.featuredImage = fileId;
                const dbPost = await service.createPost({ ...data, userId: userData.$id });
                if (dbPost) {
                    navigate(`/post/${dbPost.$id}`);
                }
            }
        };
    }

    const slugTransform = useCallback((value) => {
        if (value && typeof value === 'string') return value.trim().toLowerCase().replace(/[^a-zA-Z\d\s]+/g, '-').replace(/\s/g, '-');
        return "";
    }, []);

    useEffect(() => {
        const subscription = watch((value, { name }) => {
            if (name === "title") {
                setValue("slug", slugTransform(value.title, { shouldValidate: true }));
            }
        });
        return () => {
            subscription.unsubscribe();
        }
    }, [watch, slugTransform, setValue]);

    useEffect(() => {
        const subscription = watch((value, { name }) => {
            if (name === "image" && value.image) {
                const image = URL.createObjectURL(value.image[0]);
                setImage(image);
            }
        });
        return () => {
            subscription.unsubscribe();
        }
    }, [watch, setImage]);

    return (
        <form onSubmit={handleSubmit(submit)} className="justify-center flex flex-wrap">
            <div className="md:w-2/3 px-2">
                <Input
                    label="Title :"
                    placeholder="Title"
                    className="mb-4"
                    {...register("title", { required: true })}
                />
                <Input
                    label="Slug :"
                    placeholder="Slug"
                    className="mb-4"
                    {...register("slug", { required: true })}
                    onInput={(e) => {
                        setValue("slug", slugTransform(e.currentTarget.value), { shouldValidate: true });
                    }}
                />
                <RTE label="Content :" name="content" control={control} defaultValue={getValues("content")} />
            </div>
            <div className="mt-4 md:mt-0 md:w-1/3 px-2">
                <Input
                    label="Featured Image :"
                    type="file"
                    className="mb-4"
                    accept="image/png, image/jpg, image/jpeg, image/gif"
                    {...register("image", { required: !post })}
                />
                {(post || image) && (
                    <div className="w-full mb-4">
                        <img
                            src={!image ? service.getFilePreview(post.featuredImage) : image}
                            alt={post?.title}
                            className="rounded-lg"
                        />
                    </div>
                )}
                <Select
                    options={["active", "inactive"]}
                    label="Status"
                    className="mb-4"
                    {...register("status", { required: true })}
                />
                <Button type="submit" className="w-full ">
                    {post ? "Update" : "Submit"}
                </Button>
            </div>
        </form>
    )
}

