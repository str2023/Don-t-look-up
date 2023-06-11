import React, { useEffect, useState } from 'react';
import * as Api from "../../lib/apis/api";

const User = () => {
    const [userData, setUserData] = useState([]);
    const [newPostContent, setNewPostContent] = useState('');

    useEffect(() => {
        const fetchUserData = async () => {
        const response = await axios.get('/api/users');
        setUserData(response.data);
        };
        fetchUserData();
    }, []);

    const handleNewPost = async () => {
        const response = await axios.post('/api/posts', { content: newPostContent });
        console.log('New post created:', response.data);
        setNewPostContent('');
    };

    return (
        <div>
        <h2>User Information</h2>
        {userData.map(user => (
            <div key={user.id}>
            <p>Nickname: {user.nickname}</p>
            <p>Gender: {user.gender}</p>
            <p>Birthdate: {user.birthdate}</p>
            </div>
        ))}

        <h2>Posts</h2>
        {posts.map(post => (
            <div key={post.id}>
            <p>Content: {post.content}</p>
            </div>
        ))}

        <h2>Create New Post</h2>
        <textarea value={newPostContent} onChange={e => setNewPostContent(e.target.value)} />
        <button onClick={handleNewPost}>Create Post</button>
        </div>
    );
};

export default User;