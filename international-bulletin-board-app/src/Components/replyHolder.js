import { useEffect, useState } from "react";
import ViewReplies from "./viewReplies";
import { KeyboardArrowUp, KeyboardArrowDown } from "@material-ui/icons";

const ReplyHolder = ({ parent_note, setStatus }) => {
  const [replyToView, setReply] = useState(0);
  const [replyNotes, setReplyNotes] = useState([]);
  const [slideUp, setSlideUp] = useState(false);
  const [slideDown, setSlideDown] = useState(false);

  useEffect(() => {
    fetchReplyNotes(parent_note);
  }, [parent_note]);

  function prevReply() {
    setSlideUp(true);
    setReply(replyToView - 1);
    setTimeout(() => {
      setSlideUp(false);
    }, 500);
  }

  function nextReply() {
    setSlideDown(true);
    setReply(replyToView + 1);
    setTimeout(() => {
      setSlideDown(false);
    }, 500);
  }

  async function fetchReplyNotes(parent_note) {
    const response = await fetch(`/getreplies?parent_note=${parent_note}`, {
      method: "GET",
    });
    if (response.status !== 200) {
      console.log(`Error fetching reply notes: ${response.status}`);
    }
    const data = await response.json();
    setReplyNotes(data);
  }

  // This would be fetched notes with the passed down parent id
  // notes = fetch(parent_note) or something

  return (
    <div
      id="replyViewer"
      className="d-flex align-items-center justify-content-start"
    >
      <div id="replyNavigation">
        {replyToView !== 0 && (
          <button
            className="prevReply"
            onClick={prevReply}
            aria-label="previous reply"
          >
            <KeyboardArrowUp />
          </button>
        )}
        {replyNotes.length !== 0 && (
          <ViewReplies
            slideUp={slideUp}
            slideDown={slideDown}
            note={replyNotes[replyToView]}
            setStatus={setStatus}
            viewRepliesClick={setReply}
          />
        )}
        {replyToView !== replyNotes.length - 1 && (
          <button
            className="nextReply"
            onClick={nextReply}
            aria-label="previous reply"
          >
            <KeyboardArrowDown />
          </button>
        )}
      </div>
    </div>
  );
};

export default ReplyHolder;
