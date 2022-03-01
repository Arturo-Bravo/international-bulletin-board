import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import ViewReplies from "./viewReplies";
import CloseIcon from "@material-ui/icons/Close";
import { KeyboardArrowUp, KeyboardArrowDown } from "@material-ui/icons";

const ReplyHolder = ({ parent_note, cancel }) => {
  const [replyToView, setReply] = useState(0);

  useEffect(() => {}, []);

  function prevReply() {
    setReply(replyToView - 1);
  }

  function nextReply() {
    setReply(replyToView + 1);
  }

  const navigate = useNavigate();

  // This would be fetched notes with the passed down parent id
  // notes = fetch(parent_note) or something
  let notes = [
    {
      text: "Today was a good day in Oregon",
      id: "123456",
    },
    {
      text: "Saludos de Michoacan",
      id: "999999",
    },
    {
      text: "Сегодня моя машина взорвалась",
      id: "111111",
    },
  ];

  console.log(notes.length);

  const location = useLocation();
  let noteId = location.pathname.replace("/view-note/", "");
  //   let note;
  //   for (let i = 0; i < notes.length; i++) {
  //     if (notes[i].id === noteId) {
  //       note = notes[i];
  //       break;
  //     }
  //   }

  return (
    <div
      id="replyViewer"
      className="d-flex align-items-center justify-content-start"
    >
      <div id="replyNavigation">
        {replyToView !== 0 && (
          <button className="prevReply" onClick={prevReply}>
            <KeyboardArrowUp />
          </button>
        )}
        <ViewReplies note={notes[replyToView]} cancel={cancel} />
        {replyToView !== notes.length - 1 && (
          <button className="nextReply" onClick={nextReply}>
            <KeyboardArrowDown />
          </button>
        )}
      </div>
    </div>
  );
};

export default ReplyHolder;
