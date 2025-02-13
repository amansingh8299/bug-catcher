const express = require('express');
const app = express();
const aiRoutes = require('./routes/ai.routes');
const cors = require('cors');
const path = require('path');

app.use(express.json());
app.use(cors());

// Define the path of the current directory
const dirname = path.resolve();

// Serve the static files from the React app
app.use(express.static(path.join(dirname, "/client/dist")));

// Serve the index.html from the React app
app.get("*", (req, res) => {
    res.sendFile(path.join(dirname, "client", "dist", "index.html"));
});

app.get('/', (req, res) => {
    res.send('Hello World');
})

app.use('/ai', aiRoutes);
module.exports = app;