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
app.listen(PORT, () => console.log(Server running on https://quilted-enchanting-grade.glitch.me/ChooseJersey.html));
const express = require("express");
const cors = require("cors");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000; // Use Glitch's dynamic port

app.use(cors()); // Enable CORS for API access
app.use(express.static("public")); // Serve static files

// Mock Jersey Data
const jerseys = [
    { id: 1, name: "Classic Blue", color: "#0000FF", image: "https://cdn.glitch.global/55a60d88-a984-4cbb-a35b-7a6ebb653979/J3.jpg?v=1740389228096" },
    { id: 2, name: "Cyber Neon", color: "#00FFFF", image: "https://cdn.glitch.global/55a60d88-a984-4cbb-a35b-7a6ebb653979/J2.jpg?v=1740389228097" },
    { id: 3, name: "Electric Purple", color: "#8A2BE2", image: "https://cdn.glitch.global/55a60d88-a984-4cbb-a35b-7a6ebb653979/J1.jpg?v=1740389228097" },
    { id: 4, name: "Flame Red", color: "#FF0000", image: "https://cdn.glitch.global/55a60d88-a984-4cbb-a35b-7a6ebb653979/J4.jpg?v=1740389228441" },
    { id: 5, name: "Golden Strike", color: "#FFD700", image: "https://cdn.glitch.global/55a60d88-a984-4cbb-a35b-7a6ebb653979/J5.jpg?v=1740389229824" },
    { id: 6, name: "Emerald Green", color: "#008000", image: "https://cdn.glitch.global/55a60d88-a984-4cbb-a35b-7a6ebb653979/J6.jpg?v=1740389231173" },
    { id: 7, name: "Sunset Orange", color: "#FF4500", image: "https://cdn.glitch.global/55a60d88-a984-4cbb-a35b-7a6ebb653979/J7.jpg?v=1740389231989" },
    { id: 8, name: "Shadow Black", color: "#000000", image: "https://cdn.glitch.global/55a60d88-a984-4cbb-a35b-7a6ebb653979/J8.jpg?v=1740389235260" },
    { id: 9, name: "Silver Flash", color: "#C0C0C0", image: "https://cdn.glitch.global/55a60d88-a984-4cbb-a35b-7a6ebb653979/J9.jpg?v=1740389235608" },
    { id: 10, name: "Neon Pink", color: "#FF1493", image: "https://cdn.glitch.global/55a60d88-a984-4cbb-a35b-7a6ebb653979/J10.jpg?v=1740389236083" }
];

// API Route to Get Jerseys
app.get("/api/jerseys", (req, res) => {
    res.json(jerseys);
});

// Start Server
app.listen(PORT, () => {
    console.log(`✅ Server running at: https://${process.env.quilted-enchanting-grade}.glitch.me/api/jerseys`);
});
