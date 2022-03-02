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
  const location = useLocation();

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

  async function getNote() {
    const v1 = { note_id: noteId };
    let v2 = { data: v1 };
    console.log(v2);
    const response = await fetch(`/getnote?note_id=${noteId}`, {
      method: "GET"
    });
    const body = await response.json();
    console.log(body);
    // return body;
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
    { value: "en", label: "English" },
    { value: "sp", label: "Spanish" },
    { value: "rs", label: "Russian" },
  ];

  const langChange = (option) => {
    console.log(option);
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
              <h1> {note.message} </h1>
              <p>Detected Language: Spanish?</p>
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
              <p>Detected Language: Spanish?</p>
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
          <h1> {note.message} </h1>
          <p>Detected Language: Spanish?</p>
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
