const db = require("../db/database");

async function seed_db() {
  await db.createNoteTable();
  await db.insertBoardNote(
    "english",
    "#99FFFF",
    "this is a board note that is much longer than originally"
  );
  await db.insertBoardNote(
    "spanish",
    "#ff7eb9",
    "por que no los dos donde esta la biblioteca?"
  );
  await db.insertBoardNote(
    "french",
    "#ff7eb9",
    "oh oui oh oui oh oui oh oui oh oui oh oui oh oui"
  );
  await db.insertReplyNote("english", "#ff7eb9", "reply number 1", 1);
  await db.insertReplyNote("english", "#99FFFF", "reply number 2", 1);
  await db.insertReplyNote("english", "#feff9c", "reply number 3", 1);
  await db.insertReplyNote("english", "#ff7eb9", "reply 2 number 1", 2);
  await db.insertReplyNote("english", "#99FFFF", "reply 2 number 2", 2);
  await db.insertReplyNote("english", "#feff9c", "reply 2 number 3", 2);
  await db.insertReplyNote("english", "#ff7eb9", "reply 4 number 1", 4);
  for (let i = 0; i < 60; i++) {
    if (i % 3 == 0) await db.insertBoardNote("french", "#feff9c", `${i}`);
    else if (i % 3 == 1) await db.insertBoardNote("french", "#ff7eb9", `${i}`);
    else await db.insertBoardNote("french", "#99FFFF", `${i}`);
  }
}

seed_db();
