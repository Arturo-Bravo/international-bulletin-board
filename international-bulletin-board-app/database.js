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
  return new Promise((resolve, reject) => {
    db.serialize(() => {
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
    });
  });
}

// Insert into table
function insertBoardNote(db, detected_language, note_color, message) {
  return new Promise((resolve, reject) => {
    db.serialize(() => {
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
    });
  });
}

function insertReplyNote(
  db,
  detected_language,
  note_color,
  message,
  parent_note
) {
  return new Promise((resolve, reject) => {
    db.serialize(() => {
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
    });
  });
}

async function getNote(db, note_id) {
  return new Promise((resolve, reject) => {
    db.serialize(() => {
      let query = `SELECT * FROM notes WHERE note_id = ?`;
      db.get(query, [note_id], (error, row) => {
        if (error) {
          reject(error.message);
        }
        resolve(row);
      });
    });
  });
}

function getNotes(db) {
  return new Promise((resolve, reject) => {
    db.serialize(() => {
      let query = `SELECT * FROM notes`;
      db.all(query, [], (error, rows) => {
        if (error) {
          reject(error.message);
        }
        resolve(rows);
      });
    });
  });
}

let db = connectDatabase();

// const retrieveNotes = async () => {
//   try {
//     await getNote(db, 1);
//   } catch {
//     console.log("there was an error");
//   }
// };
const printNote = async () => {
  await createNoteTable(db);
  await insertBoardNote(
    db,
    "english",
    "ffffff",
    "this is the english message!"
  );
  await insertBoardNote(db, "spanish", "000000", "donde esta la biblioteca?");
  console.log(await getNotes(db));
  await insertReplyNote(
    db,
    "english",
    "ffffff",
    "this is the english message!",
    1
  );
  console.log(await getNotes(db));
  console.log(await getNote(db, 1));
  await db.close();
};
printNote();
// getNote(db, 1).then(console.log);
// retrieveNotes;
// db.close();
