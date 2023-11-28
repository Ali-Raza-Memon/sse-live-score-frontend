// src/components/Client.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Client = () => {
  const [message, setMessage] = useState("");
  const [teams, setTeams] = useState("Teams here");
  useEffect(() => {
    // Replace 'YOUR_SERVER_URL' with the actual server URL
    const eventSource = new EventSource('http://localhost:5000/broadcast-sse');

    // Event listener for SSE messages
    eventSource.onmessage = (event) => {
      const data = JSON.parse(event.data);
      console.log(data)
      setMessage(data.message);
      if(data.team){
        setTeams(data.team);
      }
    };

    // Event listener for SSE errors
    eventSource.onerror = (error) => {
      console.log(error);
      console.error('Error with SSE:', error);
    };

    return () => {
      // Cleanup on component unmount
      eventSource.close();
    };
  }, []); // The empty dependency array ensures that this effect runs once when the component mounts

  return (
    <div className="bg-blue-200 p-8 rounded-md shadow-md">
      <h2 className="text-3xl font-bold mb-4 text-center">{teams}</h2>
      <div className="flex items-center justify-center">
        <div className="p-4 bg-white rounded-md shadow-md">
          <p className="text-lg">{message}</p>
        </div>
      </div>
    </div>
  );
};

export default Client;
