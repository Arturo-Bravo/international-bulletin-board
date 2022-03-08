import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Select from "react-select";
import ReplyNote from "./replyNote";
import ReplyHolder from "./replyHolder";
import CloseIcon from "@material-ui/icons/Close";

const ViewNote = () => {
  const [note, setNote] = useState({});
  const [replyCount, setReplyCount] = useState(0);
  const [replyStatus, setStatus] = useState(0);
  const [originalLanguage, setOriginalLanguage] = useState("");
  const [noteSnippet, setNoteSnippet] = useState("");
  const location = useLocation();
  let noteId = location.pathname.replace("/view-note/", "");

  useEffect(() => {
    getNote(noteId);
    fetchReplyNoteCount(noteId);
  }, [noteId]);

  function openReply() {
    setStatus(1);
  }

  function viewReplies() {
    setStatus(2);
  }

  const navigate = useNavigate();
  function closeBox() {
    navigate("/");
  }
  async function translateNote(value) {
    let lan = value;
    const response = await fetch(
      `/translate?message=${note.message}&language=${lan}`,
      {
        method: "GET",
      }
    );
    const body = await response.json();
    let apidata = {};
    for (let language of langs) {
      if (body.detected_language === language.value) {
        apidata = {
          message: body.message,
          detected_language: originalLanguage,
          note_color: note.note_color,
        };
      }
    }
    setNote(apidata);
  }
  async function getNote(noteId) {
    const response = await fetch(`/getnote?note_id=${noteId}`, {
      method: "GET",
    });
    const body = await response.json();
    setNote(body);
    setOriginalLanguage(body.detected_language);
    if (body.message.length > 15) {
      setNoteSnippet(body.message.slice(0, 15) + "...");
    } else {
      setNoteSnippet(body.message);
    }
  }

  async function fetchReplyNoteCount(parent_note) {
    const response = await fetch(`/getreplycount?parent_note=${parent_note}`, {
      method: "GET",
    });
    if (response.status !== 200) {
      console.log(`Error fetching reply notes: ${response.status}`);
    }
    const data = await response.json();
    setReplyCount(data.count);
  }

  const langs = [
    { value: "EN", label: "English" },
    { value: "ES", label: "Spanish" },
    { value: "RU", label: "Russian" },
    { value: "BG", label: "Bulgarian" },
    { value: "CS", label: "Czech" },
    { value: "DA", label: "Danish" },
    { value: "DE", label: "German" },
    { value: "EL", label: "Greek" },
    { value: "ET", label: "Estonian" },
    { value: "FI", label: "Finnish" },
    { value: "FR", label: "French" },
    { value: "HU", label: "Hungarian" },
    { value: "IT", label: "Italian" },
    { value: "JA", label: "Japanese" },
    { value: "LT", label: "Lithuanian" },
    { value: "LV", label: "Latvian" },
    { value: "NL", label: "Dutch" },
    { value: "PL", label: "Polish" },
    { value: "PT", label: "Portuguese" },
    { value: "RO", label: "Romanian" },
    { value: "SK", label: "Slovak" },
    { value: "SL", label: "Slovenian" },
    { value: "SV", label: "Swedish" },
    { value: "ZH", label: "Chinese" },
  ];

  const langChange = async (option) => {
    let getlan = document.getElementById("loader");
    getlan.style.display = "block";
    await translateNote(option.value);
    getlan.style.display = "none";
    //can access option.value and option.label
    //value should be the one we need for the argument to pass to DeepL
  };

  //If it is replying
  if (replyStatus === 1) {
    return (
      <div className="h-100 w-100 backdrop">
        <div className="d-flex align-items-center justify-content-around row h-75 w-100">
          <div className="mb-2 col-md-5 col-10 slide-in-right">
            <div
              id="noteView"
              className="notebackground p-4"
              style={{ backgroundColor: `${note.note_color}` }}
            >
              <button className="close" onClick={closeBox}>
                <CloseIcon />
              </button>
              <h1>{noteSnippet}</h1>
              <p>Original Language: {note.detected_language}</p>
              <div className="d-flex justify-content-between align-items-center">
                <label htmlFor="language">Display Language: </label>
                <Select
                  id="selectColor"
                  options={langs}
                  className="select-color"
                  theme={(theme, state) => ({
                    ...theme,
                    colors: {
                      ...theme.colors,
                      primary25: "gray", //highlight
                      neutral0: "white", //background color
                      neutral80: "black", //selected text color
                    },
                  })}
                  onChange={langChange}
                />
              </div>
              <p className="my-2">Note:</p>
              <p className="my-2 border border-dark px-2 mb-4">
                {note.message}
              </p>

              <div className="d-flex justify-content-between">
                <button onClick={openReply}>Reply</button>
                {replyCount !== 0 && (
                  <button
                    onClick={viewReplies}
                  >{`View Replies(${replyCount})`}</button>
                )}
              </div>
            </div>
          </div>

          <div className="col-md-5 col-10 slide-right">
            <ReplyNote
              cancel={setStatus}
              fetchReplyNoteCount={fetchReplyNoteCount}
            />
          </div>
        </div>
      </div>
    );
  }
  if (replyStatus === 2) {
    return (
      <div className="h-100 w-100 backdrop d-flex justify-content-center">
        <div className="d-flex align-items-center justify-content-around row h-75 w-100">
          <div className="mb-2 col-md-5 col-10">
            <div
              id="noteView"
              className="notebackground p-4 slide-center"
              style={{ backgroundColor: `${note.note_color}` }}
            >
              <button className="close" onClick={closeBox}>
                <CloseIcon />
              </button>
              <h1> {noteSnippet} </h1>
              <p>Original Language: {note.detected_language} </p>
              <div className="d-flex justify-content-between align-items-center">
                <label htmlFor="language">Display Language: </label>
                <Select
                  id="selectColor"
                  options={langs}
                  className="select-color"
                  theme={(theme, state) => ({
                    ...theme,
                    colors: {
                      ...theme.colors,
                      primary25: "gray", //highlight
                      neutral0: "white", //background color
                      neutral80: "black", //selected text color
                    },
                  })}
                  onChange={langChange}
                />
              </div>
              <p className="my-2">Note:</p>
              <p className="my-2 border border-dark px-2 mb-4">
                {note.message}
              </p>

              <div className="d-flex justify-content-between">
                <button onClick={openReply}>Reply</button>
                {replyCount !== 0 && (
                  <button
                    onClick={viewReplies}
                  >{`View Replies(${replyCount})`}</button>
                )}
              </div>
            </div>
          </div>

          <div className="col-md-5 col-10 slide-right">
            <ReplyHolder parent_note={noteId} setStatus={setStatus} />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="backdrop h-100 w-100">
      <div
        id="parentForm"
        className="d-flex align-items-center justify-content-center col-lg-6 col-md-8 col-10 h-75"
      >
        <div
          id="noteView"
          className="notebackground p-5"
          style={{ backgroundColor: `${note.note_color}` }}
        >
          <button className="close" onClick={closeBox}>
            <CloseIcon />
          </button>
          <h1>{noteSnippet}</h1>
          <p>Original Language: {note.detected_language}</p>
          <div
            id="loader"
            class="spinner-border text-primary"
            role="status"
            style={{ display: "none" }}
          >
            <span class="sr-only"></span>
          </div>
          <div className="d-flex justify-content-between align-items-center">
            <label htmlFor="language">Display Language: </label>
            <Select
              id="selectColor"
              options={langs}
              className="select-color"
              theme={(theme, state) => ({
                ...theme,
                colors: {
                  ...theme.colors,
                  primary25: "gray", //highlight
                  neutral0: "white", //background color
                  neutral80: "black", //selected text color
                },
              })}
              onChange={langChange}
            />
          </div>
          <p className="my-2">Note:</p>
          <p className="my-2 border border-dark px-2 mb-4">{note.message}</p>

          <div className="d-flex justify-content-between">
            <button onClick={openReply}>Reply</button>
            {replyCount !== 0 && (
              <button
                onClick={viewReplies}
              >{`View Replies(${replyCount})`}</button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewNote;
