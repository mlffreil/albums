import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AlbumList from './components/AlbumList';
import AddAlbum from './components/AddAlbum';
import EditAlbum from './components/EditAlbum';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<AlbumList />} />
          <Route path="/add" element={<AddAlbum />} />
          <Route path="/edit/:id" element={<EditAlbum />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
