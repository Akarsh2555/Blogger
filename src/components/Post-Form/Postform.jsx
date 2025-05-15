import React, { useCallback } from "react";
import { useForm } from "react-hook-form";
import { Button, SelectBtn, RTE } from "../index";
import Input from '../Input';
import service from "../../appwrite/config";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

function PostForm({ post }) {
    const { register, handleSubmit, watch, setValue, control, getValues } = useForm({
        defaultValues: {
            title: post?.title || "",
            slug: post?.$id || "",
            content: post?.content || "",
            status: post?.status || "active",
        },
    });
    const navigate = useNavigate();
    const userData = useSelector(state => state.auth.userData);

    const submit = async (data) => {
        if (post) {
            const file = data.image[0] ? await service.uploadFile(data.image[0]) : null;
            if (file) {
                service.deleteFile(post.featuredImage);
            }

            const dbPost = await service.updatePost(post.$id, {
                ...data,
                featuredImage: file ? file.$id : undefined,
            });

            if (dbPost) {
                navigate(`/post/${dbPost.$id}`);
            }
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
        }
    };

    const slugTransform = useCallback((value) => {
        if (value && typeof value === "string") {
            return value.trim().toLowerCase()
                .replace(/[^a-zA-Z\d\s]/g, '')
                .replace(/\s/g, '-');
        }
        return '';
    }, []);

    React.useEffect(() => {
        const subscription = watch((value, { name }) => {
            if (name === 'title') {
                setValue('slug', slugTransform(value.title), { shouldValidate: true });
            }
        });

        return () => {
            subscription.unsubscribe();
        };
    }, [watch, slugTransform, setValue]);

    return (
        <div
            style={{
                backgroundImage: "url('https://media.istockphoto.com/photos/blog-picture-id479759238?k=6&m=479759238&s=612x612&w=0&h=cIOO2FfZ9YKhVrXLAiBnu9r7Z9kWOa9uqPcBS5Pdebo=')",
            }}
            className="py-8 bg-gradient-to-b from-gray-900 to-gray-800 min-h-screen">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="bg-white rounded-2xl shadow-xl overflow-hidden border-2 border-white">
                    <div className="bg-gradient-to-r from-[#388D80] to-[#4583AA] p-6">
                        <h2 className="text-3xl font-bold text-white text-center">
                            Create Your Passion Your Way
                        </h2>
                        <p className="text-center text-red-100 mt-2">
                            Create unique and beautiful posts
                        </p>
                    </div>

                    <div className="p-6 sm:p-8">
                        <form onSubmit={handleSubmit(submit)} className="space-y-6">
                            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                                <div className="lg:col-span-2 space-y-6">
                                    <div className="space-y-4">
                                        <Input
                                            label="Title"
                                            placeholder="Enter your post title"
                                            className="w-full p-3 rounded-lg border-2 border-blue-200 focus:ring-2 focus:ring-red-500 focus:border-blue-500 transition-all duration-200"
                                            {...register("title", { required: true })}
                                        />

                                        <Input
                                            label="Slug"
                                            placeholder="post-url-slug"
                                            className="w-full p-3 rounded-lg border-2 border-blue-200 focus:ring-2 focus:ring-red-500 focus:border-blue-500 transition-all duration-200"
                                            {...register("slug", { required: true })}
                                            onInput={(e) => {
                                                setValue("slug", slugTransform(e.currentTarget.value), { shouldValidate: true });
                                            }}
                                        />

                                        <div className="mt-6">
                                            <RTE
                                                label="Content"
                                                name="content"
                                                control={control}
                                                defaultValue={getValues("content")}
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className="lg:col-span-1 space-y-6">
                                    <div className="p-4 bg-yellow-50 rounded-lg border-2 border-yellow-500">
                                        <div className="space-y-4">
                                            <div>
                                                <p className="text-sm font-medium text-yellow-700 mb-2">Featured Image</p>
                                                <Input
                                                    type="file"
                                                    className="w-full p-2 border-2 border-red-200 rounded-lg text-sm"
                                                    accept="image/png, image/jpg, image/jpeg, image/gif"
                                                    {...register("image", { required: !post })}
                                                />
                                            </div>

                                            {post && post.featuredImage && (
                                                <div className="mt-4">
                                                    <p className="text-sm font-medium text-red-700 mb-2">Current Image</p>
                                                    <div className="relative rounded-lg overflow-hidden border-2 border-red-200">
                                                        <img
                                                            src={service.getFileView(post.featuredImage)}
                                                            alt={post.title}
                                                            className="w-full h-48 object-cover"
                                                        />
                                                    </div>
                                                </div>
                                            )}

                                            <div className="mt-4">
                                                <SelectBtn
                                                    options={["active", "inactive"]}
                                                    label="Status"
                                                    className="w-full p-2 border-2 border-white-200 rounded-lg"
                                                    {...register("status", { required: true })}
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    <Button
                                        type="submit"
                                        className={`w-full py-3 px-4 rounded-lg text-white font-medium transition-all duration-200 bg-yellow-500 hover:bg-[#FF8000]`}
                                    >
                                        {post ? "Update Post" : "Publish Post"}
                                    </Button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default PostForm;