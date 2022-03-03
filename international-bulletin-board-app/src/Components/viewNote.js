import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Select from "react-select";
import ReplyNote from "./replyNote";
import ReplyHolder from "./replyHolder";
import CloseIcon from "@material-ui/icons/Close";

const ViewNote = () => {
  const [note, setNote] = useState({});
  const [noteMessage, setMessage] = useState("");
  const [replyCount, setReplyCount] = useState(0);
  const [replyStatus, setStatus] = useState(0);
  const location = useLocation();
  let data1; 
  let noteId = location.pathname.replace("/view-note/", "");

  useEffect(() => {
    getNote();
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
    const response = await fetch(`/translate?message=${note.message}&language=${lan}`, {
      method: "GET",
    });
    const body = await response.json();
    let apidata = [];
    let loop = 0;
    while(loop < langs.length)
    {
      if(body.detected_language === langs[loop].value)
      {
        //console.log(langs[loop].label);
        apidata = {message: body.message, detected_language: langs[loop].label};
      }
      loop = loop +1;
    }
    setNote(apidata);
  }
  async function getNote() {
    const response = await fetch(`/getnote?note_id=${noteId}`, {
      method: "GET",
    });
    const body = await response.json();
    setNote(body);
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
    let data = await translateNote(option.value);
    //can access option.value and option.label
    //value should be the one we need for the argument to pass to DeepL
  };

  //If it is replying
  if (replyStatus === 1) {
    return (
      <div className="h-100 w-100 backdrop">
        <div className="d-flex align-items-center justify-content-around row h-75 w-100">
          <div className="mb-2 col-md-5 col-10 slide-in-right">
            <div id="noteView" className="bg-success p-4">
              <button className="close" onClick={closeBox}>
                <CloseIcon />
              </button>
              <h1>{note.message}</h1>
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

              <p className="text-warning my-2">
                This is where the main body text will be. A note would have a
                title and body
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
            <ReplyNote cancel={setStatus} />
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
            <div id="noteView" className="bg-success p-4 slide-center">
              <button className="close" onClick={closeBox}>
                <CloseIcon />
              </button>
              <h1> {note.message} </h1>
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

              <p className="text-warning my-2">
                This is where the main body text will be. A note would have a
                title and body
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
        <div id="noteView" className="bg-success p-5">
          <button className="close" onClick={closeBox}>
            <CloseIcon />
          </button>
          <h1>{note.message}</h1>
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

          <p className="text-warning my-2">
            This is where the main body text will be. A note would have a title
            and body
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
    </div>
  );
};

export default ViewNote;
