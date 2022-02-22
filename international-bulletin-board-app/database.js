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
function createNoteTable(db) {
  db.serialize(() => {
    db.run(`
        CREATE TABLE IF NOT EXISTS notes (
            note_id INTEGER PRIMARY KEY,
            detected_language TEXT NOT NULL,
            note_color TEXT NOT NULL,
            parent_note INTEGER DEFAULT NULL,
            message TEXT NOT NULL
        );`);
  });
}

// TODO: Add version for parent note
// Insert into table
function insertNote(db, detected_language, note_color, message) {
  db.serialize(() => {
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
  });
}

// TODO: Change return to actual data return instead of console log
// Get specific note info
function getNote(db, note_id) {
  db.serialize(() => {
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
  });
}

// TODO: Change return to actual data return instead of console log
// Get all notes
function getNotes(db) {
  db.serialize(() => {
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
  });
}

let db = connectDatabase();

createNoteTable(db);
insertNote(db, "english", "ffffff", "this is the english message!");
insertNote(db, "spanish", "000000", "donde esta la biblioteca?");
getNotes(db);
insertNote(db, "english", "ffffff", "this is the english message!");
getNotes(db);
getNote(db, 1);
db.close();
