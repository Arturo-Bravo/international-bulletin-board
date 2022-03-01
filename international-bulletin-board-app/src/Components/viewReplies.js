import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Select from "react-select";
import CloseIcon from "@material-ui/icons/Close";

const ViewReplies = ({ note, setStatus, viewRepliesClick }) => {
  useEffect(() => {}, []);

  const navigate = useNavigate();

  function closeBox() {
    setStatus(0);
  }

  function openReply() {
    navigate(`/view-note/${note.id}`);
    setStatus(1);
  }

  function viewReplies() {
    navigate(`/view-note/${note.id}`);
    viewRepliesClick(0);
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

  return (
    <div
      id="parentForm"
      className="d-flex align-items-center justify-content-start h-75"
    >
      <div id="repliesView" className="bg-success p-5">
        <button className="close" onClick={closeBox}>
          <CloseIcon />
        </button>
        <h1> {note.text} </h1>
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
          <button onClick={viewReplies}>View Replies(12)</button>
        </div>
      </div>
    </div>
  );
};

export default ViewReplies;
