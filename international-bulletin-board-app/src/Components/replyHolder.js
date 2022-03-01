import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import ViewReplies from "./viewReplies";
import CloseIcon from "@material-ui/icons/Close";
import { KeyboardArrowUp, KeyboardArrowDown } from "@material-ui/icons";

const ReplyHolder = ({ parent_note }) => {
  const [replyToView, setReply] = useState(0);

  useEffect(() => {}, []);

  function prevReply() {
    setReply(replyToView - 1);
  }

  function nextReply() {
    setReply(replyToView + 1);
  }

  const navigate = useNavigate();
  function closeBox() {
    navigate("/");
  }

  // This would be fetched notes with the passed down parent id
  // notes = fetch(parent_id) or something
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
    <div className="backdrop h-100 w-100">
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
          <button className="close" onClick={closeBox}>
            <CloseIcon />
          </button>
          <ViewReplies note={notes[replyToView]} />
          {replyToView !== notes.length && (
            <button className="nextReply" onClick={nextReply}>
              <KeyboardArrowDown />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ReplyHolder;
