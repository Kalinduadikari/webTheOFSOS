import io from "socket.io-client";
import { useState } from "react";
import Chat from "../../components/chat/chatroom";


const serverUrl = process.env.NODE_ENV === "production" ? "https://api.ofsosweb.live" : "http://localhost:8080";
const socket = io.connect(serverUrl);


const Chats = () => {
    const [username, setUsername] = useState("");
    const [room, setRoom] = useState("");
    const [showChat, setShowChat] = useState(false);

    const joinRoom = () => {
        if (username !== "" && room !== "") {
          socket.emit("join_room", room);
          setShowChat(true);
        }
      };

      return (
        <div className="App">
          {!showChat ? (
            <div className="joinChatContainer">
              <h3 style={{color: "#fff"}}>Join A Chat</h3>
              <input
                type="text"
                placeholder="John..."
                onChange={(event) => {
                  setUsername(event.target.value);
                }}
              />
              <input
                type="text"
                placeholder="Room ID..."
                onChange={(event) => {
                  setRoom(event.target.value);
                }}
              />
              <button onClick={joinRoom}>Join A Room</button>
            </div>
          ) : (
            <Chat socket={socket} username={username} room={room} />
          )}
        </div>
      );
    }
export default Chats;