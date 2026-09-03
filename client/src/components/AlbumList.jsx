import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import axios from "axios";
import { API_URL } from '../api';

function AlbumList() {
  const [albums, setAlbums] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAlbums = async () => {
      try {
        const response = await axios.get(`${API_URL}/albums`);
        setAlbums(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching albums:', error);
        setError('Failed to fetch albums. Please try again later.');
        setLoading(false);
      }
    };

    fetchAlbums();
  }, []);
  const deleteAlbum = (id) => {
    axios.delete(`${API_URL}/albums/${id}`)
      .then(() => {
        setAlbums(albums.filter(album => album.id !== id));
      })
        .catch((error) => {
          console.error('Error deleting album:', error);
          setError('Failed to delete album. Please try again later.');
        });
  };

  if (loading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div className="alert alert-danger">{error}</div>;
  }
  return (
    <div className="box">
        <h3>
            <a href="/">My Favorite Albums</a>
        </h3>
        <table className="table">
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Album</th>
                    <th>Artist</th>
                    <th>Year</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
               {albums.map((album) => (
                    <tr key={album.id}>
                        <td>{album.id}</td>
                        <td>{album.title}</td>
                        <td>{album.artist}</td>
                        <td>{album.year}</td>
                        <td>
                            <Link to={`/edit/${album.id}`} className="btn btn-sm btn-outline-primary">
                                Edit
                            </Link>
                            <Link to={`/`}onClick={() => deleteAlbum(album.id)} className="btn btn-sm btn-outline-danger ms-2">
                                Delete
                            </Link>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
        <Link to="/add" className="btn btn-primary">
            Add Album
        </Link>
    </div>
);}

export default AlbumList;