const sqlite3 = require("sqlite3").verbose();

// Create database
function connectDatabase() {
  // Connects if exists, otherwise creates database file
  let db = new sqlite3.Database("./db/board.db", (error) => {
    if (error) {
      console.error(error.message);
    }
    console.log("Connected to bulletin board database.");
  });
  return db;
}

// Create table
function createNoteTable() {
  let db = connectDatabase();
  db.run(`
    CREATE TABLE IF NOT EXISTS notes (
        note_id INTEGER PRIMARY KEY AUTOINCREMENT,
        detected_language TEXT NOT NULL,
        note_color TEXT NOT NULL,
        parent_note INTEGER NULL,
        message TEXT NOT NULL
    );`);
  db.close();
}

// Insert into table
// function insertNote() {
//     let db = connectDatabase();
// }
