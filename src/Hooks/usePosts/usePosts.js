import { useEffect, useState } from 'react';

const usePosts = () => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true)
    useEffect(() => {
        fetch('https://shrouded-stream-50106.herokuapp.com/posts')
            .then(res => res.json())
            .then(data => setPosts(data))
            .finally(() => setLoading(false));
    }, [posts]);
    return { posts, setPosts, loading }
};

export default usePosts;