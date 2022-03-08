import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import NewNote from "./Components/newNote";
import ViewNote from "./Components/viewNote";
import Footer from "./Components/footerinfo";
import { KeyboardArrowLeft, KeyboardArrowRight } from "@material-ui/icons";

const Main = (argument1, argument2) => {
  const [randomIndex, setRandom] = useState(-1);
  const [notes, setNotes] = useState([]);
  const [notesToDisplay, setNotesToDisplay] = useState([]);
  const [noteDisplayIndex, setNoteDisplayIndex] = useState({
    start: 0,
    end: 0,
  });
  const [slideLeft, setSlideLeft] = useState(false);
  const [slideRight, setSlideRight] = useState(false);

  useEffect(() => {
    allNotes();
  }, []);
  const vw = Math.max(
    document.documentElement.clientWidth || 0,
    window.innerWidth || 0
  );

  let maxNotesPerBoard;
  if (vw < 600) maxNotesPerBoard = 15;
  else if (vw < 1200) maxNotesPerBoard = 20;
  else maxNotesPerBoard = 30;

  async function allNotes() {
    let getlan = document.getElementById("loaderMain");
    getlan.style.display = "block";
    const response = await fetch("/getall", {
      method: "GET",
      headers: { "Content-type": "application/json" },
    });
    const body = await response.json();
    setNotes(body);
    setRandom(Math.floor(Math.random() * notes.length));

    const startingMax =
      body.length > maxNotesPerBoard ? maxNotesPerBoard : body.length;
    setNoteDisplayIndex({ start: 0, end: startingMax });
    setNotesToDisplay(body.slice(0, startingMax));
    getlan.style.display = "none";
  }

  function paginateNotesLeft() {
    let newStart;
    let newEnd;
    if (noteDisplayIndex.start - maxNotesPerBoard < 0) {
      newStart = 0;
    } else {
      newStart = noteDisplayIndex.start - maxNotesPerBoard;
    }
    if (noteDisplayIndex.end - maxNotesPerBoard < maxNotesPerBoard) {
      newEnd = maxNotesPerBoard;
    } else {
      newEnd = noteDisplayIndex.end - maxNotesPerBoard;
    }
    setSlideLeft(true);
    setNoteDisplayIndex({ start: newStart, end: newEnd });
    setNotesToDisplay(notes.slice(newStart, newEnd));
    setTimeout(() => {
      setSlideLeft(false);
    }, 500);
  }

  function paginateNotesRight() {
    let newStart;
    let newEnd;
    if (noteDisplayIndex.end + maxNotesPerBoard > notes.length) {
      newEnd = notes.length;
    } else {
      newEnd = noteDisplayIndex.end + maxNotesPerBoard;
    }
    if (
      noteDisplayIndex.start + maxNotesPerBoard >
      notes.length - maxNotesPerBoard
    ) {
      newStart = notes.length - maxNotesPerBoard;
    } else {
      newStart = noteDisplayIndex.start + maxNotesPerBoard;
    }
    setSlideRight(true);
    setNoteDisplayIndex({ start: newStart, end: newEnd });
    setNotesToDisplay(notes.slice(newStart, newEnd));
    setTimeout(() => {
      setSlideRight(false);
    }, 500);
  }

  // Random positioning of notes
  let rngesus = [];
  //generate range of notes
  let range = [...notes.keys()];
  //Durstenfeld shuffle https://stackoverflow.com/a/12646864
  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }
  shuffleArray(range);
  let x = 0;
  let y = 0;
  let upperLimit = 0.4;
  let lowerLimit = 0.05;
  let yProduct = 80;
  if (vw < 600) {
    upperLimit = 0.2;
    yProduct = 40;
  } else if (vw < 1200) {
    upperLimit = 0.2;
    yProduct = 60;
  }
  for (let i = 0; i < notes.length; i++) {
    x = (Math.random() * (upperLimit - lowerLimit) + lowerLimit) * 100;
    y = range[i] % yProduct;
    rngesus.push({ x, y });
  }
  //---------------------------------------

  function randomRoute() {
    setRandom(Math.floor(Math.random() * notes.length));
  }
  return (
    <div className="bg-dark h-100">
      <Router>
        <header>
          <h1 className="my-2 text-center text-white">
            Notes From Around the World
          </h1>
        </header>
        <div className="container-fluid">
          <div id="notesBox" className="row justify-content-center">
            {noteDisplayIndex.start !== 0 && (
              <button
                className="prevNotes mx-0 px-0"
                onClick={paginateNotesLeft}
                aria-label="previous board"
              >
                <KeyboardArrowLeft />
              </button>
            )}
            <div
              id="board"
              className={
                "col-10 d-flex flex-wrap" +
                (slideRight ? " slide-board-right" : "") +
                (slideLeft ? " slide-board-left" : "")
              }
            >
              <div
                id="loaderMain"
                class="spinner-border text-primary"
                role="status"
                style={{ display: "none" }}
              >
                <span class="sr-only"></span>
              </div>
              {notes.length !== 0 &&
                notesToDisplay.map((note, index) => (
                  <Link
                    className="text-decoration-none"
                    to={{
                      pathname: `/view-note/${note.note_id}`,
                    }}
                    key={index}
                  >
                    <div
                      className="note m-2 p-2"
                      style={{
                        backgroundColor: `${note.note_color}`,
                        position: "relative",
                        left: `${rngesus[index].x}%`,
                        top: `${rngesus[index].y}px`,
                      }}
                    >
                      {note.message.length > 15
                        ? note.message.slice(0, 15) + "..."
                        : note.message}
                    </div>
                  </Link>
                ))}
            </div>
            {noteDisplayIndex.end !== notes.length && (
              <button
                className="nextNotes mx-0 px-0"
                onClick={paginateNotesRight}
                aria-label="next board"
              >
                <KeyboardArrowRight />
              </button>
            )}
          </div>
        </div>
        <footer className="d-flex justify-content-around mt-2">
          <Link
            to={"/new-note"}
            // state={{ fromMain: change }}
          >
            <button>New Note</button>
          </Link>
          {notes.length !== 0 && randomIndex !== -1 && (
            <Link to={`/view-note/${notes[randomIndex].note_id}`}>
              <button onClick={randomRoute}>View Random</button>
            </Link>
          )}
        </footer>
        <Routes>
          <Route path="/new-note" element={<NewNote />} />
          <Route path="/view-note/:noteId" element={<ViewNote />} />
          <Route path="/" element={<Footer />} />
        </Routes>
      </Router>
    </div>
  );
};

export default Main;
