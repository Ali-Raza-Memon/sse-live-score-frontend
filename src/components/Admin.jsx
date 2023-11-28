import React, { useState } from "react";
import axios from "axios";
import Modal from "react-modal";

const Admin = () => {
  const [inputText, setInputText] = useState("");
  const [messages, setMessages] = useState([]);
  const [teams, setTeams] = useState(["Create Team First"]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [newTeamName, setNewTeamName] = useState("");

  const handleSendClick = async () => {
    if(newTeamName){
      alert(`hello: ${newTeamName}`);
    }
    if(inputText){
      alert(`hello: ${inputText}`);
    }
    
    if (inputText.trim() !== "") {
      setMessages([inputText]);
      try {
        // Make a POST request to the server's /send-message endpoint
        if(inputText){
          await axios.post("http://localhost:5000/send-message", {
            message: inputText,
            type:"message"
          });
        }
       
  
        // Clear the input field
        setInputText("");
      } catch (error) {
        console.error("Error sending message:", error);
      }
    }
  };
  

  const handleCreateTeamClick = () => {
    setModalIsOpen(true);
  };

  const handleModalSave = async() => {
    
    if (newTeamName.trim() !== "") {
      setTeams([newTeamName]);
      setModalIsOpen(false);
      
      // Move the handleSendClick call here to ensure that newTeamName is set

      await axios.post("http://localhost:5000/send-teams", {
            team: newTeamName,
            type:"team"
          });

      setNewTeamName("");
    }
  }

  const handleModalCancel = () => {
    setModalIsOpen(false);
    setNewTeamName("");
  };

  return (
    <div className="flex justify-center items-center w-full h-full">
      <div className="max-w-md mx-auto mt-8 p-4 bg-gray-100 rounded-md shadow-md w-full">
        <div className="mt-4">
          {/* Display the teams */}
          {teams.map((team, index) => (
            <div key={index} className="bg-gray-200 text-green-500 flex justify-center font-bold text-2xl p-2 rounded-md mb-2">
              {team}
            </div>
          ))}
        </div>
        <div className="mb-4">
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Enter score..."
            className="w-full px-3 py-2 border rounded-md"
          />
        </div>
        <div className="flex justify-between">
          <button
            onClick={handleSendClick}
            className="bg-blue-500 text-white px-4 py-2 rounded-md mr-2"
          >
            Send
          </button>
          <button
            onClick={handleCreateTeamClick}
            className="bg-gray-500 text-white px-4 py-2 rounded-md"
          >
            Create Team
          </button>
        </div>
        <div className="mt-4">
          {/* Display the messages at the top */}
          {messages.map((message, index) => (
            <div key={index} className="bg-green-100 p-2 rounded-md mb-2">
              {message}
            </div>
          ))}
        </div>

        {/* Modal for creating a new team */}
        <Modal
          isOpen={modalIsOpen}
          onRequestClose={() => setModalIsOpen(false)}
          className="Modal"
        >
          <h2 className="text-xl font-bold mb-4">Create a New Team</h2>
          <input
            type="text"
            value={newTeamName}
            onChange={(e) => setNewTeamName(e.target.value)}
            placeholder="e.g., Pakistan Vs India"
            className="w-full px-3 py-2 border rounded-md mb-4"
          />
          <div className="flex justify-between">
            <button
              onClick={handleModalSave}
              className="bg-green-500 text-white px-4 py-2 rounded-md"
            >
              Save
            </button>
            <button
              onClick={handleModalCancel}
              className="bg-red-500 text-white px-4 py-2 rounded-md"
            >
              Cancel
            </button>
          </div>
        </Modal>
      </div>
    </div>
  );
};

export default Admin;
