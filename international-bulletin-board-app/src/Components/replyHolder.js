import { useEffect, useState } from "react";
import ViewReplies from "./viewReplies";
import { KeyboardArrowUp, KeyboardArrowDown } from "@material-ui/icons";

const ReplyHolder = ({ parent_note, setStatus }) => {
  const [replyToView, setReply] = useState(0);

  useEffect(() => {}, []);

  function prevReply() {
    setReply(replyToView - 1);
  }

  function nextReply() {
    setReply(replyToView + 1);
  }

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
        <ViewReplies
          note={notes[replyToView]}
          setStatus={setStatus}
          viewRepliesClick={setReply}
        />
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
