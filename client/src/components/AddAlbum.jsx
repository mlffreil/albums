import {useState} from 'react';
import axios from "axios";
import { useNavigate, Link } from 'react-router-dom';
import { API_URL } from '../api';

function AddAlbum() {
  const [title, setTitle] = useState('');
  const [artist, setArtist] = useState('');
  const [year, setYear] = useState('');
  const navigate = useNavigate();
const API = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL
  });
    const handleSubmit = (e) => {
      e.preventDefault();
      // Handle form submission logic here
      const newAlbum = { title, artist, year };
      console.log('New Album:', newAlbum);
      API
        .post(`/albums`, newAlbum)
        .then((response) => {
          console.log('Album added:', response.data);
          navigate('/');
        })
        .catch((error) => {
          console.error('Error adding album:', error);
        });
    };

return (
    <div className="box">
        <h3>
            <Link to="/">My Favorite Albums</Link>
        </h3>
        <h2>Add Album</h2>
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
            <button type="submit" className="btn btn-primary">
                Add Album
            </button>
        </form>
    </div>
);
}

export default AddAlbum;
