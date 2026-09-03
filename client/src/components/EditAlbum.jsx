import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { API_URL } from '../api';
import { useParams, Link, useNavigate } from 'react-router-dom';

function EditAlbum() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [artist, setArtist] = useState('');
  const [year, setYear] = useState('');
  
  useEffect(() => {
    
    axios.get(`${API_URL}/albums/${id}`)
      .then((response) => {
        const album = response.data;
        setTitle(album.title);
        setArtist(album.artist);
        setYear(album.year);
      })
      .catch((error) => {
        console.error('Error fetching album:', error);
      });
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const updatedAlbum = { title, artist, year };
    axios.put(`${API_URL}/albums/${id}`, updatedAlbum)
      .then((response) => {
        console.log('Album updated:', response.data);
        navigate('/');
      })
      .catch((error) => {
        console.error('Error updating album:', error);
      });
  };

  return (
    <div className="box">
      <h3>
        <Link to="/">My Favorite Albums</Link>
      </h3>
      <h2>Edit Album</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Album Name</label>
          <input
            type="text"
            className="form-control"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Artist</label>
          <input
            type="text"
            className="form-control"
            value={artist}
            onChange={(e) => setArtist(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Year</label>
          <input
            type="number"
            className="form-control"
            value={year}
            onChange={(e) => setYear(e.target.value)}
          />
        </div>
        <div style={{marginTop: '10px'}}>
        <button type="submit" className="btn btn-primary">
          Save
        </button>
        <Link to="/" className="btn btn-secondary" style={{marginLeft: '10px'}}>
          Cancel
        </Link>
        </div>
      </form>
    </div>
  )
      
}

export default EditAlbum;