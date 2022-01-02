import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../Header/Header';
import SinglePost from '../SinglePost/SinglePost';
import { useForm } from 'react-hook-form';
import usePosts from '../../Hooks/usePosts/usePosts';

const Home = () => {
    const { posts, setPosts, loading } = usePosts();
    const { register, handleSubmit, reset } = useForm();

    // Update Comment
    const onSubmit = (data, id) => {
        const proceed = window.confirm('Are You Sure, You Want To Like');
        if (proceed) {
            const url = `https://shrouded-stream-50106.herokuapp.com/posts/${id}/comments`;
            fetch(url, {
                method: 'PUT',
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify(data)
            })
                .then(res => res.json())
                .then(data => {
                    if (data.modifiedCount > 0) {
                        alert('Comment Added Successfully');
                        reset();
                    }
                })
        }
    }

    // Update Likes
    const handleLike = (id, likes) => {
        const like = Number(likes) + 1;
        const proceed = window.confirm('Are You Sure, You Want To Like');
        if (proceed) {
            const url = `https://shrouded-stream-50106.herokuapp.com/posts/${id}`;
            fetch(url, {
                method: 'PUT',
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify({ like: like })
            })
                .then(res => res.json())
                .then(data => {
                    if (data.modifiedCount > 0) {
                        alert('Like Added Successfully');
                    }
                })
        }
    }

    // Delete a Post
    const handleDeletePost = (id) => {
        const proceed = window.confirm('Are You Sure, You Want To Delete Post');
        if (proceed) {
            const url = `https://shrouded-stream-50106.herokuapp.com/posts/${id}`;
            fetch(url, {
                method: 'DELETE'
            })
                .then(res => res.json())
                .then(data => {
                    if (data.deletedCount > 0) {
                        alert('Post Delete Successfully');
                        const remainingPosts = posts.filter(post => post._id !== id);
                        setPosts(remainingPosts);
                    };
                });
        };
    }
    return (
        <div>
            <Header></Header>
            <div className='container d-flex justify-content-evenly gap-5'>
                <div className='mt-5'>
                    <div className='text-center mb-4'>
                        <h1>All Posts</h1>
                    </div>
                    {loading ?
                        <div className="d-flex justify-content-center">
                            <div className="spinner-border" role="status">
                                <span className="visually-hidden">Loading...</span>
                            </div>
                        </div>
                        :
                        <div className=''>
                            {
                                posts.map(post => <SinglePost key={post._id} post={post} handleDeletePost={handleDeletePost} handleLike={handleLike} register={register} handleSubmit={handleSubmit} onSubmit={onSubmit}></SinglePost>)
                            }
                        </div>}
                </div>
                <div className='mt-5'>
                    <Link to='/createPost'><button type="button" className="btn btn-primary">CREATE POST</button></Link>
                </div>
            </div>
        </div>
    );
};

export default Home;