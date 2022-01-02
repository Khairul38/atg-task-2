import axios from 'axios';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import Header from '../Header/Header';
import './CreatePost.css'

const CreatePost = () => {
    const { register, handleSubmit, reset } = useForm();
    const [processing, setProcessing] = useState(false);

    const navigate = useNavigate();

    const onSubmit = data => {
        const formData = new FormData();
        formData.append('name', data.name)
        formData.append('description', data.description)
        formData.append('likes', 0)
        formData.append('image', data.image[0])
        const proceed = window.confirm('Are You Sure, You Want To Create Post');
        if (proceed) {
            setProcessing(true)
            axios.post('https://shrouded-stream-50106.herokuapp.com/posts', formData)
                .then(res => {
                    if (res.data.insertedId) {
                        setProcessing(false);
                        alert('Post Successfully Created');
                        reset();
                        navigate('/');

                    }
                })
        }
    };
    return (
        <div>
            <Header></Header>
            <div className="add-products text-center banner-as">
                <h1>Create New Post</h1>
                <form className="mt-3" onSubmit={handleSubmit(onSubmit)}>
                    <input {...register("name", { required: true })} placeholder="Name" />
                    <textarea className="massage" {...register("description", { required: true })} placeholder="Description" />
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
                            className="btn btn-primary">POST</button>}
                </form>
            </div>
        </div>
    );
};

export default CreatePost;