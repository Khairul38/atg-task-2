import React from 'react';
import { Link } from 'react-router-dom';

const SinglePost = (props) => {
    const { _id, likes, comments, image, name, description } = props.post;
    const { register, handleSubmit, onSubmit } = props;

    return (
        <div>
            <div className="card mb-5">
                <img src={`data:image/png;base64,${image}`} className="card-img-top" alt="" />
                <div className="card-body">
                    <div className='d-flex justify-content-between'>
                        <h5 className="card-title">{name}</h5>
                        <div className="">
                            <button type="button" className="fs-6 btn btn-outline-primary bi bi-three-dots dropdown-toggle-split" data-bs-toggle="dropdown" aria-expanded="false">
                            </button>
                            <ul className="dropdown-menu dropdown-menu-end">
                                <li><Link className="dropdown-item" to={`/updatePost/${_id}`}>Update</Link></li>
                                <li><Link className="dropdown-item" to="" onClick={() => props.handleDeletePost(_id)}>Delete</Link></li>

                            </ul>
                        </div>
                    </div>
                    <p className="card-text">{description}</p>
                    <p className="card-text">Likes: {likes}</p>
                    <p className="card-text">Comments: {comments}</p>
                    <div className='d-md-flex justify-content-between'>
                        <button onClick={() => props.handleLike(_id, likes)} type="button" className="btn btn-primary">Like</button>
                        <form onSubmit={handleSubmit(data => onSubmit(data, _id))} className="input-group w-50 mt-3 mt-md-0">
                            <input {...register("comment", { required: true })} className="form-control" type="text" placeholder="Write comment" aria-label="Search" />
                            <button className="btn btn-outline-primary" type="submit">Submit</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SinglePost;