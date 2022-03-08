const sqlite3 = require("sqlite3").verbose();
const db_handler = require("../db/database");
const assert = require("assert");

// Unit test suite for database methods from database.js module
//
// Tests each function except for createNoteTable(), as the way its written its very difficult.
// Ideally createNoteTable would run as a beforeAll hook, but couldn't get
// Mocha hooks setup correctly so its in each method.
// Even worse still there wasn't a way to create a test database with the module functions
// so these unit tests act on the main database (big bad) and delete the created data afterwards
describe("Database methods", () => {
  it("Should insert a board note with proper data", async () => {
    let language = "English";
    let color = "#78189e";
    let message = "this is a test message";
    await db_handler.createNoteTable();
    await db_handler.insertBoardNote(language, color, message);
    let db = new sqlite3.Database("./db/board.db", (error) => {
      if (error) {
        return console.error(error.message);
      }
    });

    db.serialize(async () => {
      let query = `SELECT * FROM notes WHERE detected_language = ? AND note_color = ? AND message = ?`;
      db.get(query, [language, color, message], (error, row) => {
        if (error) {
          console.error(error.message);
        }
        assert.equal(row.detected_language, language);
        assert.equal(row.note_color, color);
        assert.equal(row.message, message);
      });
      query = `DELETE FROM notes WHERE detected_language = ? AND note_color = ? AND message = ?`;
      db.run(query, [language, color, message], (error) => {
        if (error) {
          console.error(error.message);
        }
      });
      db.close();
    });
  });

  it("Should insert a reply note with proper data", async () => {
    let language = "English";
    let color = "#78189e";
    let replyMessage = "this is a test reply message";
    let parentMessage = "this is a parent for a reply message";
    await db_handler.createNoteTable();
    await db_handler.insertBoardNote(language, color, parentMessage);
    await db_handler.insertReplyNote(language, color, replyMessage, 1);
    let db = new sqlite3.Database("./db/board.db", (error) => {
      if (error) {
        return console.error(error.message);
      }
    });

    db.serialize(async () => {
      let query = `SELECT * FROM notes WHERE detected_language = ? AND note_color = ? AND message = ? AND parent_note_id = ?`;
      db.get(query, [language, color, replyMessage, 1], (error, row) => {
        if (error) {
          console.error(error.message);
        }
        // console.log(row);
        assert.equal(row.detected_language, language);
        assert.equal(row.note_color, color);
        assert.equal(row.message, replyMessage);
      });
      query = `DELETE FROM notes WHERE detected_language = ? AND note_color = ? AND message = ?`;
      db.run(query, [language, color, replyMessage], (error) => {
        if (error) {
          console.error(error.message);
        }
      });
      db.run(query, [language, color, parentMessage], (error) => {
        if (error) {
          console.error(error.message);
        }
      });
      db.close();
    });
  });

  it("Should retrieve any note with proper data", async () => {
    let language = "English";
    let color = "#78189e";
    let message = "this is a retrieved test message";
    await db_handler.createNoteTable();

    let db = new sqlite3.Database("./db/board.db", (error) => {
      if (error) {
        return console.error(error.message);
      }
    });
    let note_id;
    let insert = new Promise((res, rej) => {
      db.serialize(() => {
        let query = `INSERT INTO notes(detected_language, note_color, message)
            values(?, ?, ?)`;
        db.run(query, [language, color, message], function (error) {
          if (error) {
            rej(error.message);
          }
          note_id = this.lastID;
          res();
        });
      });
    });

    await insert;
    const note = await db_handler.getNote(note_id);
    assert.equal(note.detected_language, language);
    assert.equal(note.note_color, color);
    assert.equal(note.message, message);

    db.serialize(() => {
      query = `DELETE FROM notes WHERE detected_language = ? AND note_color = ? AND message = ?`;
      db.run(query, [language, color, message], (error) => {
        if (error) {
          console.error(error.message);
        }
      });
      db.close();
    });
  });

  it("Should retrieve all board notes", async () => {
    let language = "English";
    let color = "#78189e";
    let message1 = "this is a retrieved test message";
    let message2 = "this is a retrieved 2nd test message";
    await db_handler.createNoteTable();

    let db = new sqlite3.Database("./db/board.db", (error) => {
      if (error) {
        return console.error(error.message);
      }
    });

    let insert = new Promise((res, rej) => {
      db.serialize(() => {
        let query = `INSERT INTO notes(detected_language, note_color, message)
            values(?, ?, ?)`;
        db.run(query, [language, color, message1], function (error) {
          if (error) {
            rej(error.message);
          }
        });
        db.run(query, [language, color, message2], function (error) {
          if (error) {
            rej(error.message);
          }
          res();
        });
      });
    });

    await insert;
    const notes = await db_handler.getBoardNotes();
    assert(notes.length >= 2);

    db.serialize(() => {
      query = `DELETE FROM notes WHERE detected_language = ? AND note_color = ? AND message = ?`;
      db.run(query, [language, color, message1], (error) => {
        if (error) {
          console.error(error.message);
        }
      });
      db.run(query, [language, color, message2], function (error) {
        if (error) {
          rej(error.message);
        }
      });
      db.close();
    });
  });

  it("Should retrieve all reply notes", async () => {
    let language = "English";
    let color = "#78189e";
    let message = "this is the parent note to get replies test";
    let message1 = "this is a retrieved reply test message";
    let message2 = "this is a retrieved 2nd reply test message";
    await db_handler.createNoteTable();

    let db = new sqlite3.Database("./db/board.db", (error) => {
      if (error) {
        return console.error(error.message);
      }
    });

    let note_id;
    let insertParent = new Promise((res, rej) => {
      db.serialize(() => {
        let query = `INSERT INTO notes(detected_language, note_color, message)
            values(?, ?, ?)`;
        db.run(query, [language, color, message], function (error) {
          if (error) {
            rej(error.message);
          }
          note_id = this.lastID;
          res();
        });
      });
    });

    await insertParent;
    let insertReplies = new Promise((res, rej) => {
      db.serialize(() => {
        query = `INSERT INTO notes(detected_language, note_color, message, parent_note_id)
        values(?, ?, ?, ?)`;
        db.run(query, [language, color, message1, note_id], function (error) {
          if (error) {
            rej(error.message);
          }
        });
        db.run(query, [language, color, message2, note_id], function (error) {
          if (error) {
            rej(error.message);
          }
          res();
        });
      });
    });

    await insertReplies;
    const notes = await db_handler.getReplyNotes(note_id);
    assert(notes.length >= 2);

    db.serialize(() => {
      query = `DELETE FROM notes WHERE detected_language = ? AND note_color = ? AND message = ?`;
      db.run(query, [language, color, message1], (error) => {
        if (error) {
          console.error(error.message);
        }
      });
      db.run(query, [language, color, message2], function (error) {
        if (error) {
          rej(error.message);
        }
      });
      db.run(query, [language, color, message], function (error) {
        if (error) {
          rej(error.message);
        }
      });
      db.close();
    });
  });

  it("Should retrieve count of reply notes", async () => {
    let language = "English";
    let color = "#78189e";
    let message = "this is the parent note to get replies test";
    let message1 = "this is a retrieved reply test message";
    let message2 = "this is a retrieved 2nd reply test message";
    await db_handler.createNoteTable();

    let db = new sqlite3.Database("./db/board.db", (error) => {
      if (error) {
        return console.error(error.message);
      }
    });

    let note_id;
    let insertParent = new Promise((res, rej) => {
      db.serialize(() => {
        let query = `INSERT INTO notes(detected_language, note_color, message)
            values(?, ?, ?)`;
        db.run(query, [language, color, message], function (error) {
          if (error) {
            rej(error.message);
          }
          note_id = this.lastID;
          res();
        });
      });
    });
    await insertParent;

    let insertReplies = new Promise((res, rej) => {
      db.serialize(() => {
        query = `INSERT INTO notes(detected_language, note_color, message, parent_note_id)
        values(?, ?, ?, ?)`;
        db.run(query, [language, color, message1, note_id], function (error) {
          if (error) {
            rej(error.message);
          }
        });
        db.run(query, [language, color, message2, note_id], function (error) {
          if (error) {
            rej(error.message);
          }
          res();
        });
      });
    });
    await insertReplies;

    const result = await db_handler.getReplyNoteCount(note_id);
    assert(result.count >= 2);

    db.serialize(() => {
      query = `DELETE FROM notes WHERE detected_language = ? AND note_color = ? AND message = ?`;
      db.run(query, [language, color, message1], (error) => {
        if (error) {
          console.error(error.message);
        }
      });
      db.run(query, [language, color, message2], function (error) {
        if (error) {
          rej(error.message);
        }
      });
      db.run(query, [language, color, message], function (error) {
        if (error) {
          rej(error.message);
        }
      });
      db.close();
    });
  });
});
