import Navbar from "./components/Navbar";
import { useEffect } from "react";
import { io } from "socket.io-client"; // Import Socket.IO client

// Replace 'http://localhost:3000' with your Socket.IO server URL
const socket = io(process.env.REACT_APP_BACKEND_URL || "http://localhost:3000");

const App = () => {
  useEffect(() => {
    socket.on("connect", () => {
      console.log("Socket.IO connection established");

      // Send a test message to the server
      socket.emit("testEvent", { type: "test", content: "Hello, server!" });
    });

    socket.on("pushNotification", (data) => {
      console.log("Socket.IO message received:", data);
    });

    socket.on("disconnect", () => {
      console.log("Socket.IO connection closed");
    });

    socket.on("connect_error", (error) => {
      console.error("Socket.IO connection error:", error);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <div className="">
      {/* navbar */}
      <Navbar />
    </div>
  );
};

export default App;