import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import usePosts from '../../Hooks/usePosts/usePosts';
import Header from '../Header/Header';

const UpdatePost = () => {
    const { postId } = useParams();
    const { posts, loading } = usePosts();
    const { register, handleSubmit, reset } = useForm();
    const navigate = useNavigate();
    const [processing, setProcessing] = useState(false);

    const postData = posts.find(post => post._id === postId);

    console.log(postId);

    // Update Comment
    const onSubmit = (data) => {
        const formData = new FormData();
        formData.append('name', data.name)
        formData.append('description', data.description)
        formData.append('image', data.image[0])
        const proceed = window.confirm('Are You Sure, You Want To Update Post');
        if (proceed) {
            setProcessing(true);
            const url = `https://shrouded-stream-50106.herokuapp.com/posts/${postId}/update`;
            fetch(url, {
                method: 'PUT',
                body: formData
            })
                .then(res => res.json())
                .then(data => {
                    if (data.modifiedCount > 0) {
                        setProcessing(false);
                        alert('Post Updated Successfully');
                        reset();
                        navigate('/');
                    }
                })
        }
    }
    return (
        <div>
            <Header></Header>
            <div className="add-products text-center banner-as">
                <h1>Update Post</h1>
                {loading ?
                    <div className="d-flex justify-content-center">
                        <div className="spinner-border" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </div>
                    </div>
                    :
                    <form className="mt-3" onSubmit={handleSubmit(onSubmit)}>
                        <input defaultValue={postData?.name} {...register("name", { required: true })} placeholder="Name" />
                        <textarea defaultValue={postData?.description} className="massage" {...register("description", { required: true })} placeholder="Description" />
                        {/* <input type="number" {...register("price", { required: true })} placeholder="Price" /> */}
                        <input style={{ border: '2px solid #0D6EFD' }} type="file" {...register("image", { required: true })} />
                        {processing ?
                            <div className="d-flex justify-content-center">
                                <div className="spinner-border" role="status">
                                    <span className="visually-hidden">Loading...</span>
                                </div>
                            </div>
                            :
                            <button sx={{ width: '100%', mt: 3 }}
                                type="submit"
                                className="btn btn-primary">UPDATE POST</button>}
                    </form>}
            </div>
        </div>
    );
};

export default UpdatePost;