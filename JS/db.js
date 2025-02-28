const { Low, JSONFile } = require('lowdb');
const path = require('path');

// File-based JSON database
const file = path.join(__dirname, 'database.json');
const db = new Low(new JSONFile(file));

async function initializeDB() {
    await db.read();
    db.data = db.data || { users: [], players: [], tournaments: [], matches: [] };
    await db.write();
}

initializeDB();

module.exports = db;
