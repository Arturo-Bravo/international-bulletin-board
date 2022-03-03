import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Select from "react-select";

const ReplyNote = ({ cancel, fetchReplyNoteCount }) => {
  //This is gonna need to handle stuff different than the NewNote component
  useEffect(() => {}, []);

  //Form variables
  const [noteText, setNote] = useState("");
  const location = useLocation();

  let noteId = location.pathname.replace("/view-note/", "");

  //Set Colors here in value
  const options = [
    { value: "#feff9c", label: "Yellow" },
    { value: "#ff7eb9", label: "Pink" },
    { value: "#99FFFF", label: "Blue" },
  ];

  const customStyles = {
    option: (provided, state) => ({
      ...provided,
      borderBottom: "1px solid rgb(184, 184, 184)",
      color: state.value,
    }),
  };

  const handleColorChange = (color) => {
    let note = document.getElementById("noteForm");
    note.style.backgroundColor = color.value;
  };

  async function newReplyNote() {
    let v1 = {
      data: noteText,
      color: document.getElementById("selectColor").innerText,
      lan: "spanish",
      parent_note_id: noteId,
    };
    const response = await fetch("/savereplynote", {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify(v1),
    });
    if (response.status !== 200) {
      console.log(`Error fetching reply notes: ${response.status}`);
    }
    return;
  }

  const noteCreate = async (event) => {
    event.preventDefault();
    await newReplyNote();
    cancel(0);
    await fetchReplyNoteCount(noteId);
  };

  return (
    <div
      id="parentForm"
      className="d-flex align-items-center justify-content-center h-75"
    >
      <div id="noteForm" className="p-4 col-12">
        <h1>Reply</h1>
        <form onSubmit={noteCreate} className="">
          <div className="form-group d-flex justify-content-between align-items-center">
            <label className="select-color" htmlFor="color">
              Select Color:
            </label>
            {/* documentation: https://react-select.com/home 
						Also making the parent div a row or a class container messes with the width of the options
						so do not make it a row or contatiner*/}
            <Select
              id="selectColor"
              options={options}
              className="select-color"
              styles={customStyles}
              theme={(theme, state) => ({
                ...theme,
                colors: {
                  ...theme.colors,
                  primary25: "gray", //highlight
                  neutral0: "rgb(48, 48, 48)", //background color
                  neutral80: "white", //selected text color
                },
              })}
              onChange={handleColorChange}
            />
          </div>
          <textarea
            aria-label="text"
            name="text"
            className="mt-2"
            id="noteText"
            onChange={(e) => setNote(e.target.value)}
          ></textarea>
          <div className="d-flex justify-content-between">
            <input type="submit" className="mt-4" value={"Submit"} />
            <button
              onClick={() => {
                cancel(0);
              }}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ReplyNote;
