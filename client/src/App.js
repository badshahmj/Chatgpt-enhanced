import { useState } from "react";
import user from "./assets/user4.png";
import "./App.css";
import "./normal.css";
import chatGptLogo from "./assets/chatGpt.png";
function App() {
  const [input, setInput] = useState("");
  // const [models, setModels] = useState([]);
  // const [currentModel, setCurrentModel] = useState("text-davinci-003");
  const [chatLog, setChatLog] = useState([
    {
      user: "gpt",
      message: "How can i help you today?",
    },
  ]);

  // useEffect(() => {
  //   getEngines();
  // }, []);

  //clear chats
  function clearChat() {
    setChatLog([
      {
        user: "gpt",
        message: "How can i help you today?",
      },
    ]);
  }

  // function getEngines() {
  //   fetch("http://localhost:3080/models")
  //     .then((res) => res.json())
  //     .then((data) => {
  //       console.log("data =>>>>>>>>.  ", data);
  //       setModels(data.models);
  //     });
  // }

  async function handleSubmit(e) {
    e.preventDefault();

    let chatLogTemp = [
      ...chatLog,
      {
        user: "me",
        message: `${input}`,
      },
    ];
    setChatLog(chatLogTemp);
    setInput("");

    //fetch request to the api combining the chatlog array of message and sending it a message to localhost:3000 as a post
    const messages = chatLogTemp.map((message) => message.message).join("\n");
    setTimeout(() => {
      var myDiv = document.getElementById("myDiv");
      myDiv.scrollTop = myDiv.scrollHeight;
    }, [1000]);
    console.log("Inise handle submit  ", messages);
    const response = await fetch("http://localhost:3080/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        message: messages,
        //currentModel,
      }),
    });

    const data = await response.json();

    console.log(data.message);
    setChatLog([...chatLogTemp, { user: "gpt", message: `${data.message}` }]);
    setTimeout(() => {
      var myDiv = document.getElementById("myDiv");
      myDiv.scrollTop = myDiv.scrollHeight;
    }, [1000]);
  }

  return (
    <div className="App">
      <aside className="sidemenu">
        <div className="side-menu-button" onClick={clearChat}>
          <span>+</span>
          New Chat
        </div>
        {/* <div className="models">
          <select onChange={(e) => setCurrentModel(e.target.value)}>
            {models &&
              models?.map((model, index) => (
                <option key={index} value={model.id}>
                  {model.id}
                </option>
              ))}
          </select>
        </div> */}
      </aside>
      <section className="chatbox">
        <div className="chat-log" id="myDiv">
          {chatLog.map((message, index) => {
            return <ChatMessage key={index} message={message} />;
          })}
        </div>
        <div className="chat-input-holder">
          <form style={{ width: "100%" }} onSubmit={handleSubmit}>
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="chat-input-textarea"
            ></input>
          </form>
        </div>
      </section>
    </div>
  );
}
const ChatMessage = ({ message }) => {
  return (
    <div
      className={`chat-message ${message.user === "gpt" && "chatgpt"}`}
      style={{ width: "90%" }}
    >
      <div className="chat-message-center">
        <div className={`avatar ${message.user === "gpt" && "chatgpt"}`}>
          {message.user === "gpt" ? (
            <img
              style={{ height: "100%", width: "100%" }}
              src={chatGptLogo}
              alt="logo"
            />
          ) : (
            <img
              style={{ height: "100%", width: "100%" }}
              src={user}
              alt="logo"
            />
          )}
        </div>
        <div className="message">{message.message}</div>
      </div>
    </div>
  );
};
export default App;
