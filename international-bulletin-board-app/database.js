// TODO: Fix Nodejs async behavior for database methods

const sqlite3 = require("sqlite3").verbose();

// Create database
function connectDatabase() {
  // Connects if exists, otherwise creates database file
  let db = new sqlite3.Database("./db/board.db", (error) => {
    if (error) {
      return console.error(error.message);
    }
  });
  return db;
}

// Create table
function createNoteTable() {
  let db = connectDatabase();
  db.run(`
    CREATE TABLE IF NOT EXISTS notes (
        note_id INTEGER PRIMARY KEY,
        detected_language TEXT NOT NULL,
        note_color TEXT NOT NULL,
        parent_note INTEGER DEFAULT NULL,
        message TEXT NOT NULL
    );`);
  db.close();
}

// Insert into table
function insertNote(detected_language, note_color, message) {
  let db = connectDatabase();
  db.run(
    `INSERT INTO notes(detected_language, note_color, message)
    values(?, ?, ?)`,
    [detected_language, note_color, message],
    (error) => {
      if (error) {
        return console.error(error.message);
      }
      console.log("Insertion sucessful");
    }
  );
  db.close();
}

// Get specific note info
function getNote(note_id) {
  let db = connectDatabase();
  let query = `SELECT * FROM notes WHERE note_id = ?`;
  db.get(query, [note_id], (error, row) => {
    if (error) {
      return console.error(error.message);
    }
    return row
      ? console.log(
          row.note_id,
          row.detected_language,
          row.note_color,
          row.parent_note,
          row.message
        )
      : console.log(`No note found with note_id ${note_id}`);
  });
  db.close();
}

// Get all notes
function getNotes() {
  let db = connectDatabase();
  let query = `SELECT * FROM notes`;
  db.all(query, [], (error, rows) => {
    if (error) {
      return console.error(error.message);
    }
    rows.forEach((row) => {
      console.log(
        row.note_id,
        row.detected_language,
        row.note_color,
        row.parent_note,
        row.message
      );
    });
  });
  db.close();
}

createNoteTable();
insertNote("english", "ffffff", "this is the english message!");
insertNote("spanish", "000000", "donde esta la biblioteca?");
getNotes();
getNote(1);
