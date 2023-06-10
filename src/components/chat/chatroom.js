import React, { useEffect, useState, useRef} from "react";
import ScrollToBottom from "react-scroll-to-bottom";

const Chat = ({ socket, username, room })  => { 
    const [currentMessage, setCurrentMessage] = useState("");
    const [messageList, setMessageList] = useState([]);

 // Create a ref that stores the current value of messageList
  const messageListRef = useRef(messageList);
  // Update ref whenever messageList changes
  useEffect(() => {
    messageListRef.current = messageList;
  }, [messageList]);

  const sendMessage = async () => {
    if (currentMessage !== "") {
      const messageData = {
        room: room,
        author: username,
        message: currentMessage,
        time: new Date().toLocaleTimeString(),
      };

      await socket.emit("send_message", messageData);

      setMessageList((list) => [
        ...list,
        {
          _id: list.length + 1, // temporary id
          text: messageData.message,
          createdAt: new Date().toISOString(),  // convert to string
          user: {
            _id: username,
            name: username,
          },
        },
      ]);
      
      setCurrentMessage("");
    }
  };



  useEffect(() => {
    const messageListener = (data) => {
      // Use the current value of messageList from the ref
      const isMessageExists = messageListRef.current.some((message) => message._id === data._id);
      if (!isMessageExists) {
        setMessageList((list) => [...list, data]);
      }
      console.log("Received message:", data);
    };

    socket.on("receive_message", messageListener);

    // Clean up listener when component unmounts
    return () => {
      socket.off("receive_message", messageListener);
    };
  }, [socket]); // Empty dependency array means this effect only runs once, when the component mounts
  
  

  

  return (
    <div className="chat-window">
      <div className="chat-header">
        <p>Live Chat</p>
      </div>
      <div className="chat-body">
      <ScrollToBottom className="message-container">
        {messageList.map((messageContent, index) => {
          return (
            <div
              key={index}  
              className="message"
              id={username === messageContent.user.name ? "you" : "other"}
            >
              <div>
                <div className="message-content">
                  <p style={{ color: "white" }}>{messageContent.text}</p>
                </div>
                <div className="message-meta">
                  <p style={{ color: "white" }} id="time">{messageContent.createdAt}</p>
                  <p style={{ color: "white" }} id="author">{messageContent.user.name}</p>
                </div>
              </div>
            </div>
          );
        })}
      </ScrollToBottom>
      </div>
      <div className="chat-footer">
        <input
          type="text"
          value={currentMessage}
          placeholder="Hey..."
          onChange={(event) => {
            setCurrentMessage(event.target.value);
          }}
          onKeyPress={(event) => {
            event.key === "Enter" && sendMessage();
          }}
        />
        <button onClick={sendMessage}>&#9658;</button>
      </div>
    </div>
  );
}

export default Chat;