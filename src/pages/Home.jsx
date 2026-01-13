import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

  const [showCreateRoom, setShowCreateRoom] = useState(false);
  const [roomCode, setRoomCode] = useState("");
  const [joinCode, setJoinCode] = useState("");

  const generateRoomCode = () => {
    const code = Math.random().toString(36).substring(2, 8).toUpperCase();
    setRoomCode(code);
    setShowCreateRoom(true);
  };

  const handleJoinRoom = () => {
    if (joinCode.trim()) {
      navigate(`/room/${joinCode}`);
    }
  };

  const handleCreateRoom = () => {
    if (roomCode) {
      navigate(`/room/${roomCode}`);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-5xl font-bold text-white mb-2 tracking-wider">
            CODE SIMUL
          </h1>
          <p className="text-purple-300 text-sm">
            Collaborative Coding Platform
          </p>
        </div>

        {/* Main Box */}
        <div className="bg-white/10 backdrop-blur-md rounded-2xl shadow-2xl p-8 border border-white/20">
          {!showCreateRoom ? (
            <>
              <div className="mb-6">
                <label className="block text-white text-sm font-semibold mb-2">
                  Enter Room Code
                </label>
                <input
                  type="text"
                  value={joinCode}
                  onChange={(e) =>
                    setJoinCode(e.target.value.toUpperCase())
                  }
                  placeholder="XXXXXXXXXXXXXXXX"
                  className="w-full px-4 py-3 rounded-lg bg-white/20 border border-white/30 text-white"
                  maxLength={30}
                />
              </div>

              <button
                onClick={handleJoinRoom}
                className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 rounded-lg mb-4"
              >
                Join Room
              </button>

              <div className="text-center">
                <button
                  onClick={generateRoomCode}
                  className="w-full bg-gradient-to-r from-pink-500 to-purple-600 text-white font-bold py-3 rounded-lg"
                >
                  Create New Room
                </button>
              </div>
            </>
          ) : (
            <>
              <div className="text-center mb-6">
                <p className="text-white/70 text-sm mb-2">Your Room Code</p>
                <p className="text-4xl font-bold text-white tracking-widest">
                  {roomCode}
                </p>
              </div>

              <button
                onClick={handleCreateRoom}
                className="w-full bg-green-600 text-white font-bold py-3 rounded-lg mb-3"
              >
                Enter Room
              </button>

              <button
                onClick={() => setShowCreateRoom(false)}
                className="w-full bg-white/10 text-white py-2 rounded-lg"
              >
                Back
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default Home;
