//This file sets up an Express.js API to manage users, players, tournaments, and matches.

const express = require('express');
const bodyParser = require('body-parser');
const db = require('./db');
const app = express();

app.use(bodyParser.json());

// Signup
app.post('/signup', async (req, res) => {
    const { email, password } = req.body;
    await db.read();
    db.data.users.push({ email, password });
    await db.write();
    res.json({ message: 'User registered successfully!' });
});

// Add Player
app.post('/players', async (req, res) => {
    const { name, runs, wickets, totalMatches, totalWin, totalLoss } = req.body;
    await db.read();
    db.data.players.push({ name, runs, wickets, totalMatches, totalWin, totalLoss });
    await db.write();
    res.json({ message: 'Player added successfully!' });
});

// Create Tournament
app.post('/tournaments', async (req, res) => {
    const { id, name, innings, format } = req.body;
    await db.read();
    db.data.tournaments.push({ id, name, innings, format, players: [] });
    await db.write();
    res.json({ message: 'Tournament created successfully!' });
});

// Add Player to Tournament
app.post('/tournaments/:id/players', async (req, res) => {
    const { playerName } = req.body;
    const tournamentId = req.params.id;
    await db.read();
    const tournament = db.data.tournaments.find(t => t.id === tournamentId);
    const player = db.data.players.find(p => p.name === playerName);
    console.log("Player:",playerName);
    if (tournament && player) {
        tournament.players.push(player);
        await db.write();
        res.json({ message: Player ${playerName} added to Tournament ${tournamentId} });
    } else {
        res.status(404).json({ message: 'Tournament or Player not found' });
    }
});

// Schedule Matches
app.post('/matches', async (req, res) => {
    const { tournamentId, innings, playerName, runs, wickets } = req.body;
    await db.read();
    db.data.matches.push({ tournamentId, innings, playerName, runs, wickets });
    await db.write();
    console.log("scheduleMatches Runned Successfully" )
    res.json({ message: 'Match scheduled successfully!' });
});

// Delete Tournament
app.delete('/tournaments/:id', async (req, res) => {
    const tournamentId = req.params.id;
    await db.read();
    db.data.tournaments = db.data.tournaments.filter(t => t.id !== tournamentId);
    await db.write();
    res.json({ message: Tournament ${tournamentId} deleted successfully! });
});

// Start Server
const PORT = 3000;
app.listen(PORT, () => console.log(Server running on http://localhost:${PORT}));
                                   
const express = require("express");
const cors = require("cors");

const app = express();
const PORT = 5000;

app.use(cors()); // Allow frontend to access API

// Mock Jersey Data
const jerseys = [
    { id: 1, name: "Classic Blue", color: "#0000FF", image: "/jerseys/jersey1.png" },
    { id: 2, name: "Cyber Neon", color: "#00FFFF", image: "/jerseys/jersey2.png" },
    { id: 3, name: "Electric Purple", color: "#8A2BE2", image: "/jerseys/jersey3.png" },
    { id: 4, name: "Flame Red", color: "#FF0000", image: "/jerseys/jersey4.png" }
];

// API Route to Get Jerseys
app.get("/api/jerseys", (req, res) => {
    res.json(jerseys);
});

// Start Server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
