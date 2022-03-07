import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Select from "react-select";

const ReplyNote = ({ cancel, fetchReplyNoteCount }) => {
  //This is gonna need to handle stuff different than the NewNote component
  useEffect(() => {}, []);
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

  //Form variables
  const [noteText, setNote] = useState("");
  const location = useLocation();
  const [color, setColor] = useState("#feff9c")
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
    setColor(color.value);
  };
  async function detectLanguage(message) {
    let lan = "ES";
    const response = await fetch(
      `/translate?message=${message}&language=${lan}`,
      {
        method: "GET",
      }
    );
    const body = await response.json();
    let foundlan;
    for (let language of langs) {
      if (body.detected_language === language.value) {
        foundlan = language.label;
      }
    }
    return foundlan;
  }

  async function newReplyNote(language) {
    let v1 = {
      data: noteText,
      color: color,
      lan: language,
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
    let language = await detectLanguage(noteText);
    await newReplyNote(language);
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
