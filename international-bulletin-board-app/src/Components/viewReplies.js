import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Select from "react-select";
import CloseIcon from "@material-ui/icons/Close";

const ViewReplies = ({ note, setStatus, viewRepliesClick }) => {
  const [replyCount, setReplyCount] = useState(0);
  const [noteMessage, setMessage] = useState({});

  useEffect(() => {
    fetchReplyNoteCount(note.note_id);
    let data = {
      message: note.message,
      detected_language: note.detected_language,
    };
    setMessage(data);
  }, [note]);

  const navigate = useNavigate();

  function closeBox() {
    setStatus(0);
  }

  function openReply() {
    navigate(`/view-note/${note.note_id}`);
    setStatus(1);
  }

  function viewReplies() {
    navigate(`/view-note/${note.note_id}`);
    viewRepliesClick(0);
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

  async function translateNote(value) {
    let lan = value;
    const response = await fetch(
      `/translate?message=${noteMessage.message}&language=${lan}`,
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
          detected_language: note.detected_language,
        };
      }
    }
    setMessage(apidata);
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
    await translateNote(option.value);
    //can access option.value and option.label
    //value should be the one we need for the argument to pass to DeepL
  };

  return (
    <div
      id="parentForm"
      className="d-flex align-items-center justify-content-start h-75"
    >
      <div id="repliesView" className="bg-success p-5">
        <button className="close" onClick={closeBox}>
          <CloseIcon />
        </button>
        <h1> {note.message.slice(0, 15) + "..."} </h1>
        <p>Original Language: {noteMessage.detected_language} </p>
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
          {noteMessage.message}
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
  );
};

export default ViewReplies;
