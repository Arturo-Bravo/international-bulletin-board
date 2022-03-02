const db = require("../db/database");

async function seed_db() {
  await db.createNoteTable();
  await db.insertBoardNote("english", "blue", "this is a board note");
  await db.insertBoardNote("spanish", "red", "por que no los dos");
  await db.insertBoardNote("french", "green", "oh oui");
  await db.insertReplyNote("english", "red", "reply number 1", 1);
  await db.insertReplyNote("english", "blue", "reply number 2", 1);
  await db.insertReplyNote("english", "green", "reply number 3", 1);
  await db.insertReplyNote("english", "red", "reply 2 number 1", 2);
  await db.insertReplyNote("english", "blue", "reply 2 number 2", 2);
  await db.insertReplyNote("english", "green", "reply 2 number 3", 2);
  await db.insertReplyNote("english", "green", "reply 4 number 1", 4);
}

seed_db();
