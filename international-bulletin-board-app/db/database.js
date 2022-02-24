const sqlite3 = require("sqlite3").verbose();

/**
 * Connects to or creates a database file if one does
 * not exist
 * @returns {Database} a database obj if successful,
 * otherwise throws an error
 */
function connectDatabase() {
  // Connects if exists, otherwise creates database file
  let db = new sqlite3.Database("./db/board.db", (error) => {
    if (error) {
      return console.error(error.message);
    }
  });
  return db;
}

/**
 * Creates a table if one does not already exist for
 * note data
 * @returns {Bool} true if creation was successful,
 * otherwise throws an error message
 */
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

/**
 * Inserts data into the database for a
 * note on the main board
 * @param {String} detected_language The detected language of the message
 * @param {String} note_color The hex value for the note color
 * @param {String} message The note message
 * @returns {Bool} true if insertion was successful,
 * otherwise throws an error message
 */
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

/**
 * Inserts data into the database for a
 * note that is a reply to another note
 * @param {String} detected_language The detected language of the message
 * @param {String} note_color The hex value for the note color
 * @param {String} message The note message
 * @param {Integer} parent_note The id of the note being replied to
 * @returns {Bool} true if insertion was successful,
 * otherwise throws an error message
 */
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

/**
 * Retrieves note information for a specific note based on note id
 * @async
 * @param {Integer} note_id The note id to be retrieved
 * @returns {Object} An object containing all note information
 * in the structure of {note_id, detected_language, note_color, message, parent_note}
 */
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

/**
 * Retreives all notes that exist on the main board
 * @async
 * @returns {Array<Object>} An array of objects, each containing all note information
 * in the structure of {note_id, detected_language, note_color, message, parent_note}
 */
exports.getBoardNotes = async function () {
  return new Promise((resolve, reject) => {
    let db = connectDatabase();
    let query = `SELECT * FROM notes WHERE parent_note IS NULL`;
    db.all(query, [], (error, rows) => {
      if (error) {
        reject(error.message);
      }
      resolve(rows);
    });
    db.close();
  });
};

/**
 * Retreives all notes that are replies to a specific note
 * @async
 * @param {Integer} parent_note The parent note id for which replies should be retrieved
 * @returns {Array<Object>} An array of objects, each containing all note information
 * in the structure of {note_id, detected_language, note_color, message, parent_note}
 */
exports.getReplyNotes = async function (parent_note) {
  return new Promise((resolve, reject) => {
    let db = connectDatabase();
    let query = `SELECT * FROM notes WHERE parent_note = ?`;
    db.all(query, [parent_note], (error, rows) => {
      if (error) {
        reject(error.message);
      }
      resolve(rows);
    });
    db.close();
  });
};
