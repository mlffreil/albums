const express = require('express');
const cors = require('cors');
const sqlite3 = require('sqlite3').verbose();

// Initialize the express app
const app = express();
app.use(cors({
  origin: 'https:myalbums.maryloufreil.com', // Specify your React app's URL exactly (no trailing slash)
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  cacheControl: ['no-cache', 'no-store', 'must-revalidate', 'proxy-revalidate' ],
  pragma: ['no-cache'],
    expires: ['0'],
}));


// Enable express to parse JSON bodies
app.use(express.json());

const PORT = process.env.PORT || 3000;
//open database
const musicDb = new sqlite3.Database('./music.db',
sqlite3.OPEN_READWRITE, (err) => {
    if (err) console.error(err.message);
    console.log('Conneted to the music.db database');
});
app.get('/', cors(), (req, res) => {
    console.log('Received request for /');
    res.send('Welcome to the Music API');
}  ); 

// Get all albums
app.get('/albums', cors(), (req, res) => {
    console.log('Fetching all albums');
    musicDb.all("SELECT * FROM albums", [], (err, rows) => {
        if (err) {
            console.log('Error retrieving albums:', err.message);
            res.status(500).send(`Failed to retieve albums: ${err.message}`);
        }
        else {
            console.log('Albums retrieved successfully');
            console.log(rows);
            res.json(rows);
            console.log(res);
            
        }
    })
})

app.get('/albums/:id', cors(), (req, res) => {
    const { id } = req.params;
    musicDb.get("SELECT * FROM albums WHERE id = ?", [id], (err, row) => {
        if (err) {
            res.status(500).send(`Failed to retrieve album: ${err.message}`);
        }
        else if (!row) {
            res.status(404).send("Album not found");
        }
        else {
            res.json(row);
        }
    });
});

// posts to add new album
// add some error checking to the request.
app.post('/albums', (req,res) => {
    const { title, artist, year} = req.body;
    const sql = `INSERT INTO albums (title, artist, year) VALUES
    (?,?,?)`;
    musicDb.run(sql, [title, artist, year], function (err) {
        if (err) {
            res.status(500).send(`Failed to create album: ${err.message}`);
        } else {
            res.status(201).send(`Album created with ID: ${this.lastID}`);
        }
    })
});


// Put to update an existing album
app.put('/albums/:id', (req, res) => {
    const { id } = req.params;
    const { title, artist, year} = req.body;
    const sql = `UPDATE albums SET title=?, artist=?, year=? WHERE id = ?`;
    musicDb.run(sql, [title, artist, year, id], (err) => {
        if (err) {res.status(500).send (`Failed to update album: ${err.message}`)}
        else {
            res.status(201).send ("Album updated");
        }
    });
})

// Delete an album
app.delete('/albums/:id', (req, res) => {
    const {id} = req.params;
    const sql = `DELETE FROM albums WHERE ID = ?`;
    musicDb.run(sql, id, (err => {
        if (err) {res.status(500).send(`Failed to delete album: ${err.message}`)}
        else {
            res.status(201).send ("Album deleted");
        }
    }))
})
//start the server
app.listen(PORT, '0.0.0.0', () => {
    console.log(`server running `);
})
