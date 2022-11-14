import React, { useEffect, useState } from "react";
import { connect } from "socket.io-client";
import { messageType } from "../Utils/chatTypes";
import { ClipLoader } from "react-spinners";

// siempre va a ser hardcoded el 3001
const socket = connect("http://localhost:3001");

export default function Chat() {
  // author props ------
  const [email, setEmail] = useState<string>("test@gmail.com");
  const [nombre, setNombre] = useState<string>("");
  const [apellido, setApellido] = useState<string>("");
  const [edad, setEdad] = useState<number>(0);
  const [alias, setAlias] = useState<string>("");
  const [avatar, setAvatar] = useState<string>("");
  // message props------
  const [text, setText] = useState<string>("");

  const [conversation, setConversation] = useState<messageType[]>([]);

  useEffect(() => {
    socket.on("recover_conversation", (data) => {
      setConversation(data);
    });
    socket.on("receive_message", (data) => {
      setConversation((conversation) => [...conversation, data]);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [socket]);

  const handleSendMessage = (e: React.SyntheticEvent) => {
    e.preventDefault();
    setEmail("test@gmail.com");
    setNombre("test");
    setApellido("testing");
    setEdad(12);
    setAlias("Testeringo");
    setAvatar("avatar");
    socket.emit("send_message", {
      text: text,
      author: {
        email: email,
        nombre: nombre,
        apellido: apellido,
        edad: edad,
        alias: alias,
        avatar: avatar
      }
    });
    setText("");
  };

  return (
    <div className="flex flex-col flex-grow w-full max-w-xl bg-white shadow-xl rounded-lg overflow-hidden min-h-[500px]">
      <div className="flex flex-col flex-grow h-0 p-4 overflow-auto">
        {conversation.length < 1 ? (
          <div className="flex items-center justify-center h-full w-full">
            {" "}
            <ClipLoader
              color="#4e59e9"
              loading={true}
              size={150}
              aria-label="Loading Spinner"
              data-testid="loader"
            />
          </div>
        ) : (
          conversation.map((item: messageType, idx: number) => {
            if (item.author.email === email) {
              return (
                <div
                  className="flex w-full mt-4 space-x-3 max-w-xs ml-auto justify-end"
                  key={idx}
                >
                  <div>
                    <div className="bg-blue-600 text-white p-3 rounded-l-lg rounded-br-lg">
                      <p className="text-sm">{item.text}</p>
                    </div>
                    <span className="text-sm text-red-500 leading-none">
                      {item.timeStamp}
                    </span>
                    <br />
                    <span className="text-sm text-blue-500 leading-none">
                      {item.author.email}
                    </span>
                  </div>
                  <div className="flex-shrink-0 h-10 w-10 rounded-full bg-gray-300 flex items-center justify-center">
                    PP
                  </div>
                </div>
              );
            } else {
              return (
                <div className="flex w-full mt-2 space-x-3 max-w-xs" key={idx}>
                  <div className="flex-shrink-0 h-10 w-10 rounded-full bg-gray-300 flex items-center justify-center"></div>
                  <div>
                    <div className="bg-gray-300 p-3 rounded-r-lg rounded-bl-lg">
                      <p className="text-sm">{item.text}</p>
                    </div>
                    <span className="text-sm text-red-500 leading-none">
                      {item.timeStamp}
                    </span>
                    <br />
                    <span className="text-sm text-blue-500 leading-none">
                      {item.author.email}
                    </span>
                  </div>
                </div>
              );
            }
          })
        )}
      </div>

      <div className="bg-gray-300 p-4">
        <form onSubmit={handleSendMessage} className="flex">
          <input
            className="flex items-center h-10 w-full rounded px-3 text-sm"
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Escribe tu mensaje…"
          />
          <button type="submit" className="pl-2">
            Enviar
          </button>
        </form>
      </div>
    </div>
  );
}
