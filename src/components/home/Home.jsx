import axios from 'axios';
import React, { useState, useEffect, useContext } from 'react';
import Logincontext from '../context/Logincontext';
import './Home.css'; 

const Home = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [url, setUrl] = useState('');

  const { user } = useContext(Logincontext);

  const handleSubmit = () => {
    if (name && url && description) {
      const posts = { name, url, description };
      axios.post('https://myfullstackapu.onrender.com/posts', posts).then((res) => {
        console.log(res);
        alert('success');
        fetchData(); // Fetch updated data after successful post submission
        setName('')
        setDescription('')
        setUrl('')
      });
    } else {
      alert('fill details');
    }
  };

  function sliceme(data) {
    let index = null;
    for (let i = 0; i < data.length; i++) {
      if (data[i] === '@') {
        index = i - 1;
      }
    }
    return data.slice(0, index + 1);
  }

  const fetchData = () => {
    axios.get('https://myfullstackapu.onrender.com/posts').then((res) => {
      setData(res.data);
      setLoading(false);
    });
  };

  useEffect(() => {
    console.log(user);
    fetchData();
  }, []);

  const handleDelete = (postId) => {
    axios.delete(`https://myfullstackapu.onrender.com/posts/${postId}`).then((res) => {
      console.log(res);
      alert('Post deleted');
      fetchData(); 
    });
  };

  return (
    <div className="container">
      <h1 className="welcome">Welcome {sliceme(user.email)}</h1>
      <div className="form-container">
        <input
          className="input-field"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Name"
        />
        <input
          className="input-field"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="URL"
        />
        <textarea
          aria-multiline
          className="input-field"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Description"
          style={{ height: '150px', width: '300px' }}
        />
        <button className="submit-btn" onClick={handleSubmit}>
          Submit
        </button>
      </div>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="post-list">
          {data.map((post) => (
            <div key={post._id} className="post-item">
              <img src={post.url} alt={post.name} className="post-image" />
              <div className="post-content">
                <h2>{post.name}</h2>
                <p>{post.description}</p>
                <button onClick={() => handleDelete(post._id)}>Delete</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;
