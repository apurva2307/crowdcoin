import { Message } from "semantic-ui-react";
import { useState, useEffect } from "react";

const MessageFlash = ({ color, header, msg }) => {
  const [show, setShow] = useState(false);
  useEffect(() => {
    let timer;
    if (msg) {
      setShow(true);
      timer = setTimeout(() => {
        setShow(false);
      }, 5000);
    }
    return () => {
      if (timer) {
        clearTimeout(timer);
      }
    };
  }, []);
  return (
    <div className={`flash ${show ? "show" : ""}`}>
      <Message hidden={!show} color={color}>
        <Message.Header>{header}</Message.Header>
        <p>{msg}</p>
      </Message>
    </div>
  );
};

export default MessageFlash;
