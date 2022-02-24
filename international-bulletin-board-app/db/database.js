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
exports.createNoteTable = async function () {
  return new Promise((resolve, reject) => {
    let db = connectDatabase();
    db.run(
      `
          CREATE TABLE IF NOT EXISTS notes (
              note_id INTEGER PRIMARY KEY,
              detected_language TEXT NOT NULL,
              note_color TEXT NOT NULL,
              parent_note INTEGER DEFAULT NULL,
              message TEXT NOT NULL
          );`,
      (error) => {
        if (error) {
          reject(error.message);
        }
        resolve(true);
      }
    );
    db.close();
  });
};

// Insert into table
exports.insertBoardNote = async function (
  detected_language,
  note_color,
  message
) {
  return new Promise((resolve, reject) => {
    let db = connectDatabase();
    db.run(
      `INSERT INTO notes(detected_language, note_color, message)
          values(?, ?, ?)`,
      [detected_language, note_color, message],
      (error) => {
        if (error) {
          reject(error.message);
        }
        resolve(true);
      }
    );
    db.close();
  });
};

exports.insertReplyNote = async function (
  detected_language,
  note_color,
  message,
  parent_note
) {
  return new Promise((resolve, reject) => {
    let db = connectDatabase();
    db.run(
      `INSERT INTO notes(detected_language, note_color, message, parent_note)
          values(?, ?, ?, ?)`,
      [detected_language, note_color, message, parent_note],
      (error) => {
        if (error) {
          reject(error.message);
        }
        resolve(true);
      }
    );
    db.close();
  });
};

exports.getNote = async function (note_id) {
  return new Promise((resolve, reject) => {
    let db = connectDatabase();
    let query = `SELECT * FROM notes WHERE note_id = ?`;
    db.get(query, [note_id], (error, row) => {
      if (error) {
        reject(error.message);
      }
      resolve(row);
    });
    db.close();
  });
};

exports.getNotes = async function () {
  return new Promise((resolve, reject) => {
    let db = connectDatabase();
    let query = `SELECT * FROM notes`;
    db.all(query, [], (error, rows) => {
      if (error) {
        reject(error.message);
      }
      resolve(rows);
    });
    db.close();
  });
};
